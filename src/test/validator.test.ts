import * as assert from 'assert'

import { describe, it } from 'mocha'

import { Validator } from '../validator'

import { ValidationError } from '../errors/validation_error'

describe('Validator', () => {
  describe('#constructor', () => {
    describe('引数が空文字列でない場合', () => {
      it('値が正しく代入されていること', () => {
        const inputText = 'test'
        const runner = new Validator(inputText)

        assert.strictEqual(runner.inputText, inputText)
      })
    })

    describe('引数が空文字列の場合', () => {
      it('エラーを返却すること', () => {
        const inputText = ''

        assert.throws(() => new Validator(inputText), ValidationError)
      })
    })
  })

  describe('#exec', () => {
    describe('1文字以上のアルファベットを含む文字列の場合', () => {
      it('true を返却すること', () => {
        const inputText = 'abcXYZ!?-_'
        const actual = new Validator(inputText).exec()

        assert.strictEqual(actual, true)
      })
    })

    describe('数字のみの文字列の場合', () => {
      it('エラーを返却すること', () => {
        const inputText = '1'

        assert.throws(() => new Validator(inputText).exec(), ValidationError)
      })
    })

    describe('記号のみの文字列の場合', () => {
      it('エラーを返却すること', () => {
        const inputText = '-'

        assert.throws(() => new Validator(inputText).exec(), ValidationError)
      })
    })

    describe('アルファベットと一部記号以外を含む文字列の場合', () => {
      it('エラーを返却すること', () => {
        const inputText = 'testテスト'

        assert.throws(() => new Validator(inputText).exec(), ValidationError)
      })
    })
  })
})
