import { Outlet } from "react-router-dom"
import Button from "../UI/Button"
import {signOut } from "firebase/auth";
import { auth } from '../Firebase';
import { useProvider } from "../component/Provider";

function Dashbaord() {
    const {dispatch} = useProvider()
    const handleLogout = async () => {
        try {
          await signOut(auth);
          dispatch({ type: "authenticate", payload: false });
        } catch (error) {
          console.error("Error logging out: ", error);
        }
      };
    
    return (
        <div className="">
        <Button onClick={handleLogout} className="bg-red-600 absolute top-3 left-3 w-28 py-2 px-3 rounded-full">Logout</Button>
            <Outlet />
        </div>
    )
}

export default Dashbaord
