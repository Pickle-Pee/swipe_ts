import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export  interface IUserTempData{
    phoneNumber:string;
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    gender: string,
    city_name:string;

}

const initialState:IUserTempData={
    phoneNumber:"",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "male",
    city_name:""


}

const userTempDataSlice=createSlice({
    name:"userTempDataSlice",
    initialState,
    reducers:{
        updateUserPhoneNumber:(state,action:PayloadAction<{phoneNumber:string}>)=>{
            state.phoneNumber=action.payload.phoneNumber;
        },
        updateUserFirstName:(state,action:PayloadAction<{firstName:string}>)=>{
            state.firstName=action.payload.firstName;
        },
        updateUserLastName:(state,action:PayloadAction<{lastName:string}>)=>{
            state.lastName=action.payload.lastName;
        },
        updateUserBirth:(state,action:PayloadAction<{dateOfBirth:string}>)=>{
            state.dateOfBirth=action.payload.dateOfBirth;
        },
        updateUserGender:(state,action:PayloadAction<{gender:string}>)=>{
            state.gender=action.payload.gender;
        },
        updateUserCity:(state,action:PayloadAction<{city:string}>)=>{
            state.city_name=action.payload.city;
        },
        RESET_TEMP_USER_REDUCER(state){
            state=initialState;
           }
    }
}
)

export const { 
    updateUserPhoneNumber,
    updateUserFirstName,
    updateUserLastName ,
    updateUserBirth,
    updateUserGender,
    updateUserCity,
    RESET_TEMP_USER_REDUCER
} = userTempDataSlice.actions;
export default userTempDataSlice.reducer;