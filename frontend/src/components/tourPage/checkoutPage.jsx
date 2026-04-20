import { useLocation, useParams } from "react-router-dom";
import { useAxios } from "../../services/api.services";
import styles, { button, formInput } from "../styles";
import { useEffect, useState } from "react";
import InputField, { TextAreaField } from "../../services/InputField";

import * as Yup from "yup";
import { Formik, Field, ErrorMessage, FieldArray, Form } from "formik";

const CheckOutPage = () => {
    const { id } = useParams();
    const location = useLocation();

    const [imageHidden, setImageHidden] = useState(false)
    const [tour, error, isReady] = useAxios({
        url: `tours/${id}`,
        method: 'get'
    });

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Email is required"),
        contact_number: Yup.string().required("Contact number is required"),
        address: Yup.string().required("Address is required"),
        city: Yup.string().required("City is required"),
        special_requests: Yup.string(),
        amount: Yup.number().required("Amount is required").min(0, "Amount must be greater than or equal to 0"),
        travellers: Yup.array().of(
            Yup.object().shape({
                name: Yup.string().required("Name is required"),
                dob: Yup.date().required("Date of birth is required"),
                gender: Yup.string().required("Gender is required"),
                age: Yup.number().required("Age is required").min(0, "Age must be greater than or equal to 0"),
            })
        ),
    });

    const [travellers, setTravellers] = useState();

    const initialValues = {
        email: "",
        contact_number: "",
        address: "",
        city: "",
        special_requests: "",
        amount: tour?.price || 0,
        travellers: travellers
    };

    const [activeTab, setActiveTab] = useState("order");

    const tabs = [
        { name: "Order Details", slug: "order" },
        { name: "Travellers Details", slug: "travellers" },
        { name: "Payment Details", slug: "payment" }
    ];

    const handleCheckout = (values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
    };

    useEffect(() => {
        setTravellers(Array.from({ length: location?.state?.no_of_travellers }, () => ({
            name: "",
            gender: "",
            age: "",
            dob: ""
        })))
    }, [])

    return (
        <>
            <section className={`w-full px-10 sm:px-16 flex justify-start items-start flex-col h-auto mt-14`}>
                {isReady ? (
                    <>
                        <header className="mb-6">
                            <h1 className="font-primary font-bold text-5xl text-primary mb-8">{tour?.title}</h1>
                            <h1 className="font-body font-bold text-3xl text-dark mb-2">Checkout Page</h1>
                            <p className={`${styles.bodyText}`}>Fill out the form to be a part of an amazing journey and an experience of a lifetime!</p>
                        </header>
                        <form className="w-full">
                            <ol class="flex items-center w-full text-sm font-medium text-center text-gray-500 sm:text-base mb-8">
                                {tabs.map((item, idx) => (
                                    <li key={idx} className={`font-body flex md:w-full items-center text-primary cursor-pointer ${(idx === tabs.length - 1) ? "" : "sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-primary after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10"
                                        }`} onClick={() => setActiveTab(item.slug)}>
                                        <span class={`flex items-center w-full text-xl ${(idx === tabs.length - 1) ? '' : 'after:content-[' / '] sm:after:hidden after:mx-2 after:text-primary w-full'
                                            }`}>
                                            {(activeTab === item.slug) ? (
                                                <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                                </svg>
                                            ) : <span className="mr-2">{idx + 1}.</span>}
                                            {item.name}
                                        </span>
                                    </li>
                                ))}
                            </ol>

                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleCheckout}
                            >
                                {({ isSubmitting, setFieldValue }) => (
                                    <Form>
                                        <div className="form-container w-1/2">
                                            {activeTab === "order" ? (
                                                <div className="form-group">
                                                    <InputField title={"Email"} type={"email"} />
                                                    <InputField title={"Contact Number"} type={"text"} />
                                                    <InputField title={"City"} type={"text"} />
                                                    <TextAreaField title={"Address"} />
                                                    <TextAreaField title={"Special Requests"} />

                                                    <button type="button" className={`${button.primary}`}
                                                        onClick={() => setActiveTab("travellers")}>
                                                        Continue
                                                    </button>
                                                </div>
                                            ) : activeTab === "travellers" ? (
                                                <>
                                                    <div className="form-group grid grid-cols-2 gap-x-16">
                                                        {travellers.map((traveller, index) => (
                                                            <div className="traveller-form" key={index}>
                                                                <h1 className={`${styles.bodyText} mb-4 font-bold`}>Traveller Form #{index + 1}</h1>
                                                                <div className={`flex items-center justify-start mb-2`}>
                                                                    <div className="mr-6">
                                                                        <InputField title={"Name"} type={"text"} name={`travellers[${index}].name`} classes={"w-auto"} />
                                                                    </div>
                                                                    <InputField title={"dob"} type={"date"} name={`travellers[${index}].dob`} classes={"w-auto"} />
                                                                </div>
                                                                <div className={`flex items-center justify-start`}>
                                                                    <div className="mr-6">
                                                                        <InputField title={"gender"} type={"text"} name={`travellers[${index}].gender`} classes={"w-auto"} />
                                                                    </div>
                                                                    <InputField title={"age"} type={"number"} name={`travellers[${index}].age`} classes={"w-auto"} />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <button type="button" className={`${button.primary}`}
                                                        onClick={() => setActiveTab("payment")}>
                                                        Continue
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button type="button" className={`${button.primary}`} onClick={() => setImageHidden(!imageHidden)}>

                                                        <h1 className="font-body text-xl">Continue with razorpay</h1>
                                                    </button>
                                                    <img src={process.env.PUBLIC_URL + '/logo512.png'} alt="checkout page razorpay wala" hidden={imageHidden} />
                                                </>
                                            )}
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </form>

                    </>
                ) : (
                    <h1 className={`${styles.titleText}`}>Loading ...</h1>
                )}
            </section >
        </>
    );
}

export default CheckOutPage;
