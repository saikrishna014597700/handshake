var kafka = require("kafka-node");

function ConnectionProvider() {
  this.getConsumer = function(topic_name) {
    this.client = new kafka.KafkaClient("localhost:2181");
    /*this.client.refreshMetadata([{topic: topic_name}], (err) => {
                if (err) {
                    console.warn('Error refreshing kafka metadata', err);
                }
            });*/
    this.kafkaConsumerConnection = new kafka.Consumer(this.client, [
      { topic: topic_name, partition: 0 }
    ]);
    this.client.on("ready", function() {
      console.log("Client ready");
    });
    // }
    return this.kafkaConsumerConnection;
  };

  this.getProducer = function() {
    if (!this.kafkaProducerConnection) {
      this.client = new kafka.KafkaClient("localhost:2181");
      /*this.client.refreshMetadata([{topic: topic_name}], (err) => {
                if (err) {
                    console.warn('Error refreshing kafka metadata', err);
                }
            });*/
      var HighLevelProducer = kafka.HighLevelProducer;
      this.kafkaProducerConnection = new HighLevelProducer(this.client);
      //this.kafkaConnection = new kafka.Producer(this.client);
      console.log("Producer ready");
    }
    return this.kafkaProducerConnection;
  };
}
exports = module.exports = new ConnectionProvider();
