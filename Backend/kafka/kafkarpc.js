var conn = require("./connection");

var TIMEOUT = 800000; //time to wait for response in ms
var self;

exports = module.exports = KafkaRPC;

function KafkaRPC() {
  self = this;
  this.connection = conn;
  this.requests = {}; //hash to store request in wait for response
  this.responseQueue = false; //placeholder for the future queue
  this.producer = this.connection.getProducer();
}

KafkaRPC.prototype.makeRequest = function(topicName, content, callback) {
  self = this;
  //generate a unique correlation id for this call
  // var correlationId = crypto.randomBytes(16).toString("hex");
  var correlationId = content.correlationId;
  console.log("KafkaRPC.prototype.makeRequest correlationId: " + correlationId);

  //create a timeout for what should happen if we don't get a response
  var tId = setTimeout(
    correlationId => {
      //if this ever gets called we didn't get a response in a
      //timely fashion
      console.log("Timeout");
      callback(new Error("Timeout " + correlationId));
      //delete the entry from hash
      delete self.requests[correlationId];
    },
    TIMEOUT,
    correlationId
  );

  //create a request entry to store in a hash
  var entry = {
    callback: callback,
    timeout: tId //the id for the timeout so we can clear it
  };

  //put the entry in the hash so we can match the response later
  self.requests[correlationId] = entry;

  //make sure we have a response topic
  self.setupResponseQueue(self.producer, topicName, () => {
    //put the request on a topic

    var payloads = [
      {
        topic: topicName,
        messages: JSON.stringify({
          correlationId: correlationId,
          // replyTo: "test2",
          data: content
        }),
        partition: 0
      }
    ];
    self.producer.send(payloads, (err, res) => {
      if (err) console.log("Producer err: " + JSON.stringify(err));
      console.log("Producer res: " + JSON.stringify(res));
    });
  });
};

KafkaRPC.prototype.setupResponseQueue = function(producer, topicName, next) {
  //don't mess around if we have a queue
  if (this.responseQueue) return next();

  self = this;

  //subscribe to messages
  var consumer = self.connection.getConsumer("response_topic");
  consumer.on("message", message => {
    console.log("consumer onMessage: message: " + JSON.stringify(message));
    var data = JSON.parse(message.value);
    //get the correlationId
    var correlationId = data.correlationId;
    //is it a response to a pending request
    // if (correlationId in self.requests && !!data.data.status) {
    if (correlationId in self.requests) {
      //retrieve the request entry
      var entry = self.requests[correlationId];
      //make sure we don't timeout by clearing it
      clearTimeout(entry.timeout);
      //delete the entry from hash
      delete self.requests[correlationId];
      //callback, no err
      entry.callback(null, data);
    }
  });
  self.responseQueue = true;
  return next();
};
