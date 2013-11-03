// Run this to receive a png image stream from your drone.

var arDrone = require('ar-drone');
var http    = require('http');
var fs = require('fs');
var client = arDrone.createClient();
var cv = require('opencv');

client.createRepl();

console.log('Connecting png stream ...');
var pngStream = arDrone.createClient().getPngStream();
console.log('Connected to png stream ...');

pngStream
    .on('error', console.log)
    .on('data', function(pngBuffer) {
        var datetime = new Date();
        var filename = 'screenshot' + datetime + '.png';
        fs.writeFile(filename, pngBuffer, 'binary', function(err){
            if (err) {
                throw err;
            }
            cv.readImage(filename, function(err, im){
              im.detectObject(cv.FACE_CASCADE, {}, function(err, faces){
                for (var i=0;i<faces.length; i++){
                  var x = faces[i]
                  im.ellipse(x.x + x.width/2, x.y + x.height/2, x.width/2, x.height/2);
                }
                im.save('./out.jpg');
              });
            })
            console.log('File saved.')
            return;
        });
    }
);