import * as assert from 'assert'

import { describe, it } from 'mocha'
import { CamelCase } from '../../cases/camel_case'
import { ValidationError } from '../../error'

describe('CamelCase', () => {
  describe('#constructor', () => {
    describe('引数が空文字列でない場合', () => {
      it('値が正しく代入されていること', () => {
        const inputText = 'fooBarBaz'
        const expect = 'foo bar baz'
        const runner = new CamelCase(inputText)

        assert.strictEqual(runner.inputText, inputText)
        assert.strictEqual(runner.naturalText, expect)
      })
    })

    describe('引数が空文字列の場合', () => {
      it('エラーを返却すること', () => {
        const inputText = ''

        assert.throws(() => new CamelCase(inputText), ValidationError)
      })
    })
  })

  describe('#applyTo', () => {
    describe('キャメルケース場合', () => {
      it('true を返却すること', () => {
        const inputText = 'fooBarBaz'
        assert.strictEqual(CamelCase.applyTo(inputText), true)
      })
    })

    describe('先頭にのみ _ を含むキャメルケース場合', () => {
      it('true を返却すること', () => {
        const inputText = '__fooBarBaz'
        assert.strictEqual(CamelCase.applyTo(inputText), true)
      })
    })

    describe('末尾にのみ _ を含むキャメルケース場合', () => {
      it('true を返却すること', () => {
        const inputText = 'fooBarBaz__'
        assert.strictEqual(CamelCase.applyTo(inputText), true)
      })
    })

    describe('両端にのみ _ を含むキャメルケース場合', () => {
      it('true を返却すること', () => {
        const inputText = '__fooBarBaz__'
        assert.strictEqual(CamelCase.applyTo(inputText), true)
      })
    })

    describe('_、- を含まない場合', () => {
      it('false を返却すること', () => {
        const inputText = 'fooBarBaz'
        assert.strictEqual(CamelCase.applyTo(inputText), true)
      })
    })

    describe('スネークケース場合', () => {
      it('false を返却すること', () => {
        const inputText = '_foo_bar_baz'
        assert.strictEqual(CamelCase.applyTo(inputText), false)
      })
    })

    describe('ケバブケース場合', () => {
      it('false を返却すること', () => {
        const inputText = '_foo-bar-baz'
        assert.strictEqual(CamelCase.applyTo(inputText), false)
      })
    })
  })

  describe('#naturalText', () => {
    describe('通常のキャメルケースの場合', () => {
      it('小文字、かつ空白で分書して返却すること', () => {
        const inputText = 'fooBarBaz'
        const expect = 'foo bar baz'

        assert.strictEqual(new CamelCase(inputText).naturalText, expect)
      })
    })

    describe('パスカルケースの場合', () => {
      it('小文字、かつ空白で分書して返却すること', () => {
        const inputText = 'FooBarBaz'
        const expect = 'foo bar baz'

        assert.strictEqual(new CamelCase(inputText).naturalText, expect)
      })
    })

    describe('先頭に _ がついたキャメルケースの場合', () => {
      it('小文字、かつ _ を削除して、空白で分書して返却すること', () => {
        const inputText = '__fooBarBaz'
        const expect = 'foo bar baz'

        assert.strictEqual(new CamelCase(inputText).naturalText, expect)
      })
    })

    describe('末尾に _ がついたキャメルケースの場合', () => {
      it('小文字、かつ _ を削除して、空白で分書して返却すること', () => {
        const inputText = 'fooBarBaz__'
        const expect = 'foo bar baz'

        assert.strictEqual(new CamelCase(inputText).naturalText, expect)
      })
    })

    describe('両端に _ がついたキャメルケースの場合', () => {
      it('小文字、かつ _ を削除して、空白で分書して返却すること', () => {
        const inputText = '__fooBarBaz__'
        const expect = 'foo bar baz'

        assert.strictEqual(new CamelCase(inputText).naturalText, expect)
      })
    })
  })
})
