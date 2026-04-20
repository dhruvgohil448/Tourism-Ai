import React from "react";
import styles, { layout, button } from "../styles";

import CarouselView from "./CarouselView";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();

    const images = ["/images/landing-1.jpg", "/images/landing-2.jpg"];
    const tourTypes = ["Camping", "Trekking", "Safari", "Agro-Toursim", "Pilgrimage", "Rafting"];
    const categories = ["North India", "South India", "West India", "East India"];

    return (
        <>
            <section className={`w-full sm:px-3 px-5 flex justify-end items-center relative flex-col h-screen mt-[-4rem]`}>
                <div className="absolute z-[-1] h-screen w-screen top-0 left-0 bg-gradient-to-t from-black opacity-90 via-transparent to-transparent"></div>
                <CarouselView images={images} />
                
                <div className="panel w-3/4 text-center px-6 py-4 rounded-lg text-white font-body text-xl mb-6">
                    Whether you're a solo traveler seeking new horizons, a couple in search of a romantic getaway, or a family 
                    looking to bond through adventure, TravelBeyond is your gateway to a world of possibilities. Let us help     
                    you unlock the wonders of our planet, one extraordinary journey at a time.
                </div>
            </section>

            <section className={`grid grid-cols-2 gap-4 px-14 py-10`} style={{minHeight: 'auto !important'}}>
                <div className="col-span-1">
                    <h1 className='font-semibold navbar-head text-8xl mb-4'>Travel <span className='text-primary'>Beyond</span></h1>
                    <span className={`${styles.bodyText} text-3xl font-semibold`}>Where Adventure Knows No Limits.</span>
                </div>

                <div className="col-span-1">
                    <div className={`${styles.flexCenter} grid grid-cols-3 gap-4 tour-types`}>
                        {tourTypes.map((item, idx) => (
                            <div key={idx} className={`${styles.flexCenter} flex-col mb-3`}>
                                <img src={process.env.PUBLIC_URL + `/icons/${idx+1}.png`} className="w-[8rem]" alt={item} />
                                <span className={`${styles.bodyText} text-2xl text-primary font-bold`}>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={`grid grid-cols-2 gap-4 px-14 py-14`} style={{minHeight: 'auto !important'}}>
                <div className="col-span-1">
                    <div className={`${styles.flexCenter} grid grid-cols-2 gap-4 tour-types`}>
                        {categories.map((item, idx) => (
                            <div key={idx} className={`${styles.flexCenter} flex-col mb-3`}>
                                <img src={process.env.PUBLIC_URL + `/images/india/${idx+1}.png`} className="w-[18rem] mb-2 rounded-lg" alt={item} />
                                <span className={`${styles.bodyText} text-2xl text-primary`}>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-1 text-end pr-6">
                    <h2 className={`text-end text-6xl font-semibold leading-[4rem]`}>
                        Explore <span className='text-primary'>India</span> like never before!
                    </h2>
                    <button type="button" className={`${button.primary} text-xl mt-12`}
                        onClick={() => navigate('/explore')}>Explore More!</button>
                </div>
            </section>

            <section className={`grid grid-cols-2 gap-4 px-14 py-14`} style={{minHeight: 'auto !important'}}>
                <div className="col-span-1">
                    <h2 className={`text-6xl font-semibold leading-[4rem]`}>
                        Discover Exotic Destinations <span className='text-primary'>Abroad!</span>
                    </h2>
                    <button type="button" className={`${button.primary} text-xl mt-12`}
                        onClick={() => navigate('/explore', { state: {categories: "Foreign"} })}>See More!</button>
                </div>

                <div className="col-span-1">
                    <img src={process.env.PUBLIC_URL + "images/abroad.png"} alt="Aborad Image Posters" />
                </div>
            </section>
        </>
    )
}