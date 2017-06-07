#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

var opts = {
  rejectUnauthorized: false
};
amqp.connect('amqps://admin:password@rabbitmq:5671?heartbeat=5', opts, function(err, conn) {
  console.warn(err);
  function send () {
    setTimeout(function() {
      conn.createChannel(function(err, ch) {
        var q = 'tasks';
        var msg = 'Hello world';
        ch.assertQueue(q, {durable: true});
        ch.sendToQueue(q, new Buffer(msg), {persistent: true});
        console.log(" [x] Sent %s", msg)
      });
      send();
    }, 10 * 1000);
    send();
  };
  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});
