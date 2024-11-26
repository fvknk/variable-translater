import * as assert from 'assert'

import { describe, it, before, after } from 'mocha'
import sinon from 'sinon'

import { GasTranslator } from '../../translators/gas_translator'

import { EmptyVariableError } from '../../errors/empty_variable_error'
import { ValidationError } from '../../errors/validation_error'

describe('GasTranslator', () => {
  describe('#constructor', () => {
    describe('空文字列でない場合', () => {
      it('値が正しく代入されていること', () => {
        const inputText = 'abcXYZ!?'
        const translator = new GasTranslator(inputText)

        assert.strictEqual(translator.inputText, inputText)
        assert.strictEqual(translator.response, null)
        assert.strictEqual(translator.outputText, null)
      })
    })

    describe('空文字列の場合', () => {
      it('エラーを返却すること', () => {
        const inputText = ''

        assert.throws(() => new GasTranslator(inputText), ValidationError)
      })
    })
  })

  describe('#exec', () => {
    let requestStub: sinon.SinonStub
    before(() => {
      requestStub = sinon.stub(GasTranslator.prototype, 'request')
    })

    after(() => {
      requestStub.restore()
    })

    describe('リクエストが成功した場合', () => {
      const res = { text: 'テスト' }
      before(() => {
        requestStub.resolves(res)
      })

      it('結果用文字列を返却すること', async () => {
        const actual = await new GasTranslator('test').exec()
        assert.strictEqual(actual, res.text)
      })

      it('getter で返却値を取得できること', async () => {
        const translator = new GasTranslator('test')
        await translator.exec()

        assert.deepStrictEqual(translator.response, res)
        assert.strictEqual(translator.outputText, res.text)
      })
    })

    describe('リクエストが失敗した場合', () => {
      describe('外部 API へのリクエストが失敗した場合', () => {
        it('エラーを返却すること', () => {
          requestStub.rejects()

          assert.rejects(async () => await new GasTranslator('test').exec(), EmptyVariableError)
        })
      })

      describe('レスポンスが不正な場合', () => {
        describe('レスポンスが null の場合', () => {
          it('エラーを返却すること', () => {
            const res = null
            requestStub.resolves(res)

            assert.rejects(async () => await new GasTranslator('test').exec(), EmptyVariableError)
          })
        })

        describe('レスポンス内にキーがない場合', () => {
          it('エラーを返却すること', () => {
            const res = {}
            requestStub.resolves(res)

            assert.rejects(async () => await new GasTranslator('test').exec(), EmptyVariableError)
          })
        })

        describe('レスポンス内の結果が空文字列の場合', () => {
          it('エラーを返却すること', () => {
            const res = { text: '' }
            requestStub.resolves(res)

            assert.rejects(async () => await new GasTranslator('test').exec(), EmptyVariableError)
          })
        })
      })
    })
  })

  describe('#request', () => {
    let requestStub: sinon.SinonStub
    before(() => {
      requestStub = sinon.stub(GasTranslator.prototype, <any>'fetch')
    })

    after(() => {
      requestStub.restore()
    })

    describe('リクエストが成功した場合', () => {
      const res = { text: 'テスト' }
      before(() => {
        requestStub.resolves(res)
      })

      it('結果用文字列を返却すること', async () => {
        const actual = await new GasTranslator('test').request()
        assert.deepStrictEqual(actual, res)
      })
    })

    describe('リクエストが失敗した場合', () => {
      describe('外部 API へのリクエストが失敗した場合', () => {
        it('エラーを返却すること', () => {
          requestStub.rejects()

          assert.rejects(async () => await new GasTranslator('test').request(), EmptyVariableError)
        })
      })

      describe('レスポンスが不正な場合', () => {
        describe('レスポンスが null の場合', () => {
          it('エラーを返却すること', () => {
            const res = null
            requestStub.resolves(res)

            assert.rejects(async () => await new GasTranslator('test').request(), EmptyVariableError)
          })
        })

        describe('レスポンス内にキーがない場合', () => {
          it('エラーを返却すること', () => {
            const res = {}
            requestStub.resolves(res)

            assert.rejects(async () => await new GasTranslator('test').request(), EmptyVariableError)
          })
        })

        describe('レスポンス内の結果が空文字列の場合', () => {
          it('エラーを返却すること', () => {
            const res = { text: '' }
            requestStub.resolves(res)

            assert.rejects(async () => await new GasTranslator('test').request(), EmptyVariableError)
          })
        })
      })
    })
  })
})
