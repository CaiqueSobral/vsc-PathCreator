# Pathier: Path Creator Extension for VS Code

A simple VS Code extension that creates files and folders from a path string.

## Features

- Create a complete file path with a single command
- Keyboard shortcut: `Cmd+Opt+N` (or `Ctrl+Alt+N` on Windows)
- Automatically creates all necessary folders in the path
- Uses "/" as the path separator

## Usage

1. Press `Cmd+Opt+N` (or `Ctrl+Alt+N` on Windows) to directly activate the command
   - Alternatively, open the command palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and type "Pathier"
2. Enter a path like `folder/subfolder/file.txt`
3. The extension will create all required folders and the file, then open it

## Examples

- `file.txt` - Creates a file at the workspace root
- `folder/file.txt` - Creates a folder and a file inside it
- `folder1/folder2/folder3/file.js` - Creates a nested folder structure with a file
- `./file.ts` - Creates a file in the same folder as the active editor

## Requirements

VS Code 1.60.0 or newer

## Extension Settings

Currently, this extension doesn't provide any additional settings.

## Known Issues

None at this time.

## Release Notes

### 1.6.3

You can now use ./ in the starting prompt to create folder/files relative to the folder of the active editor

### 1.5.0

Add suport for multiple files being created in a nested folder

### 0.1.0

Initial release of Path Creator
