import { Injectable } from '@angular/core'
import { HotkeyProvider, HotkeyDescription } from 'tabby-core'

@Injectable()
export class ClipboardSyncHotkeyProvider extends HotkeyProvider {
    async provide(): Promise<HotkeyDescription[]> {
        return [
            {
                id: 'clipboard-sync.paste-image',
                name: 'Paste clipboard image as file path',
            },
        ]
    }
}
