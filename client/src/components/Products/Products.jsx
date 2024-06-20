import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';

import { all_products } from '../../actions';

import Product from './Product';

import { useEffect, useState } from 'react';

const Products = () => {
    const dispatch = useDispatch();
    const [limit, set_limit] = useState(10);
    const { isLoading, error } = useQuery({
        queryKey: ['home'],
        queryFn: () => dispatch(all_products(limit)),
        staleTime: 1000000
    });
    const products = useSelector((state) => state.productReducer.products);

    useEffect(() => {
        dispatch(all_products(limit));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[limit]);

    if (isLoading) return <h3>Loading...</h3>

    if (error) {
        return (
            <div className='products'>
                <div className="container">
                    <div className="title">
                        <h1>Productsss</h1>
                    </div>
                    <div className="error">
                        <h3>An error has occurred: {error.message}</h3>
                    </div>
                </div>
            </div>
        );
    }

    const load_more = () => {
        set_limit((limit) => limit + 10);

        //navigate(`${location.pathname}?_limit=${limit}`);
    };
    
    return (
        <div className='products'>
            <div className="title">
                <h1>Products</h1>
            </div>
            <div className="display_products">
                {products.map((product, index) => {
                    return <Product key={index} product={product} />
                })}
            </div>
            <div className="load_more">
                <button onClick={load_more}>load more</button>
            </div>
        </div>
    )
}

export default Products;