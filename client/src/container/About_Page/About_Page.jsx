import { lazy, Suspense } from 'react';

const Header = lazy(() => import("../../components/Headers/Header"));
const Footer = lazy(() => import("../../components/Footer/Footer"));
const Why = lazy(() => import("../../components/Why/Why"));
const Mini_Banner = lazy(() => import("../../components/Mini_Banner/Mini_Banner"));


const About_Page = () => {
  return (
    <div className="about_page">
      <Suspense fallback={<div>Loading..........</div>}>
        <Header />
        <Mini_Banner title='About Us' link='about' />
        <Why />
        <Footer />
      </Suspense>
    </div>
  )
}

export default About_Page;