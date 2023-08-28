import Chance from "chance";
const chance=Chance()

export const fakeUserData=()=>{
    // console.log(chance.name({ middle: true }))

    return chance.name({ middle: true })
}

// fakeUserData()


export const imagesArray = [
    require("../../assets/PropertyImages/House1/image1.jpeg"),
    require("../../assets/PropertyImages/House1/image2.jpeg"),
    require("../../assets/PropertyImages/House1/image3.jpeg"),
    require("../../assets/PropertyImages/House1/image4.jpeg"),
    require("../../assets/PropertyImages/House1/image5.jpeg"),
    require("../../assets/PropertyImages/House1/image6.jpeg"),
    require("../../assets/PropertyImages/House1/image7.jpeg"),
    require("../../assets/PropertyImages/House1/image8.jpeg"),
    require("../../assets/PropertyImages/House1/image9.jpeg"),
    require("../../assets/PropertyImages/House1/image10.jpeg"),
    require("../../assets/PropertyImages/House1/image11.jpeg"),
    
  ];