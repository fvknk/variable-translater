import * as assert from 'assert'

import { describe, it, before, after } from 'mocha'
import sinon from 'sinon'

import { Runner } from '../runner'
import { Translator } from '../translator'

describe('#constructor', () => {
  describe('引数が空文字列でない場合', () => {
    it('値が正しく代入されていること', () => {
      const inputText = 'test'
      const runner = new Runner(inputText)

      assert.strictEqual(runner.inputText, inputText)
      assert.strictEqual(runner.responseText, '')
    })

    it('outputMessage を呼び出すとエラーを返却すること', () => {
      const inputText = 'test'
      const runner = new Runner(inputText)

      assert.throws(() => runner.outputMessage, Error)
    })
  })

  describe('引数が空文字列の場合', () => {
    it('エラーを返却すること', () => {
      const inputText = ''

      assert.throws(() => new Runner(inputText), Error)
    })
  })
})

describe('#exec', () => {
  const inputText = 'test'

  let requestStub: sinon.SinonStub
  before(() => {
    requestStub = sinon.stub(Translator.prototype, 'exec')
  })

  after(() => {
    requestStub.restore()
  })

  describe('正常なレスポンスを得られた場合', () => {
    const outputText = 'テスト'
    const expect = `from: ${inputText} -> to: ${outputText}`

    it('メッセージを返却すること', async () => {
      requestStub.resolves(outputText)

      const actual = await new Runner(inputText).exec()

      assert.strictEqual(actual, expect)
    })

    it('outputMessage を呼び出した際にメッセージを返却すること', async () => {
      requestStub.resolves(outputText)

      const runner = new Runner(inputText)
      await runner.exec()

      assert.strictEqual(runner.outputMessage, expect)
    })
  })

  describe('空文字列を返却された場合', () => {
    it('エラーを返却すること', async () => {
      requestStub.resolves('')

      assert.rejects(async () => await new Runner(inputText).exec(), Error)
    })
  })

  describe('null を返却された場合', () => {
    it('エラーを返却すること', async () => {
      requestStub.resolves(null)

      assert.rejects(async () => await new Runner(inputText).exec(), Error)
    })
  })
})
