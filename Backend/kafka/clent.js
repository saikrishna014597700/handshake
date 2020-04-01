var rpc = new (require("./kafkarpc"))();

/**
 * Send/Produce message with Kafka
 * @param {string} topicName Kafka Topic
 * @param {*} message Kafka message
 * @param {*} callback
 */
function makeRequest(topicName, message, callback) {
  rpc.makeRequest(topicName, message, function(err, response) {
    if (err) console.error(err);
    else {
      callback(null, response);
    }
  });
}

exports.makeRequest = makeRequest;
