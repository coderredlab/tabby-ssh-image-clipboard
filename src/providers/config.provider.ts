import { ConfigProvider } from 'tabby-core'
import { ClipboardSyncConfig, DEFAULT_CONFIG } from '../models'

export class ClipboardSyncConfigProvider extends ConfigProvider {
    defaults = {
        clipboardSync: DEFAULT_CONFIG,
    }
}

declare module 'tabby-core' {
    interface AppConfig {
        clipboardSync: ClipboardSyncConfig
    }
}
