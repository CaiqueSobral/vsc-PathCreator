import vscode from 'vscode';
import { disposableCallback } from './functions/DisposableCallback';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'Pathier: Create Path',
    disposableCallback,
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
