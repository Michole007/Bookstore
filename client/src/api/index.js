import axios from 'axios';

const API = axios.create({
    baseURL: 'https://e-commerce-bookstore-murex.vercel.app'
});

API.interceptors.request.use((request) => {
    if (localStorage.getItem('result')) {
        request.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('result'))?.result.accessToken}`;
    }

    return request;
})

export const signup = (form_data) => API.post('/users/signup', form_data);
export const signin = (form_data) => API.post('/users/signin', form_data);
export const verify_email = (token) => API.get(`/users/verify_email/${token}`);

export const all_products = (limit) => API.get(`/products/all_products?_limit=${limit}`);
export const search_for_an_item = (search_value) => API.get(`/products/search?search=${search_value}`);

export const add_to_cart = (data) => API.post('/cart/add', data);
export const get_all_carts = () => API.get('/cart/get_carts');
export const empty_cart = (userid) => API.delete(`/cart/empty/${userid}`);
export const remove_item_from_cart = (id) => API.delete(`/cart/delete_item/${id}`);
export const update_item_from_cart = (id, update_data) => API.put(`/cart/update_item/${id}`, update_data);

export const place_order = (order_data) => API.post('/order/place_order', order_data);
export const get_order = () => API.get('/order/get_order');

export const create_checkout_session = () => API.post('/checkout/create_checkout_session');
export const verify_payment_status = (payment_status) => API.put(`/checkout/verify_payment_status?payment_status=${payment_status}`);
