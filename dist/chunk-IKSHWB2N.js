import { b, c } from './chunk-X4QJNRK4.js';
import { FFmpeg } from '@ffmpeg/ffmpeg';

async function u({showLogs:i,blob:r,threshold:m,removeSilence:f}){let e=new FFmpeg;e.loaded||await e.load({coreURL:b}),i&&e.on("log",({message:s})=>{});let l=await r.arrayBuffer();await e.writeFile("in.wav",new Uint8Array(l));let o=["-i","in.wav","-acodec","libmp3lame","-b:a","96k","-ar","44100"];f&&o.push("-af",c),o.push("out.mp3"),await e.exec(o);let a=await e.readFile("out.mp3");return await e.terminate(),a instanceof Uint8Array&&a.byteLength<=m?null:new Blob([a],{type:"audio/mpeg"})}

export { u as a };
