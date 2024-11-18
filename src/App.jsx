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
import { auth } from './Firebase';
import { onAuthStateChanged } from "firebase/auth";
import Notification from "./UI/Notification";


function App() {
  const { launchScreen, dispatch, darkTheme, authenticate } = useProvider();
  const userId = localStorage.getItem('userId');


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: "authenticate", payload: true });
        dispatch({type:'userName', payload:user.displayName})
      } else {
        dispatch({ type: "authenticate", payload: false });
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: "launchScreen", payload: false });
    }, 3000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div
      className={`w-auto h-auto ${
        darkTheme ? 'bg-[#1C0F0D] text-white' : 'bg-white text-[#1C0F0D]'
      } relative`}
    >
      <ToggleTheme />
      <BrowserRouter>
        {launchScreen ? (
          <Launch />
        ) : (
          <Routes>
            {/* Onboarding Routes */}
            {!authenticate && !userId ? (
              <>
              <Route path="/" element={<OnBoardingScreen />}>
              <Route path="/" element={<Navigate to="/getinspired" />}/>
                <Route path="/getinspired"  element={<FirstScreen />} />
                <Route path="/increasedskill" element={<SecondScreen />} />
                <Route path="/welcome" element={<Welcome />} />
              </Route>
                     <Route path="/signup" element={<Signup />} />
                     <Route path="/login" element={<Login />} />
                     <Route path="/cookinglevel" element={<CookingLevel />} />
                     <Route path="/foodpreference" element={<FoodPreference />} />
                     <Route path="/allergies" element={<Alligies />} />
              </>
            ) : null}

            {/* Authentication Routes */}
            {!authenticate && userId ? (
              <>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" index element={<Login />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </>
            ) : null}

            {/* Authenticated Routes */}
            {authenticate && userId ? (
              <>
                <Route path="/dashboard" element={<Dashbaord />}>
                  <Route path="homepage" index element={<Homepage />} />
                </Route>
                <Route path="/notifications" element={<Notification />} />
                <Route path="/update-profile" element={<UpdateProfile />} />
                <Route path="*" element={<Navigate to="/dashboard/homepage" replace />} />
              </>
            ) : null}
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
