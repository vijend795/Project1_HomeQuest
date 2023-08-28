import {createSlice} from '@reduxjs/toolkit'
// import { Properties } from '../../src/DataApi/AddressesData'




const allPropertiesSlice=createSlice({
    name:'allProperties',
    initialState:[],
    reducers:{
        addProperty(state,action){
            state.push(action.payload)
            // console.log("property Added:",action.payload)
            console.log("property Added by All Property slice:")
        },
        removeProperty(state,action){
            console.log("property removed:",action.payload)
            //immer is provided by redux , send payload as id to match with index
            let index= state.indexOf(action.payload)
            state.splice(action.payload,1)
        },
    }

})
console.log("Property Data SLice Method:",allPropertiesSlice.actions)


export const {addProperty,removeProperty}=allPropertiesSlice.actions

export default allPropertiesSlice.reducer
