import express from "express";
import path from "path";
const fs = require('fs');
export const app1= express();
app1.use(express.json());

app1.get("/video", function (req:any, res:any) {
    console.log("---------------------------")
    // const videoPath = "/home/admin96/Videos/streaming_server/Rio Soundtrack - Let Me Take You To Rio.mp4";
    const videoPath = "/home/admin96/Videos/streaming_server/vedio/rio.mp4";
    const videoSize = fs.statSync(videoPath).size;
    const start = 0; 
    // const end = getEndPosition(start, 10);
    // const end = 1048575; 
    const end = videoSize - 1;
    const contentLen = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Rnges": "bytes",
        "Content-Length": contentLen,
        "Content-Type": "video/mp4"
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });//made it readable stream
    videoStream.pipe(res);//from readable stream to writable stream
});

app1.get('/', function (req:any, res:any) {
    console.log("-----------------------------")
    res.sendFile(path.resolve(__dirname, '/home/admin96/Videos/streaming_server/index1.html'));
});

// function getEndPosition(start:any, chunkSizeMB:any) {
//     const chunkSizeBytes = chunkSizeMB * 1024 * 1024; // Convert MB to bytes
//     const end = start + chunkSizeBytes - 1;
//     return end;
// }
 
  
// // Serve the video file
// app1.get('/video', function (req:any, res:any) {
//     // const range = req.headers.range;
//     // if (!range) {
//     //     res.status(400).send("range is not provided")
//     // }
//     console.log("------------------------------")
//     const vedioPath ='/home/admin96/Videos/streaming_server/Rio Soundtrack - Let Me Take You To Rio.mp4'
//     const videoSize = fs.statSync(vedioPath).size;  // 
//     // console.log("-------------------------------")
//     const start =0;
//     const end =videoSize-1

//     // console.log("size of the vedio is:",videoSize)
//     // const CHUNK_SIZE=10**6;//1mb
//     // const start= Number(range.replace(/\D/g,""))
//     // const end =Math.min(start+CHUNK_SIZE,videoSize-1);
//     const contentLength= end-start+1;
//     const headers={
//         'Content-Range':`bytes ${start}-${end}/${videoSize}`,
//         "Accept-Ranges":'bytes',
//         "Content-Length":contentLength,
//         "Content-Type":"vedio/mp4"
//     }
//     res.writeHead(206,headers)
//     const videoStream =fs.createReadStream(vedioPath,{start,end});//made it readable stream
//     videoStream.pipe(res);//from readable stream to writable stream
//     // res.sendFile(path.join(__dirname, 'yourvideo.mp4'));
// });


