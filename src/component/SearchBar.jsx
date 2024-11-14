import { useEffect, useState } from "react"
import Button from "../UI/Button"
import Input from "../UI/Input"
import { useProvider } from "./Provider";


const recommendedRecipe = [
    {
        id:1,
        name:'Ceviche'
    },
    {
        id:2,
        name:'Hamburger'
    },
    {
        id:3,
        name:'Egg Rolls'
    },
    {
        id:4,
        name:'Wraps'
    },
    {
        id:5,
        name:'Cheesecake'
    },
    {
        id:6,
        name:'Tomatoe Soup'
    },
    {
        id:7,
        name:'Parfait'
    },
    {
        id:8,
        name:'Vegan'
    },
    {
        id:9,
        name:'Baked Salmon'
    },
]

const baseUrl = `https://www.themealdb.com/api/json/v1/1/search.php`;
function SearchBar() {
const {searchRecipe} = useProvider()
  useEffect(() =>{
    async function SearchRecipe(){
        try{
            const response = await fetch(`${baseUrl}?s=${searchRecipe}`);
            const data = await response.json();
            console.log(data)
        }
        catch(err){
            console.log(err)
        }
    }
    SearchRecipe()
  },[searchRecipe])
    const [selectedRecipe, setSelectedRecipe] = useState(recommendedRecipe[0].id)
    console.log(selectedRecipe)
    return (
        <div className="bg-[var(--whitebeige)] w-[431px] h-auto rounded-lg py-3 px-3 fixed top-0 left-0 m-auto">
            <Input />
            <h1 className="text-[var(--brown-text)]">Recommended Recipes</h1>
            <div className="flex flex-row flex-wrap gap-3">
                {recommendedRecipe.map((recommend) => <Button className={`${recommend.id === selectedRecipe ? 'bg-[var(--red-pink-main)]' : 'bg-[var(--pink-sup-color)]'} w-40 py-2 px-3 rounded-full`} key={recommend.id}>{recommend.name}</Button>)}
            </div>
        </div>
    )
}

export default SearchBar
