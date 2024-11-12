const QuickHeaderButton = ({ icon, forwardRef, toggleAction, toggleOnClick, isLabelShowed = false, labelContent = null}) => {
    return (
        <div>
            <div className="mr-2 flex-center select-none">
                <div ref={forwardRef} className={`${toggleAction ? "bg-lime-200 hover:bg-lime-300 text-lime-700" : "bg-zinc-200 hover:bg-zinc-300"} w-10 h-10 flex-center rounded-xl cursor-pointer relative transition-all`} onClick={toggleOnClick}>
                    { icon }
                    { isLabelShowed ? (
                        <span className="absolute h-[19px] min-w-[19px] flex-center -top-1 -right-1 bg-red-500 rounded-xl">
                            <span className="text-white text-[13px] font-medium">
                                {labelContent}
                            </span>
                        </span>
                    ) : null }
                </div>
            </div>
        </div>
    );
};

export default QuickHeaderButton;