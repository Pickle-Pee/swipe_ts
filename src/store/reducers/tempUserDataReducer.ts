import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export  interface IUserTempData{
    phoneNumber:string;
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    gender: string

}

const initialState:IUserTempData={
    phoneNumber:"",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: ""


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
        }
    }
}
)

export const { 
    updateUserPhoneNumber,
    updateUserFirstName,
    updateUserLastName ,
    updateUserBirth,
    updateUserGender
} = userTempDataSlice.actions;
export default userTempDataSlice.reducer;