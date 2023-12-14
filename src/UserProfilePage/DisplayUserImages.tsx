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

function DisplayUserImages({userInfo}:{userInfo:any}){

    const [arr, setArr] = useState<ProfileImage[]>(userInfo.profileImages);
    const [isLoaded,setIsLoaded] = useState<boolean>(false);
    useEffect(()=>{
          const GetImages =()=>{
              setArr(userInfo.profileImages);
              setIsLoaded(true);
              console.log(arr)

          }
          GetImages();
        },[]);
    
    return(
    isLoaded?(
    <div className="w-[] flex flex-row gap-1">
        {arr.map((x:ProfileImage)=>{

            return(
                <div key={x.url}>
                    <AspectRatio ratio={1/1}>
                        <Avatar alt='Photo' src={x.url}></Avatar>
                    </AspectRatio>
                </div>
            )

        })}
    </div>):(
        <div className="align-self-center justify-self-center w-full h-full">
            <Typography className='w-[70%] ml-[15%] flex flex-wrap align-self-center' color="neutral"
                    level="body-lg"
                    noWrap={false}
                    variant="plain"
                    component='p'>No photos available</Typography>
        </div>
    ))
    

}
export default DisplayUserImages;