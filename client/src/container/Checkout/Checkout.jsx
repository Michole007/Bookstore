import { lazy, Suspense } from 'react';

const Header = lazy(() => import("../../components/Headers/Header"));
const Footer = lazy(() => import("../../components/Footer/Footer"));
const Order = lazy(() => import("../../components/Place_Order/Place_Order"));
const Mini_Banner = lazy(() => import("../../components/Mini_Banner/Mini_Banner"));

const Checkout = () => {
    return (
        <div className="checkout">
            <Suspense fallback={<div>Loading........</div>}>
                <Header />
                <Mini_Banner title='Checkout' link='checkout' />
                <Order />
                <Footer />
            </Suspense>
        </div>
    )
}

export default Checkout;