import { TokenType } from '../token';

const readline = require('readline');
const { ListLexer } = require('../lexer');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export const start = () => {
    // while (true) {

    const circulate = () => {

        rl.question(`>> `, (line) => {
            let lexer = new ListLexer(line)
    
            let token
            while (token?.type !== TokenType.EOF) {
                token = lexer.nextToken()

                console.log(token);                
            }

            circulate()
        })
    }

    circulate()

    // }
}