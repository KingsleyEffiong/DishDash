import { useProvider } from "../component/Provider"


function Input() {
    const {searchRecipe, dispatch} = useProvider()
    return (
        <input type="text" className="bg-[var(--pink)] w-[85%] px-2 py-2 placeholder:text-[var(--red-pink-main)] text-[var(--red-pink-main)] outline-none rounded-full" placeholder="Search" value={searchRecipe} onChange={(e) => dispatch({type:'searchRecipe', payload:e.target.value})}>
            
        </input>
    )
}

export default Input
