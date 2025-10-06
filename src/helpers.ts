import { ffmpegUrl, silenceRemoveCommand } from './configs'
import { FfmpegEncodeProps } from './types'
import { FFmpeg } from '@ffmpeg/ffmpeg'

export async function encodeWithFfmpeg({
  showLogs,
  blob: currentBlob,
  threshold,
  removeSilence,
}: FfmpegEncodeProps): Promise<Blob | null> {
  const ffmpeg = new FFmpeg()
  if (!ffmpeg.loaded) {
    await ffmpeg.load({
      coreURL: ffmpegUrl + 'ffmpeg-core.js',
    })
  }

  if (showLogs) {
    ffmpeg.on('log', ({ message }) => {
      console.log(message)
    })
  }

  const buffer = await currentBlob.arrayBuffer()
  console.log({ in: buffer.byteLength })
  await ffmpeg.writeFile('in.wav', new Uint8Array(buffer))

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
      silenceRemoveCommand,
    )
  }

  ffmpegParams.push('out.mp3')
  await ffmpeg.exec(ffmpegParams)

  const outData = (await ffmpeg.readFile('out.mp3')) as Uint8Array

  await ffmpeg.terminate()

  // This checks if it is less than the threshold to be considered as an empty mp3 file
  if (outData instanceof Uint8Array && outData.byteLength <= threshold)
    return null

  return new Blob([outData.slice()], { type: 'audio/mpeg' })
}
