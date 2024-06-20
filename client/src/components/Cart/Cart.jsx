import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { remove_item_from_cart, update_item_from_cart } from '../../actions';

const Cart = ({ product }) => {
    const [qty, set_qty] = useState(product.quantity);
    const dispatch = useDispatch();

    const remove_item = (cartId) => {
        dispatch(remove_item_from_cart(cartId));
    }

    const update_item = (cartId) => {
        dispatch(update_item_from_cart(cartId, { quantity: qty }));
    }

    return (
        <div className="card">
            <div className="card_img">
                <div className="overlay_price" style={{ backgroundColor: 'red', cursor: 'pointer' }} onClick={() => remove_item(product._id)}>x</div>
                <img height='100%' width='100%' src={product.src} alt="product" />
            </div>
            <div className="card_action">
                <h5>{product.name}</h5>
                <h2 style={{ color: 'darkred' }}>${product.price}/-</h2>
                <div className='update' style={{ display: 'flex'}}>
                    <input type="number" style={{display: 'block'}} value={qty} onChange={(e) => set_qty(e.target.value)} />
                    <button style={{display: 'block'}} onClick={() => update_item(product._id)}>update</button>
                </div>
                <div className='remove'>
                    <h3>Sub Total: <span style={{color: 'darkred'}}>${product.price * product.quantity}/-</span></h3>
                </div>
            </div>
        </div>
  )
}

Cart.propTypes = {
    product: PropTypes.object.isRequired
}

export default Cart