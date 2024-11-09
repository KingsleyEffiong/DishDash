import { useState } from "react";
import Button from "../../UI/Button";

const meals = [
    {
        id: 1,
        name: 'Breakfast'
    },
    {
        id: 2,
        name: 'Lunch'
    },
    {
        id: 3,
        name: 'Dinner'
    }
];

function Mealtime() {
    // Set the first meal as active by default
    const [active, setActive] = useState(meals[0].id);

    // Function to update the active meal
    const updateActive = (id) => {
        setActive(id);
    };

    return (
        <ul className="w-full h-[25px] grid place-items-center">
            <li className="flex flex-row gap-4">
                {meals.map((meal) => (
                    <Button
                        key={meal.id}
                        onClick={() => updateActive(meal.id)}
                        className={`px-5 py-1 rounded-full w-fit ${
                            active === meal.id ? "bg-[var(--red-pink-main)]" : ""
                        }`}
                    >
                        {meal.name}
                    </Button>
                ))}
            </li>
        </ul>
    );
}

export default Mealtime;
