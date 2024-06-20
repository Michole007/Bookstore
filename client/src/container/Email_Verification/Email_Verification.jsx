import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verify_email } from '../../actions';

const Email_Verification = () => {
    const { token } = useParams();
    const decodedToken = atob(token); // Decode the token using atob
    const message = useSelector((state) => state.userReducer.message);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(verify_email(decodedToken, navigate));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return (
        <div>
            <h2>Email Verification Page</h2>
            <p>{message}</p>
            {/* You can add more UI elements here */}
        </div>
    );
};

export default Email_Verification;