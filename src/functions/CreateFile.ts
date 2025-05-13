import fs from 'node:fs';
import path from 'node:path';
import vscode from 'vscode';

export async function createPath(
  rootPath: string,
  pathString: string,
): Promise<string> {
  // STEP 1 -> Split the path by "/" and throw if no path provided
  const parts = pathString.split('/');

  if (parts.length === 0 || (parts.length === 1 && parts[0] === '')) {
    throw new Error('Invalid path: empty path provided');
  }

  // STEP 2 -> Take the filename from the path
  const fileName = parts.pop() || '';
  if (!fileName) throw new Error('Invalid path: no file name provided');

  // STEP 3 -> Create the folders
  let currentPath = rootPath;

  for (const folder of parts) {
    if (folder === '') continue;

    currentPath = path.join(currentPath, folder);

    // STEP 4 -> Create the directory if there is no file with the same name in the same level
    if (!fs.existsSync(currentPath)) {
      fs.mkdirSync(currentPath);
    } else if (!fs.statSync(currentPath).isDirectory()) {
      throw new Error(
        `Cannot create directory '${folder}': A file already exists at this location`,
      );
    }
  }

  // STEP 5 -> Create the file path
  const filePath = path.join(currentPath, fileName);

  // STEP 6 -> Check if the file already exists
  if (fs.existsSync(filePath)) {
    const overwrite = await vscode.window.showInformationMessage(
      `File '${fileName}' already exists. Do you want to overwrite it?`,
      'Yes',
      'No',
    );

    if (overwrite !== 'Yes') {
      throw new Error('Operation cancelled: file already exists');
    }
  }

  // STEP 7 -> Create the file
  fs.writeFileSync(filePath, '');

  return filePath;
}
