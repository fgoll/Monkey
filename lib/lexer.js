"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListLexer = exports.Lexer = void 0;
const token_1 = require("./token");
const code = (c) => c.charCodeAt(0);
class Lexer {
    constructor(input) {
        this.input = input;
        this.p = 0;
        this.c = input.charAt(this.p);
    }
    // 向前移动一个字符, 检测输入是否结束
    consume() {
        this.p++;
        if (this.p >= this.input.length)
            this.c = token_1.TokenType.EOF;
        else
            this.c = this.input.charAt(this.p);
    }
    match(x) {
        if (this.c === x)
            this.consume();
        else
            throw new Error("expecting " + x + "; found " + this.c);
    }
}
exports.Lexer = Lexer;
class ListLexer extends Lexer {
    constructor(input) {
        super(input);
    }
    nextToken() {
        let token;
        const skip = () => {
            while (this.c === ' ' || this.c === '\t' || this.c === '\n' || this.c === '\r') {
                this.consume();
            }
        };
        skip();
        switch (this.c) {
            case '=':
                if (this.peekChar() === '=') {
                    let c = this.c;
                    this.consume();
                    token = new token_1.Token(token_1.TokenType.EQ, c + this.c);
                }
                else {
                    token = new token_1.Token(token_1.TokenType.ASSIGN, this.c);
                }
                break;
            case ';':
                token = new token_1.Token(token_1.TokenType.SEMICOLON, this.c);
                break;
            case '(':
                token = new token_1.Token(token_1.TokenType.LPAREN, this.c);
                break;
            case ')':
                token = new token_1.Token(token_1.TokenType.RPAREN, this.c);
                break;
            case ',':
                token = new token_1.Token(token_1.TokenType.COMMA, this.c);
                break;
            case '+':
                token = new token_1.Token(token_1.TokenType.PLUS, this.c);
                break;
            case '-':
                token = new token_1.Token(token_1.TokenType.MINUS, this.c);
                break;
            case '!':
                if (this.peekChar() === '=') {
                    let c = this.c;
                    this.consume();
                    token = new token_1.Token(token_1.TokenType.NOT_EQ, c + this.c);
                }
                else {
                    token = new token_1.Token(token_1.TokenType.BANG, this.c);
                }
                break;
            case '*':
                token = new token_1.Token(token_1.TokenType.ASTERISK, this.c);
                break;
            case '/':
                token = new token_1.Token(token_1.TokenType.SLASH, this.c);
                break;
            case '<':
                token = new token_1.Token(token_1.TokenType.LT, this.c);
                break;
            case '>':
                token = new token_1.Token(token_1.TokenType.GT, this.c);
                break;
            case '{':
                token = new token_1.Token(token_1.TokenType.LBRACE, this.c);
                break;
            case '}':
                token = new token_1.Token(token_1.TokenType.RBRACE, this.c);
                break;
            default:
                if (this.c === token_1.TokenType.EOF) {
                    return new token_1.Token(token_1.TokenType.EOF, 'EOF');
                }
                else if (this.isLetter())
                    return this.letter();
                else if (this.isDigit()) {
                    return this.digit();
                }
                else {
                    token = new token_1.Token(token_1.TokenType.ILLEGAL, this.c);
                }
                break;
        }
        this.consume();
        return token;
    }
    letter() {
        let s = '';
        do {
            s += this.c;
            this.consume();
        } while (this.isLetter());
        const keywords = {
            "fn": token_1.TokenType.FUNCTION,
            "let": token_1.TokenType.LET,
            "true": token_1.TokenType.TRUE,
            "false": token_1.TokenType.FALSE,
            "if": token_1.TokenType.IF,
            "else": token_1.TokenType.ELSE,
            "return": token_1.TokenType.RETURN,
        };
        return new token_1.Token(keywords[s] || token_1.TokenType.IDENT, s);
    }
    digit() {
        let s = '';
        do {
            s += this.c;
            this.consume();
        } while (this.isDigit());
        return new token_1.Token(token_1.TokenType.INT, s);
    }
    peekChar() {
        if (this.p + 1 >= this.input.length) {
            return '';
        }
        else {
            return this.input[this.p + 1];
        }
    }
    isLetter() { return code(this.c) >= code('a') && code(this.c) <= code('z') || code(this.c) >= code('A') && code(this.c) <= code('Z'); }
    isDigit() {
        return code(this.c) >= code('0') && code(this.c) <= code('9');
    }
}
exports.ListLexer = ListLexer;
