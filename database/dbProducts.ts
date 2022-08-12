import { connect, disconnect } from './db';
import { Product } from '../model/Product';
import { IProduct } from '../interfaces/products';

export const getProductBySlug = async ( slug: string ): Promise<IProduct | null> => {
    await connect()
    const product = await Product.findOne({ slug }).lean();
    await disconnect();
    if ( !product ) return null;
    return JSON.parse(JSON.stringify(product));
}

interface ProductSlug {
    slug: string;
}

export const getAllProductSlug = async (): Promise<ProductSlug[]> => {
    await connect()
    const slugs = await Product.find().select('slug -_id').lean();
    await disconnect();
    return slugs
}

export const searchProduct = async ( query: string ): Promise<IProduct[]> => {
    await connect();
    const products = await Product.find({
            $text: { $search: query.toString().toLowerCase() }
        }).lean();
    await disconnect();
    return JSON.parse(JSON.stringify(products));
}


export const getAllProducts = async (): Promise<IProduct[]> => {
    await connect()
    const products = await Product.find().lean();
    await disconnect();
    return JSON.parse(JSON.stringify(products));
}