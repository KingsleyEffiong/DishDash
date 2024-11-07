import { useProvider } from "../component/Provider";
function Overlay() {
    const {dispatch} = useProvider();
    return (
        <div className="bg-[var(--black-beige)] h-screen w-screen fixed top-0 left-0 opacity-60" onClick={() => dispatch({type:'showPopup', payload:false})}></div>
    )
}

export default Overlay
