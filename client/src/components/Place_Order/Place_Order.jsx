import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { place_order } from "../../actions";

const Order = () => {
    const carts = useSelector((state) => state.productReducer.carts);
    const data = JSON.parse(localStorage.getItem('result'))?.result;
    const dispatch = useDispatch();
    const grand_total = useMemo(() => {
        return carts.reduce((arr, cur) => arr += (cur.price * cur.quantity) ,0);
    }, [carts]);
    const [form_data, set_form_data] = useState({
        userId: '',
        name: '',
        number: '',
        email: '',
        address: '',
        payment_method: '',
        your_orders: [],
        total_price: 0,
        city: '',
        country: '',
        state: '',
        pin_code: '',
        address_2: ''
    });

    const onChange = (e) => {
        set_form_data({ ...form_data, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(place_order({
            ...form_data,
            userId: data._id,
            total_price: grand_total,
            your_orders: [...carts.map(cart => cart)]
        }));

        set_form_data({
            userId: '',
            name: '',
            number: '',
            email: '',
            address: '',
            payment_method: '',
            your_orders: [],
            total_price: 0,
            city: '',
            country: '',
            state: '',
            pin_code: '',
            address_2: ''
        });
    }
    
    return (
        <div className="order" style={{ padding: '50px 0' }}>
            <div className="container" style={{ width: '80%', margin: '0 auto' }}>
                <div className="cart_items">
                    {carts.map((item, index) => {
                        return <div className="item" key={index}>
                            <h4>{item.name} <span>(${item.price}/- x{item.quantity})</span></h4>
                        </div>
                    })}
                </div>
                <div className="grand_total">
                    <h2>grand total: <span>${grand_total}/-</span></h2>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="title">
                        <h1>place your order</h1>
                    </div>
                    <div className="input_group">
                        <div className="left_inputs">
                            <div className="name">
                                <label htmlFor="name">your name</label>
                                <input type="text" name="name" value={form_data.name} onChange={onChange} placeholder="enter your name" />
                            </div>
                            <div className="email">
                                <label htmlFor="email">your email</label>
                                <input type="email" name="email" value={form_data.email} onChange={onChange} placeholder="enter your email" />
                            </div>
                            <div className="address">
                                <label htmlFor="address">address line 01:</label>
                                <input type="text" name="address" value={form_data.address} onChange={onChange} placeholder="e.g flat no." />
                            </div>
                            <div className="city">
                                <label htmlFor="city">city:</label>
                                <input type="text" name="city" value={form_data.city} onChange={onChange} placeholder="e.g yaba" />
                            </div>
                            <div className="country">
                                <label htmlFor="country">country:</label>
                                <input type="text" name="country" value={form_data.country} onChange={onChange} placeholder="e.g nigeria" />
                            </div>
                        </div>
                        <div className="right_inputs">
                            <div className="number">
                                <label htmlFor="number">your number</label>
                                <input type="tel" name="number" value={form_data.number} onChange={onChange} placeholder="enter your number" />
                            </div>
                            <div className="payment_method">
                                <label htmlFor="method">payment method</label>
                                <select name="payment_method" value={form_data.payment_method} onChange={onChange}>
                                    <option value="cash">cash on delivery</option>
                                    <option value="credit card">credit card</option>
                                    <option value="paypal">paypal</option>
                                </select>
                            </div>
                            <div className="address">
                                <label htmlFor="address">address line 01:</label>
                                <input type="text" name="address_2" value={form_data.address_2} onChange={onChange} placeholder="e.g street name." />
                            </div>
                            <div className="state">
                                <label htmlFor="state">state:</label>
                                <input type="text"  name="state" value={form_data.state} onChange={onChange}placeholder="e.g lagos" />
                            </div>
                            <div className="pin_code">
                                <label htmlFor="code">pin code:</label>
                                <input type="number" name="pin_code" value={form_data.pin_code} onChange={onChange} placeholder="e.g 1234" />
                            </div>
                        </div>
                    </div>
                    <div className="submit_button">
                        <button type="submit">order now</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Order;