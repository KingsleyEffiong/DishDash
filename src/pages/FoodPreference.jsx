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
                "salad", "soup", "egg", "seafood", "chicken", "meat", "burger", "pizza", 
                "sushi", "rice", "dessert", "bread"
            ];
            const appId = "111721bd";
            const appKey = "ceb9b54be96f102f81e1a0d1719aedf1";
            const baseUrl = `https://api.edamam.com/search`;

            try {
                const responses = await Promise.all(
                    queries.map(query =>
                        fetch(`${baseUrl}?q=${query}&app_id=${appId}&app_key=${appKey}`)
                            .then(response => response.json())
                    )
                );
                console.log(responses)

                const data = responses.map((response, index) => {
                    if (response.hits && response.hits.length > 0) {
                        return {
                            label: response.hits[0].recipe.label,
                            image: response.hits[0].recipe.image,
                            uri: response.hits[0].recipe.uri,
                            query: queries[index]
                        };
                    }
                    return null;
                }).filter(item => item !== null);
                console.log(data)
                dispatch({type:'recipeData', payload: data});
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        
        fetchRecipes();
    }, []);

    return (
        <div className='h-full xl:h-screen'>
            <BackButton />
            <div className={`flex flex-col items-center justify-start md:justify-center w-full h-full px-6 py-12 `}>
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
                <div className="flex flex-wrap p-1 gap-3 justify-center">
                    {recipeData.length > 0 ? (
                        recipeData.map((recipe) => (
                            <div
                                key={recipe.uri}
                                className="recipe-item cursor-pointer"
                                onClick={() => selectedRecipe(recipe.label)}
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
                <Button onClick={() => navigate("/alligies")} className="bg-[var(--pink)] w-44 text-[var(--pink-sup-color)] h-auto px-6 py-3 rounded-full">Skip</Button>
                <Button onClick={() => navigate("/alligies")} className="bg-[var(--red-pink-main)] w-44 text-white h-auto px-6 py-3 rounded-full">Continue</Button>
            </div>
            </div>
        </div>
    );
}

export default FoodPreference;
