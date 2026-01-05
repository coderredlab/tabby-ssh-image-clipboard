import { CommonModule } from '@angular/common'
import { NgModule, OnDestroy } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ConfigProvider, AppService, BaseTabComponent, HotkeysService, HotkeyProvider } from 'tabby-core'
import { SettingsTabProvider } from 'tabby-settings'
import { Subscription } from 'rxjs'
import { ClipboardSyncConfigProvider } from './providers/config.provider'
import { ClipboardSyncHotkeyProvider } from './providers/hotkey.provider'
import { ClipboardSyncSettingsTabComponent, ClipboardSyncSettingsTabProvider } from './settings'
import { ClipboardSyncService } from './clipboard-sync.service'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        ClipboardSyncSettingsTabComponent,
    ],
    providers: [
        { provide: ConfigProvider, useClass: ClipboardSyncConfigProvider, multi: true },
        { provide: SettingsTabProvider, useClass: ClipboardSyncSettingsTabProvider, multi: true },
        { provide: HotkeyProvider, useClass: ClipboardSyncHotkeyProvider, multi: true },
        ClipboardSyncService,
    ],
})
export default class ClipboardSyncModule implements OnDestroy {
    private subscriptions: Subscription[] = []

    constructor(
        private clipboardSync: ClipboardSyncService,
        private app: AppService,
        private hotkeys: HotkeysService,
    ) {
        this.initializeTabWatcher()
        this.initializeHotkey()
    }

    private initializeHotkey(): void {
        const sub = this.hotkeys.hotkey$.subscribe(hotkey => {
            if (hotkey === 'paste') {
                this.clipboardSync.pasteImage()
            }
        })
        this.subscriptions.push(sub)
    }

    private initializeTabWatcher(): void {

        const appService = this.app as any

        // Watch for active tab changes
        if (appService.activeTabChange$) {
            const sub = appService.activeTabChange$.subscribe(() => {
                if (appService.activeTab) {
                    this.checkAndSetActiveSession(appService.activeTab)
                }
            })
            this.subscriptions.push(sub)
        }

        // Check existing active tab
        if (appService.activeTab) {
            this.checkAndSetActiveSession(appService.activeTab)
        }
    }

    private checkAndSetActiveSession(tab: BaseTabComponent): void {
        if (!tab) {
            this.clipboardSync.clearActiveSession()
            return
        }

        const tabAny = tab as any
        const tabType = tab.constructor.name

        // If it's a SplitTabComponent, check its focused child
        if (tabType === 'SplitTabComponent') {
            const focusedTab = tabAny.getFocusedTab?.() || tabAny.getAllTabs?.()[0]
            if (focusedTab) {
                this.checkAndSetActiveSession(focusedTab)
            }
            return
        }

        // Check if this is an SSH tab
        const isSSHTab = tabType.includes('SSH') ||
                         tabType.includes('Ssh') ||
                         tabAny.profile?.type === 'ssh'

        if (isSSHTab && tabAny.session) {
            this.clipboardSync.setActiveSession(tabAny.session, tabAny)
        } else {
            this.clipboardSync.clearActiveSession()
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe())
    }
}
