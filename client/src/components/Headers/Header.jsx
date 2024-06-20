import { FaFacebookF, FaInstagram, FaLinkedin, FaSearch, FaShoppingCart, FaTwitter, FaUser } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_all_carts, logout } from '../../actions';
import { clear_message } from '../../reducers/productReducer';
import decode from 'jwt-decode';

const Header = () => {
    const dispatch = useDispatch();
    const { carts, message } = useSelector((state) => state.productReducer);
    const result = JSON.parse(localStorage.getItem('result'));
    const location = useLocation();
    const [show_profile, set_show_profile] = useState(false);
    const navigate = useNavigate();
    const [show_menu, set_menu] = useState(false);
    useEffect(() => {
        dispatch(get_all_carts());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [message]);
    
    useEffect(() => {
      // Check token expiration here
        checkTokenExpiration();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[location]);

    const checkTokenExpiration = () => {
        const decodedToken = decode(result?.result.accessToken);

        // Check if token has expired
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTime) {
            console.log('got to this point')

            dispatch(logout(navigate));
        }
    };

    return (
        <div className='header'>
            {message !== '' && (
                <div className='added_message'>
                    <div className='container' style={{ display: 'flex', justifyContent: 'space-between', height: '40px', alignContent: 'center' }}>
                        <p>{message}</p>
                        <h2 onClick={() => dispatch(clear_message())} style={{fontFamily: 'sans-serif',cursor: 'pointer'}}>x</h2>
                    </div>
                </div>
            )}
            <div className="top_header">
                <div className="container">
                    <div className="social_media_icons">
                        <Link to=''><FaFacebookF /></Link>
                        <Link to=''><FaTwitter /></Link>
                        <Link to=''><FaInstagram /></Link>
                        <Link to=''><FaLinkedin /></Link>
                    </div>
                    <div className='profile'>
                        <Link to=''>new <span>login</span></Link>
                        <Link to=''>register</Link>
                    </div>
                </div>
            </div>
            <div className="bottom_header">
                <div className="container">
                    <div className="logo">
                        <h2><Link to='/'>Bookly.</Link></h2>
                    </div>
                    <div className="hamburger_menu" onClick={() => set_menu((!show_menu))}>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                    <nav style={show_menu ? { visibility: 'visible', opacity: '1', top: '60px', zIndex: '2' } : {}}>
                        <ul>
                            <Link to='/home'>home</Link>
                            <Link to='/about'>about</Link>
                            <Link to='/shop'>shop</Link>
                            <Link to='/contact'>contact</Link>
                            <Link to='/orders'>orders</Link>
                        </ul>
                    </nav>
                    <div className='icons'>
                        <Link to='/search'><FaSearch /></Link>
                        <Link to='' onClick={() => set_show_profile((!show_profile))}><FaUser /></Link>
                        <div className='profile' style={show_profile ? { visibility: 'visible', opacity: '1', top: '50px', zIndex: '2' } : {}}>
                            <h4>Username: {result?.result.username}</h4>
                            <h4>Email: {result?.result.email}</h4>
                        </div>
                        <Link to='/cart'><FaShoppingCart /></Link>
                        <Link to='/cart'>({carts.length})</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;