import AsyncStorage from "@react-native-async-storage/async-storage"


 class TokenStorage{
    saveRefreshToken=async(token:string)=>{
      await AsyncStorage.setItem("refresh_token",token);
    }

  getRefreshToken=async():Promise<string>=>{
    const token :string|null = await  AsyncStorage.getItem("refresh_token");
    return token??"";
  }

  deleteRefreshToken=async():Promise<any>=>{
     await AsyncStorage.removeItem("refresh_token");
     return;
  }
}

export default new TokenStorage();