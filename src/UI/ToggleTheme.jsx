import { FaMoon, FaSun } from 'react-icons/fa';
import { useProvider } from '../component/Provider';



function ToggleTheme() {
    const {darkTheme, dispatch} = useProvider()
    return (
        <div className="absolute top-3 right-4 cursor-pointer">
       {darkTheme === true ? (
        <FaMoon className='text-3xl text-[var(--whitebeige)]' onClick={() => dispatch({type:'darkTheme', payload: false})}/>
       ):(
        <FaSun className='text-3xl' onClick={() => dispatch({type:'darkTheme', payload: true})}/> 
       )}
        </div>
    )
}

export default ToggleTheme
