import Image from "next/image";

const MessagePresentationImage = ({ conversationPictureUrl }) => {
    return (
        <>
            { Array.isArray(conversationPictureUrl) ? (
                <div className="w-full h-full relative">
                    { conversationPictureUrl?.map((pictureUrl, index) => (
                        <div className="w-[70%] h-[70%] rounded-xl overflow-hidden absolute" style={{ top: index === 0 ? 0 : "auto", right: index === 0 ? 0 : "auto", bottom: index === 1 ? 0 : "auto", left: index === 1 ? 0 : "auto", zIndex: index }}>
                            <Image src={pictureUrl} alt={`${pictureUrl}-image`} fill={true} sizes="(max-width: 768px) 100vw" className="object-cover"/>
                        </div>
                    )) }
                </div>
            ) : (
                <div className="w-full h-full overflow-hidden block rounded-full bg-white border border-solid border-gray-500 relative">
                    <div className="w-full h-full flex flex-col relative">
                        <Image src={conversationPictureUrl} alt={`${conversationPictureUrl}-image`} fill={true} sizes="(max-width: 768px) 100vw" className="object-cover"/>
                    </div>
                </div>
            ) }
        </>
    );
};

export default MessagePresentationImage;