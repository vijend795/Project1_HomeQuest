import {createSlice} from '@reduxjs/toolkit'


const userSlice=createSlice({
    name:'users',
    initialState:[],
    reducers:{
        addUser(state,action){
            state.push(action.payload)
            console.log("data Added:",action.payload)
        },
        removeUser(state,action){
            console.log("remove user:",action.payload)
            //immer is provided by redux 
            state.splice(action.payload,1)
        },
        deleteUser(state,action){
            console.log("delete Added:",action.payload)
        },
    }
    
})
console.log("User SLice Method:",userSlice.actions)

export const {addUser,deleteUser,removeUser}=userSlice.actions

export default userSlice.reducer
