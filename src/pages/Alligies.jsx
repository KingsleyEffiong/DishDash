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
    const navigate = useNavigate()
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
        return JSON.parse(localStorage.getItem('alligy')) || [];
    });
    function selectedAllegie(alligy) {
    const newAlligy = selectedAllegies.includes(alligy)
    ? selectedAllegies 
    : [...selectedAllegies, alligy]; 
        setSelectedAllegies(newAlligy);
        localStorage.setItem('alligy', JSON.stringify(newAlligy));
    }
    useEffect(() => {
        const fetchAlligies = async () => {
            const queries = ["banana", "meat", "egg", "kiwi", "almonds", "milk", "peanut", "whaat", "shrimp", "treenuts", "fish"];
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
                const data = responses.map((response, index) => {
                    if (response.hits && response.hits.length > 0) {
                        return {
                            label: response.hits[0].recipe.label.slice(),
                            image: response.hits[0].recipe.image,
                            uri: response.hits[0].recipe.uri,
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
        <div className='h-full xl:h-screen'>
        <BackButton />
        <div className={`flex flex-col items-center justify-start md:justify-center w-full h-full px-6 py-12`}>
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
        <div className="flex flex-wrap p-1 gap-3 justify-center">
        {alligiesData.length > 0 ? (
            alligiesData.map((alligy) => (
                <div key={alligy.uri} className="recipe-item cursor-pointer" onClick={() => selectedAllegie(alligy.label)}>
                    <img className="w-24 h-24 rounded-xl" src={alligy.image} alt={alligy.label} />
                    <h3 className="text-center font-semibold">{alligy.query}</h3>
                </div>
            ))
        ) : (
            <p>Loading Alligies...</p>
        )}
        </div>
        <div className="grid place-items-center mt-10 w-full">
        <Button onClick={() => {navigate('/login')}} className="bg-[var(--red-pink-main)] w-44 text-white h-auto px-6 py-3 rounded-full">Continue</Button>
        </div>
        </div>
        {/* <Modal>
            <h1>Sign up succesful!</h1>
            <svg width="83" height="83" viewBox="0 0 83 83" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="41.5" cy="41.0976" r="41.0976" fill="#FFC6C9"/>
            <path d="M41.9019 34.0857C46.0969 34.0857 49.4977 30.6849 49.4977 26.4899C49.4977 22.2949 46.0969 18.8942 41.9019 18.8942C37.7069 18.8942 34.3062 22.2949 34.3062 26.4899C34.3062 30.6849 37.7069 34.0857 41.9019 34.0857Z" stroke="#FD5D69" strokeWidth="3.37588" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M55.8847 56.2719C52.2388 64.4617 41.8547 63.7867 41.8547 63.7867C41.8547 63.7867 31.4638 64.4347 27.8246 56.2719C27.1203 54.7016 26.7561 53 26.7561 51.2789C26.7561 49.5579 27.1203 47.8565 27.8246 46.2862C31.4638 38.0963 41.8547 38.7714 41.8547 38.7714C41.8547 38.7714 52.2388 38.1233 55.8847 46.2862C56.5891 47.8565 56.9532 49.5579 56.9532 51.2789C56.9532 53 56.5891 54.7016 55.8847 56.2719Z" stroke="#FD5D69" strokeWidth="3.37588" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="text-center">Lorem ipsum dolor sit amet pretium cras id dui pellentesque ornare. Quisque malesuada.</p>
        </Modal> */}
    </div>
    )
}

export default Alligies
