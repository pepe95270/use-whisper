import { ffmpegCoreUrl, silenceRemoveCommand } from './configs'
import { FfmpegEncodeProps } from './types'
import { createFFmpeg } from '@ffmpeg/ffmpeg'

export async function encodeWithFfmpeg({
  showLogs,
  blob: currentBlob,
  threshold,
  removeSilence,
}: FfmpegEncodeProps): Promise<Blob | null> {
  const ffmpeg = createFFmpeg({
    mainName: 'main',
    corePath: ffmpegCoreUrl,
    log: showLogs,
  })
  if (!ffmpeg.isLoaded()) {
    await ffmpeg.load()
  }
  const buffer = await currentBlob.arrayBuffer()
  console.log({ in: buffer.byteLength })
  ffmpeg.FS('writeFile', 'in.wav', new Uint8Array(buffer))
  const ffmpegParams = [
    '-i', // Input
    'in.wav',
    '-acodec', // Audio codec
    'libmp3lame',
    '-b:a', // Audio bitrate
    '96k',
    '-ar', // Audio sample rate
    '44100',
  ]
  if (removeSilence) {
    ffmpegParams.push(
      '-af', // Audio filter = remove silence from start to end with 2 seconds in between
      silenceRemoveCommand
    )
  }
  ffmpegParams.push('out.mp3')
  await ffmpeg.run(...ffmpegParams)
  const out = ffmpeg.FS('readFile', 'out.mp3')
  console.log({ out: out.buffer.byteLength, length: out.length })
  ffmpeg.exit()
  // This checks if it is less than the threshold to be considered as an empty mp3 file
  if (out.length <= threshold) return null
  return new Blob([out.buffer], { type: 'audio/mpeg' })
}
