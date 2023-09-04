import FlightLayout from "../components/flight/Flight";
import Filters from "../components/filters/Filters";
import Sorts from "../components/sorts/Sorts";


const MainPage = () => {

    return(
        <div className="grid grid-cols-7 gap-8 w-full">
            <div className="grid col-span-2 bg-white rounded-xl h-fit">
                <Filters/>
            </div>
            <div className="grid col-span-5">
                <Sorts/>
                <FlightLayout/>
            </div>
        </div>
    )
}

export default MainPage;