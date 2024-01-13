import React ,{useState, useEffect}from "react";
import { AspectRatio } from "@mui/joy";
import Avatar from "@mui/material/Avatar";
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
    
    <div className="w-[100%] h-full flex flex-row gap-1">
        {Images?.filter((x:ProfileImage) => x).map((x:ProfileImage)=>{
            return(
                <div key={x.url}>
                    <AspectRatio ratio={1/1}>
                        <img src={x.url} alt="Photo" />
                    </AspectRatio>
                </div>
            )

        })}
    </div>
    

    )
}
export default DisplayUserImages;