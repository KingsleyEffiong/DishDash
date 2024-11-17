import PropTypes from "prop-types";
import anime from "animejs";
import { useEffect } from "react";
import { useProvider } from "../component/Provider";
InstructionModal.propTypes = {
  children: PropTypes.string.isRequired, 
  };


function InstructionModal({children}) {
    const {darkTheme} =  useProvider()
    useEffect(() => {
        anime({
            targets: ".instruction-container",
            opacity: [0, 1],
            translateX: [50, 0],
            delay: anime.stagger(200), // Set a reasonable stagger time for each item
            duration: 800,
            easing: "easeOutExpo",
        });
    },[]);
    return (
        <div className={`w-full h-3/4 shadow-md py-6 px-4 overflow-auto ${darkTheme === true ? 'bg-white' : 'bg-[#1C0F0D]'} ${darkTheme === true ? 'text-[#1C0F0D]' : 'text-white'} fixed z-30 top-0 left-0 instruction-container`}>
            {children}
        </div>
    )
}

export default InstructionModal
