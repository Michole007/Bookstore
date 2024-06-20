import { useSelector } from "react-redux";

const Email_Verification_Message = () => {
    const message = useSelector((state) => state.userReducer.message);

    return (
        <div className="email_verification_wrapper">
            <div className="email_verification">
                <h5>{message}</h5>
            </div>
        </div>
    )
}

export default Email_Verification_Message;