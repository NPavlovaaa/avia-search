import Leg from "../leg/Leg";

const Flight = () => {

    return(
        <div>
            <div className="mt-6">
                <div className="flex px-10 py-2 items-center justify-between bg-blue-300 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">Авиакомпания</p>
                    <div className="flex flex-col items-end text-gray-700">
                        <p className="font-semibold text-lg">2233 h</p>
                        <p className="text-sm">Стоимость для одного пассажира</p>
                    </div>
                </div>
                <Leg/>
            </div>
            <button className="w-full rounded-lg bg-orange-400 mt-8 py-2 px-10 text-white text-lg">Выбрать</button>
        </div>
    )

}

export default Flight;