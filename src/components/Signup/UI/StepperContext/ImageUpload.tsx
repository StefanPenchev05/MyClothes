import { Box, Fab, IconButton } from '@mui/material';
import { Clear, Add } from '@mui/icons-material/';
import { useTheme } from '../../ThemeContext';

interface Image{
    picOne: string | null,
    picTwo: string | null,
    picThree: string | null,
    picFour: string | null,
  }

function ImageUpload() {
    const {images, setImages} = useTheme();

    return (
       <Box className="flex flex-col items-center justify-center h-[500px] w-full max-sm:h-[1000px]">
            <Box className="flex items-center justify-center mb-4 h-1/2 w-full max-sm:flex-col">
                {images.picOne ? ( 
                    <Box
                        className="w-1/3 h-full mr-6 rounded-md max-sm:w-1/2 max-sm:mb-4 max-sm:mr-0"
                        sx={{
                            backgroundImage: `url(${images.picOne})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            width:'100%',
                            height:'100%', 
                            position: 'relative'
                        }}
                    >
                        <IconButton 
                            sx={{
                                position: 'absolute', 
                                top:  -(15 * Math.sqrt(2) + 4), 
                                left:  -(15 * Math.sqrt(2) + 4), 
                                padding: 0, 
                                backgroundColor: 'red !important',
                                color: 'white'
                            }}
                            onClick={() => setImages((list) => ({...list, ['picOne' as keyof Image]: null}))}
                        >
                            <Clear sx={{color: "white"}}/>
                        </IconButton>
                    </Box>
                ):(
                    <Box 
                        className="
                         w-1/3 h-full
                         flex justify-center items-center 
                         border-2 border-dashed rounded-md border-purple-button
                         relative mr-6 max-sm:w-1/2 max-sm:mb-4 max-sm:mr-0"
                    >
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="contained-button-file"
                            type="file"
                            onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    const file = e.target.files[0];
                                    const maxSize = 3 * (1024 * 1024); // 3MB
                                    if (file.size > maxSize) {
                                        alert('File is too large. Please upload a file less than 3MB.');
                                        return;
                                    }
                                    const reader = new FileReader();
                                    reader.readAsDataURL(file);
                                    reader.addEventListener("load", () => {
                                        setImages(list => ({...list, ["picOne" as keyof Image]: reader.result as string}));
                                    });
                                }
                            }}
                        />
                        <label htmlFor="contained-button-file">
                            <Fab style={{color: "white", backgroundColor: "#2e65ba"}} aria-label='add' component="span">
                                <Add/>
                            </Fab>
                        </label>
                </Box>
                )}
                {images.picTwo ? ( 
                    <Box
                        className="w-1/3 h-full rounded-md max-sm:w-1/2 max-sm:mb-4 max-sm:mr-0"
                        sx={{
                            backgroundImage: `url(${images.picTwo})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            width:'100%',
                            height:'100%', 
                            position: 'relative'
                        }}
                    >
                        <IconButton 
                            sx={{
                                position: 'absolute', 
                                top:  -(15 * Math.sqrt(2) + 4), 
                                right: -(15 * Math.sqrt(2) + 4),
                                padding: 0, 
                                backgroundColor: 'red !important',
                                color: 'white'
                            }}
                            onClick={() => setImages((list) => ({...list, ['picTwo' as keyof Image]: null}))}
                        >
                            <Clear sx={{color: "white"}}/>
                        </IconButton>
                    </Box>
                ):(
                    <Box 
                        className="
                         w-1/3 h-full
                         flex justify-center items-center 
                         border-2 border-dashed rounded-md border-purple-button
                         relative max-sm:w-1/2 max-sm:mb-4 max-sm:mr-0"
                    >
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="contained-button-file"
                            type="file"
                            onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    const file = e.target.files[0];
                                    const maxSize = 3 * (1024 * 1024); // 2MB
                                    if (file.size > maxSize) {
                                        alert('File is too large. Please upload a file less than 1MB.');
                                        return;
                                    }
                                    const reader = new FileReader();
                                    reader.readAsDataURL(file);
                                    reader.addEventListener("load", () => {
                                        setImages(list => ({...list, ["picTwo" as keyof Image]: reader.result as string}));
                                    });
                                }
                            }}
                        />
                        <label htmlFor="contained-button-file">
                            <Fab style={{color: "white", backgroundColor: "#2e65ba"}} aria-label='add' component="span">
                                <Add/>
                            </Fab>
                        </label>
                </Box>
                )}
            </Box>
            <Box className="flex items-center justify-center mb-4 h-1/2 w-full max-sm:flex-col">
            {images.picThree ? ( 
                    <Box
                        className="w-1/3 h-full mr-6 rounded-md max-sm:w-1/2 max-sm:mb-4 max-sm:mr-0"
                        sx={{
                            backgroundImage: `url(${images.picThree})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            width:'100%',
                            height:'100%', 
                            position: 'relative'
                        }}
                    >
                        <IconButton 
                            sx={{
                                position: 'absolute', 
                                top:  -(15 * Math.sqrt(2) + 4), 
                                left:  -(15 * Math.sqrt(2) + 4), 
                                padding: 0, 
                                backgroundColor: 'red !important',
                                color: 'white'
                            }}
                            onClick={() => setImages((list) => ({...list, ['picOne' as keyof Image]: null}))}
                        >
                            <Clear sx={{color: "white"}}/>
                        </IconButton>
                    </Box>
                ):(
                    <Box 
                        className="
                         w-1/3 h-full
                         flex justify-center items-center 
                         border-2 border-dashed rounded-md border-purple-button
                         relative mr-6 max-sm:w-1/2 max-sm:mb-4 max-sm:mr-0"
                    >
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="contained-button-file"
                            type="file"
                            onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    const file = e.target.files[0];
                                    const maxSize = 3 * (1024 * 1024); // 3MB
                                    if (file.size > maxSize) {
                                        alert('File is too large. Please upload a file less than 3MB.');
                                        return;
                                    }
                                    const reader = new FileReader();
                                    reader.readAsDataURL(file);
                                    reader.addEventListener("load", () => {
                                        setImages(list => ({...list, ["picThree" as keyof Image]: reader.result as string}));
                                    });
                                }
                            }}
                        />
                        <label htmlFor="contained-button-file">
                            <Fab style={{color: "white", backgroundColor: "#2e65ba"}} aria-label='add' component="span">
                                <Add/>
                            </Fab>
                        </label>
                </Box>
                )}
                {images.picFour ? ( 
                    <Box
                        className="w-1/3 h-full rounded-md max-sm:w-1/2 max-sm:mb-4 max-sm:mr-0"
                        sx={{
                            backgroundImage: `url(${images.picFour})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            width:'100%',
                            height:'100%', 
                            position: 'relative'
                        }}
                    >
                        <IconButton 
                            sx={{
                                position: 'absolute', 
                                top:  -(15 * Math.sqrt(2) + 4), 
                                right: -(15 * Math.sqrt(2) + 4),
                                padding: 0, 
                                backgroundColor: 'red !important',
                                color: 'white'
                            }}
                            onClick={() => setImages((list) => ({...list, ['picTwo' as keyof Image]: null}))}
                        >
                            <Clear sx={{color: "white"}}/>
                        </IconButton>
                    </Box>
                ):(
                    <Box 
                        className="
                         w-1/3 h-full
                         flex justify-center items-center 
                         border-2 border-dashed rounded-md border-purple-button
                         relative max-sm:w-1/2 max-sm:mb-4 max-sm:mr-0"
                    >
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="contained-button-file"
                            type="file"
                            onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    const file = e.target.files[0];
                                    const maxSize = 3 * (1024 * 1024); // 3MB
                                    if (file.size > maxSize) {
                                        alert('File is too large. Please upload a file less than 1MB.');
                                        return;
                                    }
                                    const reader = new FileReader();
                                    reader.readAsDataURL(file);
                                    reader.addEventListener("load", () => {
                                        setImages(list => ({...list, ["picFour" as keyof Image]: reader.result as string}));
                                    });
                                }
                            }}
                        />
                        <label htmlFor="contained-button-file">
                            <Fab style={{color: "white", backgroundColor: "#2e65ba"}} aria-label='add' component="span">
                                <Add/>
                            </Fab>
                        </label>
                </Box>
                )}
            </Box>
       </Box>
    );
}

export default ImageUpload