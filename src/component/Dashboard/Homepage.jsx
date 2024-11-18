import BottomNav from "../BottomNav"
import SearchBar from "../SearchBar"
import Chefs from "./Chefs"
import Mealtime from "./Mealtime"
import TrendingRecipe from "./TrendingRecipe"
import UserRecipe from "./UserRecipe"
import Overlay from "../../UI/Overlay"
import { useProvider } from "../Provider"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

function Homepage() {
    const {showSearch, dispatch, userName, notifications} = useProvider();
    const signUpUserName  = localStorage.getItem('user');
    const navigate = useNavigate();

    function handShowNotification(){
        navigate('/notifications')
        dispatch({type:'unReadNotification', payload:0})
    }

    const fetchRandomMeal = async () => {
        try {
            const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
            const data = await response.json();
    
            if (data?.meals?.length > 0) {
                const randomMeal = data.meals[0];
                const newNotification = {
                    id: randomMeal.idMeal,
                    title: randomMeal.strMeal,
                    thumbnail: randomMeal.strMealThumb,
                    timestamp: new Date().toISOString(),
                };
    
                // Fetch existing notifications from localStorage
                const storedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
                const updatedNotifications = [
                    newNotification,
                    ...storedNotifications.filter((notif) => notif.id !== newNotification.id),
                ];
    
                // Save updated notifications to localStorage
                localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
    
                // Update state with new notifications
                dispatch({
                    type: "notifications",
                    payload: updatedNotifications,
                });
            }
        } catch (error) {
            console.error("Error fetching random meal:", error);
        }
    };
    
    
      
    useEffect(() => {
        const lastNotification = Array.isArray(notifications) ? notifications[0] : null;
        const lastNotificationTime = lastNotification
            ? new Date(lastNotification.timestamp).getTime()
            : 0;
    
        const now = Date.now();
        const sevenHours = 7 * 60 * 60 * 1000; // 7 hours in milliseconds

    
        if (!lastNotification || now - lastNotificationTime >= sevenHours) {
            fetchRandomMeal();
        }
    
        const timer = setInterval(fetchRandomMeal, sevenHours);
        return () => clearInterval(timer); // Cleanup on unmount
    }, [notifications]);
    
      

    return (
        <div className="w-full h-full p-4 flex flex-col items-center">
              <nav className="w-full h-[55px] flex flex-row justify-around items-start my-10">
                <div className="">
                    <h1>Hi! {userName || signUpUserName}</h1>
                    <h3>What are you cooking today</h3>
                </div>
                <div className="flex flex-row gap-3">
                    <div className="relative">
                    <div className="w-3 h-3 p-3 rounded-full bg-red-700 text-white absolute flex justify-center items-center -top-5 -right-3">
                    <p>{notifications.length}</p>
                    </div>
                <svg width="28" height="28" style={{cursor:'pointer'}} onClick={handShowNotification} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="28" height="28" rx="13.8409" fill="#FFC6C9"/>
            <path d="M14.7243 21.5039C14.6976 21.7281 14.5895 21.9349 14.4206 22.0848C14.2518 22.2348 14.0337 22.3176 13.8078 22.3176C13.582 22.3176 13.364 22.2348 13.1951 22.0848C13.0262 21.9349 12.9181 21.7281 12.8914 21.5039M8.21195 15.9896C8.61418 14.9715 8.76447 13.8714 8.65007 12.7827C8.60075 12.3357 8.61121 11.884 8.68117 11.4398C8.89442 10.17 9.55084 9.01686 10.5338 8.1852C11.5168 7.35355 12.7627 6.89718 14.0503 6.89718C15.3379 6.89718 16.5838 7.35355 17.5667 8.1852C18.5497 9.01686 19.2061 10.17 19.4193 11.4398C19.4893 11.884 19.4998 12.3357 19.4504 12.7827C19.3387 13.8713 19.4889 14.9709 19.8886 15.9896C20.0517 16.3746 20.1228 16.7922 20.0964 17.2095C20.07 17.6267 19.9467 18.032 19.7364 18.3933C19.5261 18.7546 19.2344 19.062 18.8846 19.2909C18.5348 19.5199 18.1365 19.6642 17.7212 19.7125C15.2824 19.9855 12.8207 19.9855 10.3819 19.7125C9.96661 19.6641 9.56831 19.5197 9.2185 19.2907C8.8687 19.0618 8.57698 18.7546 8.36645 18.3934C8.15592 18.0322 8.03237 17.6269 8.00555 17.2097C7.97873 16.7925 8.04939 16.3748 8.21195 15.9896ZM15.0198 5.967C15.0198 6.50106 14.5869 6.93401 14.0528 6.93401C13.5188 6.93401 13.0858 6.50106 13.0858 5.967C13.0858 5.43294 13.5188 5 14.0528 5C14.5869 5 15.0198 5.43294 15.0198 5.967Z" stroke="#EC888D" strokeWidth="1.29625" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
                    </div>

                <svg width="28" height="28" style={{cursor:'pointer'}} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => dispatch({type:'showSearch', payload:true})}>
            <rect width="28" height="28" rx="13.8409" fill="#FFC6C9"/>
            <path d="M16.5538 17.4146L19.286 19.4412C19.5297 19.6221 19.6914 19.8924 19.7358 20.1926C19.7802 20.4928 19.7035 20.7983 19.5226 21.0419C19.3417 21.2856 19.0714 21.4473 18.7712 21.4917C18.4711 21.5361 18.1656 21.4594 17.922 21.2785C17.7928 21.1814 17.6852 21.0586 17.6057 20.9179L15.9502 17.9448C15.9049 17.8628 15.889 17.7677 15.9051 17.6754C15.9213 17.5831 15.9684 17.499 16.0389 17.4371C16.1093 17.3753 16.1987 17.3393 16.2923 17.3352C16.386 17.3311 16.4782 17.3592 16.5538 17.4146Z" stroke="#EC888D" strokeWidth="1.2241" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12.3714" cy="12.5417" r="5.93182" transform="rotate(-41.2978 12.3714 12.5417)" stroke="#EC888D" strokeWidth="1.31818"/>
            </svg>
                </div>
              </nav>
              <Mealtime />
              <TrendingRecipe />
              <UserRecipe />
              <Chefs />
              <BottomNav />
              {showSearch && 
              <>
              <SearchBar />
              <Overlay />
              </>
              }
        </div>
    )
}

export default Homepage
