var connection = new require("./kafka/connection");
//topics files
const KafkaTopic = require("./helpers/topics");
var Student = require("./services/student.service");
var AuthService = require("./services/auth.service");

const { mongoDB } = require("./config");
const mongoose = require("mongoose");
const fs = require("fs");

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 500,
  bufferMaxEntries: 0
};

mongoose.connect(mongoDB, options, (err, res) => {
  if (err) {
    console.log(`MongoDB Connection Failed`);
  } else {
    console.log(`MongoDB Connected`);
  }
});

// fs.readdirSync(__dirname + "/dbSchema").forEach(filename => {
//   if (~filename.indexOf(".js")) {
//     require(__dirname + "/dbSchema/" + filename);
//   }
// });

const handleTopicRequest = (topic_name, serviceName) => {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("Kafka DB Client is running ");
  consumer.on("message", message => {
    try {
      var data = JSON.parse(message.value);
      console.log(JSON.stringify(message));
      const sendMsg = async res => {
        var payloads = [
          {
            topic: "response_topic",
            messages: JSON.stringify({
              correlationId: data.correlationId,
              data: res
            }),
            partition: 0
          }
        ];
        await producer.send(payloads, data => {
          console.log(data);
        });
      };
      serviceName
        .handleRequest(data.data)
        .then(res => {
          sendMsg(res);
        })
        .catch(err => {
          sendMsg(err);
          console.error(JSON.stringify(err));
        });
      // serviceName.handle_request(data.data, (err, res) => {
      //   var payloads = [
      //     {
      //       topic: "response_topic",
      //       messages: JSON.stringify({
      //         correlationId: data.correlationId,
      //         data: res
      //       }),
      //       partition: 0
      //     }
      //   ];
      //   producer.send(payloads, (err, data) => {
      //     console.log(data);
      //   });
      //   return;
      // });
    } catch (err) {
      console.error(JSON.stringify(err));
      return;
    }
  });
};

// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest(KafkaTopic.Student, Student);
handleTopicRequest(KafkaTopic.Auth, AuthService);
