import fs from 'node:fs';
import path from 'node:path';
import { window } from 'vscode';

export async function createPath(
  rootPath: string,
  pathString: string,
): Promise<[string, string]> {
  // STEP 1 -> Split the path by "/" and throw if no path provided
  const dirs = pathString.split('/');

  if (dirs.length === 0 || (dirs.length === 1 && dirs[0] === '')) {
    throw new Error('Invalid path: empty path provided');
  }

  // STEP 3 -> Create the folders
  let dirPath = rootPath;
  let lastFile = '';

  for (const dir of dirs) {
    if (dir === '') continue;

    dirPath = path.join(dirPath, dir);

    if (dir.includes('.')) {
      await CreateFile(dirPath, dir);
      lastFile = dir;
      continue;
    }

    CreateFolder(dirPath, dir);
  }

  return [dirPath, lastFile];
}

async function CreateFolder(dirPath: string, dirName: string) {
  // STEP 1 -> Create the directory if there is no file with the same name in the same level
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  } else if (!fs.statSync(dirPath).isDirectory()) {
    throw new Error(
      `Cannot create directory '${dirName}': A file already exists at this location`,
    );
  }
}

async function CreateFile(dirPath: string, dirName: string) {
  // STEP 1 -> Check if the file already exists
  if (dirName && fs.existsSync(dirPath)) {
    const overwrite = await window.showInformationMessage(
      `File '${dirName}' already exists. Do you want to overwrite it?`,
      'Yes',
      'No',
    );

    if (overwrite !== 'Yes') {
      throw new Error('Operation cancelled: file already exists');
    }
  }

  // STEP 2 -> Create the file
  fs.writeFileSync(dirPath, '');
}
