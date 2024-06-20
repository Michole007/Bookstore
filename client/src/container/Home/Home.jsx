import { lazy, Suspense } from 'react';

const Header = lazy(() => import("../../components/Headers/Header"));
const Footer = lazy(() => import("../../components/Footer/Footer"));
const Products = lazy(() => import("../../components/Products/Products"));
const Banner = lazy(() => import('../../components/Banner/Banner'));
const About = lazy(() => import('../../components/About/About'));
const Question = lazy(() => import('../../components/Question/Question'));


const Home = () => {
  return (
    <Suspense fallback={<div>Loading............</div>}>
      <Header />
      <Banner />
      <div className="container_product_about">
        <Products />
        <About />
      </div>
      <Question />
      <Footer />
    </Suspense>
  )
}

export default Home;