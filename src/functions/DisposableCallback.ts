import { window, workspace } from 'vscode';
import { createPath } from './CreatePath';

export async function disposableCallback() {
  // STEP 1 -> Check if a workspace is open
  const workspaceFolders = workspace.workspaceFolders;
  if (!workspaceFolders) {
    window.showErrorMessage(
      'No workspace folder open. Please open a folder first.',
    );
    return;
  }

  const rootPath = workspaceFolders[0].uri.fsPath;

  // STEP 2 -> Ask for a path
  const pathString = await window.showInputBox({
    placeHolder: 'Enter path (e.g., folder/subfolder/file.txt)',
    prompt:
      'Enter path to create. Folders will be separated by "/" and the last item will be the file.',
  });

  if (!pathString) return;

  // Step 3 -> Create the path and open the file
  try {
    const [dirPath, fileName] = await createPath(rootPath, pathString);

    if (fileName) {
      const document = await workspace.openTextDocument(dirPath);
      await window.showTextDocument(document);
    }

    window.showInformationMessage(`Created: ${pathString}`);
  } catch (error) {
    window.showErrorMessage(
      `Failed to create path: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}
