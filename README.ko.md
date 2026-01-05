# Tabby SSH Image Clipboard

[![npm version](https://badge.fury.io/js/tabby-ssh-image-clipboard.svg)](https://www.npmjs.com/package/tabby-ssh-image-clipboard)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

클립보드 이미지를 원격 SSH 서버로 SFTP를 통해 바로 붙여넣기.

![Demo](https://raw.githubusercontent.com/coderredlab/tabby-ssh-image-clipboard/main/demo.gif)

## 왜 필요한가?

원격 서버에서 **Claude Code**나 **OpenCode** 같은 AI 코딩 어시스턴트를 사용할 때, 스크린샷 공유가 불편합니다. 이 플러그인으로 이미지를 복사하고 붙여넣기만 하면 됩니다.

## 기능

- **원클릭 붙여넣기**: `Ctrl+Shift+V`로 이미지를 SFTP로 업로드하고 경로 출력
- **스마트 감지**: 클립보드에 이미지가 있을 때만 동작
- **설정 불필요**: SFTP 지원하는 SSH 연결이면 바로 사용 가능

## 설치

### Tabby 플러그인 매니저에서 (권장)

1. Tabby 설정 열기
2. **Plugins** 이동
3. `tabby-ssh-image-clipboard` 검색
4. **Install** 클릭

### npm에서

```bash
npm install -g tabby-ssh-image-clipboard
```

### 소스에서

```bash
git clone https://github.com/coderredlab/tabby-ssh-image-clipboard.git
cd tabby-ssh-image-clipboard
npm install
npm run build
npm link
cd %APPDATA%\tabby\plugins  # Windows
npm link tabby-ssh-image-clipboard
```

## 사용법

1. Tabby에서 SSH 서버 연결
2. 이미지 복사 (스크린샷 등)
3. `Ctrl+Shift+V` 누르기
4. 이미지가 `/tmp/clipboard_<timestamp>.png`에 업로드됨
5. 터미널에 경로 출력

## 요구사항

- Tabby 1.0.x+
- SFTP 지원하는 SSH 서버
- Linux/macOS 서버 (`/tmp/` 사용)

## 라이선스

MIT
