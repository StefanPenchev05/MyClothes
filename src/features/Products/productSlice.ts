import { getData } from '../../service/api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    title: string;
    description: string;
    price: number;
    type: 'Shirts' | 'Pants' | 'Dresses' | 'Shoes' | 'Accessories';
    image: string;
    inStock: boolean;
    ratings: {
        userId: string;
        rating: number;
    }[];
}

const initialState: Product[] = [
    {
        title: 'T-Shirt',
        description: 'A t-shirt',
        price: 19.99,
        type: 'Shirts',
        image: 'https://t-shirtbg.com/image/cache/catalog/2023/December/2024_January-Escobar-1050x1200.jpg',
        inStock: true,
        ratings: [
            {
                userId: '1',
                rating: 5,
            },
        ],
    },
];

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProduct(state, action: PayloadAction<Product>) {
            state.push(action.payload);
        },
    },extraReducers(builder){
        builder.addCase(fetchRandomProducts.fulfilled, (state, action) => {
            state.push(...action.payload);
        });
    }
});

export const fetchRandomProducts = createAsyncThunk('product/fetchRandomProducts', async (_, thunkAPI) => {
    const data = await getData('/products/random');
    return data;
});

export const { addProduct } = productSlice.actions;
export default productSlice.reducer;