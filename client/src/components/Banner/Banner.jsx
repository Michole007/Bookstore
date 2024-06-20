import { Link } from "react-router-dom";

import image from '../../assets/banner.jpg';

const Banner = () => {
  return (
    <div className="banner" style={{ backgroundImage: `url(${image})` }}>
        <div className="banner_text">
            <h1>hand picked book to your door.</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quis esse, magni rem tenetur inventore fugit odio excepturi eveniet commodi alias error, enim, sint eligendi iusto cum doloribus accusantium ducimus.</p>
            <Link to=''>discover more</Link>
        </div>
    </div>
  )
}

export default Banner;