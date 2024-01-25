//@ts-nochec
import React,{useState,useEffect, useRef, ChangeEvent} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel, MenuItem ,Select,InputLabel,FormControlLabel ,Switch,   } from '@mui/material';
import { ThemeColorProvider } from '../components/Signup/ThemeColorProvider';
import { useStaticPicker } from '@mui/x-date-pickers/internals';
import {validateProductName, validateCategory} from '../utils/validators'
import AddIcon from '@mui/icons-material/Add';
import ImageUpload from '../components/Signup/UI/StepperContext/ImageUpload';
import ThemeProvider from '../components/Signup/ThemeContext';
import AspectRatio from '@mui/joy/AspectRatio';
import { width } from '@mui/system';
import { render } from '@testing-library/react';


 
export default function CreateProductPage(){
    
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState<string>('');
    const [sizes, setSizes] = useState<any>([]); 
    const [available, sntAvailable] = useState<boolean>(true)
    const [type , setType] = useState<string>('')
    const [pic1,setPic1] = useState<any>('https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=');
    const [pic2,setPic2] = useState<any>('https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=');
    const [pic3,setPic3] = useState<any>('https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=');
    const pic1ref = useRef<any>(null);
    const pic2ref = useRef<any>(null);
    const pic3ref = useRef<any>(null);
    
    
    
    const categoryOptions =[
        {
            lable:'Men',
            value:'Men',
        }, {
            lable:'Women',
            value:'Women',
        }, {
            lable:'Kids',
            value:'Kids',
        },
    ]
    const size =['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const types = ['Shirts', 'Pants', 'Dresses', 'Shoes', 'Accessories'];
    
    const HakdleSubmit = (Title:string , description:string, price:number, category:string,sizes:string[],available:boolean,type:string,pics:string[]) =>{
        
    }

    

    return(
        <>
         <div className='w-full  h-full font-semibold flex justify-center '>
            <div className='w-[1068px] h-[calc(100vh-70px)] flex '>
                <div className='h-[70%] w-[50%] my-auto rounded-lg border-gray-300 mt-4'>
                    <form className='my-auto p-4 '>
                        <h1 className='text-3xl'><span className='text-blue-500'>Create</span> Product</h1>
                        <div >
                        <TextField className='mt-4'
                        label='Title'                         
                        value={title}
                        onChange={(e)=>{setTitle(e.target.value)}}
                        required
                        fullWidth
                      
                        
                        variant="outlined"
                        />
                        <TextField className='mt-4'
                        onChange={(e)=>{setDescription(e.target.value)}}
                        label='Description' 
                        color='primary'
                        value={description}
                        required
                        fullWidth
                        variant="outlined"
                        />
                        <TextField className='mt-4'
                        onChange={(e)=>{setPrice(+e.target.value)}}
                        label='Description' 
                        color='primary'
                        value={price}
                        required
                        fullWidth
                        variant="outlined"
                        />
                        <TextField className='mt-4'
                        label='Category' 
                        color='primary'
                        required
                        select
                        onChange={(e)=>{setCategory(e.target.value);}}
                        fullWidth
                        variant="outlined"
                        >
                            {categoryOptions.map((option) => (
                                <MenuItem key={option.lable} value={option.value}>
                                    {option.lable}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField className='mt-4'
                        label='Type' 
                        color='primary'
                        required
                        onChange={(e)=>{setType(e.target.value);}}
                        select
                        fullWidth
                        variant="outlined"
                        >
                            {types.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                        
                        <TextField className='mt-4'
                        label='Sizes'
                        color='primary'
                        required
                        select
                        
                        onChange={(e)=>{setSizes(e.target.value);}}
                        value={sizes}
                        SelectProps={{multiple:true}}
                        fullWidth
                        variant="outlined"
                        >
                         {size.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                        <div className='pl-4 flex justify-between mt-2'>

                            <FormControlLabel className=' scale-125' control={<Switch onChange={(e)=>{sntAvailable(e.target.checked)}} defaultChecked />} label="In Stock" />
                            <Button variant='outlined'size='large' type='submit' className='' startIcon={<AddIcon/>}>Add</Button>
                        </div>
                        </div>
                    </form>
                </div>
                    <div className='h-[70%] w-[50%] flex flex-col  content-between justify-between bg-red-200'>
                         
                         <div onClick={()=>{pic1ref?.current?.click()}} className='cursor-pointer w-[195px]'>
                         <AspectRatio className='' sx={{width:195,heigth:195}}  ratio={1/1}> <img  className='h-[195px] ' src={pic1 } alt="Image" /></AspectRatio>
                         <input type="file" className=' hidden' ref={pic1ref} onChange={(e:ChangeEvent<HTMLInputElement|any>)=>{
                            
                            const file = e?.target?.files[0];
                            const reader = new FileReader()
                            reader.readAsDataURL(file)
                            reader.onload = ()=>{
                                console.log(reader.result)
                                setPic1(reader.result)

                            };
                            reader.onerror=(e)=>{
                                console.log(e)
                            }
                         }}/>

                         </div>
                         <div  onClick={()=>{pic2ref?.current?.click()}} className='cursor-pointer w-[195px]'>
                         <AspectRatio className=' ' sx={{width:195,heigth:195}}  ratio={1/1}> <img src={pic2} alt="Image" /></AspectRatio>
                         <input type="file" className=' hidden' ref={pic2ref} onChange={(e:ChangeEvent<HTMLInputElement|any>)=>{
                            
                            const file = e?.target?.files[0];
                            const reader = new FileReader()
                            reader.readAsDataURL(file)
                            reader.onload = ()=>{
                                console.log(reader.result)
                                setPic2(reader.result)

                            };
                            reader.onerror=(e)=>{
                                console.log(e)
                            }
                         }}/>

                         </div>
                         <div onClick={()=>{pic3ref?.current?.click()}} className='cursor-pointer w-[195px]'>
                         <AspectRatio className=' ' sx={{width:195,heigth:195}}  ratio={1/1}> <img id='pic3' src={pic3} alt="Image" /></AspectRatio>
                         <input type="file" className=' hidden' ref={pic3ref} onChange={(e:ChangeEvent<HTMLInputElement|any>)=>{
                            
                            const file = e?.target?.files[0];
                            const reader = new FileReader()
                            reader.readAsDataURL(file)
                            reader.onload = ()=>{
                                console.log(reader.result)
                                setPic3(reader.result)

                            };
                            reader.onerror=(e)=>{
                                console.log(e)
                            }
                         }}/>

                         </div>
 
                    </div> 
                
              </div>
         </div>
        </>
    )
}