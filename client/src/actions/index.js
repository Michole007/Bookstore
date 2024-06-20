import * as api from '../api';
import {
    add_products,
    add_to_cart,
    add_all_to_cart,
    clear_cart_item,
    remove_item,
    update_item,
    searched_items,
    product_error_status,
    order_placed,
    payment_verfied
} from '../reducers/productReducer';
import { register, login, register_status, logout_user, error_status } from '../reducers/userReducer';


export const logout = (navigate) => (dispatch) => {
    dispatch(logout_user());

    navigate('/');
    window.location.reload();
}

export const verify_email = (token, navigate) => async (dispatch) => {
    try {
        const { data } = await api.verify_email(token);

        console.log(data);

        dispatch(register_status(data));

        navigate('/home');

        window.location.reload();
    } catch (error) {
        if (error.response.data.msg) {
            dispatch(error_status(error.response.data.msg));
        } else {
            dispatch(error_status('Internal Server Error'));
        }
    }
}

export const signup = (form_data, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signup(form_data);

        dispatch(register(data));

        navigate('/email_verification_message');
    } catch (error) {
        if (error.response.data.msg) {
            dispatch(error_status(error.response.data.msg));
        } else {
            dispatch(error_status('Internal Server Error'));
        }
    }
}

export const signin = (form_data, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signin(form_data);

        await dispatch(login(data));

        navigate('/');
        window.location.reload();
    } catch (error) {
        console.log(error);
        if (error.response.data.msg) {
            dispatch(error_status(error.response.data.msg));
        } else {
            dispatch(error_status('Internal Server Error'));
        }
    }
}

export const all_products = (limit) => async (dispatch) => {
    try {
        const { data } = await api.all_products(limit);

        dispatch(add_products(data));

        return data;
    } catch (error) {
        if (error.response.data.msg) {
            dispatch(product_error_status(error.response.data.msg));
        } else {
            dispatch(product_error_status('Internal Server Error'));
        }
    }
}

export const add_product_to_cart = (product_data) => async (dispatch) => {
    try {
        const { data } = await api.add_to_cart(product_data);

        dispatch(add_to_cart(data))
    } catch (error) {
        if (error.response.data.msg) {
            dispatch(product_error_status(error.response.data.msg));
        } else {
            dispatch(product_error_status('Internal Server Error'));
        }
    }
}

export const get_all_carts = () => async (dispatch) => {
    try {
        const { data } = await api.get_all_carts();

        dispatch(add_all_to_cart(data));

        return data;
    } catch (error) {
        if (error.response.data.msg) {
            dispatch(product_error_status(error.response.data.msg));
        } else {
            dispatch(product_error_status('Internal Server Error'));
        }
    }
}

export const empty_cart_item = (userid) => async (dispatch) => {
    try {
        const { data } = await api.empty_cart(userid);

        dispatch(clear_cart_item(data));
    } catch (error) {
        if (error.response.data.msg) {
            dispatch(product_error_status(error.response.data.msg));
        } else {
            dispatch(product_error_status('Internal Server Error'));
        }
    }
}

export const remove_item_from_cart = (cartId) => async (dispatch) => {
    try {
        const { data } = await api.remove_item_from_cart(cartId);

        dispatch(remove_item({ cartId, data }));
    } catch (error) {
        if (error.response.data.msg) {
            dispatch(product_error_status(error.response.data.msg));
        } else {
            dispatch(product_error_status('Internal Server Error'));
        }
    }
}

export const update_item_from_cart = (cartId, update_data) => async (dispatch) => {
    try {
        const { data } = await api.update_item_from_cart(cartId, update_data);

        dispatch(update_item({ cartId, data }));
    } catch (error) {
        if (error.response.data.msg) {
            dispatch(product_error_status(error.response.data.msg));
        } else {
            dispatch(product_error_status('Internal Server Error'));
        }    }
}

export const search_item = (search_value) => async (dispatch) => {
    try {
        const { data } = await api.search_for_an_item(search_value);

        dispatch(searched_items(data));
    } catch (error) {
        if (error.response.data.msg) {
            dispatch(product_error_status(error.response.data.msg));
        } else {
            dispatch(product_error_status('Internal Server Error'));
        }
    }
}

export const place_order = (order_data) => async (dispatch) => {
    try {
        const { data } = await api.place_order(order_data);
        
        dispatch(order_placed(data));
    } catch (error) {
        console.log(error);
        if (error.response.data.msg) {
            dispatch(product_error_status(error.response.data.msg));
        } else {
            dispatch(product_error_status('Internal Server Error'));
        }
    }
}

export const get_order = () => async (dispatch) => {
    try {
        const { data } = await api.get_order();

        return data;
    } catch (error) {
        console.log(error);
        if (error.response.data.msg) {
            dispatch(product_error_status(error.response.data.msg));
        } else {
            dispatch(product_error_status('Internal Server Error'));
        }
    }
}

export const checkout_session = () => async (dispatch) => {
    try {
        const { data } = await api.create_checkout_session();

        window.location = `${data.url}`;
    } catch (error) {
        if (error.response.data.msg) {
            dispatch(product_error_status(error.response.data.msg));
        } else {
            dispatch(product_error_status('Internal Server Error'));
        }
    }
}

export const confirm_payment_status = (payment_status) => async (dispatch) => {
    try {
        console.log(payment_status)
        if (payment_status === 'failed') {
            throw new Error('Payment failed');
        }

        const { data } = await api.verify_payment_status(payment_status);

        console.log(data);

        dispatch(payment_verfied(data));
    } catch (error) {
        console.log(error);
        if (error === 'Payment failed') {
            // Dispatch an error message when payment_status is 'failed' or if there's an exception.
            dispatch(product_error_status("Payment canceled -- continue to shop around and checkout when you're ready."));
        } else if (error.response.data.msg) {
            dispatch(product_error_status(error.response.data.msg));
        } else {
            dispatch(product_error_status('Internal Server Error'));
        }
    }
}




