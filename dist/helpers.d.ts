import { FfmpegEncodeProps } from './types.js';

declare function encodeWithFfmpeg({ showLogs, blob: currentBlob, threshold, removeSilence, }: FfmpegEncodeProps): Promise<Blob | null>;

export { encodeWithFfmpeg };
