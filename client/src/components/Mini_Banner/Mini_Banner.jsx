import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import about from '../../assets/banner.jpg';

const Mini_Banner = ({ title, link }) => {
    return (
        <div className='mini_banner' style={{
              fontFamily: 'sans-serif',
              backgroundImage: `url(${about})`,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              height: '200px',
              justifyContent: 'center',
              lineHeight: '1.5',
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}>
                <h1>{title}</h1>
                <div>
                    <Link to='/products'>home / </Link>
                    <Link to={`/${link}`}>{link}</Link>  
                </div>
            </div>
    )
}

Mini_Banner.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
}

export default Mini_Banner