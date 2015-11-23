#!/usr/bin/env node

var fs = require('fs')
var html2png = require('html2png');
var path = require('path');

var command = path.basename(process.argv.slice(1));
var args = process.argv.slice(2);
if (args.length == 0) {
  console.log('Usage: ' + command + ' [text]');
  process.exit();
}

fs.readFile('tweet.html', 'utf8', function(err, data) {
  if (err) throw err;

  data = data.replace(/YOLO/g, args.join(' '));

  var screenshot = html2png({ width: 642, height: 280, browser: 'chrome'});
  screenshot.render(data, function (err, data) {
    if (err) throw err;

    fs.writeFile("tweet.png", data, function(err) {
      if (err) throw err;

      screenshot.close();
    });
  });
});
