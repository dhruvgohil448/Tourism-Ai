import React, { useEffect, useState } from "react";
import styles, { layout, formInput, button } from "../styles";
import './tourPage.css';

import { API_ENDPOINT, axiosAuthorized, useAxios } from "../../services/api.services";
import { useNavigate, useParams } from "react-router-dom";
import ItineraryView from "./Itinerary";
import ReviewCard from "./ReviewCard";
import InputField, { TextAreaField } from "../../services/InputField";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TourCard from "../explorePage/TourCard";


const TourPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [tour, error, isReady, reload] = useAxios({
        url: `tours/${parseInt(id)}/`,
        method: "get"
    });

    
    const [similarTours, errorSimilar, isSimilarReady, _reload] = useAxios({
        url: `tours/${parseInt(id)}/similar_tours`,
        method: "get"
    }); 

    useEffect(() => {
        reload(`tours/${parseInt(id)}/`);
        _reload(`tours/${parseInt(id)}/similar_tours`);
    }, [id]);

    const inquirySchema = Yup.object().shape({
        full_name: Yup.string().required("Full Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        contact_number: Yup.string().length(12).required("Contact number is required"),
        tour_description: Yup.string().required("Tour Description is required"),
        departure_date: Yup.date().required("Departure Date is required"),
        number_of_days: Yup.number()
            .required("Number of Days is required")
            .positive("Number of Days must be greater than 0")
            .integer("Number of Days must be a whole number"),
    });


    const [checkoutData, setCheckoutData] = useState({
        no_of_travellers: "",
        slot: ""
    });

    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        contact_number: '',
        tour_description: '',
        departure_date: '',
        number_of_days: 0
    });

    const [reviewForm, setReviewForm] = useState({
        title: "",
        content: ""
    });

    const [currentTab, setcurrentTab] = useState('Overview');
    const [currentImage, setcurrentImage] = useState("");

    const tabs = ['Overview', 'Itinerary', 'Reviews'];

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleReviewFormChange = (event) => {
        const { name, value } = event.target;
        setReviewForm({
            ...formData,
            [name]: value,
        });
    };

    const navigateToCheckout = () => {
        navigate('checkout/', { state: checkoutData });
    }

    const handleInquirySubmit = (values, { setSubmitting }) => {
        // event.preventDefault();
        console.log(values);
        axiosAuthorized.post(`tours/${parseInt(id)}/inquiry/`, values).then((res) => {
            if (res) {
                alert("Your inquiry was sent.")
            }
        });
        setSubmitting(false);
    };

    const handleReviewSubmit = (event) => {
        event.preventDefault();
        axiosAuthorized.post(`tours/${parseInt(id)}/inquiry/`, formData).then((res) => {
            if (res) {
                alert("Your inquiry was sent.")
            }
        })
        console.log(formData);
    };

    const formatDate = (dateString) => {
        const inputDate = new Date(dateString);
        const day = inputDate.getDate();
        const month = inputDate.toLocaleString('default', { month: 'long' });
        const year = inputDate.getFullYear();
        const daySuffix = getDaySuffix(day);
        return `${day}${daySuffix} ${month}, ${year}`;
    };

    const getDaySuffix = (day) => {
        if (day >= 11 && day <= 13) {
            return 'th';
        }
        const lastDigit = day % 10;
        if (lastDigit === 1) {
            return 'st';
        } else if (lastDigit === 2) {
            return 'nd';
        } else if (lastDigit === 3) {
            return 'rd';
        }
        return 'th';
    };

    const scrollToTab = (tab) => {
        setcurrentTab(tab)
        document.getElementById(tab.toLowerCase()).scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(() => {
        if (isReady) {
            setcurrentImage(tour?.images[0]?.image);
            setCheckoutData({ ...checkoutData, slot: tour?.slots[0].id })
        }
    }, [isReady]);

    return (
        <>
            <section className={`${layout.section} flex-col h-auto mt-14`}>
                {isReady ? (
                    <>
                        <header className="mb-8 px-8">
                            <h1 className="font-primary font-bold text-5xl text-primary">{tour?.title}</h1>
                            <span className="text-lg">{tour?.nights} nights & {tour?.days} days</span>
                            <div className="destinations text-xl mt-2">
                                {tour?.destinations.map((item, i) => <span key={i} className="destination mr-4 font-medium text-gray-500">{item}</span>)}
                            </div>
                            <div className="flex my-6">
                                <div className="grid grid-cols-1 gap-4 mr-6 flex flex-col items-center justify-around">
                                    {tour?.images?.map((img, idx) => (
                                        <img key={idx} src={API_ENDPOINT.toString() + img.image} alt={`Tour ${idx}`} className="w-full h-auto grid-images" onClick={() => setcurrentImage(img.image)} />
                                    ))}
                                </div>
                                <div className="flex items-center justify-center">
                                    <img src={API_ENDPOINT.toString() + currentImage} alt="Tour Big Preview" className="w-full h-auto object-contain rounded-2xl" data-active="true" />
                                </div>
                            </div>

                        </header>
                        <div className="text-sm font-medium text-center text-gray-500 mb-10 self-start px-14">
                            <ul className="flex flex-wrap -mb-px">
                                {tabs.map((item, index) => (
                                    <li key={index} className="mr-2">
                                        <span role="button" className={`inline-block p-4 text-lg
                                            ${(currentTab === item)
                                                ? "text-primary border-b-2 border-primary rounded-t-lg active"
                                                : "border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300"}`}
                                            onClick={() => scrollToTab(item)}
                                        >
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="grid grid-cols-2 gap-4 px-14 w-full">
                            <div className="col-span-1">
                                <div className="content">
                                    <div className="overview mb-10" id="overview">
                                        <h2 className={`${styles.titleText}`}>Overview</h2>
                                        <p className={`${styles.bodyText}`}>
                                            {tour?.overview}
                                        </p>
                                    </div>
                                    <div className="itinerary" id="itinerary">
                                        <h2 className={`${styles.titleText}`}>Itinerary</h2>
                                        <ItineraryView itinerary={tour?.itinerary} />
                                    </div>
                                </div>

                            </div>
                            <div className="col-span-1 flex items-center flex-col jusitfy-start">
                                <div className="book-now mb-10">
                                    <h2 className={`${styles.cardSubtitle} mb-8`} style={{fontSize: "2rem"}}>Rs. {tour?.price} <small>per person</small></h2>
                                    <h2 className={`${styles.titleText} mb-6`}>Join the journey now !</h2>

                                    <div className="form-group font-body">
                                        <div class="relative mb-6">
                                            <select id="slot" name="slot" className={`${formInput.floatingInput}`}
                                                onChange={(e) => {
                                                    console.log(e.target.value);
                                                    setCheckoutData({
                                                        ...checkoutData,
                                                        slot: e.target.value,
                                                    });
                                                }}>
                                                {tour?.slots.map((slot, idx) => (
                                                    <>
                                                        {idx === 0 ? (
                                                            <option key={idx} value={id} selected>{formatDate(slot.start_date)} - {formatDate(slot.end_date)}</option>
                                                        ) : (
                                                            <option key={idx} value={id}>{formatDate(slot.start_date)} - {formatDate(slot.end_date)}</option>
                                                        )}
                                                    </>
                                                ))}
                                            </select>
                                            <label for="slot" className={`${formInput.floatingLabel}`}>Select Slot</label>
                                        </div>
                                        <div class="relative mb-6">
                                            <input type="number" id="travellers" maxLength={2} class={`${formInput.floatingInput}`} placeholder="Number of Travellers"
                                                onChange={(e) => {
                                                    setCheckoutData({
                                                        ...checkoutData,
                                                        no_of_travellers: e.target.value,
                                                    });
                                                }} />
                                            <label for="travellers" className={`${formInput.floatingLabel}`}>Number of Travellers</label>
                                        </div>
                                    </div>
                                    <button type="button" className={`w-full ${button.primary}`} onClick={navigateToCheckout}>Book Now!</button>
                                </div>
                                <div className="quick-query">
                                    <h2 className={`${styles.titleText} mb-6`}>Need a custom plan ?</h2>

                                    <Formik
                                        initialValues={{
                                            full_name: "",
                                            email: "",
                                            contact_number: "",
                                            tour_description: "",
                                            departure_date: "",
                                            number_of_days: 0,
                                        }}
                                        validationSchema={inquirySchema}
                                        onSubmit={handleInquirySubmit}
                                    >
                                        {({ isSubmitting }) => (
                                            <Form>
                                                <div className="form-group font-body">
                                                    <InputField title="Full Name" type="text" name="full_name" />
                                                    <InputField title="Email" type="email" name="email" />
                                                    <InputField title="Contact Number" type="text" name="contact_number" />
                                                    <TextAreaField title="Tour Description" name="tour_description" />
                                                    <div className={`${styles.flexBetween} mb-6`}>
                                                        <InputField title="Departure Date" type="date" name="departure_date" />
                                                        <InputField title="Number of Days" type="number" name="number_of_days" />
                                                    </div>
                                                </div>
                                                <button type="submit" className={`w-full ${button.primary}`} disabled={isSubmitting}>
                                                    Get a Custom Quote
                                                </button>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                                {/* <div className="add-review">
                                    <h2 className={`${styles.titleText} mb-6`}>How was the tour?</h2>

                                    <form onSubmit={handleReviewSubmit}>
                                        <div className="form-group font-body">
                                            <div className="relative mb-6">
                                                <input
                                                    type="text"
                                                    name="title"
                                                    value={reviewForm.title}
                                                    onChange={handleReviewFormChange}
                                                    className={`${formInput.floatingInput}`}
                                                    placeholder="Title"
                                                />
                                                <label className={`${formInput.floatingLabel}`}>Title</label>
                                            </div>
                                            <div className="relative mb-6">
                                                <label className="font-body block mb-2 text-sm font-medium text-dark">Describe your tour here ...</label>
                                                <textarea
                                                    name="content"
                                                    rows="4"
                                                    value={reviewForm.content}
                                                    onChange={handleReviewFormChange}
                                                    className="font-body block p-2.5 w-full text-sm text-dark bg-transparent rounded-lg border-2 border-dark focus:ring-primary focus:border-primary"
                                                    placeholder="Describe about your tour here ..."
                                                />
                                            </div>
                                        </div>
                                        <button type="submit" className={`w-full ${button.primary}`}>
                                            Send my review!
                                        </button>
                                    </form>
                                </div> */}
                            </div>
                        </div>
                        {isSimilarReady ? (
                            <div className={`reviews ${styles.flexCenter} flex-col mt-10`} id="reviews">
                                <h2 className={`${styles.titleText} ${styles.flexCenter} flex-col`}>You may also like ...</h2>
                                <p className="w-1/2 text-center font-body mb-2">
                                    Discover some similar tours like this one with different adventures & location!
                                </p>

                                <div className="container mx-auto p-4">
                                    <div className="relative flex overflow-x-auto scrolling-touch">
                                        <div className="min-w-full flex justify-center items-center space-x-4 px-4 py-6">
                                            {similarTours.map((tour, idx) => (
                                                <div key={idx} className="scroll-snap-align-start">
                                                    <TourCard tour={tour} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ) : (null)}
                    </>
                ) : (
                    <h1 className={`${styles.titleText}`}>Loading ...</h1>
                )}
            </section>
        </>
    )
}

export default TourPage;