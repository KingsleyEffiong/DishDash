import { useEffect, useState, useRef } from "react";
import { db } from "../../Firebase";
import { getDoc, doc, } from "firebase/firestore";
import Button from "../../UI/Button";
import { useProvider } from "../Provider";

const baseUrl = `https://www.themealdb.com/api/json/v1/1/search.php`;

function UserRecipe() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    const {dispatch, updateRecipe} = useProvider()
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        async function GetUserRecipe() {
            const userId = localStorage.getItem("userId");
            setLoading(true);
            try {
                const userRef = doc(db, "users", userId);
                const userSnapshot = await getDoc(userRef);
                if (userSnapshot.exists()) {
                    const userdata = userSnapshot.data();
                    console.log(userdata)
                    const recipe = userdata.recipes;


                    const responses = await Promise.all(
                        recipe?.map((query) =>
                            fetch(`${baseUrl}?s=${query}`).then((response) =>
                                response.json()
                            )
                        )
                    );

                    const data = responses
                        .map((response, index) => {
                            if (response.meals && response.meals.length > 0) {
                                return {
                                    label: response.meals[0].strMeal,
                                    image: response.meals[0].strMealThumb,
                                    id: response.meals[0].idMeal,
                                    query: recipe[index],
                                };
                            }
                            return null;
                        })
                        .filter((item) => item !== null);

                    setData(data);
                    console.log(data)
                    setLoading(false)
                }
            } catch (error) {
                console.log(error);
            }
        }
        GetUserRecipe();
    }, [dispatch, updateRecipe]);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -180, // Adjust this to control scroll distance
                behavior: "smooth",
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 180, // Adjust this to control scroll distance
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="w-[320px] h-auto bg-[var(--red-pink-main)] mt-7 rounded-xl p-2 mx-auto">
            <h1>Your Recipe</h1>
            <>
            { data.length === 0 ? (
                <Button className={`px-5 py-1 rounded-full w-fit bg-[var(--whitebeige)] text-[var(--brown-text)]`} onClick={() => dispatch({type:'showSearch', payload:true})}>Add Your Recipes</Button>
            ):(
                <div className="relative flex items-center">
                 <div
                     ref={scrollContainerRef}
                     className="flex overflow-hidden no-scrollbar w-[320px] md:w-[400px] gap-2"
                     style={{ scrollSnapType: "x mandatory" }}
                 >
                     {data.map((recipe) => (
                         <div
                             className={`recipe-item flex-shrink-0 ${data.length === 1 ? "w-full" : "w-[180px]"} h-auto`}
                             style={{ scrollSnapAlign: "start" }}
                             key={recipe.id}
                         >
                             <div className="relative">
                             <img
                                 className={`rounded-xl ${data.length === 1 ? "w-full" : "w-[180px]"}`}
                                 src={recipe.image}
                                 alt={recipe.label}
                             />
                             <div className="absolute bottom-0 left-0 shadow-md w-full grid place-items-center h-[48px] bg-white rounded-lg px-2">
                                 <h2 className="text-black">{recipe.label}</h2>
                             </div>
                             </div>
                         </div>
                     ))}
                 </div>
            <>
            {data.length > 1 && !loading && (
                <>
                    <button
                        onClick={scrollLeft}
                        className="absolute left-0 z-10 p-2 w-11 h-11 bg-[var(--black-beige)] rounded-full text-white"
                    >
                        ←
                    </button>
                    <button
                        onClick={scrollRight}
                        className="absolute right-0 z-10 p-2 w-11 h-11 bg-[var(--black-beige)] rounded-full text-white"
                    >
                        →
                    </button>
                </>
            )}
        </>
             </div>
            )}
            </>
        </div>
    );
}

export default UserRecipe;
