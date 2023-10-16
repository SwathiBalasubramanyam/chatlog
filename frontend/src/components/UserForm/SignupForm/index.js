import Form from "../Form";
import * as sessionActions from "../../../store/session";

const SignupForm = () => {
    return (
        <Form 
            thunkAction={sessionActions.signup}
            pageHeaderText = {"First, enter your email"} 
            ctaText = {"Continue"}
        />
    )

}

export default SignupForm