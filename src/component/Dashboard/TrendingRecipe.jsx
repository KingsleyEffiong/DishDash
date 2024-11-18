import { useEffect,useState } from "react"
import anime from "animejs";
import Button from "../../UI/Button";
import InstructionModal from "../../UI/InstructionModal";
import Overlay from "../../UI/Overlay";
import { useProvider } from "../Provider";

const baseUrl = `https://www.themealdb.com/api/json/v1/1/random.php`;
function TrendingRecipe() {

        const [data, setData] = useState([]);
        const {darkTheme} =  useProvider();
        const [showInstructionModal, setShowInstructionModal] = useState(false);
        const [like, setLike] = useState(false);
        const [permanentLike, setPermanentLike] = useState(false);
        useEffect(() => {
            anime({
                targets: ".recipe-item",
                opacity: [0, 1],
                translateX: [50, 0],
                delay: anime.stagger(200), // Set a reasonable stagger time for each item
                duration: 800,
                easing: "easeOutExpo",
            });
        }, [data]);

        useEffect(() => {
            async function fetchRandomRecipe() {
                try {
                    const response = await fetch(baseUrl);
                    const result = await response.json();
                    if (result.meals && result.meals.length > 0) {
                        const mealData = result.meals[0];
                        setData({
                            id: mealData.idMeal,
                            meal: mealData.strMeal,
                            image: mealData.strMealThumb,
                            instructions: mealData.strInstructions
                        });
                        setPermanentLike(false)
                        setLike(false)
                    } else {
                        console.log("No meals found");
                    }
                } catch (error) {
                    console.log("Error fetching data:", error);
                }
            }
        
            // Set interval to call fetchRandomRecipe every 3 seconds
            const intervalId = setInterval(fetchRandomRecipe, 60000);
            fetchRandomRecipe();
            return () => clearInterval(intervalId);
        }, []);
        
     
            function handleShowInstruction(){
                    setShowInstructionModal(true);
            }

            function handleHoverLike() {
             setLike(true);
            }
            
            function handleMouseLeave() {
                if(permanentLike) setLike(true);
                else setLike(false);
                
            }
            function handleAddLike() {
                setPermanentLike(true);
            }
            
    
    
    return (
        <div className="w-full md:w-auto h-auto mt-7">
            <h1>Trending Recipe</h1>

        {data.image && (
            <>
        <div className="border border-[var(--pink-sup-color)] w-auto md:w-[400px] h-fit rounded-xl mt-6 overflow-hidden" key={data.id}>
            <div className="relative w-full h-[200px] recipe-item">
        <img className ="w-full absolute -left-2 -top-2 h-[200px] rounded-2xl shadow-md"src={data.image} alt="" />
        <svg width="28" height="28" style={{position:'absolute', right:"5%", top:"2%", cursor:"pointer"}} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="28" height="28" rx="13.8409" fill="#FFC6C9"/>
        <path d="M14.0807 8.91296C14.0807 8.91296 13.7336 9.2015 13.3744 9.71549C12.9416 10.3347 12.4914 11.2813 12.61 12.4447" fill="#FFC6C9"/>
        <path d="M14.0807 8.91296C14.0807 8.91296 13.7336 9.2015 13.3744 9.71549M12.61 12.4447C12.4914 11.2813 12.9416 10.3347 13.3744 9.71549M13.3744 9.71549C13.7911 9.12125 14.3084 8.66124 14.8375 8.31127M14.8375 8.31127C15.769 7.6951 16.737 7.42 17.2567 7.35388C17.8642 7.32972 18.4703 7.42907 19.0383 7.64587C19.6063 7.86268 20.1245 8.19243 20.5614 8.61522C22.4509 10.4669 22.7283 13.9583 21.0205 16.0193C19.3126 18.0803 16.5125 18.9936 14.7896 21.0899C14.5104 21.4234 14.2724 21.7893 14.0807 22.1797C13.8898 21.7894 13.6527 21.4235 13.3744 21.0899C11.6489 18.9936 8.86623 18.1005 7.14072 16.0193C5.41521 13.9381 5.71044 10.4694 7.59993 8.61522C8.61218 7.40435 10.9273 5.83781 14.8375 8.31127Z" stroke="#EC888D" strokeLinecap="round" strokeLinejoin="round" fill={`${like || permanentLike ? 'var(--red-pink-main)' : 'transparent'}`} onMouseEnter={handleHoverLike} onMouseLeave={handleMouseLeave} onClick={handleAddLike}/>
        </svg>
            </div>
        <div className="flex flex-row justify-between items-center w-full p-1">
        <div className="flex flex-col">
        <span>{data.meal}</span>
        <Button className={`text-xs text-left ${darkTheme === true ? 'text-[#1C0F0D]' : 'text-white'} ${darkTheme === true ? 'bg-white' : 'bg-[#1C0F0D]'} px-3 py-4 rounded-full cursor-pointer`} onClick={handleShowInstruction}>{`${data.instructions.slice(0,80)}.........`}</Button>
        </div>
        </div>
        </div>
        {showInstructionModal && <InstructionModal>
            <Button className="bg-[var(--red-pink-main)] py-3 px-2 w-36 mx-3 text-base rounded-full absolute right-1 top-1" onClick={() => setShowInstructionModal(false)}>Close</Button>
            
            <p className="mt-14 overflow-auto">{data.instructions}</p>
        </InstructionModal>}
        </>
        )}
        {showInstructionModal && <Overlay />}
        </div>
    )
}

export default TrendingRecipe
