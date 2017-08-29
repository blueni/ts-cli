"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const util_1 = require("./util");
exports.createFile = (filename, content) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, content, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(true);
            }
        });
    });
};
exports.createPackage = (pkg) => {
    let content = util_1.default.createConfig(pkg);
    return exports.createFile(path.join(process.cwd(), 'package.json'), content);
};
exports.createTsconfig = (cfg) => {
    let content = util_1.default.createConfig(cfg);
    return exports.createFile(path.join(process.cwd(), 'tsconfig.json'), content);
};
exports.createGulpfile = (type) => {
    let content;
    if (type == 'node') {
        content = fs.readFileSync(path.join(__dirname, '../src', 'gulp-for-node.js'));
    }
    else {
        content = fs.readFileSync(path.join(__dirname, '../src', 'gulp-for-browser.js'));
    }
    return exports.createFile(path.join(process.cwd(), 'gulpfile.js'), content);
};
