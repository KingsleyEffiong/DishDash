import { useEffect, useState } from "react";
import BackButton from "../UI/BackButton";
import Button from "../UI/Button";
import anime from "animejs";
import { useNavigate } from "react-router-dom";
import { useProvider } from "../component/Provider";
import ReactTypingEffect from "react-typing-effect";

function FoodPreference() {
    const { recipeData, dispatch } = useProvider();
    const navigate = useNavigate();

    // Load selected recipes from localStorage
    const [selectedRecipes, setSelectedRecipes] = useState(() => {
        return JSON.parse(localStorage.getItem("recipes")) || [];
    });

    // Check if a recipe is selected
    const isRecipeSelected = (query) => selectedRecipes.includes(query);

    // Handle recipe selection/deselection
    const recipeSelected = (recipe) => {
        let updatedRecipes;
        if (isRecipeSelected(recipe)) {
            updatedRecipes = selectedRecipes.filter((item) => item !== recipe); // Deselect
        } else {
            updatedRecipes = [...selectedRecipes, recipe]; // Select
        }

        setSelectedRecipes(updatedRecipes);
        localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    };

    // Animation effect
    useEffect(() => {
        anime({
            targets: ".recipe-item",
            opacity: [0, 1],
            translateY: [50, 0],
            delay: anime.stagger(200),
            duration: 800,
            easing: "easeOutExpo",
        });
    }, [recipeData]);

    // Fetch recipes on mount
    useEffect(() => {
        const fetchRecipes = async () => {
            const queries = [
                "Salad", "Soup", "Egg", "Seafood", "Chicken", "Meat", "Burger", "Pizza",
                "Sushi", "Rice", "Dessert", "Bread",
            ];
            const baseUrl = `https://www.themealdb.com/api/json/v1/1/search.php`;

            try {
                const responses = await Promise.all(
                    queries.map((query) =>
                        fetch(`${baseUrl}?s=${query}`).then((response) => response.json())
                    )
                );

                const data = responses
                    .map((response, index) => {
                        if (response.meals && response.meals.length > 0) {
                            return {
                                label: response.meals[0].strMeal,
                                image: response.meals[0].strMealThumb,
                                id: response.meals[0].idMeal,
                                query: queries[index],
                            };
                        }
                        return null;
                    })
                    .filter((item) => item !== null);

                dispatch({ type: "recipeData", payload: data });
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        fetchRecipes();
    }, [dispatch]);

    return (
        <div className="h-screen flex flex-col items-center justify-start md:justify-center px-6 py-12">
            <BackButton />
            <svg
                width="230"
                height="12"
                viewBox="0 0 230 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect width="230" height="12" rx="6" fill="#D9D9D9" />
                <rect x="82.5" width="65" height="12" rx="6" fill="#FD5D69" />
            </svg>
            <h1 className="text-2xl font-bold">
                <ReactTypingEffect
                    text={["Select your cuisines preferences"]}
                    speed={100}
                    eraseSpeed={50}
                    typingDelay={500}
                    eraseDelay={2000}
                />
            </h1>
            <p className="mt-7 mb-4">
                Please select your cuisines preferences for better recommendations or you can
                skip it.
            </p>
            <div className="flex flex-wrap p-1 gap-3 w-screen h-auto overflow-x-hidden md:overflow-x-auto md:overflow-y-hidden justify-center my-5">
                {recipeData.length > 0 ? (
                    recipeData.map((recipe) => (
                        <div
                            key={recipe.id}
                            className={`recipe-item cursor-pointer px-3 py-4 ${
                                isRecipeSelected(recipe.query) ? "bg-[var(--red-pink-main)] rounded-xl" : ""
                            }`}
                            onClick={() => recipeSelected(recipe.query)}
                        >
                            <img
                                className="w-24 h-24 rounded-xl"
                                src={recipe.image}
                                alt={recipe.label}
                            />
                            <h3 className="text-center font-semibold">{recipe.query}</h3>
                        </div>
                    ))
                ) : (
                    <p>Loading recipes...</p>
                )}
            </div>
            <div className="flex gap-1">
                <Button
                    onClick={() => navigate("/allergies")}
                    className="bg-[var(--pink)] w-44 text-[var(--pink-sup-color)] h-auto px-4 py-3 rounded-full"
                >
                    Skip
                </Button>
                <Button
                    onClick={() => navigate("/allergies")}
                    className="bg-[var(--red-pink-main)] w-44 text-white h-auto px-4 py-3 rounded-full"
                >
                    Continue
                </Button>
            </div>
        </div>
    );
}

export default FoodPreference;
