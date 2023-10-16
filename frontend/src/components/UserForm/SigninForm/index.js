import Form from "../Form";
import * as sessionActions from "../../../store/session";

const SigninForm = () => {
    return (
        <Form thunkAction={sessionActions.login} rightCol={true}
            pageHeaderText = {"Sign in to ChatLog"} ctaText = {"Sign in"}/>
    )

}

export default SigninForm