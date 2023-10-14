import MainContent from "./MainContent";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const HomePage = () => {
    
    const sessionUser = useSelector(state => state.session.currentUser)
    if(sessionUser){
        return <Redirect to="/signin/workspaces"/>
    }

    return (
        <>
            <NavBar header={true}/>
            <MainContent/>
            <NavBar background="horchata"/>
        </>
    )
}

export default HomePage;