/**
 * Type declarations for tabby-ssh
 * These types are based on Tabby's internal API
 */

declare module 'tabby-ssh' {
    import { Observable } from 'rxjs'

    export interface SSHProfile {
        options: {
            host: string
            port: number
            user: string
        }
    }

    export interface SSHChannel {
        data$: Observable<Buffer>
        extendedData$?: Observable<Buffer>
        close$: Observable<void>
        exitCode?: number
        exec(command: string): void
        close(): void
    }

    export interface SSHClient {
        openSessionChannel(): Promise<SSHChannel>
        activateChannel(channel: SSHChannel): Promise<void>
    }

    export class SSHSession {
        profile: SSHProfile
        ssh: SSHClient | null
        willDestroy$: Observable<void>
    }

    export class SSHMultiplexerService {
        getSession(profile: SSHProfile): SSHSession | null
    }
}
