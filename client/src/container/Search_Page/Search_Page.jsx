import { lazy, Suspense } from 'react';

const Header = lazy(() => import("../../components/Headers/Header"));
const Footer = lazy(() => import("../../components/Footer/Footer"));
const Mini_Banner = lazy(() => import("../../components/Mini_Banner/Mini_Banner"));
const Search = lazy(() => import("../../components/Search/Search"));

const Search_Page = () => {
    return (
        <div className="search">
            <Suspense fallback={<div>Loading.......</div>}>
                <Header />
                <Mini_Banner title='Search' link='search' />
                <Search />
                <Footer />
            </Suspense>
        </div>
    )
}

export default Search_Page;