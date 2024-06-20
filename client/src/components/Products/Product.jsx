import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';
import { add_product_to_cart } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

const Product = ({ product }) => {
    const [qty, set_qty] = useState(1);
    const carts = useSelector((state) => state.productReducer.carts);
    const result = JSON.parse(localStorage.getItem('result'))?.result;
    const dispatch = useDispatch();
    const product_added = useMemo(() => {
        return carts.filter((cart) => cart.productId === product._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [carts]);

    const add_to_cart = (event, product) => {
        const { name, color, price, category, src, _id } = product;

        dispatch(add_product_to_cart({ name, color, price, src, category, productId: _id, quantity: qty, userId: result._id }));
    }

    return (
        <div>
            <div className="card">
                <div className="card_img">
                    <div className="overlay_price">${product.price}</div>
                    <img height='100%' width='100%' src={product.src} alt="product" />
                </div>
                <div className="card_action">
                    <h5>{product.name}</h5>
                    <input type="number" value={qty} onChange={(e) => set_qty(e.target.value)} />
                    {product_added.length > 0 ? (
                        <button disabled style={{ backgroundColor: 'green' }}>In Cart</button>
                    ) : (
                        <>
                            <button onClick={(event) => add_to_cart(event, product)}>Add To Cart</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

Product.propTypes = {
    product: PropTypes.object.isRequired
}

export default Product;