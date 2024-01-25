import React from "react";
import { AspectRatio } from "@mui/joy";
interface ProfileImage {
    url: string;
}

interface DisplayUserImagesProps {
    Images: ProfileImage[];
}

const DisplayUserImages: React.FC<DisplayUserImagesProps> = ({ Images }) => {
    return (
        <div className="w-full h-full flex flex-row rounded-cl">
            <div className="w-full h-full gap-5 flex space-x-4 justify-center pt-20">
                {Images.map((image) => (
                    <div className="w-1/5 h-9/10 transform transition hover:scale-110 rounded-lg" key={image.url}>
                        <AspectRatio className='w-full rounded-lg' ratio={9 / 16} objectFit="cover">
                            <a href={image.url} target='_blank' rel="noreferrer">
                                <img className="w-full h-full" src={image.url} alt="User" />
                            </a>
                        </AspectRatio>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DisplayUserImages;