"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const token_1 = require("../token");
const readline = require('readline');
const { ListLexer } = require('../lexer');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const start = () => {
    // while (true) {
    const circulate = () => {
        rl.question(`>> `, (line) => {
            let lexer = new ListLexer(line);
            let token;
            while ((token === null || token === void 0 ? void 0 : token.type) !== token_1.TokenType.EOF) {
                token = lexer.nextToken();
                console.log(token);
            }
            circulate();
        });
    };
    circulate();
    // }
};
exports.start = start;
