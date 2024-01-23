import React, {useEffect} from 'react'
import { fetchRandomProducts } from './productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Card as MaterialCard, CardContent, CardHeader, Avatar, IconButton, LinearProgress  } from '@mui/material';

function PostCard() {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchRandomProducts() as any)
    }, []);

    const products = useSelector((state: any) => state.product);

  return (
    <MaterialCard className='w-[10%]'>
        <CardHeader
            avatar={
                <Avatar src={products[0]?.image} />
            }
            title={products[0]?.title}
            subheader={products[0]?.description}
        />
        <CardContent>
            <Typography variant='body1'>{products[0]?.price}</Typography>
            <Typography variant='body1'>{products[0]?.category}</Typography>
            <Typography variant='body1'>{products[0]?.rating}</Typography>
        </CardContent>
    </MaterialCard>
  )
}

export default PostCard