var npmPath = require('path').dirname(process.execPath)+"/node_modules/npm";
var npm = require(npmPath);
npm.load({
    loaded: false
}, function (err) {
  // catch errors
  npm.commands.install([], function (er, data) {
    // log the error or data
  });
  npm.on("log", function (message) {
    // log the progress of the installation
    console.log(message);
  });
});
