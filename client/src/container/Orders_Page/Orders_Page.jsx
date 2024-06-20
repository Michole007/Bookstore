import { Suspense, lazy } from 'react';

const Header = lazy(() => import("../../components/Headers/Header"));
const Footer = lazy(() => import("../../components/Footer/Footer"));
const Orders = lazy(() => import("../../components/Orders/Orders"));
const Mini_Banner = lazy(() => import("../../components/Mini_Banner/Mini_Banner"));

const Orders_Page = () => {
  return (
    <div className="orders">
      <Suspense fallback={<div>Loading...........</div>}>
        <Header />
        <Mini_Banner title='Orders' link='orders' />
        <Orders />
        <Footer />
      </Suspense>
    </div>
  )
}

export default Orders_Page;