"use strict";
/// <reference path="./node.expand.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
require("./colorful");
const fs = require("fs");
const readline = require("readline");
const path = require("path");
const create_file_1 = require("./create-file");
const readline_helper_1 = require("./readline-helper");
const { stdout, stdin } = process;
const rl = readline.createInterface({
    input: stdin,
    output: stdout
});
const rlHelper = new readline_helper_1.default(rl);
let dirArr = process.cwd().replace(/[\\\/]$/, '').split(/[\\\/]/);
let projectName = dirArr.pop();
let projectEnv;
let pkg = {
    name: projectName,
    version: 'v1.0.0',
    main: './src/index.ts',
};
let tsCfg = {
    compilerOptions: {
        noImplicitAny: true,
        noResolve: true
    }
};
// 配置 package.json文件
console.log('配置package.json...'.magenta);
rlHelper.newline();
rlHelper.question(`name: (${pkg.name})`, (name) => {
    if (name) {
        pkg.name = name;
    }
})
    .then(() => {
    return rlHelper.question(`version: (${pkg.version})`, (version) => {
        if (version) {
            pkg.version = version;
        }
    });
})
    .then(() => {
    return rlHelper.question('description: ', (description) => {
        pkg.description = description || '';
    });
})
    .then(() => {
    return rlHelper.question(`main: (${pkg.main})`, (main) => {
        if (main) {
            pkg.main = main;
        }
    });
})
    .then(() => {
    return rlHelper.question('author: ', (author) => {
        if (author) {
            pkg.author = author;
        }
    });
})
    .then(() => {
    rlHelper.newline();
    console.log('package.json文件配置完成'.magenta);
    rlHelper.newline();
})
    .then(() => {
    console.log('配置tsconfig.json...'.magenta);
    rlHelper.newline();
})
    .then(() => {
    let targets = ['ES3', 'ES5', 'ES6', 'ES2016', 'ES2017', 'ESNext'];
    return rlHelper.select('生成js版本：', targets)
        .then((index) => {
        tsCfg.compilerOptions.target = targets[index].toLowerCase();
    });
})
    .then(() => {
    let rules = ['None', 'CommonJs', 'AMD', 'UMD', 'System', 'ES2015', 'ESNext'];
    return rlHelper.select('生成js模块规范：', rules)
        .then((index) => {
        let rule = rules[index];
        if (rule == 'commonjs') {
            projectEnv = 'node';
        }
        tsCfg.compilerOptions.module = rule.toLowerCase();
    });
})
    .then(() => {
    console.log('tsconfig.json文件配置完成'.magenta);
    if (projectEnv == 'node') {
        pkg.devDependencies = {
            "@types/node": "7.0.42",
            "gulp": "^3.9.1",
            "typescript": "^2.4.2",
            "gulp-typescript": "^3.2.2",
        };
    }
    else {
        pkg.devDependencies = {
            "gulp": "^3.9.1",
            "browserify": "^14.4.0",
            "tsify": "^3.0.1",
            "typescript": "^2.4.2",
            "vinyl-source-stream": "^1.1.0",
        };
    }
    console.log('初始化项目文件...');
    if (!fs.existsSync(path.resolve(process.cwd(), 'src'))) {
        fs.mkdirSync(path.resolve(process.cwd(), 'src'));
    }
    return create_file_1.createFile(path.join(process.cwd(), pkg.main), '');
})
    .then(() => {
    console.log('创建package.json文件...');
    return create_file_1.createPackage(pkg);
})
    .then(() => {
    console.log('创建tsconfig.json文件...');
    return create_file_1.createTsconfig(tsCfg);
})
    .then(() => {
    console.log('创建gulpfile.js文件...');
    return create_file_1.createGulpfile(projectEnv);
})
    .then(() => {
    rl.close();
});
