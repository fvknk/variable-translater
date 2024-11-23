import * as assert from 'assert'

import { describe, it } from 'mocha'

import { SnakeCase } from '../../cases/snake_case'

import { ValidationError } from '../../errors/validation_error'

describe('SnakeCase', () => {
  describe('#constructor', () => {
    describe('引数が空文字列でない場合', () => {
      it('値が正しく代入されていること', () => {
        const inputText = 'foo_bar_baz'
        const expect = 'foo bar baz'
        const runner = new SnakeCase(inputText)

        assert.strictEqual(runner.inputText, inputText)
        assert.strictEqual(runner.naturalText, expect)
      })
    })

    describe('引数が空文字列の場合', () => {
      it('エラーを返却すること', () => {
        const inputText = ''

        assert.throws(() => new SnakeCase(inputText), ValidationError)
      })
    })
  })

  describe('#applyTo', () => {
    describe('間に _ を含む場合', () => {
      it('true を返却すること', () => {
        const inputText = 'foo_bar_baz'
        assert.strictEqual(SnakeCase.applyTo(inputText), true)
      })
    })

    describe('先頭のみ _ を含む場合', () => {
      it('false を返却すること', () => {
        const inputText = '__foo'
        assert.strictEqual(SnakeCase.applyTo(inputText), false)
      })
    })

    describe('末尾のみ _ を含む場合', () => {
      it('false を返却すること', () => {
        const inputText = 'foo__'
        assert.strictEqual(SnakeCase.applyTo(inputText), false)
      })
    })

    describe('両端のみ _ を含む場合', () => {
      it('false を返却すること', () => {
        const inputText = '__foo__'
        assert.strictEqual(SnakeCase.applyTo(inputText), false)
      })
    })

    describe('_ を含まない場合', () => {
      it('false を返却すること', () => {
        const inputText = 'fooBarBaz'
        assert.strictEqual(SnakeCase.applyTo(inputText), false)
      })
    })
  })

  describe('#naturalText', () => {
    describe('スネークケースの場合', () => {
      it('空白で分書して返却すること', () => {
        const inputText = 'foo_bar_baz'
        const expect = 'foo bar baz'

        assert.strictEqual(new SnakeCase(inputText).naturalText, expect)
      })
    })

    describe('先頭に _ がつくスネークケースの場合', () => {
      it('先頭の _ を削除、かつ空白で分書して返却すること', () => {
        const inputText = '__foo_bar_baz'
        const expect = 'foo bar baz'

        assert.strictEqual(new SnakeCase(inputText).naturalText, expect)
      })
    })

    describe('末尾に _ がつくスネークケースの場合', () => {
      it('末尾の _ を削除、かつ空白で分書して返却すること', () => {
        const inputText = 'foo_bar_baz__'
        const expect = 'foo bar baz'

        assert.strictEqual(new SnakeCase(inputText).naturalText, expect)
      })
    })

    describe('コンスタントケースの場合', () => {
      it('小文字、かつ空白で分書して返却すること', () => {
        const inputText = 'FOO_BAR_BAZ'
        const expect = 'foo bar baz'

        assert.strictEqual(new SnakeCase(inputText).naturalText, expect)
      })
    })

    describe('先頭に _ がつくコンスタントケースの場合', () => {
      it('小文字、かつ先頭の _ を削除、かつ空白で分書して返却すること', () => {
        const inputText = '__FOO_BAR_BAZ'
        const expect = 'foo bar baz'

        assert.strictEqual(new SnakeCase(inputText).naturalText, expect)
      })
    })

    describe('末尾に _ がつくコンスタントケースの場合', () => {
      it('小文字、かつ末尾の _ を削除、かつ空白で分書して返却すること', () => {
        const inputText = 'FOO_BAR_BAZ__'
        const expect = 'foo bar baz'

        assert.strictEqual(new SnakeCase(inputText).naturalText, expect)
      })
    })
  })
})
