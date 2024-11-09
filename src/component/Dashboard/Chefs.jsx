const chefs = [
    {
        id:1,
        name:'Joseph',
        image:'/images/Rectangle 14.png'
    },
    {
        id:2,
        name:'Andrew ',
        image:'/images/Rectangle 14(1).png'
    },
    {
        id:3,
        name:'Emily',
        image:'/images/Rectangle 14(2).png'
    },
    {
        id:4,
        name:'Jessica',
        image:'/images/Rectangle 14(3).png'
    },
]
function Chefs() {
    return (
        <div className="h-auto w-auto">
            <h1>Top Chef</h1>
            <div className="flex flex-row overflow-auto gap-3 w-full text-center">
            {    chefs.map((chef) => 
            <div className="" key={chef.id}>
                <img src={chef.image} alt={chef.name}/>
                <h2 >{chef.name}</h2>
                </div>)}
            </div>
        </div>
    )
}

export default Chefs
