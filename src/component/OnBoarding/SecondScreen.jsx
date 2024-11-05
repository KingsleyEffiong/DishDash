import { useNavigate } from "react-router-dom"
import Button from "../../UI/Button"
import BackButton from "../../UI/BackButton"
import ReactTypingEffect from "react-typing-effect";

function SecondScreen() {
    const navigate = useNavigate()
    return (
        <div className={`w-full h-screen p-4 flex flex-col justify-center items-center gap-5`}>
            <BackButton />
            <div className={`text-cente mt-16`}>
        <h1 className="text-2xl font-bold">
        <ReactTypingEffect
          text={["Get an increase in your skills"]}
          speed={100} 
          eraseSpeed={50} 
          typingDelay={500} 
          eraseDelay={2000}
        />
        </h1>
        <h3 className="text-sm">Learn essential cooking techniques at your own pace.</h3>
        </div>
        <div className="relative max-w-md overflow-hidden flex flex-col items-center justify-center rounded-2xl">
            <img 
                src="/images/Rectangle 302(1).png" 
                alt="skill" 
                className="w-full h-auto"
            />

            {/* <div className="absolute h-24 w-full left-0 top-[87%] inset-0 bg-white bg-opacity-80 backdrop-blur-0"></div> */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <Button
                    onClick={() => {navigate('/welcome')}} 
                    className="bg-[var(--pink)] w-52 text-[var(--pink-sup-color)] h-auto px-6 py-3 rounded-full"
                >
                    Continue
                </Button>
            </div>
        </div>
    </div>
    )
}

export default SecondScreen
