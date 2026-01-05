# Tabby SSH Image Clipboard

[![npm version](https://badge.fury.io/js/tabby-ssh-image-clipboard.svg)](https://www.npmjs.com/package/tabby-ssh-image-clipboard)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Paste clipboard images directly to remote SSH servers via SFTP.

![Demo](https://raw.githubusercontent.com/coderredlab/tabby-ssh-image-clipboard/main/demo.gif)

## Why?

When using AI coding assistants like **Claude Code** or **OpenCode** on remote servers, sharing screenshots is painful. This plugin solves that - just copy an image and paste it.

## Features

- **One-key paste**: `Ctrl+Shift+V` uploads image via SFTP and outputs the path
- **Smart detection**: Only triggers when clipboard contains an image
- **Zero config**: Works out of the box with any SSH connection that supports SFTP

## Installation

### From Tabby Plugin Manager (Recommended)

1. Open Tabby Settings
2. Go to **Plugins**
3. Search for `tabby-ssh-image-clipboard`
4. Click **Install**

### From npm

```bash
npm install -g tabby-ssh-image-clipboard
```

### From Source

```bash
git clone https://github.com/coderredlab/tabby-ssh-image-clipboard.git
cd tabby-ssh-image-clipboard
npm install
npm run build
npm link
cd %APPDATA%\tabby\plugins  # Windows
npm link tabby-ssh-image-clipboard
```

## Usage

1. Connect to SSH server in Tabby
2. Copy an image (screenshot, etc.)
3. Press `Ctrl+Shift+V`
4. Image uploads to `/tmp/clipboard_<timestamp>.png`
5. Path appears in terminal

## Requirements

- Tabby 1.0.x+
- SSH server with SFTP support
- Linux/macOS server (uses `/tmp/`)

## License

MIT
