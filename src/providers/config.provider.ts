import { ConfigProvider, Platform } from 'tabby-core'
import { ClipboardSyncConfig, DEFAULT_CONFIG } from '../models'

export class ClipboardSyncConfigProvider extends ConfigProvider {
    defaults = {
        clipboardSync: DEFAULT_CONFIG,
        hotkeys: {
            'clipboard-sync.paste-image': ['Ctrl-Shift-V'],
        },
    }

    platformDefaults = {
        [Platform.macOS]: {
            hotkeys: {
                'clipboard-sync.paste-image': ['Cmd-Shift-V'],
            },
        },
    }
}

declare module 'tabby-core' {
    interface AppConfig {
        clipboardSync: ClipboardSyncConfig
    }
}
