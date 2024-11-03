import * as vscode from 'vscode'

import { Runner } from './runner'

export async function activate(context: vscode.ExtensionContext) {
	const text: string = 'test'
	const message = await new Runner(text).exec()

	const disposable = vscode.commands.registerCommand('variable-translator.translateVariable', () => {
		vscode.window.showInformationMessage(message)
	})

	context.subscriptions.push(disposable)
}

export function deactivate() { }
