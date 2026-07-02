export type Token = {
    type: string
    value: string
}

export function lex(code: string) {
    const tokens: Token[] = []
    let current = 0
    let nextPrt = () => current + 1
    let nextNextPrt = () => current + 2
    while (current < code.length) {
        const char = code[current]
        if (char === ' ' || char === '\n') {
            current++
            continue
        }
        if (char === ';') {
            tokens.push({ type: 'operator', value: char })
            current++
            continue
        }
        if (char === '(') {
            tokens.push({ type: 'operator', value: char })
            current++
            continue
        }
        if (char === ')') {
            tokens.push({ type: 'operator', value: char })
            current++
            continue
        }
        if (char === '{') {
            tokens.push({ type: 'operator', value: char })
            current++
            continue
        }
        if (char === '}') {
            tokens.push({ type: 'operator', value: char })
            current++
            continue
        }
        if (char === '[') {
            tokens.push({ type: 'operator', value: char })
            current++
            continue
        }
        if (char === ']') {
            tokens.push({ type: 'operator', value: char })
            current++
            continue
        }
        if (char === ',') {
            tokens.push({ type: 'operator', value: char })
            current++
            continue
        }
        if (char === '.') {
            tokens.push({ type: 'operator', value: char })
            current++
            continue
        }
        if (char === ':') {
            tokens.push({ type: 'operator', value: char })
            current++
            continue
        }
        if (char === '=') {
            if (code[nextPrt()] === '=' && code[nextNextPrt()] === '=') {
                tokens.push({ type: 'operator', value: '===' })
                current += 3
                continue
            }
            if (code[nextPrt()] === '=' && code[nextNextPrt()] !== '=') {
                tokens.push({ type: 'operator', value: '==' })
                current += 2
                continue
            }

            tokens.push({ type: 'operator', value: char })
            current++
            continue
        }
        if (char === '!') {
            if (code[nextPrt()] === '=' && code[nextNextPrt()] === '=') {
                tokens.push({ type: 'operator', value: '!==' })
                current += 3
                continue
            }
            if (code[nextPrt()] === '=' && code[nextNextPrt()] !== '=') {
                tokens.push({ type: 'operator', value: '!=' })
                current += 2
                continue
            }
            tokens.push({ type: 'operator', value: char })
            current++
            continue
        }
        if (char === '+') {
            if (code[nextPrt()] === '=') {
                tokens.push({ type: 'operator', value: '+=' })
                current += 2
                continue
            }
            tokens.push({ type: 'operator', value: char })
            current++
            continue
        }
        if (char === '-') {
            if (code[nextPrt()] === '=') {
                tokens.push({ type: 'operator', value: '-=' })
                current += 2
                continue
            }
            tokens.push({ type: 'operator', value: char })
            current++
            continue
        }
        if (char === '*') {
            if (code[nextPrt()] === '=') {
                tokens.push({ type: 'operator', value: '*=' })
                current += 2
                continue
            }
            if (code[nextPrt()] === '*') {
                tokens.push({ type: 'operator', value: '**' })
                current += 2
                continue
            }
            tokens.push({ type: 'operator', value: char })
            current++
            continue
        }
        if (char === '/') {
            if (code[nextPrt()] === '=') {
                tokens.push({ type: 'operator', value: '/=' })
                current += 2
                continue
            }
            tokens.push({ type: 'operator', value: char })
            current++
            continue
        }
        if (char === '%') {
            if (code[nextPrt()] === '=') {
                tokens.push({ type: 'operator', value: '%=' })
                current += 2
                continue
            }
            tokens.push({ type: 'operator', value: char })
            current++
            continue
        }
        if (char === '<') {
            if (code[nextPrt()] === '=') {
                tokens.push({ type: 'operator', value: '<=' })
                current += 2
                continue
            }
            tokens.push({ type: 'operator', value: char })
            current++
            continue
        }
        if (char === '>') {
            if (code[nextPrt()] === '=') {
                tokens.push({ type: 'operator', value: '>=' })
                current += 2
                continue
            }
            tokens.push({ type: 'operator', value: char })
            current++
            continue
        }
        if (char === '&') {
            if (code[nextPrt()] === '&') {
                tokens.push({ type: 'operator', value: '&&' })
                current += 2
                continue
            }
            tokens.push({ type: 'operator', value: char })
            current++
            continue
        }
        if (char === '|') {
            if (code[nextPrt()] === '|') {
                tokens.push({ type: 'operator', value: '||' })
                current += 2
                continue
            }
            tokens.push({ type: 'operator', value: char })
            current++
            continue
        }
        if (('a' <= char && char <= 'z') || ('A' <= char && char <= 'Z')) {
            var temp = []
            while (
                current < code.length &&
                (('a' <= code[current] && code[current] <= 'z') ||
                    ('A' <= code[current] && code[current] <= 'Z') ||
                    ('0' <= code[current] && code[current] <= '9') ||
                    code[current] === '_')
            ) {
                temp.push(code[current])
                current++
            }
            const identifier = temp.join('')
            if (
                /^(let|var|const|class|static|pub|fun|return|break|continue|default|else|for|if|in|of|switch|while|struct)$/.test(
                    identifier,
                )
            ) {
                tokens.push({ type: 'keyword', value: identifier })
                continue
            }
            tokens.push({ type: 'identifier', value: identifier })
            continue
        }
        if (('0' <= char && char <= '9') || char === '.') {
            var temp = []
            temp.push(code[current])
            current++
            if (
                code[current] === 'b' ||
                code[current] === 'o' ||
                code[current] === 'x'
            ) {
                temp.push(code[current])
                current++
                while (
                    (current < code.length &&
                        '0' <= code[current] &&
                        code[current] <= '9') ||
                    code[current] === '_' ||
                    code[current] === '.'
                ) {
                    if (code[current] === '.' && temp.join('').includes('.')) {
                        throw new Error(`Invalid number: ${temp.join('')}`)
                    }
                    if (code[current] === '_' && code[nextPrt()] === '_') {
                        throw new Error(`Invalid lex: ${temp.join('')}`)
                    }
                    temp.push(code[current])
                    current++
                }
                tokens.push({ type: 'number', value: temp.join('') })
                continue
            }
            while (
                (current < code.length &&
                    '0' <= code[current] &&
                    code[current] <= '9') ||
                code[current] === '_' ||
                code[current] === '.'
            ) {
                if (code[current] === '.' && temp.join('').includes('.')) {
                    throw new Error(`Invalid number: ${temp.join('')}`)
                }
                if (code[current] === '_' && code[nextPrt()] === '_') {
                    throw new Error(`Invalid lex: ${temp.join('')}`)
                }
                temp.push(code[current])
                current++
            }
            tokens.push({ type: 'number', value: temp.join('') })
            continue
        }
        throw new Error(`Unknown character: ${char}`)
    }
    return tokens
}
