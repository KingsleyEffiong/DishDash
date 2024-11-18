import BackButton from "./BackButton";
import { useProvider } from "../component/Provider";
import Button from "./Button";

function Notification() {
  const { darkTheme,dispatch } = useProvider();

  // Load notifications from localStorage
  const savedNotifications =
    JSON.parse(localStorage.getItem("notifications")) || [];

  return (
    <div
      className={`w-full h-full p-4 flex flex-col items-center overflow-auto fixed top-0 left-0 z-20 ${
        darkTheme !== true
          ? "bg-[var(--whitebeige)]"
          : "bg-[var(--black-beige)]"
      } ${
        darkTheme !== true
          ? "text-[var(--whitebeige)]"
          : "text-[var(--black-beige)]"
      }`}
    >
      <BackButton />
      <Button
  className="bg-red-600 absolute right-2 top-3 py-2 px-3 rounded-full"
  onClick={() => {
    localStorage.removeItem("notifications"); // Clear localStorage
    dispatch({ type: "notifications", payload: [] }); // Reset state
  }}
>
  Delete All Notifications
</Button>
      <div className="mt-6 w-full h-full py-10">
        <h2
          className={`${
            darkTheme === true
              ? "text-[var(--whitebeige)]"
              : "text-[var(--black-beige)]"
          }`}
        >
          Today Notification
        </h2>
        <div className="flex flex-col gap-5">
          {savedNotifications.length === 0 ? (
            <h1   className={`${
                darkTheme === true
                  ? "text-[var(--whitebeige)]"
                  : "text-[var(--black-beige)]"
              }`}>No notifications</h1>
          ) : (
            savedNotifications.map((notification) => (
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
