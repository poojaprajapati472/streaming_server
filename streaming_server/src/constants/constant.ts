import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import axios from "axios";
import { createWriteStream } from "fs";
export const S3Clients= new S3Client({
    region: 'us-east-1',
   credentials:{
    accessKeyId:'AKIAUX4BDRCWHZ3TQMVO',
    secretAccessKey:'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'
   }
})

async function fetchDataAndWriteToFile(url:any, localFilePath:any) {
    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const fileStream = createWriteStream(localFilePath);
      fileStream.write(Buffer.from(response.data, 'binary'));//it creates a node js buffer object from binary data and writes the buffer object
      fileStream.end();//
      console.log(`Data downloaded and saved to ${localFilePath}`);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }
export async function getimageUrl(key:any){
  
    const command = new GetObjectCommand({
      Bucket: 'myfirstbucket-private',
      Key: 'Rio Soundtrack - Let Me Take You To Rio.mp4'
    });
    const data = await getSignedUrl(S3Clients,command);
    return data;
}
export async function init(){
    let url=await getimageUrl('Rio Soundtrack - Let Me Take You To Rio.mp4')
    console.log("url ::: ",url)
//   console.log("link for protofile :: ",await getimageUrl('Rio Soundtrack - Let Me Take You To Rio.mp4'))
    const localFilePath = '/home/admin96/Videos/streaming_server/vedio/rio.mp4';
    await fetchDataAndWriteToFile(url, localFilePath);
  }