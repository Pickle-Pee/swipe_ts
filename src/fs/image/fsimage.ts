import RNFetchBlob from 'rn-fetch-blob'
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { Platform } from 'react-native';
import { store } from '../../store/store';

class FSImage{
    cacheDir:string;
   

    constructor(){
        this.cacheDir=RNFetchBlob.fs.dirs.CacheDir
      
    }

   async createImageDir():Promise<number>{
    try {
       await RNFetchBlob.fs.mkdir(this.cacheDir+"/Image")
       return 0;
    } catch (error) {
        console.log(error);
        return -1
    }
        
    }

    async downLoadImage(path:string){
        try {
          // const file =   await new LoadFileHttp().downloadFile(path)
          const accessToken= store.getState().user.accessToken;
           const response = await RNFetchBlob.fetch(
            'GET',
            "http://193.164.150.223:1024/service/get_file/"+path,
            {
                "Authorization":accessToken!
            }
            );
            const file = response.data;
            //console.log(file);
            
           if(file==null) throw new Error("не удалось скачать картинку")
           //console.log("создаем файл "+path);
            await RNFetchBlob.fs.writeFile(this.cacheDir+"/Image/"+path,file,'base64')
           //const ee= await RNFetchBlob.fs.exists(this.cacheDir+"/Image/"+path);
           //console.log(ee+"_файл существует");
           
           return 0;
          } catch (error) {
            console.log(error);
            return -1;
          }
    }
    async checkImageInDirectory(path:string){
        try {
          //console.log("file://"+this.cacheDir+"/Voice/"+path);
          //const ss:string[]=await RNFetchBlob.fs.ls(this.cacheDir+"/Voice/")
          //console.log(ss);
          
          const result:boolean=await  RNFetchBlob.fs.exists(this.cacheDir+"/Image/"+path);


          console.log("Файл в дириктории "+result);
          
          if(result) return 0;
          return -1;

        } catch (error) { 
          console.log("ошибка проверки на нахождение голосовухи");
          
          console.log(error);
          return -1;
          
        }
    }
    async deleteImage(path:string){
        try {
          //console.log("file://"+this.cacheDir+"/Voice/"+path);
          //const ss:string[]=await RNFetchBlob.fs.ls(this.cacheDir+"/Voice/")
          //console.log(ss);
          
          await  RNFetchBlob.fs.unlink(this.cacheDir+"/Image/"+path);


         
          
        
          return 0;

        } catch (error) { 
          console.log("ошибка удаления картинки");
          
          console.log(error);
          return -1;
          
        }
    }
   

}

export default new FSImage()