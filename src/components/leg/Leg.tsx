import {ArrowRightIcon, ClockIcon} from "@heroicons/react/24/outline";

const Leg = () => {

    return(
        <div className="border-b border-b-blue-500">
            <div className="flex px-10 py-2 items-center justify-between text-lg border-b border-b-gray-200">
                <p className="text-gray-900">Москва, ШЕРЕМЕТЬЕВО (SVO)</p>
                <ArrowRightIcon width={20}/>
                <p className="text-gray-900">Москва, ШЕРЕМЕТЬЕВО (SVO)</p>
            </div>
            <div className="flex px-10 py-2 items-center justify-between text-lg">
                <div className="flex items-center">
                    <p className="text-gray-900">20:40</p>
                    <p className="text-gray-900 ml-3 text-base text-blue-500">18 авг, вт</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex">
                        <ClockIcon width={16}/>
                        <p className="text-gray-900">14ч 45 мин</p>
                    </div>
                    <p className="text-gray-900 ml-3 text-base text-orange-400">1 пересадка</p>
                </div>
                <div className="flex items-center">
                    <p className="text-gray-900 mr-3 text-base text-blue-500">18 авг, вт</p>
                    <p className="text-gray-900">20:40</p>
                </div>
            </div>
            <div className="flex items-center justify-start px-10 py-3">
                <p className="">Рейс выполняет: Аэрофлот</p>
            </div>
        </div>

    )

}

export default Leg;