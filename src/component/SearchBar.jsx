import { useEffect, useState } from "react"
import Button from "../UI/Button"
import Input from "../UI/Input"
import { useProvider } from "./Provider";
import anime from "animejs";
import { db } from "../Firebase";
import { updateDoc, getDoc, doc, arrayUnion, setDoc } from "firebase/firestore";

const initialRecipe = [
    {
        id:1,
        name:'Feteer Meshaltet'
    },
    {
        id:2,
        name:'Chivito uruguayo'
    },
    {
        id:3,
        name:'Beans'
    },
    {
        id:4,
        name:'Burek'
    },
]

const baseUrl = `https://www.themealdb.com/api/json/v1/1/search.php`;
function SearchBar() {
const {searchRecipe, dispatch, darkTheme, updateRecipe} = useProvider();
const [recipeAdded, setRecipeAdded] = useState(null)
const [recommendedRecipe, setRecommendedRecipes] = useState(initialRecipe)
useEffect(() => {
    anime({
        targets: ".recipe-item",
        opacity: [0, 1],
        translateY: [50, 0],
        delay: anime.stagger(200), // Set a reasonable stagger time for each item
        duration: 800,
        easing: "easeOutExpo",
    });
}, [recipeAdded]);
useEffect(() => {
    async function SearchRecipe() {
        if (searchRecipe.length < 4) return;
        try {
            const response = await fetch(`${baseUrl}?s=${searchRecipe}`);
            const data = await response.json();
            const selectedRecipeData = data.meals[0];
            if(selectedRecipeData === null) return;
            const selectedRecipeChoosed = {
                id: selectedRecipeData.idMeal,
                name: selectedRecipeData.strMeal
            };

            function handlePressDown(event) {
                if (event.key === 'Enter') {
                    setRecommendedRecipes(prevRecipes => {
                        const existedSelectedRecipe = prevRecipes.some(recipe => recipe.id === selectedRecipeChoosed.id);
                        if (existedSelectedRecipe) return prevRecipes; 
                        return [...prevRecipes, selectedRecipeChoosed];
                    });
                    setRecipeAdded('soup')
                    dispatch({ type: 'searchRecipe', payload: '' });
                }
            }
            document.addEventListener('keypress', handlePressDown);
            return () => {
                document.removeEventListener('keypress', handlePressDown);
            };

        } catch (err) {
            console.error("Error fetching recipe:", err);
            if(err.message === 'data.meals is null') return
        }
    }
    SearchRecipe();
}, [searchRecipe, dispatch]);  // Only re-run if searchRecipe changes

async function handleUpdateRecipe(recipe) {
    const userId = localStorage.getItem('userId');
    let allergy = JSON.parse(localStorage.getItem('allergy'));
    let recipes = JSON.parse(localStorage.getItem('recipes'));
    const userRef = doc(db, 'users', userId);

    try {
        // Check if the user document exists
        const docSnapshot = await getDoc(userRef);

        if (docSnapshot.exists()) {
            // Update the recipes array if the document exists
            await updateDoc(userRef, {
                recipes: arrayUnion(recipe),
            });
            console.log('Recipe added to existing user');
        } else {
            // Use fallback values if allergy or recipes are null
            allergy = allergy || []; // Fallback to an empty array if null
            recipes = recipes || [recipe]; // Fallback to the passed recipe as an array

            // Create a new user document
            await setDoc(doc(db, 'users', userId), {
                recipes,
                allergy,
                createdAt: new Date().toISOString(),
            });
            console.log('User created:', userId);
        }
    } catch (err) {
        console.error('Error handling recipe update:', err);
    } finally {
        // Dispatch action to update the state
        dispatch({ type: 'updateRecipe', payload: !updateRecipe });
    }
}


    const [selectedRecipe, setSelectedRecipe] = useState(recommendedRecipe[0].id)
    return (
        <div className={`${darkTheme === true ? 'bg-[var(--whitebeige)]' : 'bg-[var(--black-beige)]'} ${darkTheme === true ? 'text-[var(--whitebeige)]' : 'text-[var(--black-beige)]'} w-full h-fit rounded-lg py-3 px-3 fixed top-0 z-30 left-0 m-auto`}>
            <Button className="bg-[var(--red-pink-main)] py-3 px-2 w-36 mx-3 text-base rounded-full absolute right-5 top-1" onClick={() => dispatch({type:'showSearch', payload:false})}>Close</Button>
            <Input />
            <h1 className="text-[var(--brown-text)]">Recommended Recipes</h1>
            <div className="flex flex-row flex-wrap justify-around">
                {recommendedRecipe.map((recommend) => 
                <Button
                className={`${recommend.id === selectedRecipe ? 'bg-[var(--red-pink-main)]' : 'bg-[var(--pink-sup-color)]'} ${recommend.id === selectedRecipe ? 'text-white' : 'text-[var(--red-pink-main)]'} w-48 py-2 px-3 m-2 rounded-full recipe-item`}
                key={recommend.id}
                onClick={() => {
                  handleUpdateRecipe(recommend.name); // First function call
                  setSelectedRecipe(recommend.id);    // Second function call
                }}
              >
                {recommend.name}
              </Button>
                )}
            </div>
        </div>
    )
}

export default SearchBar
