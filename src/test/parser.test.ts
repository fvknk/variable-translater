import * as assert from 'assert'

import { describe, it } from 'mocha'

import { Parser } from '../parser'
import { ValidationError } from '../error'

describe('Parse', () => {
  describe('#constructor', () => {
    describe('引数が空文字列でない場合', () => {
      it('値が正しく代入されていること', () => {
        const inputText = 'test'
        const runner = new Parser(inputText)

        assert.strictEqual(runner.inputText, inputText)
        assert.strictEqual(runner.outputText, '')
      })
    })

    describe('引数が空文字列の場合', () => {
      it('エラーを返却すること', () => {
        const inputText = ''

        assert.throws(() => new Parser(inputText), ValidationError)
      })
    })
  })

  describe('#exec', () => {
    describe('正常に処理できる場合', () => {
      describe('1ワードのみの場合', () => {
        const inputText = 'test'
        it('そのまま返却されること', () => {
          const actual = new Parser(inputText).exec()

          assert.strictEqual(actual, inputText)
        })
      })

      describe('スネークケースの場合', () => {
        const inputText = 'foo_bar_baz'
        it('空白に変換して返却すること', () => {
          const expect = 'foo bar baz'
          const actual = new Parser(inputText).exec()

          assert.strictEqual(actual, expect)
        })
      })

      describe('ケバブケースの場合', () => {
        const inputText = 'foo-bar-baz'
        it('空白に変換して返却すること', () => {
          const expect = 'foo bar baz'
          const actual = new Parser(inputText).exec()

          assert.strictEqual(actual, expect)
        })
      })

      describe('キャメルケースの場合', () => {
        const inputText = 'fooBarBaz'
        it('空白を入れ、かつ小文字で返却すること', () => {
          const expect = 'foo bar baz'
          const actual = new Parser(inputText).exec()

          assert.strictEqual(actual, expect)
        })
      })

      describe('パスカルケースの場合', () => {
        const inputText = 'FooBarBaz'
        it('空白を入れ、かつ小文字で返却すること', () => {
          const expect = 'foo bar baz'
          const actual = new Parser(inputText).exec()

          assert.strictEqual(actual, expect)
        })
      })
    })
  })
})
