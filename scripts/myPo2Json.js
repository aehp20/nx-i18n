const lineReader = require('line-reader');
const parseArgs = require('minimist');
const execSync = require('child_process').execSync;
const fs = require('fs');
const path = require("path");

const args = process.argv.slice(2);
const argv = parseArgs(args, opts={});

const locale = argv.locale || "en";
const locales = locale.split(",");

const folder = `${path.dirname(__dirname)}/locale/`;
const publicFolder = `${path.dirname(__dirname)}/public/translations/`;
const regexp = /{\S+}/g;

function prepareTranslation(str, regexp) {
  if (str.startsWith("msgid") || str.startsWith("msgstr")) {
    let matchesAndPositions = [];
    let matches = [...str.matchAll(regexp)];
    matches.forEach((match, index) => {
      matchesAndPositions.push({text: match[0], newText: `%${index + 1}`});
    });
    let newStr = str;
    matchesAndPositions.forEach((item) => {
    newStr = newStr.replace(item.text, item.newText);
    });
    return newStr;
  }
  return str;
}

locales.forEach(locale => {
  const poFile = `${locale}.po`;
  const tmpFile = `${locale}-temp.po`;
  const jsonFile = `${locale}.json`;

  let newText = "";

  lineReader.eachLine(`${folder}${poFile}`, function(line, last) {
    newText += prepareTranslation(line, regexp);
    if (!last) {
      newText += "\n";
    } else {
      fs.writeFile(`${folder}${tmpFile}`, newText, (err) => {
        const output = execSync(`node_modules/gettext.js/bin/po2json ${folder}${tmpFile}  ${folder}${jsonFile}`, { encoding: 'utf-8' });
        if (err) { throw err; }
        fs.unlink(`${folder}${tmpFile}`, function (err) {
          if (err) throw err;
        });
        fs.copyFile(`${folder}${jsonFile}`, `${publicFolder}${jsonFile}`, (err) => {
          if (err) {
            console.log("Copy File Error Found:", err);
          }
        });
      })
    }
  });
});
