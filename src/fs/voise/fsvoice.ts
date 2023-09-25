import RNFetchBlob from 'rn-fetch-blob'
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { Platform } from 'react-native';
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
            console.log(pathCompleted);
            
            this.audioRecorderPlayer.addRecordBackListener((event)=>{
                console.log(event);
                
            })
            
            return paths!.substring(6);
          } catch (error) {
            console.log("start error");
            console.log(error);
            return ""
          }
    }
   async stopRecord(){
        try {
           await this.audioRecorderPlayer.stopRecorder()
        } catch (error) {
            console.log("stop error");
            
            console.log(error);
            
        }
   }
    async playVoise(path:string):Promise<number>{
        console.log(path);
      const ss:Array<string>=await  RNFetchBlob.fs.ls(this.cacheDir+"/Voice");
      console.log(ss);
      console.log(this.cacheDir+"/Voice/"+path);
      
          try {
                await this.audioRecorderPlayer.startPlayer("file://"+this.cacheDir+"/Voice/"+path)
            this.audioRecorderPlayer.addPlayBackListener(event=>{
                console.log(event);
                
            })

           return 0;
          } catch (error) {
            console.log(error);
            return -1;
          }
    }

    async downLoadVoice(){
        try {
            
           return 0;
          } catch (error) {
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

}

export default new FSVoice()