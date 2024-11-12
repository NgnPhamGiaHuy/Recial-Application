import { PencilSquareIcon } from "@heroicons/react/24/outline";

const MessageHeaderCreate = () => {
    return (
        <div>
            <div className="flex flex-col">
                <div className="mx-2 p-2 flex flex-row items-center rounded-full hover:bg-zinc-100 transition-all cursor-pointer">
                    <div className="w-14 h-14 mr-2 flex-center flex-row text-white border border-solid border-gray-500 rounded-full bg-lime-500">
                        <PencilSquareIcon width={24} height={24} />
                    </div>
                    <div className="flex flex-row items-center text-left text-[16px] font-semibold leading-5">
                        <h3>New message</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageHeaderCreate;