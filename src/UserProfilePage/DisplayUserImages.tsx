import React ,{useState, useEffect}from "react";
import { AspectRatio } from "@mui/joy";
import Avatar from "@mui/material/Avatar";
import { ImageList,ImageListItem,ImageListItemBar } from "@mui/material";
import { Typography } from "@mui/joy";

interface UserInfo {
    firstName: string,
    lastName: string,
    username:string,
    avatar: string,
    gender:string,
    profileImages:ProfileImage[],
    role: string,
    purchasedProducts: number,
    products?: number,
    sales?: number

}
interface ProfileImage{
    
    url:string,
}

function DisplayUserImages({Images}:{Images:ProfileImage[]}){

    
    
   
    
    return(
    
    <div className="w-[100%] h-full flex flex-row rounded-cl ">
       <div className=" w-full h-full gap-[5%] flex space-x-4 justify-center pt-[20px] " >
        {Images.filter(c=>c).map((image) => (
            
            <div className="w-[20%] h-[90%] transform transition hover:scale-[1.2] rounded-lg" key={image.url}>
                <AspectRatio className='w-[100%] rounded-lg ' ratio={9 / 16} objectFit="cover">
                    <a href={image.url} target='_blank'  rel="noreferrer"><img className="w-full h-full" src={image.url} alt="Image" /></a>
                </AspectRatio>
            </div>
        ))}
       </div>
    </div>
    

    )
}
export default DisplayUserImages;