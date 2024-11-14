import { useEffect, useState } from "react";
import BackButton from "../UI/BackButton";
import Button from "../UI/Button";
import anime from "animejs";
import { useNavigate } from "react-router-dom";
import { useProvider } from "../component/Provider";
import ReactTypingEffect from "react-typing-effect";

function FoodPreference() {
    const {recipeData, dispatch} = useProvider();
    useEffect(() => {
        anime({
            targets: ".recipe-item",
            opacity: [0, 1],
            translateY: [50, 0],
            delay: anime.stagger(200), // Set a reasonable stagger time for each item
            duration: 800,
            easing: "easeOutExpo",
        });
    }, [recipeData]);


    const [selectedRecipes, setSelectedRecipes] = useState(() => {
        return JSON.parse(localStorage.getItem("recipes")) || [];
    });

    function selectedRecipe(recipes) {
        const newRecipe = selectedRecipes.includes(recipes)
            ? selectedRecipes
            : [...selectedRecipes, recipes];

        setSelectedRecipes(newRecipe);
        localStorage.setItem("recipes", JSON.stringify(newRecipe));
    }

    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipes = async () => {
            const queries = [
                "Salad", "Soup", "Egg", "Seafood", "Chicken", "Meat", "Burger", "Pizza", 
                "Sushi", "Rice", "Dessert", "Bread"
            ];
            const baseUrl = `https://www.themealdb.com/api/json/v1/1/search.php`;
    
            try {
                const responses = await Promise.all(
                    queries.map(query =>
                        fetch(`${baseUrl}?s=${query}`)
                            .then(response => response.json())
                    )
                );
    
                const data = responses.map((response, index) => {
                    if (response.meals && response.meals.length > 0) {
                        return {
                            label: response.meals[0].strMeal,
                            image: response.meals[0].strMealThumb,
                            id: response.meals[0].idMeal,
                            query: queries[index]
                        };
                    }
                    return null;
                }).filter(item => item !== null);
    
                console.log(data);
                dispatch({type:'recipeData', payload: data});
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
    
        fetchRecipes();
    }, []);
    

    return (
        <div className='h-screen flex flex-col items-center justify-start md:justify-center px-6 py-12'>
            <BackButton />
            <svg width="230" height="12" viewBox="0 0 230 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="230" height="12" rx="6" fill="#D9D9D9"/>
            <rect x="82.5" width="65" height="12" rx="6" fill="#FD5D69"/>
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
                <p className="mt-7 mb-4">Please select your cuisines preferences for better recommendations or you can skip it.</p>
                <div className="flex flex-wrap p-1 gap-3 w-screen h-auto overflow-x-hidden md:overflow-x-auto md:overflow-y-hidden justify-center my-5">
                    {recipeData.length > 0 ? (
                        recipeData.map((recipe) => (
                            <div
                                key={recipe.id}
                                className="recipe-item cursor-pointer"
                                onClick={() => selectedRecipe(recipe.query)}
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
                <Button onClick={() => navigate("/alligies")} className="bg-[var(--pink)] w-44 text-[var(--pink-sup-color)] h-auto px-4 py-3 rounded-full">Skip</Button>
                <Button onClick={() => navigate("/alligies")} className="bg-[var(--red-pink-main)] w-44 text-white h-auto px-4 py-3 rounded-full">Continue</Button>
            </div>
            </div>
    );
}

export default FoodPreference;
