import RNFetchBlob from 'rn-fetch-blob'
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { Platform } from 'react-native';
import { LoadFileHttp } from '../../http/loadFile/httpLoadFile';
import Sound from 'react-native-sound';
import { store } from '../../store/store';
class FSVoice{
   private cacheDir:string;
 private audioRecorderPlayer:AudioRecorderPlayer;

    constructor(){
        this.cacheDir=RNFetchBlob.fs.dirs.CacheDir
       this.audioRecorderPlayer=new AudioRecorderPlayer()
    }

   async createVoiceDir():Promise<number>{
    try {
       await RNFetchBlob.fs.mkdir(this.cacheDir+"/Voice")
       return 0;
    } catch (error) {
        console.log(error);
        return -1
    }
        
    }
    async recordVoise(userId:number,chatId:number):Promise<string>{
        const paths = Platform.select({
            ios: `Voice/audio_${userId}_${chatId}_${Date.now()}.m4a`,
            android: `hello.mp3`,
          });
          try {
            
            const pathCompleted:string=await this.audioRecorderPlayer.startRecorder(paths)
           
            
            this.audioRecorderPlayer.addRecordBackListener((event)=>{
              //  console.log(event);
                
            })
            
            return paths!.substring(6);
          } catch (error) {
           
               
            console.log("start error");
            console.log(error);
            return ""
          }
    }
   async stopRecord():Promise<string>{
        try {
          const fullPath= await this.audioRecorderPlayer.stopRecorder()
          this.audioRecorderPlayer.removeRecordBackListener()
          
           return fullPath;
           
        } catch (error) {
            
            
            console.log(error);
            return ""
        }
   }
    async playVoise(path:string):Promise<number>{
        console.log(path);
      // const ss:Array<string>=await  RNFetchBlob.fs.ls(this.cacheDir+"/Voice");
      // console.log(ss);
      
      console.log(this.cacheDir+"/Voice/"+path);
      
          try {
                await this.audioRecorderPlayer.startPlayer("file://"+this.cacheDir+"/Voice/"+path)
            this.audioRecorderPlayer.addPlayBackListener(event=>{
                console.log(event);
                
            })

           return 0;
          } catch (error) {
            console.log(error);
            console.log("Не удалось воспроизвести войс");
            
            return -1;
          }
    }

    async downLoadVoice(path:string){
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
            console.log(file);
            
           if(file==null) throw new Error("не удалось скачать файл голосовухи")
           console.log("создаем файл "+path);
            await RNFetchBlob.fs.writeFile(this.cacheDir+"/Voice/"+path,file,'base64')
           const ee= await RNFetchBlob.fs.exists(this.cacheDir+"/Voice/"+path);
           console.log(ee+"_файл существует");
           
           return 0;
          } catch (error) {
            console.log(error);
            return -1;
          }
    }

    async checkVoiceInDirectory(path:string){
        try {
          //console.log("file://"+this.cacheDir+"/Voice/"+path);
          //const ss:string[]=await RNFetchBlob.fs.ls(this.cacheDir+"/Voice/")
          //console.log(ss);
          
          const result:boolean=await  RNFetchBlob.fs.exists(this.cacheDir+"/Voice/"+path);


          console.log("Файл в дириктории "+result);
          
          if(result) return 0;
          return -1;

        } catch (error) { 
          console.log("ошибка проверки на нахождение голосовухи");
          
          console.log(error);
          return -1;
          
        }
    }
    async deleteVoice(path:string){
      try {
        //console.log("file://"+this.cacheDir+"/Voice/"+path);
        //const ss:string[]=await RNFetchBlob.fs.ls(this.cacheDir+"/Voice/")
        //console.log(ss);
        
        await  RNFetchBlob.fs.unlink(this.cacheDir+"/Voice/"+path);
      // const result= await  RNFetchBlob.fs.exists(this.cacheDir+"/Voice/"+path);
       //console.log("file_"+result);
       
        return 0;

      } catch (error) { 
        console.log("ошибка удаления войса");
        
        console.log(error);
        return -1;
    }
  }
    async deleteVoicesInChat(chatId:number):Promise<number>{
       try {
        const ls:string[]=await RNFetchBlob.fs.ls(this.cacheDir+"/Voice");
       
       ls.forEach(async elem=>{
           const [,,chatIdFile]= elem.split("_")
           if(chatId.toString()==chatIdFile){
            await RNFetchBlob.fs.unlink(elem)
           }
       })
       return 0;
       } catch (error) {
        console.log("error deleteVoiceInChat");
        console.log(error);
        return -1;
        
       }
      
    }

    checkDurationVoice(path:string,fn:(value:number)=>void){
    const sound =  new Sound(this.cacheDir+"/Voice/"+path,undefined,()=>{
      fn(Math.floor(sound.getDuration() * 10) / 10);
        
    })
    }

}

export default new FSVoice()