var arDrone = require('ar-drone');
var client = arDrone.createClient();

//require('ar-drone-png-stream')(client, { port: 8000 });

client.createRepl();
//client.on('navdata', console.log);
client.takeoff();

client
  .after(1000, function() {
    this.front(0.2);
  })
  .after(8500, function() {
    this.stop();
    this.up(0.5);
  })
  .after(500, function() {
      this.clockwise(1);
  })
  .after(1850, function() {
    this.stop();
  })
  .after(1000, function() {
    this.front(0.2);
  })
  .after(6000, function() {
    this.stop();
    this.land();
  });
  

// Land on ctrl-c
var exiting = false;
process.on('SIGINT', function() {
    if (exiting) {
        process.exit(0);
    } else {
        console.log('Got SIGINT. Landing, press Control-C again to force exit.');
        exiting = true;
        client.stop();
        client.land();
    }
});