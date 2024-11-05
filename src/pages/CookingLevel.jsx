import { useNavigate } from "react-router-dom"
import BackButton from "../UI/BackButton"
import Button from "../UI/Button"
import { useProvider } from "../component/Provider"
import { useEffect } from "react"
import ReactTypingEffect from "react-typing-effect";

const cookingLevel = [
    {
        id:1,
        level:'Novice',
        subtitle:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus placeat fuga ratione repellendus id eveniet vel rerum. Laborum repellendus iusto quas, debitis, quibusdam accusamus, repudiandae inventore doloremque eum consequatur quod.'
    },
    {
        id:2,
        level:'Intermediate',
        subtitle:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus placeat fuga ratione repellendus id eveniet vel rerum. Laborum repellendus iusto quas, debitis, quibusdam accusamus, repudiandae inventore doloremque eum consequatur quod.'
    },
    {
        id:3,
        level:'Advanced',
        subtitle:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus placeat fuga ratione repellendus id eveniet vel rerum. Laborum repellendus iusto quas, debitis, quibusdam accusamus, repudiandae inventore doloremque eum consequatur quod.'
    },
    {
        id:4,
        level:'Professional',
        subtitle:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus placeat fuga ratione repellendus id eveniet vel rerum. Laborum repellendus iusto quas, debitis, quibusdam accusamus, repudiandae inventore doloremque eum consequatur quod.'
    },
]


function CookingLevel() {
    const {activeCookingLevel, dispatch} = useProvider();

    function handleClick(id){
        dispatch({type:'activeCookingLevel', payload:id});
    }

    useEffect(() =>{
        localStorage.setItem('activeCookingLevel', activeCookingLevel)
    },[activeCookingLevel])
    
    const navigate = useNavigate();
    return (
        <div className=''>
            <BackButton />
            <div className="flex flex-col items-center w-full h-full px-6 py-12">
            <svg width="230" height="13" viewBox="0 0 230 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="0.645752" width="230" height="12" rx="6" fill="#D9D9D9"/>
            <rect y="0.645752" width="65" height="12" rx="6" fill="#FD5D69"/>
            </svg>
            <section className={`flex flex-col items-center w-full h-full my-5 `}>
                <h1 className="font-bold text-2xl">
                <ReactTypingEffect
          text={["¿What is your cooking level?"]}
          speed={100} 
          eraseSpeed={50} 
          typingDelay={500} 
          eraseDelay={2000}
        />
        </h1>
                <p className="mt-7 mb-4">Please select you cooking level for a better recommendations.</p>
              { cookingLevel.map((level) => 
                <div className={`border border-[var(--pink)] px-7 py-4 rounded-xl m-4 cursor-pointer ${ level.level  === activeCookingLevel ? 'border-[var(--red-pink-main) border-4' : ''}`} key={level.id} onClick={() => handleClick(level.level)}>
                <h2 className="font-bold">{level.level}</h2>
                <p>{level.subtitle}</p>
            </div>
            )}
                <Button onClick={() => {navigate('/foodpreference')}} className="bg-[var(--red-pink-main)] w-52 text-white h-auto px-6 py-3 rounded-full">Continue</Button>
            </section>
            </div>
     </div>
    )
}

export default CookingLevel
