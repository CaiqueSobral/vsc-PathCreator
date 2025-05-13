import vscode from 'vscode';
import { createPath } from './CreateFile';

export async function disposableCallback() {
  // STEP 1 -> Check if a workspace is open
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders) {
    vscode.window.showErrorMessage(
      'No workspace folder open. Please open a folder first.',
    );
    return;
  }

  const rootPath = workspaceFolders[0].uri.fsPath;

  // STEP 2 -> Ask for a path
  const pathString = await vscode.window.showInputBox({
    placeHolder: 'Enter path (e.g., folder/subfolder/file.txt)',
    prompt:
      'Enter path to create. Folders will be separated by "/" and the last item will be the file.',
  });

  if (!pathString) return;

  // Step 3 -> Create the path and open the file
  try {
    const createdFilePath = await createPath(rootPath, pathString);

    const document = await vscode.workspace.openTextDocument(createdFilePath);
    await vscode.window.showTextDocument(document);

    vscode.window.showInformationMessage(`Created: ${pathString}`);
  } catch (error) {
    vscode.window.showErrorMessage(
      `Failed to create path: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}
