import { test, expect, describe, assert } from 'vitest'
import { lex } from './index.ts'

describe('lex test', () => {
    test('var test', () => {
        expect(lex('var a = 1')).toEqual([
            { type: 'keyword', value: 'var' },
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: '=' },
            { type: 'number', value: '1' },
        ])
        expect(lex('var abcdefghijklmnopqrstuvwxyz = 1')).toEqual([
            { type: 'keyword', value: 'var' },
            { type: 'identifier', value: 'abcdefghijklmnopqrstuvwxyz' },
            { type: 'operator', value: '=' },
            { type: 'number', value: '1' },
        ])
    })

    test('operator test', () => {
        expect(lex('a = b')).toEqual([
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: '=' },
            { type: 'identifier', value: 'b' },
        ])
        expect(lex('a + b')).toEqual([
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: '+' },
            { type: 'identifier', value: 'b' },
        ])
        expect(lex('a - b')).toEqual([
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: '-' },
            { type: 'identifier', value: 'b' },
        ])
        expect(lex('a * b')).toEqual([
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: '*' },
            { type: 'identifier', value: 'b' },
        ])
        expect(lex('a / b')).toEqual([
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: '/' },
            { type: 'identifier', value: 'b' },
        ])
        expect(lex('a % b')).toEqual([
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: '%' },
            { type: 'identifier', value: 'b' },
        ])
        expect(lex('a ** b')).toEqual([
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: '**' },
            { type: 'identifier', value: 'b' },
        ])
        expect(lex('a = b + c')).toEqual([
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: '=' },
            { type: 'identifier', value: 'b' },
            { type: 'operator', value: '+' },
            { type: 'identifier', value: 'c' },
        ])
        expect(lex('a = b + c - d * e / f % g ** h')).toEqual([
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: '=' },
            { type: 'identifier', value: 'b' },
            { type: 'operator', value: '+' },
            { type: 'identifier', value: 'c' },
            { type: 'operator', value: '-' },
            { type: 'identifier', value: 'd' },
            { type: 'operator', value: '*' },
            { type: 'identifier', value: 'e' },
            { type: 'operator', value: '/' },
            { type: 'identifier', value: 'f' },
            { type: 'operator', value: '%' },
            { type: 'identifier', value: 'g' },
            { type: 'operator', value: '**' },
            { type: 'identifier', value: 'h' },
        ])
        expect(lex('a += b')).toEqual([
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: '+=' },
            { type: 'identifier', value: 'b' },
        ])
        expect(lex('a-=b')).toEqual([
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: '-=' },
            { type: 'identifier', value: 'b' },
        ])
        expect(lex('a===b')).toEqual([
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: '===' },
            { type: 'identifier', value: 'b' },
        ])
        expect(lex('a==b')).toEqual([
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: '==' },
            { type: 'identifier', value: 'b' },
        ])
    })

    test('number test', () => {
        expect(lex('1234567890')).toEqual([
            { type: 'number', value: '1234567890' },
        ])
        expect(lex('123.456')).toEqual([{ type: 'number', value: '123.456' }])
        expect(lex('0b101010')).toEqual([{ type: 'number', value: '0b101010' }])
        expect(lex('0o123456')).toEqual([{ type: 'number', value: '0o123456' }])
        expect(lex('0x123456')).toEqual([{ type: 'number', value: '0x123456' }])
        expect(lex('1234_1234')).toEqual([
            { type: 'number', value: '1234_1234' },
        ])
        expect(lex('1234_1234.567')).toEqual([
            { type: 'number', value: '1234_1234.567' },
        ])
        expect(lex('1234_1234.567_890')).toEqual([
            { type: 'number', value: '1234_1234.567_890' },
        ])
    })
    test('invalid number test', () => {
        assert.throws(() => lex('1234_1234.567_890.1234'))
        assert.throws(() => lex('1234_1234.567_890__1234_567'))
    })

    test('fun definition test', () => {
        expect(lex('fun a() { return 1; }')).toEqual([
            { type: 'keyword', value: 'fun' },
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: '(' },
            { type: 'operator', value: ')' },
            { type: 'operator', value: '{' },
            { type: 'keyword', value: 'return' },
            { type: 'number', value: '1' },
            { type: 'operator', value: ';' },
            { type: 'operator', value: '}' },
        ])

        expect(lex('fun a(b) { return b; }')).toEqual([
            { type: 'keyword', value: 'fun' },
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: '(' },
            { type: 'identifier', value: 'b' },
            { type: 'operator', value: ')' },
            { type: 'operator', value: '{' },
            { type: 'keyword', value: 'return' },
            { type: 'identifier', value: 'b' },
            { type: 'operator', value: ';' },
            { type: 'operator', value: '}' },
        ])

        expect(lex('fun a(b, c) { return b + c; }')).toEqual([
            { type: 'keyword', value: 'fun' },
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: '(' },
            { type: 'identifier', value: 'b' },
            { type: 'operator', value: ',' },
            { type: 'identifier', value: 'c' },
            { type: 'operator', value: ')' },
            { type: 'operator', value: '{' },
            { type: 'keyword', value: 'return' },
            { type: 'identifier', value: 'b' },
            { type: 'operator', value: '+' },
            { type: 'identifier', value: 'c' },
            { type: 'operator', value: ';' },
            { type: 'operator', value: '}' },
        ])
    })

    test('function call test', () => {
        expect(lex('a()')).toEqual([
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: '(' },
            { type: 'operator', value: ')' },
        ])

        expect(lex('a(b, c)')).toEqual([
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: '(' },
            { type: 'identifier', value: 'b' },
            { type: 'operator', value: ',' },
            { type: 'identifier', value: 'c' },
            { type: 'operator', value: ')' },
        ])
    })

    test('function call test with multiple arguments', () => {
        expect(lex('let v = a(b, c, d)')).toEqual([
            { type: 'keyword', value: 'let' },
            { type: 'identifier', value: 'v' },
            { type: 'operator', value: '=' },
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: '(' },
            { type: 'identifier', value: 'b' },
            { type: 'operator', value: ',' },
            { type: 'identifier', value: 'c' },
            { type: 'operator', value: ',' },
            { type: 'identifier', value: 'd' },
            { type: 'operator', value: ')' },
        ])
    })

    test('array test', () => {
        expect(lex('let a = [1, 2, 3]')).toEqual([
            { type: 'keyword', value: 'let' },
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: '=' },
            { type: 'operator', value: '[' },
            { type: 'number', value: '1' },
            { type: 'operator', value: ',' },
            { type: 'number', value: '2' },
            { type: 'operator', value: ',' },
            { type: 'number', value: '3' },
            { type: 'operator', value: ']' },
        ])
    })

    test('object test', () => {
        expect(lex('let a = { a: 1, b: 2 }')).toEqual([
            { type: 'keyword', value: 'let' },
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: '=' },
            { type: 'operator', value: '{' },
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: ':' },
            { type: 'number', value: '1' },
            { type: 'operator', value: ',' },
            { type: 'identifier', value: 'b' },
            { type: 'operator', value: ':' },
            { type: 'number', value: '2' },
            { type: 'operator', value: '}' },
        ])

        expect(lex('a[0]')).toEqual([
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: '[' },
            { type: 'number', value: '0' },
            { type: 'operator', value: ']' },
        ])
        expect(lex('a.b')).toEqual([
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: '.' },
            { type: 'identifier', value: 'b' },
        ])
        expect(lex('a[0].b')).toEqual([
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: '[' },
            { type: 'number', value: '0' },
            { type: 'operator', value: ']' },
            { type: 'operator', value: '.' },
            { type: 'identifier', value: 'b' },
        ])
    })

    test('equality test', () => {
        expect(lex('a === b')).toEqual([
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: '===' },
            { type: 'identifier', value: 'b' },
        ])
    })

    test('inequality test', () => {
        expect(lex('a !== b')).toEqual([
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: '!==' },
            { type: 'identifier', value: 'b' },
        ])
    })

    test('less than test', () => {
        expect(lex('a < b')).toEqual([
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: '<' },
            { type: 'identifier', value: 'b' },
        ])
    })

    test('less than or equal test', () => {
        expect(lex('a <= b')).toEqual([
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: '<=' },
            { type: 'identifier', value: 'b' },
        ])
    })

    test('greater than test', () => {
        expect(lex('a > b')).toEqual([
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: '>' },
            { type: 'identifier', value: 'b' },
        ])
    })

    test('greater than or equal test', () => {
        expect(lex('a >= b')).toEqual([
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: '>=' },
            { type: 'identifier', value: 'b' },
        ])
    })

    test('struct test', () => {
        expect(lex('struct A {}')).toEqual([
            { type: 'keyword', value: 'struct' },
            { type: 'identifier', value: 'A' },
            { type: 'operator', value: '{' },
            { type: 'operator', value: '}' },
        ])

        expect(
            lex(`
            struct A {
                pub a: number
                pub b: string
                c: bool
            }
            `),
        ).toEqual([
            { type: 'keyword', value: 'struct' },
            { type: 'identifier', value: 'A' },
            { type: 'operator', value: '{' },
            { type: 'keyword', value: 'pub' },
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: ':' },
            { type: 'identifier', value: 'number' },
            { type: 'keyword', value: 'pub' },
            { type: 'identifier', value: 'b' },
            { type: 'operator', value: ':' },
            { type: 'identifier', value: 'string' },
            { type: 'identifier', value: 'c' },
            { type: 'operator', value: ':' },
            { type: 'identifier', value: 'bool' },
            { type: 'operator', value: '}' },
        ])
    })

    test('tuple test', () => {
        expect(lex('let a = (1, 2, 3)')).toEqual([
            { type: 'keyword', value: 'let' },
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: '=' },
            { type: 'operator', value: '(' },
            { type: 'number', value: '1' },
            { type: 'operator', value: ',' },
            { type: 'number', value: '2' },
            { type: 'operator', value: ',' },
            { type: 'number', value: '3' },
            { type: 'operator', value: ')' },
        ])

        expect(lex('let a = ()')).toEqual([
            { type: 'keyword', value: 'let' },
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: '=' },
            { type: 'operator', value: '(' },
            { type: 'operator', value: ')' },
        ])
    })

    test('keyword test', () => {
        expect(lex('let a = 1')).toEqual([
            { type: 'keyword', value: 'let' },
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: '=' },
            { type: 'number', value: '1' },
        ])
        expect(lex('for(let i = 0; i < 10; i+=1)')).toEqual([
            { type: 'keyword', value: 'for' },
            { type: 'operator', value: '(' },
            { type: 'keyword', value: 'let' },
            { type: 'identifier', value: 'i' },
            { type: 'operator', value: '=' },
            { type: 'number', value: '0' },
            { type: 'operator', value: ';' },
            { type: 'identifier', value: 'i' },
            { type: 'operator', value: '<' },
            { type: 'number', value: '10' },
            { type: 'operator', value: ';' },
            { type: 'identifier', value: 'i' },
            { type: 'operator', value: '+=' },
            { type: 'number', value: '1' },
            { type: 'operator', value: ')' },
        ])
        expect(lex('while(i < 10){}')).toEqual([
            { type: 'keyword', value: 'while' },
            { type: 'operator', value: '(' },
            { type: 'identifier', value: 'i' },
            { type: 'operator', value: '<' },
            { type: 'number', value: '10' },
            { type: 'operator', value: ')' },
            { type: 'operator', value: '{' },
            { type: 'operator', value: '}' },
        ])
    })

    test('if test', () => {
        expect(lex('if(a) { b }')).toEqual([
            { type: 'keyword', value: 'if' },
            { type: 'operator', value: '(' },
            { type: 'identifier', value: 'a' },
            { type: 'operator', value: ')' },
            { type: 'operator', value: '{' },
            { type: 'identifier', value: 'b' },
            { type: 'operator', value: '}' },
        ])
    })
})
