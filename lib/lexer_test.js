"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lexer_1 = require("./lexer");
const token_1 = require("./token");
function Test() {
    let input = `
    let five = 5;
    let ten = 10;
    let add = fn(x, y) {
        x + y;
     };
     let result = add(five, ten);
     !-/*5;
     5 < 10 > 5;

     if (5 < 10) {
        return true;
    } else {
        return false;
    }

    10 == 10;
    10 != 9;
    `;
    let lexer = new lexer_1.ListLexer(input);
    let token;
    while ((token === null || token === void 0 ? void 0 : token.type) !== token_1.TokenType.EOF) {
        token = lexer.nextToken();
        console.log('next', token);
    }
}
Test();
