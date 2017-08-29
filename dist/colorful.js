"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors = ['red', 'cyan', 'green', 'blue', 'yellow', 'white', 'black', 'grey', 'magenta'];
const colorMap = {
    bold: [1, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    white: [37, 39],
    grey: [90, 39],
    black: [30, 39],
    blue: [34, 39],
    cyan: [36, 39],
    green: [32, 39],
    magenta: [35, 39],
    red: [31, 39],
    yellow: [33, 39]
};
colors.forEach(color => {
    Object.defineProperty(String.prototype, color, {
        get() {
            let codeArr = colorMap[color];
            return `\u001b[${codeArr[0]}m${this.toString()}\u001b[${codeArr[1]}m`;
        }
    });
});
