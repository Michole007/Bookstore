import { lazy, Suspense } from 'react';

const Header = lazy(() => import("../../components/Headers/Header"));
const Footer = lazy(() => import("../../components/Footer/Footer"));
const Products = lazy(() => import("../../components/Products/Products"));
const Mini_Banner = lazy(() => import("../../components/Mini_Banner/Mini_Banner"));

const Shop = () => {
    return (
        <div className='shop'>
            <Suspense fallback={<div>Loading........</div>}>
                <Header />
                <Mini_Banner title='Our Shop' link='shop' />
                <div className="container_product_about">
                    <Products />
                </div>
                <Footer />
            </Suspense>
        </div>
    )
}

export default Shop;