import Flight from "../components/flight/Flight";


const MainPage = () => {

    return(
        <div className="grid grid-cols-4 w-full">
            <div className="grid col-span-1">
                <div className="bg-amber-200 w-14">Фильтры</div>
            </div>
            <div className="grid col-span-3">
                <Flight/>
            </div>
        </div>
    )

}

export default MainPage;