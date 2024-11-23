import * as assert from 'assert'

import { describe, it, before, after } from 'mocha'
import sinon from 'sinon'

import { TextraTranslator } from '../../translators/textra_translator'

import { EmptyVariableError } from '../../errors/empty_variable_error'
import { NotImplementedError } from '../../errors/not_implemented_error'

describe('TextraTranslator', () => {
  describe('#set', () => {
    describe('URL に代入しようとした場合', () => {
      it('エラーを返却すること', () => {
        const translator = new TextraTranslator('test')
        assert.throws(() => translator.URL = 'invalidOperation', NotImplementedError)
      })
    })

    describe('API_NAME に代入しようとした場合', () => {
      it('エラーを返却すること', () => {
        const translator = new TextraTranslator('test')
        assert.throws(() => translator.API_NAME = 'invalidOperation', NotImplementedError)
      })
    })

    describe('API_PARAM に代入しようとした場合', () => {
      it('エラーを返却すること', () => {
        const translator = new TextraTranslator('test')
        assert.throws(() => translator.API_PARAM = 'invalidOperation', NotImplementedError)
      })
    })
  })

  describe('#request', () => {
    let apiKeyStub: sinon.SinonStub
    let apiSecretStub: sinon.SinonStub
    let fetchTokenStub: sinon.SinonStub
    let fetchStub: sinon.SinonStub
    before(() => {
      apiKeyStub = sinon.stub(TextraTranslator.prototype, <any>'apiKey')
      apiSecretStub = sinon.stub(TextraTranslator.prototype, <any>'apiSecret')
      fetchTokenStub = sinon.stub(TextraTranslator.prototype, <any>'fetchToken')
      fetchStub = sinon.stub(TextraTranslator.prototype, <any>'fetch')
    })

    after(() => {
      apiKeyStub.restore()
      apiSecretStub.restore()
      fetchTokenStub.restore()
      fetchStub.restore()
    })

    describe('リクエストが成功した場合', () => {
      it('結果用文字列を返却すること', async () => {
        const res = { text: 'テスト' }

        apiKeyStub.returns('api_key')
        apiSecretStub.returns('api_secret')
        fetchTokenStub.resolves('token')
        fetchStub.resolves(res.text)

        const actual = await new TextraTranslator('test').request()
        assert.deepStrictEqual(actual, res)
      })
    })

    describe('リクエストが失敗した場合', () => {
      describe('正常な API キーが取得できない場合', () => {
        it('エラーを返却すること', () => {
          apiKeyStub.returns('')

          assert.rejects(async () => await new TextraTranslator('test').request(), EmptyVariableError)
        })
      })

      describe('正常な API シークレットが取得できない場合', () => {
        it('エラーを返却すること', () => {
          apiSecretStub.returns('')

          assert.rejects(async () => await new TextraTranslator('test').request(), EmptyVariableError)
        })
      })

      describe('トークンが空の場合', () => {
        it('エラーを返却すること', () => {
          fetchTokenStub.rejects()

          assert.rejects(async () => await new TextraTranslator('test').request(), EmptyVariableError)
        })
      })

      describe('翻訳結果が空の場合', () => {
        it('エラーを返却すること', () => {
          fetchStub.rejects()

          assert.rejects(async () => await new TextraTranslator('test').request(), EmptyVariableError)
        })
      })

      describe('レスポンスが不正な場合', () => {
        describe('レスポンスが null の場合', () => {
          it('エラーを返却すること', () => {
            const res = null
            fetchStub.resolves(res)

            assert.rejects(async () => await new TextraTranslator('test').request(), EmptyVariableError)
          })
        })

        describe('レスポンス内にキーがない場合', () => {
          it('エラーを返却すること', () => {
            const res = {}
            fetchStub.resolves(res)

            assert.rejects(async () => await new TextraTranslator('test').request(), EmptyVariableError)
          })
        })

        describe('レスポンス内の結果が空文字列の場合', () => {
          it('エラーを返却すること', () => {
            const res = { text: '' }
            fetchStub.resolves(res)

            assert.rejects(async () => await new TextraTranslator('test').request(), EmptyVariableError)
          })
        })
      })
    })
  })
})
