import { useEffect, useState } from "react";
import BackButton from "../UI/BackButton";
import Button from "../UI/Button";
import anime from "animejs";
import { useProvider } from "../component/Provider";
import { useNavigate } from "react-router-dom";
import ReactTypingEffect from "react-typing-effect";
// import Modal from "../UI/Modal";
function Alligies() {
    const {alligiesData, dispatch} = useProvider();
    const navigate = useNavigate();
    useEffect(() => {
        anime({
            targets: ".recipe-item",
            opacity: [0, 1],
            translateY: [50, 0],
            delay: anime.stagger(200), // Set a reasonable stagger time for each item
            duration: 800,
            easing: "easeOutExpo",
        });
    }, [alligiesData]);
    const [selectedAllegies, setSelectedAllegies] = useState(() =>{
        return JSON.parse(localStorage.getItem('alliegy')) || [];
    });

        // Check if a recipe is selected
        const isRecipeSelected = (query) => selectedAllegies.includes(query);

        // Handle recipe selection/deselection
        const allegySelected = (alliegy) => {
            let updatedAlliegy;
            if (isRecipeSelected(alliegy)) {
                updatedAlliegy = selectedAllegies.filter((item) => item !== alliegy); // Deselect
            } else {
                updatedAlliegy = [...selectedAllegies, alliegy]; // Select
            }
    
            setSelectedAllegies(updatedAlliegy);
            localStorage.setItem("alliegy", JSON.stringify(updatedAlliegy));
        };
    useEffect(() => {
        const fetchAlligies = async () => {
            const queries = ["banana", "meat", "egg", "kiwi", "almonds", "milk", "peanut", "whaat", "shrimp", "treenuts", "fish"];
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
                dispatch({type:'alligiesData', payload: data});

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        fetchAlligies();
    }, []);
    return (
        <div className='h-screen flex flex-col items-center justify-start md:justify-center px-6 py-12'>
        <BackButton />
        <svg width="230" height="12" viewBox="0 0 230 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="230" height="12" rx="6" fill="#D9D9D9"/>
        <rect x="165" width="65" height="12" rx="6" fill="#FD5D69"/>
        </svg>
        <h1 className="text-2xl font-bold">
                <ReactTypingEffect
                text={["You have any allergic?"]}
                speed={100} 
                eraseSpeed={50} 
                typingDelay={500} 
                eraseDelay={2000}
                />
                </h1>
        <p className="mt-7 mb-4">Please select your allergic for a better recommendations or you can skip it.</p>
        <div className="flex flex-wrap p-1 gap-3 w-screen h-auto overflow-x-hidden md:overflow-x-auto md:overflow-y-hidden justify-center my-5">
        {alligiesData.length > 0 ? (
            alligiesData.map((alligy) => (
                <div key={alligy.uri}    className={`recipe-item cursor-pointer px-3 py-4 ${
                    isRecipeSelected(alligy.query) ? "bg-[var(--red-pink-main)] rounded-xl" : "" }`}
                onClick={() => allegySelected(alligy.query)}>
                    <img className="w-24 h-24 rounded-xl" src={alligy.image} alt={alligy.label} />
                    <h3 className="text-center font-semibold">{alligy.query}</h3>
                </div>
            ))
        ) : (
            <div className="flex justify-center items-center h-full">
            <p>Loading Allergies...</p>
        </div>
        )}
        </div>
        <div className="grid place-items-center mt-10 w-full">
        <Button onClick={() => {navigate('/login')}} className="bg-[var(--red-pink-main)] w-44 text-white h-auto px-6 py-3 rounded-full">Continue</Button>
        </div>
    </div>
    )
}

export default Alligies
