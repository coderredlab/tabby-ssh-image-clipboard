import { CommonModule } from '@angular/common'
import { NgModule, OnDestroy } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ConfigProvider, AppService, BaseTabComponent, HotkeysService } from 'tabby-core'
import { SettingsTabProvider } from 'tabby-settings'
import { Subscription } from 'rxjs'
import { ClipboardSyncConfigProvider } from './providers/config.provider'
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
        this.initializePasteHook()
    }

    private initializePasteHook(): void {
        // Intercept Ctrl+Shift+V (paste) - if clipboard has image, handle it; otherwise let Tabby do normal paste
        const sub = this.hotkeys.hotkey$.subscribe(async hotkey => {
            if (hotkey === 'paste') {
                const handled = await this.clipboardSync.pasteImage()
                // If not handled (no image), Tabby's default paste will proceed
                if (handled) {
                    // Prevent default paste by not propagating
                }
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
