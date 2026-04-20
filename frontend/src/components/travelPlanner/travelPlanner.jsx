import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles, { layout, button } from "../styles"
import InputField, { TextAreaField } from "../../services/InputField"
import { Formik, Form, Field } from "formik"
import { axiosAuthorized } from "../../services/api.services"
import Destination from "./Destination"

export default function TravelPlannerPage() {

    const navigate = useNavigate()

    const [formstate, setFormstate] = useState({
        personGoing: 1,
        daysGoing: 3,
        firstTimeVisit: false,
        budget: "",
        occassion: "",
        preferences: "",
        cities: ""
    })

    const [cities, setCities] = useState([])
    const travelPartners = ["Couple", "Friends", "Family"]

    const [selected, setSelected] = useState(0)

    const [step, setStep] = useState(1)
    const titles = ["Plan your Next Adventure with Travel Beyond!", "Describe your interest in detail... So we can plan the best Itinerary for you 😁"]
    const [isLoading, setIsLoading] = useState(false)

    const [image, setImage] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (values) => {
        setIsLoading(true);
        const prompt = `Destination: ${formstate.cities}, Group: ${formstate.personGoing} (${travelPartners[selected]}), Days: ${formstate.daysGoing}, First Time: ${formstate.firstTimeVisit}, Budget: ${formstate.budget}, Occasion: ${formstate.occassion}`;
        const preferences = formstate.preferences;
        
        try {
            const response = await axiosAuthorized.post('fetchai/', {
                prompt,
                preferences
            });
            navigate('/itinerary/new', { state: response.data });
        } catch (error) {
            console.error("Failed to fetch itinerary", error);
            alert("Failed to generate itinerary. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className={`mx-24 flex justify-start items-center flex-col h-min-screen mt-[3rem] text-dark`}>
            <h1 className="font-bold text-3xl mb-2">STEP {step}</h1>
            <h1 className="font-medium text-2xl mb-6">{titles[step - 1]}</h1>

            <main className="w-full">
                {step === 1 ? (
                    <>
                        {/* <Destination cities={cities} setCities={setCities}/> */}
                        <div className="flex w-full flex-col items-start my-4">
                            <span className="font-bold mb-4">Where do you want to go? <span className="text-gray-500 font-normal">(ex: You can enter cities or countries)</span></span>
                            <input type="text" placeholder="Paris or Europe Tour" className="w-full h-11 p-2 rounded-md border border-solid border-gray-300 outline-none" 
                                value={formstate.cities}
                                onChange={(e) => setFormstate(prev => ({ ...prev, cities: e.target.value }))}
                            />
                        </div>


                        <div className="flex w-full flex-col items-start my-4">
                            <label htmlFor="Cities" className="mb-4 text-base md:text-lg font-bold">
                                How many people are going?
                            </label>
                            <input
                                className="w-full h-11 p-2 rounded-md border border-solid border-gray-300 outline-none"
                                id="Cities"
                                aria-autocomplete="list"
                                aria-expanded="false"
                                role="combobox"
                                placeholder="1 person"
                                type="number"
                                value={formstate.personGoing}
                                onChange={(e) => setFormstate(prev => ({ ...prev, personGoing: parseInt(e.target.value) }))}
                                max={6}
                                min={1}
                            />

                            <label htmlFor="Days" className="mt-6 mb-4 text-base md:text-lg font-bold">
                                How many days are you planning to stay?
                            </label>
                            <input
                                className="w-full h-11 p-2 rounded-md border border-solid border-gray-300 outline-none"
                                id="Days"
                                placeholder="3 days"
                                type="number"
                                value={formstate.daysGoing}
                                onChange={(e) => setFormstate(prev => ({ ...prev, daysGoing: parseInt(e.target.value) || 1 }))}
                                min={1}
                            />

                            {formstate.personGoing > 1 && (
                                <>
                                    <span className="my-4 font-bold">Who's Travelling with you?</span>
                                    <div className="flex items-center justify-center">
                                        {travelPartners.map((data, idx) => (
                                            <div key={idx} className={`px-6 py-2 border-2 border-dark rounded-lg cursor-pointer mr-4 ${selected === idx ? "bg-dark text-white" : ""} ${(idx === 0 && formstate.personGoing > 2) && "hidden"}`}
                                                onClick={() => setSelected(idx)}
                                            >{data}</div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="flex my-4 w-full cursor-pointer select-none items-center justify-between gap-2 rounded-md border border-solid border-gray-300 px-4 py-2.5 text-base transition-colors">
                            <span className="font-bold">First time visiting?</span>
                            <input
                                id="inline-checkbox"
                                type="checkbox"
                                checked={formstate.firstTimeVisit}
                                onChange={(e) => setFormstate(prev => ({ ...prev, firstTimeVisit: e.target.checked }))}
                                className="w-4 h-4 text-blue-600 rounded-xl bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                        </div>

                        <div className="flex w-full flex-col items-start my-4">
                            <span className="font-bold">How much do you plan to spend on this trip? <span className="text-gray-500 font-normal">(Optional)</span></span>
                            <select
                                id="budget"
                                name="budget"
                                className="w-full h-10 border border-gray-300 rounded-md px-4 mt-2"
                                value={formstate.budget}
                                onChange={(e) => setFormstate(prev => ({ ...prev, budget: e.target.value }))}
                            >
                                <option value="">None</option>
                                <option value="low">Less than 500 USD</option>
                                <option value="medium">Between 500 and 1000 USD</option>
                                <option value="medium">Between 1000 and 2000 USD</option>
                                <option value="medium">Between 2000 and 5000 USD</option>
                                <option value="medium">Between 5000 and 10000 USD</option>
                                <option value="medium">More than 10000 USD</option>
                            </select>
                        </div>

                        <div className="flex w-full flex-col items-start my-4">
                            <span className="font-bold">Are you traveling for a special occasion? <span className="text-gray-500 font-normal">(Optional)</span></span>

                            <select
                                id="occasion"
                                name="occasion"
                                className="w-full h-10 border border-gray-300 rounded-md px-4 mt-2"
                                value={formstate.occassion}
                                onChange={(e) => setFormstate(prev => ({ ...prev, occassion: e.target.value }))}
                            >
                                <option value="">None</option>
                                <option value="birthday">Honeymoon</option>
                                <option value="anniversary">Event</option>
                                <option value="wedding">Business</option>
                            </select>
                        </div>


                        <button type="button" className={`${button.primary} text-xl mt-6`} onClick={() => setStep(prev => prev + 1)}>Continue</button>
                    </>
                ) : (
                    <>
                        <span className="font-bold mb-4">Upload any image you ever dreamt of visiting! <span className="text-gray-500 font-normal">(Optional)</span></span>
                        <div className="w-[30rem] h-[25rem] my-4 border border-dashed border-gray-400 flex items-center justify-center">
                            {image ? (
                                <img src={image} alt="Uploaded" className="w-full h-full object-cover" onDoubleClick={() => setImage(null)} />
                            ) : (
                                <label htmlFor="upload" className="text-center cursor-pointer">
                                    Click here to upload an image
                                    <input
                                        id="upload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                    />
                                </label>
                            )}
                        </div>

                        <div className="flex w-full flex-col items-start my-4">
                            <span className="font-bold mb-4">What kind of activities you would love to do? <span className="text-gray-500 font-normal">(ex: swimming, trekking, etc)</span></span>
                            <input type="text" placeholder="Prefrences" className="w-full h-11 p-2 rounded-md border border-solid border-gray-300 outline-none" 
                                value={formstate.preferences}
                                onChange={(e) => setFormstate(prev => ({ ...prev, preferences: e.target.value }))}
                            />
                        </div>

                        <button type="button" className={`${button.outline} text-xl mt-6`} onClick={() => setStep(prev => prev - 1)}>Go Back</button>
                        <button type="button" disabled={isLoading} className={`${button.primary} text-xl mt-6`} onClick={handleSubmit}>
                            {isLoading ? "Planning..." : "Plan My Journey!"}
                        </button>
                    </>
                )}
            </main>
        </section>

    )
}
