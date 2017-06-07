var amqp = require('amqplib/callback_api');

var opts = {
  rejectUnauthorized: false,
};
amqp.connect('amqps://admin:password@rabbitmq:5671?heartbeat=5', opts, function(err, conn) {
  console.warn(err);
  conn.createChannel(function(err, ch) {
    var q = 'tasks';

    ch.assertQueue(q, {durable: true});
    ch.prefetch(1);
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function(msg) {
      console.log(" [x] Received %s", msg.content.toString());
      setTimeout(function() {
        console.log(" [x] Done");
        ch.ack(msg);
      }, 10 * 1000);
    }, {noAck: false});
  });
});
