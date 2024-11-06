import * as assert from 'assert'

import { describe, it } from 'mocha'
import { KebabCase } from '../../cases/kebab_case'
import { ValidationError } from '../../error'

describe('KebabCase', () => {
  describe('#constructor', () => {
    describe('引数が空文字列でない場合', () => {
      it('値が正しく代入されていること', () => {
        const inputText = 'foo-bar-baz'
        const expect = 'foo bar baz'
        const runner = new KebabCase(inputText)

        assert.strictEqual(runner.inputText, inputText)
        assert.strictEqual(runner.naturalText, expect)
      })
    })

    describe('引数が空文字列の場合', () => {
      it('エラーを返却すること', () => {
        const inputText = ''

        assert.throws(() => new KebabCase(inputText), ValidationError)
      })
    })
  })

  describe('#applyTo', () => {
    describe('ケバブケースの場合', () => {
      it('false を返却すること', () => {
        const inputText = 'foo-bar-baz'
        assert.strictEqual(KebabCase.applyTo(inputText), true)
      })
    })

    describe('先頭にのみ _ を含むケバブケース場合', () => {
      it('true を返却すること', () => {
        const inputText = '__foo-bar-baz'
        assert.strictEqual(KebabCase.applyTo(inputText), true)
      })
    })

    describe('末尾にのみ _ を含むケバブケース場合', () => {
      it('true を返却すること', () => {
        const inputText = 'foo-bar-baz__'
        assert.strictEqual(KebabCase.applyTo(inputText), true)
      })
    })

    describe('両端にのみ _ を含むケバブケース場合', () => {
      it('true を返却すること', () => {
        const inputText = '__foo-bar-baz__'
        assert.strictEqual(KebabCase.applyTo(inputText), true)
      })
    })

    describe('スネークケース場合', () => {
      it('false を返却すること', () => {
        const inputText = '_foo_bar_baz'
        assert.strictEqual(KebabCase.applyTo(inputText), false)
      })
    })

    describe('キャメルケース場合', () => {
      it('false を返却すること', () => {
        const inputText = '_fooBarBaz'
        assert.strictEqual(KebabCase.applyTo(inputText), false)
      })
    })
  })

  describe('#naturalText', () => {
    describe('通常のケバブケースの場合', () => {
      it('空白で分書して返却すること', () => {
        const inputText = 'foo-bar-baz'
        const expect = 'foo bar baz'

        assert.strictEqual(new KebabCase(inputText).naturalText, expect)
      })
    })

    describe('先頭に _ がついたケバブケースの場合', () => {
      it('_ を削除して、空白で分書して返却すること', () => {
        const inputText = '__foo-bar-baz'
        const expect = 'foo bar baz'

        assert.strictEqual(new KebabCase(inputText).naturalText, expect)
      })
    })

    describe('末尾に _ がついたケバブケースの場合', () => {
      it('_ を削除して、空白で分書して返却すること', () => {
        const inputText = 'foo-bar-baz__'
        const expect = 'foo bar baz'

        assert.strictEqual(new KebabCase(inputText).naturalText, expect)
      })
    })

    describe('両端に _ がついたケバブケースの場合', () => {
      it('_ を削除して、空白で分書して返却すること', () => {
        const inputText = '__foo-bar-baz__'
        const expect = 'foo bar baz'

        assert.strictEqual(new KebabCase(inputText).naturalText, expect)
      })
    })
  })
})
