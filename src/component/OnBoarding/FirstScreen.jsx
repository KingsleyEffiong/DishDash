import { useNavigate } from "react-router-dom";
import Button from "../../UI/Button";
import ReactTypingEffect from "react-typing-effect";
import ToggleTheme from "../../UI/ToggleTheme";


function FirstScreen() {
    const navigate = useNavigate();
    return (
        <div className={`w-full h-screen  p-4 flex flex-col justify-center items-center gap-5`}>
            <ToggleTheme />
            <div className={`text-cente`}>
            <h1 className="text-2xl font-bold">
            <ReactTypingEffect
          text={["Get Inspired"]}
          speed={100} 
          eraseSpeed={50} 
          typingDelay={500} 
          eraseDelay={2000}
        />
        </h1>
            <h3 className="text-sm">Get inspired with our daily recipe recommendations.</h3>
            </div>
            <div className="relative max-w-md overflow-hidden flex flex-col items-center justify-center rounded-2xl">
                <img 
                    src="/images/Rectangle 302.png" 
                    alt="inspiration" 
                    className="w-full h-auto"
                />

                {/* <div className="absolute h-24 w-full left-0 top-[87%] inset-0 bg-white bg-opacity-80 backdrop-blur-0"></div> */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <Button 
                        onClick={() => {
                            navigate('/increasedskill')
                        }}
                        className="bg-[var(--pink)] w-52 text-[var(--pink-sup-color)] h-auto px-6 py-3 rounded-full"
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default FirstScreen;
