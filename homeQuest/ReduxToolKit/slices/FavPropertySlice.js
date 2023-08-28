import {createSlice} from '@reduxjs/toolkit'


const favPropertySlice=createSlice({
    name:'favProperties',
    initialState:[],
    reducers:{
        addFavPropertySlice(state,action){
            console.log("adding property to fav by Slice:",action.payload)
  
            const existingProperty=state.find((item)=>item.id===action.payload.id)
            if (existingProperty){
                console.log("Property already added to favorites.");
            }else{
              state.push(action.payload)  
            }
            
            // console.log("data Added to fav by Slice:",action.payload)
            console.log("All Fav Properties by Slice:",state)

        },
        removeFavPropertySlice(state,action){
            console.log("removing property from fav by Slice:",action.payload)
            //immer is provided by redux 
            const index=state.findIndex((item)=>item.id===action.payload.id)+1
            console.log("Index value for delete:",index)
            //index value will start from 1,2,3,4 and state.splice method will take value from 0,1,2,3,
            if (index>0){
                console.log("Property added to favorites now deleting:",action.payload.id ,"from :",state);
                state.splice(index-1,1)
            }else{
                console.warn("Error !!!!Property not exits in favorites list");
            }
            console.log("All Fav Properties by Slice:",state)
        }
    }
    
})
console.log("Fav Property Slice Method:",favPropertySlice.actions)

export const {addFavPropertySlice,removeFavPropertySlice}=favPropertySlice.actions

export default favPropertySlice.reducer

