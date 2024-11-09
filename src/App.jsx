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
// import Overlay from "./UI/Overlay";

function App() {
const {launchScreen, dispatch, darkTheme} = useProvider();
  useEffect(() =>{
    const timer = setTimeout(() =>{
      dispatch({type:"launchScreen", payload:false})
    },3000)
    return () => clearTimeout(timer)
  }, [dispatch])
  return (
    <div className={`w-auto h-auto ${darkTheme === true ? 'bg-[#1C0F0D]' : 'bg-white'} relative ${darkTheme === true ? 'text-white' : 'text-[#1C0F0D]'}`}>
      <ToggleTheme />
      {/* <Overlay /> */}
    <BrowserRouter>
    {launchScreen ? 
    (<Launch />
    ):(
      <Routes>
      <Route path="/" element={<OnBoardingScreen />}>
      <Route index element={<Navigate replace to="/getinspired" />} />
      <Route path="getinspired" element={<FirstScreen />}/>
      <Route path="increasedskill" element={<SecondScreen />}/>
      <Route path="welcome" element={<Welcome />}/>
      </Route>
      <Route path="/dashboard" element={<Dashbaord />}>
        <Route path="homepage" index element={<Homepage />}/>
      </Route>
      <Route path="/cookinglevel" element={<CookingLevel />}/>
      <Route path="/foodpreference" element={<FoodPreference />}/>
      <Route path="/alligies" element={<Alligies />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/update-profile" element={<UpdateProfile />}/>
    </Routes>
    )}
    </BrowserRouter>
    </div>
  );
}


export default App;
