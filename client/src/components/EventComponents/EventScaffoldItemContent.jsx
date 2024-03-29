import {convertDateFormat} from "@/utils";

const EventScaffoldItemContent = ({ eventProps }) => {
    return (
        <div>
            <div className="mt-[40px] mb-[12px] flex flex-row items-center relative">
                <div className="flex flex-row items-center justify-start gap-1 relative">
                    <div className="w-[20px] h-[20px] flex items-center justify-center relative">
                        <i>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/>
                            </svg>
                        </i>
                    </div>
                    <div className="flex flex-col items-center justify-center relative">
                        <div className="block text-[16px] text-zinc-500 font-normal break-words relative leading-5">
                            <div className="flex flex-row items-center justify-between gap-2 relative">
                                <span className="max-w-[320px] text-ellipsis whitespace-nowrap overflow-hidden relative">
                                    { eventProps?.location }
                                </span>
                                <span className="overflow-hidden relative"> | </span>
                                <span className="overflow-hidden relative">
                                    { convertDateFormat(eventProps?.event_start_datetime) }
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-start relative">
                <div>
                    <span className="text-[16px] text-zinc-700 text-left font-normal break-words relative leading-6">
                        <span className="overflow-hidden line-clamp-6 relative">
                            { eventProps?.event_description }
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default EventScaffoldItemContent;