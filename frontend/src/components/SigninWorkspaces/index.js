import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom";

const SigninWorkspaces = () => {
    const sessionUser = useSelector((state) => {
        return state.session.user
    });

    if(!sessionUser) {
        return <Redirect to="/signin" />;
    }

    return (
        <h1>Welcome to Workspaces home page !!</h1>
    )
}

export default SigninWorkspaces;