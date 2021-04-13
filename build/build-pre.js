const path = require("path");
const colors = require("colors/safe");
const fs = require("fs");
const appVersion = require("../package.json").version;

/******************
 * Version file
 *******************/
const versionFilePath = path.join(__dirname + "/../android/app/build.gradle");
console.log(colors.cyan("\nRunning environement version versioning tasks"));
fs.readFile(versionFilePath, function(err, data) {
  if(err) {
    return console.log(colors.red(err));
  }

  // updates versionCode
  data = data.toString();
  var versionCodePattern = /versionCode [0-9]/g;
  const versionCodeString = data.match(versionCodePattern).toString();
  const actualVersionCode = parseInt(versionCodeString.replace(/[^0-9]/g,''), 10);
  const newVersionCode = actualVersionCode + 1;
  data = data.replace(versionCodePattern, `versionCode ${newVersionCode}`);

  // updates versionName
  var versionNamePattern = /versionName "(.*?)"/g;
  data = data.replace(versionNamePattern, `versionName "${appVersion}"`);

  // ensure version module pulls value from package.json
  fs.writeFile(versionFilePath, data, { flat: "w" }, function(err) {
    if (err) {
      return console.log(colors.red(err));
    }
    console.log(
      colors.green(`Updating versionCode to ${colors.yellow(newVersionCode)}`)
    );
    console.log(
      colors.green(`Updating application version to ${colors.yellow(appVersion)}`)
    );
  });
});

