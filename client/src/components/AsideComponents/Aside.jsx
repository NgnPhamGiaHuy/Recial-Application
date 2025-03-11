"use client"

import { AsideWeather, AsideNavigation, AsideFollow } from "@/components";

const Aside = () => {
    return (
        <div className="max-w-[360px] min-w-[280px] top-[56px] sm:block hidden basis-[360px] overflow-x-hidden">
            <div className="max-h-[inherit] min-h-[inherit] flex flex-col relative">
                <div className="flex flex-col min-h-0 flex-shrink grow basis-full overflow-x-hidden overflow-y-auto overscroll-y-contain relative">
                    <div className="mt-[16px] flex flex-col grow relative">
                        <section>
                            <AsideWeather/>
                        </section>
                        <section>
                            <AsideNavigation/>
                        </section>
                        <div className="mx-[16px] mt-[4px] h-[1px] bg-zinc-300"></div>
                        <section>
                            <AsideFollow/>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Aside;