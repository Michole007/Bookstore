import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer'>
        <div className="container_footer">
            <div className="quick">
                <h3>quick links</h3>
                <ul>
                    <Link to=''>home</Link>
                    <Link to=''>about</Link>
                    <Link to=''>shop</Link>
                    <Link to=''>contact</Link>
                </ul>
            </div>
            <div className="extra">
                <h3>extra links</h3>
                <ul>
                    <Link to=''>login</Link>
                    <Link to=''>cart</Link>
                    <Link to=''>register</Link>
                    <Link to=''>orders</Link>
                </ul>
            </div>
            <div className="contac">
                <h3>contact info</h3>
                <ul>
                    <Link to=''>111</Link>
                    <Link to=''>1111</Link>
                    <Link to=''>1111</Link>
                    <Link to=''>1111</Link>
                </ul>
            </div>
            <div className="follow">
                <h3>follow us</h3>
                <ul>
                    <Link to=''><FaFacebook /> facebook</Link>
                    <Link to=''><FaTwitter /> twitter</Link>
                    <Link to=''><FaInstagram /> Instagram</Link>
                    <Link to=''><FaLinkedin /> LinkedIn</Link>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Footer;