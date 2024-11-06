import * as assert from 'assert'

import { describe, it } from 'mocha'
import { Case } from '../../cases/case'
import { ValidationError } from '../../error'

describe('#constructor', () => {
  describe('引数が空文字列でない場合', () => {
    it('値が正しく代入されていること', () => {
      const inputText = 'test'
      const runner = new Case(inputText)

      assert.strictEqual(runner.inputText, inputText)
      assert.strictEqual(runner.naturalText, inputText)
    })
  })

  describe('引数が空文字列の場合', () => {
    it('エラーを返却すること', () => {
      const inputText = ''

      assert.throws(() => new Case(inputText), ValidationError)
    })
  })
})

describe('#applyTo', () => {
  it('エラーを返却すること', () => {
    assert.throws(() => Case.applyTo('test'), Error)
  })
})

describe('#naturalText', () => {
  describe('1ワードの場合', () => {
    describe('先頭に _ がつかない場合', () => {
      it('そのまま返却すること', () => {
        const inputText = 'test'

        assert.strictEqual(new Case(inputText).naturalText, inputText)
      })
    })

    describe('先頭に _ がつく場合', () => {
      it('先頭の _ を削除して返却すること', () => {
        const inputText = '_test'
        const expect = 'test'

        assert.strictEqual(new Case(inputText).naturalText, expect)
      })
    })

    describe('先頭に _ が複数回つく場合', () => {
      it('先頭のすべての _ を削除して返却すること', () => {
        const inputText = '__test'
        const expect = 'test'

        assert.strictEqual(new Case(inputText).naturalText, expect)
      })
    })
  })

  describe('キャメルケースの場合', () => {
    describe('先頭に _ がつかない場合', () => {
      it('そのまま返却すること', () => {
        const inputText = 'fooBarBaz'

        assert.strictEqual(new Case(inputText).naturalText, inputText)
      })
    })

    describe('先頭に _ がつく場合', () => {
      it('先頭の _ を削除して返却すること', () => {
        const inputText = '_fooBarBaz'
        const expect = 'fooBarBaz'

        assert.strictEqual(new Case(inputText).naturalText, expect)
      })
    })

    describe('先頭に _ が複数回つく場合', () => {
      it('先頭のすべての _ を削除して返却すること', () => {
        const inputText = '__fooBarBaz'
        const expect = 'fooBarBaz'

        assert.strictEqual(new Case(inputText).naturalText, expect)
      })
    })
  })

  describe('スネークケースの場合', () => {
    describe('先頭に _ がつかない場合', () => {
      it('そのまま返却すること', () => {
        const inputText = 'foo_bar_baz'

        assert.strictEqual(new Case(inputText).naturalText, inputText)
      })
    })

    describe('先頭に _ がつく場合', () => {
      it('先頭の _ を削除して返却すること', () => {
        const inputText = '_foo_bar_baz'
        const expect = 'foo_bar_baz'

        assert.strictEqual(new Case(inputText).naturalText, expect)
      })
    })

    describe('先頭に _ が複数回つく場合', () => {
      it('先頭のすべての _ を削除して返却すること', () => {
        const inputText = '__foo_bar_baz'
        const expect = 'foo_bar_baz'

        assert.strictEqual(new Case(inputText).naturalText, expect)
      })
    })
  })

  describe('ケバブケースの場合', () => {
    describe('先頭に _ がつかない場合', () => {
      it('そのまま返却すること', () => {
        const inputText = 'foo-bar-baz'

        assert.strictEqual(new Case(inputText).naturalText, inputText)
      })
    })

    describe('先頭に _ がつく場合', () => {
      it('先頭の _ を削除して返却すること', () => {
        const inputText = '_foo-bar-baz'
        const expect = 'foo-bar-baz'

        assert.strictEqual(new Case(inputText).naturalText, expect)
      })
    })

    describe('先頭に _ が複数回つく場合', () => {
      it('先頭のすべての _ を削除して返却すること', () => {
        const inputText = '__foo-bar-baz'
        const expect = 'foo-bar-baz'

        assert.strictEqual(new Case(inputText).naturalText, expect)
      })
    })
  })
})

describe('#trimUnderScore', () => {
  describe('先頭に _ を含む場合', () => {
    it('先頭の _ のみ削除されて返却されること', () => {
      const inputText = '__foo_bar_baz'
      const expect = 'foo_bar_baz'

      assert.strictEqual(Case.trimUnderscore(inputText), expect)
    })
  })

  describe('末尾に _ を含む場合', () => {
    it('末尾の _ のみ削除されて返却されること', () => {
      const inputText = 'foo_bar_baz__'
      const expect = 'foo_bar_baz'

      assert.strictEqual(Case.trimUnderscore(inputText), expect)
    })
  })

  describe('両端に _ を含む場合', () => {
    it('両端の _ のみ削除されて返却されること', () => {
      const inputText = '__foo_bar_baz__'
      const expect = 'foo_bar_baz'

      assert.strictEqual(Case.trimUnderscore(inputText), expect)
    })
  })
})
