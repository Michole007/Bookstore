import { lazy } from 'react';

// Import components using lazy and dynamic imports
export const Components = {
    Checkout: lazy(() => import('./container/Checkout/Checkout')),
    Orders_Page: lazy(() => import('./container/Orders_Page/Orders_Page')),
    Email_Verification: lazy(() => import('./container/Email_Verification/Email_Verification')),
    Email_Verification_Message: lazy(() => import('./container/Email_Verification_Message/Email_Verification_Message')),
    About_Page: lazy(() => import('./container/About_Page/About_Page')),
    Shop: lazy(() => import('./container/Shop/Shop')),
    Home: lazy(() => import('./container/Home/Home')),
    Contact: lazy(() => import('./container/Contact_Page/Contact_Page')),
    Search: lazy(() => import('./container/Search_Page/Search_Page')),
    Cart: lazy(() => import('./container/Cart_Page/Cart_Page'))
};

// Import authentication-related components using lazy and dynamic imports
export const AuthComponents = {
    Signup: lazy(() => import('./components/Signup')),
    Login: lazy(() => import('./components/Login'))
};