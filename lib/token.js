"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = exports.TokenType = void 0;
exports.TokenType = {
    ILLEGAL: 'ILLEGAL',
    EOF: 'EOF',
    EQ: '==',
    NOT_EQ: '!=',
    // 标识符
    IDENT: 'IDENT',
    INT: 'INT',
    // 运算符
    ASSIGN: '=',
    PLUS: '+',
    MINUS: "-",
    BANG: "!",
    ASTERISK: "*",
    SLASH: "/",
    LT: "<",
    GT: ">",
    // 分隔符
    COMMA: ",",
    SEMICOLON: ";",
    LPAREN: "(",
    RPAREN: ")",
    LBRACE: "{",
    RBRACE: "}",
    // 关键字
    FUNCTION: 'FUNCTION',
    LET: 'LET',
    TRUE: 'TRUE',
    FALSE: "FALSE",
    IF: "IF",
    ELSE: "ELSE",
    RETURN: "RETURN"
};
class Token {
    constructor(type, text) {
        this.type = type;
        this.text = text;
    }
    toString() {
        let tname = exports.TokenType[this.type];
        return `<'${this.text}', ${tname}>`;
    }
}
exports.Token = Token;
