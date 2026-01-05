export enum SyncErrorType {
    SSH_DISCONNECTED = 'ssh_disconnected',
    CHANNEL_FAILED = 'channel_failed',
    COMMAND_FAILED = 'command_failed',
    CLIPBOARD_ACCESS_DENIED = 'clipboard_denied',
    DATA_TOO_LARGE = 'data_too_large',
    CLIPBOARD_TOOL_NOT_FOUND = 'clipboard_tool_not_found',
    ENCODING_FAILED = 'encoding_failed',
    TIMEOUT = 'timeout',
    REMOTE_OS_DETECTION_FAILED = 'remote_os_detection_failed',
    UNKNOWN = 'unknown',
}

export class SyncError extends Error {
    constructor(
        public readonly type: SyncErrorType,
        message: string,
        public readonly recoverable: boolean = false,
    ) {
        super(message)
        this.name = 'SyncError'
    }

    static sshDisconnected(): SyncError {
        return new SyncError(
            SyncErrorType.SSH_DISCONNECTED,
            'SSH connection lost',
            false,
        )
    }

    static channelFailed(reason: string): SyncError {
        return new SyncError(
            SyncErrorType.CHANNEL_FAILED,
            `Failed to open SSH channel: ${reason}`,
            true,
        )
    }

    static commandFailed(stderr: string): SyncError {
        return new SyncError(
            SyncErrorType.COMMAND_FAILED,
            `Remote command failed: ${stderr}`,
            false,
        )
    }

    static clipboardToolNotFound(os: string): SyncError {
        return new SyncError(
            SyncErrorType.CLIPBOARD_TOOL_NOT_FOUND,
            `No clipboard tool found on ${os}. Please install xclip or xsel.`,
            false,
        )
    }

    static dataTooLarge(size: number, maxSize: number): SyncError {
        return new SyncError(
            SyncErrorType.DATA_TOO_LARGE,
            `Data size ${size} exceeds maximum ${maxSize}`,
            false,
        )
    }

    static timeout(): SyncError {
        return new SyncError(
            SyncErrorType.TIMEOUT,
            'Operation timed out',
            true,
        )
    }
}
