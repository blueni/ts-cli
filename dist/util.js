"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    createProperty(key, value, num = 1) {
        if (!value) {
            return '';
        }
        let tab = '\t'.repeat(num);
        if (value === true || value === false || !isNaN(value)) {
            return `${tab}"${key}": ${value.toString()},`;
        }
        return `${tab}"${key}": "${value}",`;
    },
    createArray(key, arr, num = 1) {
        if (arr) {
            let tab = '\t'.repeat(num);
            let str = `${tab}"${key}": [\n`;
            for (let value of arr) {
                str += `"${value}",`;
            }
            str = this.rtrim(str);
            return str += `\n${tab}],`;
        }
        return '';
    },
    createJson(key, json, num = 1) {
        if (json) {
            let tab = '\t'.repeat(num);
            let str = `${tab}"${key}": {\n`;
            for (let key in json) {
                str += this.createProperty(key, json[key], num + 1) + '\n';
            }
            str = this.rtrim(str);
            return str += `\n${tab}},`;
        }
        return '';
    },
    createConfig(config) {
        if (!config) {
            return '';
        }
        let content = '{\n';
        for (let key in config) {
            if (typeof config[key] === 'string') {
                content += this.createProperty(key, config[key]);
            }
            else if (Array.isArray(config[key])) {
                content += this.createArray(key, config[key]);
            }
            else {
                content += this.createJson(key, config[key]);
            }
            content += '\n';
        }
        content = this.rtrim(content);
        content += '\n}';
        return content.replace(/[\r\n]+/g, '\n');
    },
    rtrim(str, endSymbol = ',') {
        return str.replace(new RegExp(endSymbol + '*\\s*$', 'g'), '');
    },
};
