import fs from 'fs'
import multer from 'multer'

const PROFILE_PICTURES_PATH = `${process.env.STORAGE}/${process.env.PROFILE_PICTURE_DIR}/`

const storageProfilePictures = multer.diskStorage({
    destination : function(req : any, file : any, cb : any){ cb(null, PROFILE_PICTURES_PATH)},
    filename : function(req : any, file : any, cb : any){ cb(null, `${req.body.userId}`) }
})

const fileFilterProfilePicture = (req: any, file: any, cb: any) => {
    if( process.env.MAX_FILE_SIZE && file.size > process.env.MAX_FILE_SIZE){ 
        cb(new Error(`file larger than ${process.env.MAX_FILE_SIZE}`), true) }
    if( file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){ 
        cb(new Error('File type not supported'), true) 
    }
    cb(null, false)
}

export const upload_profile_picture = multer({ 
    storage : storageProfilePictures,
    fileFilter : fileFilterProfilePicture
})



const FILES_PATH = `${process.env.STORAGE}/${process.env.FILES_DIR}/`

const storageGeneral = multer.diskStorage({
    destination : function(req : any, file : any, cb : any){ cb(null, FILES_PATH)},
    filename : function(req : any, file : any, cb : any){ cb(null, `${req.body.userId}_${file.originalname}`) }
})

const fileFilterGeneral = (req: any, file: any, cb: any) => {
    if( process.env.MAX_FILE_SIZE && file.size > process.env.MAX_FILE_SIZE){ 
        cb(new Error(`file larger than ${process.env.MAX_FILE_SIZE}`), true) }
    if(
        file.mimetype !== 'text/plain' &&
        file.mimetype !== 'image/jpeg' &&
        file.mimetype !== 'image/png'
    ){ 
        cb(new Error('File type not supported'), true) 
    }
    
    cb(null, false)
}
export const upload_file = multer({ 
    storage : storageGeneral,
    fileFilter : fileFilterGeneral
})

export function has_profile_picture( userId : string){
    return fs.existsSync(`${PROFILE_PICTURES_PATH}/${userId}`)
}