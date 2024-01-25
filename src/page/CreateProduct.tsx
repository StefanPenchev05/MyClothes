import {useState, useRef, ChangeEvent} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { MenuItem ,FormControlLabel ,Switch,   } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AspectRatio from '@mui/joy/AspectRatio';

interface CategoryOption {
    label: string;
    value: string;
  }
  
  interface FormFields {
    title: string;
    description: string;
    price: number;
    category: string;
    sizes: string[];
    available: boolean;
    type: string;
    pics: string[];
  }
  

 
export default function CreateProductPage(){
    
    const initialFormFields: FormFields = {
        title: '',
        description: '',
        price: 0,
        category: '',
        sizes: [],
        available: true,
        type: '',
        pics: [
          'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=',
          'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=',
          'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=',
        ],
      };
    
      const [formFields, setFormFields] = useState<FormFields>(initialFormFields);
      const picRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
    
      const categoryOptions: CategoryOption[] = [
        { label: 'Men', value: 'Men' },
        { label: 'Women', value: 'Women' },
        { label: 'Kids', value: 'Kids' },
      ];
    
      const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
      const types = ['Shirts', 'Pants', 'Dresses', 'Shoes', 'Accessories'];
    
      const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        console.log(e.target.name);
        setFormFields({ ...formFields, [e.target.name]: e.target.value });
      };
    
      const handleFileChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            const newPics = [...formFields.pics];
            newPics[index] = reader.result as string;
            setFormFields({ ...formFields, pics: newPics });
          };
          reader.onerror = (e) => {
            console.log(e);
          };
        }
      };
    
    const handleSubmit = (Title:string , description:string, price:number, category:string,sizes:string[],available:boolean,type:string,pics:string[]) =>{
        
    }

    

    return(
        <>
        <div className='w-full h-full font-semibold flex justify-center'>
            <div className='w-[1068px] h-[calc(100vh-70px)] flex flex-wrap p-4'>
                <div className='w-full flex justify-center'>
                <h1 className='text-3xl'>
                    <span className='text-blue-500'>Create</span> Product
                </h1>
                </div>
                <div className='w-full md:w-1/2 p-4'>
                <form>
                    <TextField 
                    className='mt-4' 
                    label='title' 
                    value={formFields.title} 
                    onChange={handleInputChange} 
                    required 
                    fullWidth 
                    variant="outlined"
                    />
                    <TextField 
                    className='mt-4' 
                    onChange={handleInputChange} 
                    label='Description' 
                    color='primary'
                    value={formFields.description} 
                    required 
                    fullWidth 
                    variant="outlined" 
                    />
                    <TextField 
                    className='mt-4'
                    onChange={handleInputChange}
                    label='Price' 
                    color='primary'
                    value={formFields.price}
                    required
                    fullWidth
                    variant="outlined"
                    />
                    <TextField 
                    className='mt-4'
                    label='Category' 
                    color='primary'
                    required
                    select
                    onChange={handleInputChange}
                    fullWidth
                    variant="outlined"
                    >
                    {categoryOptions.map((option) => (
                        <MenuItem key={option.label} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                    </TextField>
                    <TextField 
                    className='mt-4'
                    label='Type' 
                    color='primary'
                    required
                    onChange={handleInputChange}
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
                    <TextField 
                    className='mt-4'
                    label='Sizes'
                    color='primary'
                    required
                    select
                    onChange={handleInputChange}
                    value={sizes}
                    SelectProps={{multiple:true}}
                    fullWidth
                    variant="outlined"
                    >
                    {sizes.map((option) => (
                        <MenuItem key={option} value={option}>
                        {option}
                        </MenuItem>
                    ))}
                    </TextField>
                    <div className='flex justify-between mt-4'>
                    <FormControlLabel 
                        className='scale-125' 
                        control={<Switch onChange={handleInputChange} defaultChecked />} 
                        label="In Stock" 
                    />
                    <Button 
                        variant='contained'
                        color='primary'
                        size='large' 
                        type='submit' 
                        startIcon={<AddIcon/>}
                    >
                        Add
                    </Button>
                    </div>
                </form>
                </div>
                <div className='w-full md:w-1/2 p-4 flex flex-wrap justify-around'>
                    <div onClick={() => { picRefs[0].current?.click() }} className='cursor-pointer w-[195px]'>
                        <AspectRatio className='' sx={{width:195,heigth:195}}  ratio={1/1}> 
                        <img  className='h-[195px] ' src={formFields.pics[0]} alt="Image" />
                        </AspectRatio>
                        <input type="file" className=' hidden' ref={picRefs[0]} onChange={handleFileChange(0)} />
                    </div>
                    <div onClick={() => { picRefs[1].current?.click() }} className='cursor-pointer w-[195px]'>
                        <AspectRatio className=' ' sx={{width:195,heigth:195}}  ratio={1/1}> 
                        <img src={formFields.pics[1]} alt="Image" />
                        </AspectRatio>
                        <input type="file" className=' hidden' ref={picRefs[1]} onChange={handleFileChange(1)} />
                    </div>
                    <div onClick={() => { picRefs[2].current?.click() }} className='cursor-pointer w-[195px]'>
                        <AspectRatio sx={{width:195,heigth:195}}  ratio={1/1}> 
                        <img id='pic3' src={formFields.pics[2]} alt="Image" />
                        </AspectRatio>
                        <input type="file" className=' hidden' ref={picRefs[2]} onChange={handleFileChange(2)} />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}