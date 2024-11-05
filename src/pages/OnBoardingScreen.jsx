import { Outlet } from "react-router-dom"
import ToggleTheme from "../UI/ToggleTheme";


function OnBoardingScreen() {
    return (
        <div className=''>
            <ToggleTheme />
           <Outlet />
        </div>
    )
}

export default OnBoardingScreen
