export type UseWhisperConfig = {
  apiKey?: string
  autoStart?: boolean
  autoTranscribe?: boolean
  mode?: 'transcriptions' | 'translations'
  nonStop?: boolean
  removeSilence?: boolean
  stopTimeout?: number
  streaming?: boolean
  concatChunk?: boolean
  timeSlice?: number
  whisperConfig?: WhisperApiConfig
  onDataAvailable?: (blob: Blob) => void
  onTranscribeWhenSilent?: (
    blob?: Blob,
    complete?: boolean,
  ) => Promise<UseWhisperTranscript>
  onTranscribe?: (blob: Blob) => Promise<UseWhisperTranscript>
  onStreamTranscribe?: (blob: Blob) => Promise<UseWhisperTranscript>
  onRecord?: (blob: Blob, arrayBuffer: ArrayBuffer | null) => void
  showLogs?: boolean
  silenceBufferThreshold?: number
}

export type UseWhisperTimeout = {
  stop?: NodeJS.Timeout
}

export type UseWhisperTranscript = {
  blob?: Blob
  text?: string
  arrayBuffer?: ArrayBuffer
}

export type UseWhisperReturn = {
  recording: boolean
  speaking: boolean
  transcribing: boolean
  transcript: UseWhisperTranscript
  pauseRecording: () => Promise<void>
  startRecording: () => Promise<void>
  stopRecording: () => Promise<void>
}

export type UseWhisperHook = (config?: UseWhisperConfig) => UseWhisperReturn

export type WhisperApiConfig = {
  model?: 'whisper-1' | string
  prompt?: string
  response_format?: 'json' | 'text' | 'srt' | 'verbose_json' | 'vtt'
  temperature?: number
  language?: string
}

export type FfmpegEncodeProps = {
  showLogs: boolean | undefined
  blob: Blob
  threshold: number
  removeSilence?: boolean
}
