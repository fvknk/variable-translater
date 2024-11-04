import * as vscode from 'vscode'

import { Runner } from './runner'

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('variable-translator.translateVariable', async () => {
		try {
			const activeEditor = vscode.window.activeTextEditor
			const doc = activeEditor && activeEditor.document
			const ref = activeEditor?.selection

			const text: string | undefined = doc?.getText(ref)
			const message = await new Runner(text).exec()

			vscode.window.showInformationMessage(message)
		} catch (err: any) {
			vscode.window.showErrorMessage(err.message)
		}
	})

	context.subscriptions.push(disposable)
}

export function deactivate() { }
