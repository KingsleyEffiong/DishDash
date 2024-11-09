// import { useEffect,useState } from "react"
// import {db} from "../../Firebase"
// import {getDoc, doc } from "firebase/firestore"

// const appId = "111721bd";
// const appKey = "ceb9b54be96f102f81e1a0d1719aedf1";
// const baseUrl = `https://api.edamam.com/search`;
function TrendingRecipe() {
    // const [data, setData] = useState([])
    // useEffect(() =>{
    //     async function GetTrendingRecipe(){
    //         const userId = localStorage.getItem('userId');
    //         try{
    //             const userRef = doc(db, 'users', userId);
    //             const userSnapshot = await getDoc(userRef);
    //             if (userSnapshot.exists()) {
    //                 const userdata = userSnapshot.data();
    //                 const recipe = userdata.recipes
    //                 // const allegy = userdata.allegy

                 
    //                 const responses = await Promise.all(
    //                     recipe.map(query =>
    //                         fetch(`${baseUrl}?q=${query}&app_id=${appId}&app_key=${appKey}`)
    //                             .then(response => response.json())
    //                     )
    //                 );
    //                 const data = responses
    //                 .map((response, index) => {
    //                     if (response && response.hits && response.hits.length > 0) {
    //                         // Map through each recipe in hits to extract details
    //                         const recipeDetails = response.hits.map(hit => ({
    //                             label: hit.recipe.label,
    //                             image: hit.recipe.image,
    //                             uri: hit.recipe.uri,
    //                             query: recipe[index]
    //                         }));
    //                         return recipeDetails; // Return an array of recipes for each response
    //                     }
    //                     return null;
    //                 })
    //                 .filter(item => item !== null) // Filter out any null responses
    //                 .flat(); // Flatten the array if you want a single list of all recipes
                
    //             setData(data)
                
    //             }
    //         }catch(error) {
    //             console.log(error)
    //         }
    //     }
    //     GetTrendingRecipe()
    // })
    return (
        <div className="w-full md:w-auto h-auto mt-7">
            <h1>Trending Recipe</h1>
     {/* {  data.map((data) => 
     <div className="" key={data.uri}>
            <img src={data.image} alt="" />
            <span>{data.label}</span>
            </div>)} */}
            <div className="border border-[var(--pink-sup-color)] w-auto md:w-[400px] h-[190px] p-2 rounded-xl relative mt-6">

            <img className ="absolute -top-4 -left-2 w-[398px]  h-[160px]"src="/images/Frame 263.png" alt="" />
            <div className="flex flex-row justify-between items-center absolute bottom-0 left-0 w-full p-1">
            <div className="flex flex-col">
            <span>Salami and cheese pizza</span>
            <span className="text-xs">This is a quick overview of the ingredients...</span>
            </div>
            <div className="text-[var(--pink-sup-color)] ">
                <div className="flex flex-row items-center justify-around w-14">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.95394 1.64215C8.56356 0.673042 9.74468 0.910756 10.4335 1.62858C11.1224 2.34641 11.2245 3.41936 10.5067 4.10823M10.5067 4.10823C10.9471 5.28036 10.9471 6.57249 10.5067 7.74462C9.37892 10.7135 6.16622 10.4788 6.16622 10.4788C6.16622 10.4788 2.95353 10.7135 1.82573 7.74462C1.38645 6.57229 1.38644 5.28055 1.82572 4.10822M10.5067 4.10823C9.37892 1.13938 6.16622 1.37561 6.16622 1.37561C6.16622 1.37561 2.95352 1.13937 1.82572 4.10822M4.3724 1.64423C3.61037 0.825418 2.53743 0.855918 1.85009 1.57375C1.16274 2.29157 1.1079 3.41935 1.82572 4.10822M8.8412 9.7972L9.76144 11M3.49242 9.79792L2.57097 11M6.16621 3.84915V5.13849C6.16636 5.38395 6.22295 5.62611 6.33156 5.84623C6.44017 6.06635 6.59787 6.25857 6.79257 6.40804L8.08348 7.39714" stroke="#EC888D" strokeWidth="0.762026" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xs">30min</span>
                </div>
                <div className="flex flex-row items-center gap-1 w-14">
                    <span className="text-xs">5</span>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.01832 1.88234L5.98482 0.496022C5.86887 0.341573 5.72034 0.216583 5.55073 0.130623C5.38112 0.0446633 5.19482 0 5.00603 0C4.81723 0 4.63093 0.0446633 4.46132 0.130623C4.29171 0.216583 4.14329 0.341573 4.02733 0.496022L2.99384 1.88234C2.84866 2.07767 2.65298 2.22627 2.42955 2.31088L0.840047 2.90441C0.658574 2.96855 0.493934 3.07544 0.359027 3.21667C0.224119 3.35789 0.122591 3.5296 0.0625021 3.71834C0.00241311 3.90708 -0.0146702 4.10766 0.0126439 4.30439C0.0399581 4.50111 0.110952 4.68858 0.219949 4.8521L1.17079 6.30271C1.30151 6.50687 1.37323 6.74555 1.37749 6.99056L1.43118 8.74113C1.43516 8.93938 1.48339 9.13401 1.57197 9.30976C1.66056 9.48551 1.78715 9.63759 1.94187 9.7542C2.09659 9.87081 2.27517 9.94876 2.46377 9.98192C2.65237 10.0151 2.84581 10.0025 3.02896 9.9453L4.65369 9.45681C4.88111 9.38782 5.12277 9.38782 5.35019 9.45681L6.97492 9.9453C7.15807 10.0025 7.35152 10.0151 7.54011 9.98192C7.72871 9.94876 7.90729 9.87081 8.06201 9.7542C8.21673 9.63759 8.34332 9.48551 8.43191 9.30976C8.52049 9.13401 8.56872 8.93938 8.5727 8.74113L8.6264 6.99056C8.632 6.74578 8.7036 6.50748 8.8331 6.30271L9.78393 4.8521C9.89103 4.68866 9.96064 4.50203 9.9875 4.30643C10.0144 4.11083 9.99779 3.91149 9.93896 3.72357C9.88012 3.53565 9.78063 3.36413 9.64809 3.22216C9.51554 3.08019 9.35339 2.97151 9.17413 2.90441L7.5826 2.31088C7.35918 2.22627 7.1635 2.07767 7.01832 1.88234Z" fill="#EC888D"/>
</svg>

                </div>
            </div>

            </div>
            </div>
            
        </div>
    )
}

export default TrendingRecipe
