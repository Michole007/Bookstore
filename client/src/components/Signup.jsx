import { useState } from "react";
import { Link } from 'react-router-dom';
import { signup } from "../actions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

const Signup = () => {
    const [form_data, set_form_data] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        type: ''
    });
    const message = useSelector((state) => state.userReducer.message);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChange = (e) => {
        set_form_data({ ...form_data, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const { username, email, password, confirm_password } = form_data;

        if (username === '' || email === '' || confirm_password === '' || password === '') return;

        dispatch(signup(form_data, navigate));
    }

    return (
        <div className="signup_wrapper">
            <div className="signup">
                <div className="title">
                    <h2>Sign Up</h2>
                </div>
                <form onSubmit={onSubmit}>
                    {message !== '' && (
                        <p>{message}</p>
                    )}
                    <div className="username">
                        <input type="text" value={form_data.username} name="username" onChange={onChange} placeholder="Enter Username......" />
                    </div>
                    <div className="email">
                        <input type="email" value={form_data.email} name="email" onChange={onChange}  placeholder="Enter Email........" />
                    </div>
                    <div className="password">
                        <input type="password" value={form_data.password} name="password" onChange={onChange}  placeholder="Enter Password........." />
                    </div>
                    <div className="confirm_password">
                        <input type="password" value={form_data.confirm_password} name="confirm_password" onChange={onChange}  placeholder="Confirm Password........" />
                    </div>
                    <div className="type_login">
                        <select name="type" value={form_data.type} onChange={onChange}>
                            <option value="user" key="user">user</option>
                            <option value="admin" key="admin">admin</option>
                        </select>
                    </div>
                    <div className="submit_handler">
                        <button type="submit">SignUp</button>
                        <p>Already have an account? <Link to="/login">login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;