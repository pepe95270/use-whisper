import { b, c } from './chunk-X4QJNRK4.js';
import { FFmpeg } from '@ffmpeg/ffmpeg';

async function u({showLogs:r,blob:i,threshold:f,removeSilence:m}){let e=new FFmpeg;e.loaded||await e.load({coreURL:b+"ffmpeg-core.js"}),r&&e.on("log",({message:p})=>{});let s=await i.arrayBuffer();await e.writeFile("in.wav",new Uint8Array(s));let o=["-i","in.wav","-acodec","libmp3lame","-b:a","96k","-ar","44100"];m&&o.push("-af",c),o.push("out.mp3"),await e.exec(o);let a=await e.readFile("out.mp3");return await e.terminate(),a instanceof Uint8Array&&a.byteLength<=f?null:new Blob([a.slice()],{type:"audio/mpeg"})}

export { u as a };
