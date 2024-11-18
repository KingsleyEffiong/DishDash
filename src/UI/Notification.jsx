import { useState, useEffect } from "react";
import BackButton from "./BackButton";
import { useProvider } from "../component/Provider";

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const {darkTheme} = useProvider()


  // Load notifications from localStorage on mount
  useEffect(() => {
    const savedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(savedNotifications);
  }, []);

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

        // Save notification to state and localStorage
        setNotifications((prev) => {
          const updatedNotifications = [newNotification, ...prev.filter((data) => data !== newNotification)];
          localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
          return updatedNotifications;
        });
      }
    } catch (error) {
      console.error("Error fetching random meal:", error);
    }
  };

  useEffect(() => {
    const lastNotification = notifications[0];
    const lastNotificationTime = lastNotification
        ? new Date(lastNotification.timestamp).getTime()
        : 0;

    const now = Date.now();
    const sevenHours = 7 * 60 * 60 * 1000;

    if (!lastNotification || now - lastNotificationTime >= sevenHours) {
        fetchRandomMeal();
    }

    const timer = setTimeout(fetchRandomMeal, sevenHours);
    return () => clearTimeout(timer);
},[]); // Removed 'notifications' dependency



  return (
    <div className={`w-full h-full p-4 flex flex-col items-center overflow-auto fixed top-0 left-0 z-20 ${darkTheme !== true ? 'bg-[var(--whitebeige)]' : 'bg-[var(--black-beige)]'} ${darkTheme !== true ? 'text-[var(--whitebeige)]' : 'text-[var(--black-beige)]'}`}>
      <BackButton />
      <h1 className={`${darkTheme === true ? 'text-[var(--whitebeige)]' : 'text-[var(--black-beige)]'}`}>Notification</h1>
      <div className="mt-6 w-full h-full py-10">
        <h2 className={`${darkTheme === true ? 'text-[var(--whitebeige)]' : 'text-[var(--black-beige)]'}`}>New recipes</h2>
        <div className="flex flex-col gap-5">
          {notifications.length === 0 ? (
            <p>No notifications</p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="bg-[var(--pink)] w-full h-[75px] rounded-xl flex flex-row items-center gap-4"
              >
                <img
                  src={notification.thumbnail}
                  alt={notification.title}
                  className="w-12 h-12 rounded-full ml-4"
                />
                <div className="flex flex-col">
                  <h4 className="font-bold">{notification.title}</h4>
                  <p>New Recipe!</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Notification;
