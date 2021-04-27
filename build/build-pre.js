const path = require("path");
const colors = require("colors/safe");
const fs = require("fs");
const appVersion = require("../package.json").version;
const appCodeVersion = require("../package.json").appCodeVersion;

/******************
 * Version file
 *******************/
const packageJsonPath = path.join(__dirname + "/../package.json");
console.log(colors.cyan("\nRunning versioning tasks"));
fs.readFile(packageJsonPath, function(err, data) {
  if(err) {
    return console.log(colors.red(err));
  }

  // updates versionCode
  data = data.toString();
  var versionCodePattern = /"appCodeVersion": [0-9]+/g;
  const newVersionCode = parseInt(appCodeVersion, 10) + 1;
  data = data.replace(versionCodePattern, `"appCodeVersion": ${newVersionCode}`);


  // ensure version module pulls value from package.json
   fs.writeFile(packageJsonPath, data, { flat: "w" }, function(err) {
    if (err) {
      return console.log(colors.red(err));
    }
    console.log(
      colors.green(`Updating versionCode to ${colors.yellow(newVersionCode)}`)
    );
  });
});
