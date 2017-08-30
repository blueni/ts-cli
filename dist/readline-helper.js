"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline");
class ReadlineHelper {
    constructor(rl) {
        this.rl = rl;
    }
    newline() {
        this.rl.write('\n');
    }
    question(question, callback) {
        return new Promise(resolve => {
            this.rl.question(question, (answer) => {
                callback(answer);
                resolve();
            });
        });
    }
    select(question, options) {
        let rl = this.rl;
        let { output, input } = rl;
        let len = options.length;
        let lastLength = 0;
        let current = 0;
        rl.write(`${question}(${'上下方向键选择，enter键确定'.cyan})`);
        this.newline();
        const _getStrLength = (str) => {
            return str.replace(/[\u4e00-\u9fa5]/g, '  ').length;
        };
        const _list = (num = 0) => {
            if (lastLength) {
                readline.moveCursor(output, -lastLength, -len - 1);
                readline.clearScreenDown(output);
            }
            options.forEach((item, index) => {
                item = '> ' + item;
                item = index == num ? item.green : item;
                rl.write(item + '\n');
                if (index == len - 1) {
                    lastLength = _getStrLength(item) + 2;
                }
            });
            this.newline();
        };
        _list();
        return new Promise(resolve => {
            input.on('keypress', function _handleKeypress(ch, key) {
                switch (key.name) {
                    case 'up':
                        current = current > 0 ? current - 1 : 0;
                        _list(current);
                        break;
                    case 'down':
                        current = current < len - 1 ? current + 1 : current;
                        _list(current);
                        break;
                    case 'return':
                    case 'enter':
                        input.removeListener('keypress', _handleKeypress);
                        resolve(current);
                        break;
                    default:
                        readline.moveCursor(output, -1, 0);
                        readline.clearScreenDown(output);
                }
            });
        });
    }
}
exports.default = ReadlineHelper;
