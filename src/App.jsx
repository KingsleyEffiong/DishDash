import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Launch from "./component/Launch";
import OnBoardingScreen from "./pages/OnBoardingScreen";
import { useEffect } from "react";
import { useProvider } from "./component/Provider";
import FirstScreen from "./component/OnBoarding/FirstScreen";
import SecondScreen from "./component/OnBoarding/SecondScreen";
import Welcome from "./component/OnBoarding/Welcome";
import CookingLevel from "./pages/CookingLevel";
import FoodPreference from "./pages/FoodPreference";
import Alligies from "./pages/Alligies";
import Login from "./pages/Login";
import ToggleTheme from "./UI/ToggleTheme";
import Signup from "./pages/Signup";
import UpdateProfile from "./pages/UpdateProfile";
import Homepage from "./component/Dashboard/Homepage";
import Dashbaord from "./pages/Dashbaord";
import {auth} from './Firebase'
import {onAuthStateChanged, signOut } from "firebase/auth"
import Button from "./UI/Button";
// import Overlay from "./UI/Overlay";

function App() {
const {launchScreen, dispatch, darkTheme, authenticate} = useProvider();

const handleLogout = async () => {
  try {
      await signOut(auth);
      // Clear any additional user-related data (like localStorage or cookies)
      localStorage.removeItem("userId");

      // Update authentication state in the app
      dispatch({ type: "authenticate", payload: false });

      // Navigate to the login page or home page
      navigate("/login");
  } catch (error) {
      console.error("Error logging out: ", error);
  }
};
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
          dispatch({ type: "authenticate", payload: true });
      } else {
          dispatch({ type: "authenticate", payload: false });
      }
  });
  return () => unsubscribe();
}, [dispatch]);


  useEffect(() =>{
    const timer = setTimeout(() =>{
      dispatch({type:"launchScreen", payload:false})
    },3000)
    return () => clearTimeout(timer)
  }, [dispatch])



  return (
    <div
    className={`w-auto h-auto ${
      darkTheme ? 'bg-[#1C0F0D] text-white' : 'bg-white text-[#1C0F0D]'
    } relative`}
  >
    <ToggleTheme />
    <Button onClick={handleLogout} className="bg-red-600">Logout</Button>
    <BrowserRouter>
      {launchScreen ? (
        <Launch />
      ) : (
        <Routes>
          {/* Public Routes */}
          {!authenticate ? (
            <>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <>
              {/* Authenticated Routes */}
              <Route path="/" element={<OnBoardingScreen />}>
                <Route path="/getinspired" index element={<FirstScreen />} />
                <Route path="/increasedskill" element={<SecondScreen />} />
                <Route path="/welcome" element={<Welcome />} />
              </Route>
              <Route path="/dashboard" element={<Dashbaord />}>
                <Route path="homepage" index element={<Homepage />} />
              </Route>
              <Route path="/cookinglevel" element={<CookingLevel />} />
              <Route path="/foodpreference" element={<FoodPreference />} />
              <Route path="/allergies" element={<Alligies />} />
              <Route path="/update-profile" element={<UpdateProfile />} />
              <Route path="*" element={<Navigate to="/dashboard/homepage" replace />} />
            </>
          )}
        </Routes>
      )}
    </BrowserRouter>
  </div>
);
}


export default App;
