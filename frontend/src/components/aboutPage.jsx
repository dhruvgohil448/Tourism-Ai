import React from "react";
import { useNavigate } from "react-router-dom";

import styles, { layout, button } from "./styles";
import CarouselView from "./landingPage/CarouselView";
import TourCard from "./explorePage/TourCard";
import { useAxios } from "../services/api.services";


const ReviewCard = ({ review }) => {
    return (
        <div className={`review-card ${styles.flexCenter} flex-col mx-4 py-8 max-w-[24rem] bg-white rounded-lg px-14`}>
            <p className={`${styles.bodyText} text-justify mb-6`}>
                The landscapes, serene mountains, and vibrant culture of Himachal Pradesh truly left me in awe, and it was Travel Beyond's expertise that made it all the more memorable. The itinerary was perfectly planned, allowing me to explore not only the popular destinations but also hidden gems that truly made this journey unique.
            </p>
            <div className={`review-content w-full flex items-center justify-start`}>
                <img src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg"
                    className="w-[3rem] h-[3rem] rounded-full object-cover mr-4"
                    alt="profile" />
                <div>
                    <h1 className={`${styles.cardSubtitle} text-xl`}>John Doe</h1>
                    <p className={`${styles.bodyText} ${styles.flexCenter}`}>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: "1.2rem", marginRight: ".4rem" }}><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path></svg>
                        ))}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function AboutUsPage() {
    const navigate = useNavigate();

    const [bestSellers, err, isReady, reload] = useAxios({
        url: 'tours?bestseller=True',
        method: 'GET'
    })

    const images = ["/images/landing-1.jpg", "/images/landing-2.jpg"];
    const tourTypes = ["Camping", "Trekking", "Safari", "Agro-Toursim", "Pilgrimage", "Rafting"];
    const categories = ["North India", "South India", "West India", "East India"];

    const tour = {
        id: 1,
        title: "Testing",
        overview: "Some bigg ass paragraph.",
        image: ""
    }

    return (
        <>
            <section className={`w-full sm:px-3 px-5 flex justify-center items-center relative flex-col h-screen mt-[-4rem]`}>
                <div className="absolute z-[-1] h-screen w-screen top-0 left-0 bg-black opacity-30"></div>
                {/* <CarouselView images={images} /> */}
                <video className="absolute w-full h-screen top-0 left-0 z-[-2] object-cover" loop muted autoPlay=""
                    onLoadedMetadata={(e) => e.target.play()}>
                    <source src={process.env.PUBLIC_URL + "/bg.mp4"} type="video/mp4" />
                </video>

                <h1 className={'font-primary font-bold text-8xl text-center text-white w-1/2 drop-shadow-2xl mb-4'}>Time for your next adventure</h1>
                <h1 className={`${styles.titleText} drop-shadow-2xl`}>Let's plan it for you!</h1>
                <button type="button" className={`${button.primaryWhite} text-xl mt-12 w-1/4`}
                    onClick={() => navigate('/travelplanner')}>Plan your Journey Now!</button>
            </section>

            <section className={`grid grid-cols-2 gap-4 px-14 py-10`} style={{ minHeight: 'auto !important' }}>
                <div className="col-span-1">
                    <div className={`${styles.flexCenter} w-[3rem] h-[3rem] rounded-full bg-primary p-2 mb-4`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="white" fill="white" style={{ width: "1.9rem" }}><path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15ZM12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11C14 12.1046 13.1046 13 12 13Z"></path></svg>
                    </div>
                    <h1 className='font-semibold navbar-head text-6xl mb-4'><span className='text-primary'>Travel </span>Made Easy</h1>
                    <p className={`${styles.bodyText} text-lg`}>Welcome to Travel Beyond, your passport to extraordinary journeys and unforgettable adventures. We are a passionate team of travel enthusiasts dedicated to redefining the way you explore the world. At Travel Beyond, we believe that travel is more than just a destination; it's an experience, a story waiting to be written, and memories waiting to be made.</p>
                    <button type="button" className={`${button.primary} text-xl mt-12`}
                        onClick={() => navigate('/explore')}>Explore Tours</button>
                </div>

                <div className="col-span-1">
                    <img src={process.env.PUBLIC_URL + "images/travel_easy.png"} alt="Guy walking around" />
                </div>
            </section>

            <section className={`flex justify-center items-center flex-col px-14 py-8`} style={{ minHeight: 'auto !important' }}>
                <h2 className={`text-end text-6xl font-semibold leading-[4rem] mb-14`}>
                    Our <span className='text-primary'>BestSellers!</span>
                </h2>
                <div className="flex justify-center items-center gap-8">

                    {isReady ? (
                        <>
                            {Array.from(Array.isArray(bestSellers) ? bestSellers : (bestSellers?.results || [])).slice(0, 3).map((tour, idx) => (
                                <TourCard key={idx} tour={tour} />
                            ))}
                        </>
                    ) : (null)}
                </div>
            </section>

            <section className={`flex justify-center items-center flex-col px-14 py-14`} style={{ minHeight: 'auto !important' }}>
                <h2 className={`text-end text-6xl font-semibold leading-[4rem] mb-14`}>
                    We'll handle your <span className='text-primary'>Trip</span> for you!
                </h2>
                <div className="grid grid-cols-2 gap-8">
                    <div className="col-span-1">
                        <div className="flex justify-center items-center flex-col">
                            <div className={`trip-card ${styles.flexCenter} mb-6`}>
                                <img src={process.env.PUBLIC_URL + "images/h1.png"}
                                    alt="Some randome trip"
                                    className="w-[8rem] h-[9rem] object-cover mr-4" />
                                <div className="trip-content">
                                    <h1 className={`${styles.cardTitle} text-xl mb-2`}>Quality & Safety</h1>
                                    <p className={`${styles.bodyText}`}>We partner with trusted accommodations, transportation providers, and local guides to ensure a seamless and secure travel experience.</p>
                                </div>
                            </div>
                            <div className={`trip-card ${styles.flexCenter}`}>
                                <img src={process.env.PUBLIC_URL + "images/h2.png"}
                                    alt="Some randome trip"
                                    className="w-[8rem] h-[9rem] object-cover mr-4" />
                                <div className="trip-content">
                                    <h1 className={`${styles.cardTitle} text-xl mb-2`}>Expertise</h1>
                                    <p className={`${styles.bodyText}`}>With years of experience in the travel industry, our team has in-depth knowledge of destinations and cultures around the world, its hidden gems and secret treasures that make your journey unique.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="flex justify-center items-center flex-col">
                            <div className={`trip-card ${styles.flexCenter} mb-6`}>
                                <img src={process.env.PUBLIC_URL + "images/h3.png"}
                                    alt="Some randome trip"
                                    className="w-[8rem] h-[9rem] object-cover mr-4" />

                                <div className="trip-content">
                                    <h1 className={`${styles.cardTitle} text-xl mb-2`}>Diverse Selection</h1>
                                    <p className={`${styles.bodyText}`}>Whether you're an adventure seeker, a culture enthusiast, a nature lover, or a history buff, we have a tour for you across continents and catering to a wide range of interests.</p>
                                </div>
                            </div>
                            <div className={`trip-card ${styles.flexCenter}`}>
                                <img src={process.env.PUBLIC_URL + "images/h4.png"}
                                    alt="Some randome trip"
                                    className="w-[8rem] h-[9rem] object-cover mr-4" />

                                <div className="trip-content">
                                    <h1 className={`${styles.cardTitle} text-xl mb-2`}>Sustainability</h1>
                                    <p className={`${styles.bodyText}`}>Travel Beyond is committed to responsible and sustainable travel. We promote eco-friendly practices and work towards preserving the beauty of our planet for generations to come.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={`flex justify-center items-center flex-col px-14 py-14 relative`} style={{ minHeight: 'auto !important' }}>
                <img className="absolute w-full top-0 left-0 z-[-1] object-cover" src={process.env.PUBLIC_URL + "images/fav_trav.png"} alt="" />
                <h2 className={`text-end text-6xl font-semibold leading-[4rem] mb-14`}>
                    Our <span className='text-primary'>Favourite</span> travellers!
                </h2>
                <div className="flex justify-center items-center gap-6">
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                </div>
            </section>
        </>
    )
}