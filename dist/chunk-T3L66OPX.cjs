'use strict';

var chunkQXHWVLTD_cjs = require('./chunk-QXHWVLTD.cjs');
var ffmpeg = require('@ffmpeg/ffmpeg');

async function u({showLogs:r,blob:i,threshold:f,removeSilence:m}){let e=new ffmpeg.FFmpeg;e.loaded||await e.load({coreURL:chunkQXHWVLTD_cjs.b+"ffmpeg-core.js"}),r&&e.on("log",({message:s})=>{});let p=await i.arrayBuffer();await e.writeFile("in.wav",new Uint8Array(p));let o=["-i","in.wav","-acodec","libmp3lame","-b:a","96k","-ar","44100"];m&&o.push("-af",chunkQXHWVLTD_cjs.c),o.push("out.mp3"),await e.exec(o);let a=await e.readFile("out.mp3");return await e.terminate(),a instanceof Uint8Array&&a.byteLength<=f?null:new Blob([a],{type:"audio/mpeg"})}

exports.a = u;
