import * as vscode from 'vscode'

import * as assert from 'assert'
import { describe, it, before, after } from 'mocha'
import sinon from 'sinon'

import { Runner } from '../runner'

import { GasTranslator } from '../translators/gas_translator'

import { ValidationError } from '../errors/validation_error'
import { EmptyVariableError } from '../errors/empty_variable_error'

describe('Runner', () => {
  describe('#constructor', () => {
    describe('引数が空文字列でない場合', () => {
      it('値が正しく代入されていること', () => {
        const inputText = 'test'
        const runner = new Runner(inputText)

        assert.strictEqual(runner.inputText, inputText)
        assert.strictEqual(runner.translatedText, '')
      })

      it('outputMessage を呼び出すとエラーを返却すること', () => {
        const inputText = 'test'
        const runner = new Runner(inputText)

        assert.throws(() => runner.outputMessage, EmptyVariableError)
      })
    })

    describe('引数が空文字列の場合', () => {
      it('エラーを返却すること', () => {
        const inputText = ''

        assert.throws(() => new Runner(inputText), ValidationError)
      })
    })

    describe('引数が undefined の場合', () => {
      it('エラーを返却すること', () => {
        const inputText = undefined

        assert.throws(() => new Runner(inputText), ValidationError)
      })
    })
  })

  describe('#exec', () => {
    let translatorConfigStub: sinon.SinonStub
    let gasTranslatorRequestStub: sinon.SinonStub

    before(() => {
      translatorConfigStub = sinon.stub(vscode.workspace, 'getConfiguration')
      const mockConfig = {
        get: sinon.stub().withArgs('selectedTranslator').returns('GasTranslator')
      }
      translatorConfigStub.returns(mockConfig)

      gasTranslatorRequestStub = sinon.stub(GasTranslator.prototype, 'exec')
    })

    after(() => {
      translatorConfigStub.restore()
      gasTranslatorRequestStub.restore()
    })

    describe('正常な文字列を渡した場合', () => {
      const inputText = 'test'

      describe('正常なレスポンスを得た場合', () => {
        const outputText = 'テスト'
        const expect = `from: ${inputText} -> to: ${outputText}`

        it('メッセージを返却すること', async () => {
          gasTranslatorRequestStub.resolves(outputText)

          const actual = await new Runner(inputText).exec()

          assert.strictEqual(actual, expect)
        })

        it('outputMessage を呼び出した際にメッセージを返却すること', async () => {
          gasTranslatorRequestStub.resolves(outputText)

          const runner = new Runner(inputText)
          await runner.exec()

          assert.strictEqual(runner.outputMessage, expect)
        })
      })

      describe('異常なレスポンスを得た場合', () => {
        describe('空文字列を返却された場合', () => {
          it('エラーを返却すること', async () => {
            gasTranslatorRequestStub.resolves('')

            assert.rejects(async () => await new Runner(inputText).exec(), EmptyVariableError)
          })
        })

        describe('null を返却された場合', () => {
          it('エラーを返却すること', async () => {
            gasTranslatorRequestStub.resolves(null)

            assert.rejects(async () => await new Runner(inputText).exec(), EmptyVariableError)
          })
        })
      })
    })

    describe('異常な文字列を渡した場合', () => {
      const inputText = '1'

      it('エラーを返却すること', async () => {
        assert.rejects(async () => await new Runner(inputText).exec(), ValidationError)
      })
    })
  })
})
