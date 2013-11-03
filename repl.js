var arDrone = require('ar-drone');
var client = arDrone.createClient();

//require('ar-drone-png-stream')(client, { port: 8000 });

client.createRepl();
//client.on('navdata', console.log);
/*client.takeoff();

client
  .after(5000, function() {
    this.clockwise(0.5);
  })
  .after(3000, function() {
    this.animate('thetaDance', 15);
  })
  .after(1000, function() {
    this.stop();
    this.land();
  });*/