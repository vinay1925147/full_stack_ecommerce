import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer'

cloudinary.config({
        cloud_name: 'dfp8qiswq', 
        api_key: '961679679622567', 
        api_secret: 'FaKMxTmDXbaTZ3mROoumRfK63No'
})
const storage =multer.memoryStorage();

export const ImageUpload = async (file)=>{
    const result = await cloudinary.uploader.upload(file,{
        resource_type:'auto'
    })
    return result ;
}
 export const upload = multer({storage});