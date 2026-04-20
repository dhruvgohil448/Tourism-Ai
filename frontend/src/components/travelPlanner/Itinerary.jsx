import React, { useEffect, useState } from "react";
import ItineraryView from "../tourPage/Itinerary";
import { useLocation, useNavigate } from "react-router-dom";

import { button } from "../styles";
// import { Airplane } from "react-ionicons";
import { LuIndianRupee } from "react-icons/lu";
import { axiosAuthorized } from "../../services/api.services";
import { HotelCard } from "../explorePage/TourCard";
import { Airplane } from "iconsax-react";

const Flight = ({ item }) => {
    return (
        <>
            {/* Flight details */}
            <div className="px-6 py-4 w-auto rounded-xl px-3 shadow-xl bg-white border-2 border-grey mr-4">
                <div className="flex-col px-4">
                    <div className="flex flex-row items-center h-full">
                        {/* Flight icon and date */}
                        <div className="flex flex-col items-center gap-4 w-20 mr-4">
                            {/* <Airplane color="#00000" /> */}
                            <Airplane size={24} variant="Bold" style={{ rotate: "90deg" }} />
                            <span className="text-gray-500 text-sm mb-0">
                                {item.originDate}
                            </span>
                        </div>
                        {/* Flight details */}
                        <div className="flex flex-col justify-center items-center h-full mt-0">
                            <div className="h-full flex flex-row">
                                {/* Origin details */}
                                <div className="flex flex-col justify-center items-center">
                                    <p className="text-gray-500 text-2xl">
                                        {item.originTime}
                                    </p>
                                    <p className="text-black text-2xl">{item.cityOrigin}</p>
                                </div>
                                {/* Duration */}
                                <div className="flex flex-col gap-2 justify-center items-center">
                                    <p className="p-2">
                                        {`${Math.floor(item.Duration || 0)}h ${Math.ceil(((item.Duration || 0) % 1) * 60)}m`}
                                    </p>
                                </div>
                                {/* Destination details */}
                                <div className="flex flex-col mx-2 justify-center items-center">
                                    <p className="text-gray-500 text-2xl">
                                        {item.destTime}
                                    </p>
                                    <p className="text-black text-2xl">{item.cityDest}</p>
                                </div>
                            </div>
                            {/* Flight name, price, and airline */}
                            <div className="flex gap-2 flex-row items-center">
                                <h1 className="text-lg font-semibold text-gray-500">
                                    {item.flightName}
                                </h1>
                                <span className="text-lg font-semibold flex flex-row items-center">
                                    <LuIndianRupee />
                                    {item.price}
                                </span>
                                {/* <span className="text-sm text-gray-500">{item.airLineName}</span> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Divider */}
            <div className="h-8 w-auto bg-gray-50"></div>
        </>

    );
};


export default function ItineraryPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { flights = [], hotels = [], itinerary = [] } = (location.state || {});
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        if (!location.state || (!location.state.itinerary && itinerary.length === 0)) {
            navigate('/travelplanner');
            return;
        }
    }, [location.state, navigate, itinerary.length])

    const sendItineraryToWhatsapp = async () => {
        setIsSending(true);
        try {
            const res = await axiosAuthorized.post('fetchai/send_itinerary_whatsapp/', {
                itinerary: itinerary
            })
            console.log(res);
            alert("Sent to WhatsApp!");
        } catch (e) {
            console.error(e);
            alert("Failed to send WhatsApp message.");
        } finally {
            setIsSending(false);
        }
    }

    const downloadAudioBook = async () => {
        try {
            const res = await axiosAuthorized.post('fetchai/download_audiobook/', {
                itinerary: itinerary
            })
            console.log(res);
            alert("Audiobook generation initiated.");
        } catch (e) {
            console.error(e);
            alert("Failed to initiate audiobook.");
        }
    }

    const downloadPDF = async () => {
        try {
            const res = await axiosAuthorized.post('fetchai/download_pdf/', {
                itinerary: itinerary
            })
            console.log(res);
            alert("PDF generation initiated.");
        } catch (e) {
            console.error(e);
            alert("Failed to initiate PDF.");
        }
    }

    if (!location.state) return null;

    return (
        <section className={`mx-24 flex justify-start items-center flex-col h-min-screen mt-[3rem] text-dark`}>
            <h1 className="font-bold text-3xl mb-2">THERE YOU GO!</h1>
            <h1 className="font-medium text-2xl mb-6">We have gathered some information based on the form you filled.</h1>

            {flights && flights.length > 0 && (
                <div className="flex flex-col items-start w-full my-4">
                    <h1 className="font-bold text-xl mb-4">Recommended Flights</h1>
                    <div className="flex items-center overflow-x-auto w-full pb-4">
                        {flights.map((plane, idx) => (
                            <Flight key={idx} item={plane} />
                        ))}
                    </div>
                </div>
            )}

            {hotels && hotels.length > 0 && (
                <div className="flex flex-col items-start w-full my-4">
                    <h1 className="font-bold text-xl mb-4">Recommended Hotels</h1>
                    <div className="flex items-center overflow-x-auto w-full pb-4 gap-4">
                        {hotels.map((hotel, idx) => (
                            <HotelCard key={idx} hotel={hotel} />
                        ))}
                    </div>
                </div>
            )}

            <h1 className="w-full mt-4 font-bold text-xl mb-4 text-left">Generated Itinerary</h1>
            {itinerary && itinerary.length > 0 ? (
                <ItineraryView classes={"w-full"} itinerary={itinerary} />
            ) : (
                <p>No itinerary generated.</p>
            )}

            <div className="flex items-center gap-4 mb-16">
                <button type="button" className={`${button.primary} text-xl mt-6`} onClick={downloadPDF}>Download as PDF</button>
                <button type="button" className={`${button.primary} text-xl mt-6`} onClick={downloadAudioBook}>Download our Audio Book</button>
                <button type="button" disabled={isSending} className={`${button.primary} text-xl mt-6 disabled:opacity-50`} onClick={sendItineraryToWhatsapp}>
                    {isSending ? "Sending..." : "Send Itinerary to Whatsapp"}
                </button>
            </div>
        </section>
    )
}