import { Token, TokenType } from "./token"

const code = (c) => c.charCodeAt(0)

export class Lexer {
    constructor(input) {

        this.input = input
        this.p = 0

        this.c = input.charAt(this.p)
    }

    // 向前移动一个字符, 检测输入是否结束
    consume() {
        this.p++
        if (this.p >= this.input.length) this.c = TokenType.EOF
        else this.c = this.input.charAt(this.p)
    }

    match(x) {
        if (this.c === x) this.consume()
        else throw new Error("expecting " + x + "; found " + this.c)
    }
}

export class ListLexer extends Lexer {
    constructor(input) {
        super(input)
    }

    nextToken() {
        let token

        const skip = () => {
            while (this.c === ' ' || this.c === '\t' || this.c === '\n' || this.c === '\r') {
                this.consume()
            }
        }

        skip()

        switch (this.c) {

            case '=':
                if (this.peekChar() === '=') {
                    let c = this.c
                    this.consume()
                    token = new Token(TokenType.EQ, c + this.c)
                } else {
                    token = new Token(TokenType.ASSIGN, this.c)
                }
                break;
            case ';':
                token = new Token(TokenType.SEMICOLON, this.c)
                break;
            case '(':
                token = new Token(TokenType.LPAREN, this.c)
                break;
            case ')':
                token = new Token(TokenType.RPAREN, this.c)
                break;
            case ',':
                token = new Token(TokenType.COMMA, this.c)
                break;
            case '+':
                token = new Token(TokenType.PLUS, this.c)
                break;
            case '-':
                token = new Token(TokenType.MINUS, this.c)
                break;
            case '!':
                if (this.peekChar() === '=') {
                    let c = this.c
                    this.consume()
                    token = new Token(TokenType.NOT_EQ, c + this.c)
                } else {
                    token = new Token(TokenType.BANG, this.c);
                }
                break;
            case '*':
                token = new Token(TokenType.ASTERISK, this.c);
                break;
            case '/':
                token = new Token(TokenType.SLASH, this.c)
                break;
            case '<':
                token = new Token(TokenType.LT, this.c);
                break;
            case '>':
                token = new Token(TokenType.GT, this.c)
                break;

            case '{':
                token = new Token(TokenType.LBRACE, this.c)
                break;
            case '}':
                token = new Token(TokenType.RBRACE, this.c)
                break;
            default:

                if (this.c === TokenType.EOF) {
                    return new Token(TokenType.EOF, 'EOF')
                }
                else if (this.isLetter()) return this.letter()
                else if (this.isDigit()) {
                    return this.digit()
                }
                else {
                    token = new Token(TokenType.ILLEGAL, this.c)
                }
                break;
        }

        this.consume()

        return token
    }

    letter() {
        let s = ''

        do {
            s += this.c
            this.consume()
        } while (this.isLetter())

        const keywords = {
            "fn": TokenType.FUNCTION,
            "let": TokenType.LET,
            "true": TokenType.TRUE,
            "false": TokenType.FALSE,
            "if": TokenType.IF,
            "else": TokenType.ELSE,
            "return": TokenType.RETURN,
        }

        return new Token(keywords[s] || TokenType.IDENT, s)
    }

    digit() {
        let s = ''

        do {
            s += this.c
            this.consume()
        } while (this.isDigit())

        return new Token(TokenType.INT, s)
    }

    peekChar() {
        if (this.p + 1 >= this.input.length) {
            return ''
        }
        else {
            return this.input[this.p + 1]
        }
    }

    isLetter() { return code(this.c) >= code('a') && code(this.c) <= code('z') || code(this.c) >= code('A') && code(this.c) <= code('Z') }

    isDigit() {
        return code(this.c) >= code('0') && code(this.c) <= code('9')
    }
}