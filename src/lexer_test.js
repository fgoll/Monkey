import { ListLexer } from "./lexer"
import { TokenType } from "./token"

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
    `

    let lexer = new ListLexer(input)
    let token
    while (token?.type !== TokenType.EOF) {
        token = lexer.nextToken()

        console.log('next', token);
    }
}

Test()