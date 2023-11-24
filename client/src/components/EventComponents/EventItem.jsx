import React from 'react';

const getMonthAndDay = (startDateTime) => {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const date = new Date(startDateTime);
    const month = months[date.getMonth()];
    const day = date.getDate();

    return { month, day };
};

const EventItem = ({eventData}) => {
    const { month, day } = getMonthAndDay(eventData.start_datetime);

    return (
        <div className="pt-[12px] mx-[-4px] flex flex-col flex-auto justify-between relative">
            <a href="">
                <div className="min-h-[44px] px-[4px] flex flex-row items-center justify-between rounded-md relative hover:bg-zinc-100 transition-all">
                    <div className="my-[8px] mr-[12px] flex flex-col self-start relative">
                        <div style={{backgroundColor: eventData.event_color}} className="w-[60px] h-[60px] flex flex-col items-center justify-center rounded-md overflow-hidden relative">
                            <span className="block text-[14px] text-white font-semibold break-words uppercase relative leading-5">
                                <span className="overflow-x-hidden overflow-y-hidden relative">
                                    {month}
                                </span>
                            </span>
                            <span className="block text-[25px] text-white font-bold break-words uppercase relative leading-5">
                                <span className="overflow-x-hidden overflow-y-hidden relative">
                                    {day}
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="my-[-6px] py-[12px] flex flex-row flex-shrink flex-wrap grow items-center justify-between basis-0 relative">
                        <div className="min-w-[50%] py-[6px] pr-[12px] flex flex-col flex-shrink basis-1/2 grow relative">
                            <div className="my-[-5px] flex flex-col">
                                <div className="flex flex-row flex-nowrap items-center justify-between relative">
                                    <div className="flex flex-col flex-shrink grow basis-0 relative">
                                        <span className="block text-[14px] text-black font-bold break-words relative leading-5">
                                            <span className="overflow-x-hidden overflow-y-hidden relative">
                                                {eventData.event_name}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                {eventData.description ? (
                                    <div className="flex flex-row flex-nowrap items-center justify-between relative">
                                        <div className="flex flex-row items-center justify-between relative">
                                            <div className="flex flex-col items-center relative">
                                                <span className="block text-[14px] text-zinc-500 font-medium break-words relative leading-5">
                                                    <span className="overflow-x-hidden overflow-y-hidden relative">
                                                        {eventData.description}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ): ""}
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default EventItem;