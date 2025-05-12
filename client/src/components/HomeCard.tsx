
function HomeCard(props){
    return(
        <div>
            <div className="my-auto mx-auto flex items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10 w-auto">
                <div className = " flexrounded-lg bg-indigo-500 p-2 text-white">{props.number}</div>
                <div className=" flex text-xl font-medium text-black dark:text-white">{props.heading}</div>
                <div className="flex text-gray-500 dark:text-gray-400">{props.description}</div>
            </div>
        </div>
    )
}

export default HomeCard
