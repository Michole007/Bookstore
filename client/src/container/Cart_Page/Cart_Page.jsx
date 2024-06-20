import { Suspense, lazy } from 'react';
import Mini_Banner from '../../components/Mini_Banner/Mini_Banner';

const Header = lazy(() => import('../../components/Headers/Header'));
const Cart = lazy(() => import('../../components/Cart/Carts'));
const Footer = lazy(() => import('../../components/Footer/Footer'));

const Cart_Page = () => {
    return (
        <div className="cart_page">
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <Mini_Banner title='Shopping Cart' link='cart' />
                <Cart />
                <Footer />
            </Suspense>
        </div>
    );
}

export default Cart_Page;
