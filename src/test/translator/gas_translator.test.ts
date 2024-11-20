import * as assert from 'assert'

import { describe, it, before, after } from 'mocha'
import sinon from 'sinon'

import { GasTranslator } from '../../translators/gas_translator'
import { EmptyVariableError } from '../../error'

describe('GasTranslator', () => {
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
