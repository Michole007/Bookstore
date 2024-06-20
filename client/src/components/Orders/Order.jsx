import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { checkout_session, get_order } from "../../actions";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Order = ({ payment_status }) => {
    const dispatch = useDispatch();
    const { isLoading, error, data } = useQuery({
        queryKey: ['orders'],
        queryFn: () => dispatch(get_order())
    });
    const navigate = useNavigate();

    if (error) return <div>error: {error}</div>

    if (isLoading) return <div>Loading...</div>

    if (data == null) return <div>No order placed yet...........</div>

    const create_checkout_session = () => {
        dispatch(checkout_session(navigate));
    }

    return (
        <div className="order">
            <h4>placed on: <span>{data.placed_on}</span></h4>
            <h4>name: <span>{data.name}</span></h4>
            <h4>number: <span>{data.number}</span></h4>
            <h4>email: <span>{data.email}</span></h4>
            <h4>address: <span>{data.address}</span></h4>
            <h4>payment method: <span>{data.payment_method}</span></h4>
            <h4>your orders: <span>{data.your_orders.map(item => item.name).join(', ')}</span></h4>
            <h4>total price: <span>{data.total_price}</span></h4>
            <h4>payment status: <span>{data.payment_status}</span></h4>
            {!payment_status &&
                <button type='button' onClick={create_checkout_session}>checkout</button>
            }
        </div>
    )
}

Order.propTypes = {
    payment_status: PropTypes.string
}

export default Order;