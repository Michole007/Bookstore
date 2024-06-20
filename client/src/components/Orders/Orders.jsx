import { lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { confirm_payment_status } from '../../actions';
import { useDispatch } from 'react-redux';

const Order = lazy(() => import("./Order"));

const usePaymentStatus = (location) => {
  return new URLSearchParams(location).get('payment_status');
}

const Orders = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const payment_status = usePaymentStatus(location.search);
    const { isLoading, isError, error } = useQuery({
        queryKey: [payment_status],
        queryFn: () => dispatch(confirm_payment_status(payment_status)),
        enabled: !!payment_status
    });

    if (isLoading) return <div>Loading.........</div>

    if (isError) return <div>Error: {error}</div>

    return (
        <div className="orders_wrapper">
            <div className="container">
                <div className="title">
                    <h1>place orders</h1>
                </div>       
                <div className="orders">
                    <Suspense fallback={<div>Loading.......</div>}>
                        <Order payment_status={payment_status} />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default Orders;