const MessageHeaderCreate = () => {
    return (
        <div>
            <div className="w-full h-full flex flex-col ">
                <div className="flex flex-row items-center mx-[10px] mb-[0px] p-[8px] rounded-3xl hover:bg-zinc-100 transition-all cursor-pointer">
                    <div className="w-[56px] h-[56px] mr-[8px] flex flex-row items-center justify-center text-white border border-solid border-gray-500 rounded-3xl bg-lime-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={0} stroke="currentColor" className="w-5 h-5">
                            <path d="M23.3458 0.633387C22.4924 -0.211454 21.1083 -0.211454 20.2549 0.633387L18.7363 2.13571L21.8272 5.1931L23.3727 3.66441C24.2268 2.82023 24.1999 1.47756 23.3458 0.633387ZM17.762 3.10349L9.39669 11.3893L8.35883 15.6412L12.4876 14.4467L20.8963 6.23791L17.762 3.10349ZM4.70156 1.01393C2.10496 1.01393 0 3.16788 0 5.82491V19.1887C0 21.8458 2.10496 23.9997 4.70156 23.9997H18.2838C20.8804 23.9997 22.9854 21.8458 22.9854 19.1887V14.074C22.9854 13.1884 22.2838 12.5068 21.4182 12.5068C20.5527 12.5068 19.851 13.1884 19.851 14.074V19.1887C19.851 20.0744 19.1494 20.7924 18.2838 20.7924H4.70156C3.83603 20.7924 3.13437 20.0744 3.13437 19.1887V5.82491C3.13437 4.93923 3.83603 4.22125 4.70156 4.22125H9.92552C10.7911 4.22125 11.4927 3.50326 11.4927 2.61759C11.4927 1.73191 10.7911 1.01393 9.92552 1.01393H4.70156Z"></path>
                        </svg>
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