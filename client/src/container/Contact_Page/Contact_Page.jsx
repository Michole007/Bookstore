import { lazy, Suspense } from 'react';

const Header = lazy(() => import("../../components/Headers/Header"));
const Footer = lazy(() => import("../../components/Footer/Footer"));
const Contact = lazy(() => import("../../components/Contact/Contact"));
const Mini_Banner = lazy(() => import("../../components/Mini_Banner/Mini_Banner"));

const Contact_Page = () => {
    return (
        <div className="contact_page">
            <Suspense fallback={<div>Loading........</div>}>
                <Header />
                <Mini_Banner title='Contact Us' link='contact' />
                <Contact />
                <Footer />
            </Suspense>
        </div>
    )
}

export default Contact_Page;