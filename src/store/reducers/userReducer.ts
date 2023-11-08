import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IInterest } from "../../http/matches/httpMatches";
import { EGender, IUserPhotos, IUserProfile } from "../../http/user/httpUser";

export enum EVerifyStatus{
    in_progress="in_progress",
    approved="approved",
    denied="denied"

}

interface IUser{
    accessToken:string|null;
    userId:number;
    profile:IUserProfile|null
    photos:IUserPhotos[];
    verifyStatus:EVerifyStatus;
    isSubscription:boolean;
    bunnerView:boolean;
    gender:EGender;
}

const initialState:IUser={
    accessToken:null,
    userId:-1,
    profile:null,
    photos:[],
    verifyStatus:EVerifyStatus.denied,
    isSubscription:false,
    bunnerView:false,
    gender:EGender.none

}

const userSlice=createSlice({
    name:"userSlice",
    initialState,
    reducers:{
        updateBunnerView:(state,action:PayloadAction<boolean>)=>{
            state.bunnerView=action.payload;
        },
        updateUserVerifyStatus:(state,action:PayloadAction<{status:EVerifyStatus}>)=>{
            state.verifyStatus=action.payload.status;
        },
        updateUserToken:(state,action:PayloadAction<{token:string}>)=>{
            state.accessToken=action.payload.token;
        },
        setUserId(state,action:PayloadAction<number>){
            state.userId=action.payload
        },
        setUserGender(state,action:PayloadAction<EGender>){
            state.gender=action.payload
        },
        setUserSubsription(state,action:PayloadAction<boolean>){
            state.isSubscription=action.payload
        },
        updateUserProfile(state,action:PayloadAction<IUserProfile>){
            state.profile=action.payload
        },
        addAllUserPhotos(state,action:PayloadAction<IUserPhotos[]>){
            state.photos=action.payload.reverse();
        },
        addUserPhotos(state,action:PayloadAction<IUserPhotos>){
            if(action.payload.is_avatar){
                for(let i=0;i<state.photos.length;i++){
                    state.photos[i].is_avatar=false;
                }
            }
            state.photos.unshift(action.payload);
            
        },
        updateAvatarUserPhotos(state,action:PayloadAction<number>){
            for(let i=0;i<state.photos.length;i++){
                if(state.photos[i].is_avatar==true){
                    state.photos[i].is_avatar=false;
                    break;
                }
            }
            for(let i=0;i<state.photos.length;i++){
                if(state.photos[i].id==action.payload){
                    state.photos[i].is_avatar=true;
                    break;
                }
            }
           
        },
        RESET_USER_REDUCER(state){
            state=initialState;
           }
    }
}
)

export const { updateBunnerView,updateUserVerifyStatus,updateUserToken,setUserId,setUserSubsription,setUserGender,updateUserProfile,addAllUserPhotos,addUserPhotos,updateAvatarUserPhotos,RESET_USER_REDUCER } = userSlice.actions;
export default userSlice.reducer;