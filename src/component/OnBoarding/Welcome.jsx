import { useNavigate } from "react-router-dom"
import Button from "../../UI/Button"
import BackButton from "../../UI/BackButton"
import ReactTypingEffect from "react-typing-effect"

function Welcome() {
    const navigate = useNavigate()
    return (
        <div className={`w-full h-screen flex flex-col`}>
            <BackButton />
                <div className="flex flex-wrap justify-center gap-5 py-14">
                <img className="w-24 h-24" src="/images/Frame 460.png" alt="food1" />
                <img className="w-24 h-24" src="/images/Frame 453.png" alt="food2" />
                <img className="w-24 h-24" src="/images/Frame 457.png" alt="food3" />
                <img className="w-24 h-24" src="/images/Frame 461.png" alt="food4" />
                <img className="w-24 h-24" src="/images/Frame 462.png" alt="food5" />
            </div>
            <div className={`text-center`}>
                <h1 className="text-2xl font-bold">
                <ReactTypingEffect
          text={["Welcome"]}
          speed={100} 
          eraseSpeed={50} 
          typingDelay={500} 
          eraseDelay={2000}
        />
        </h1>
                <p className="text-center">Find the best recipes that the world can provide you also with every step that you can learn to increase your cooking skills.</p>
                <Button onClick={() =>{
                    navigate('/cookinglevel')
                }} className="bg-[var(--pink)] w-52 text-[var(--pink-sup-color)] px-6 py-3 rounded-full m-5" >I’m New</Button>
                <Button onClick={() =>{}} className="bg-[var(--pink)] w-52 text-[var(--pink-sup-color)] h-auto px-6 py-3 rounded-full m-5" >I’ve been here </Button>
            </div>
        </div>
    )
}

export default Welcome
