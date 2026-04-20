import React, { useState } from 'react';
import styles from "../styles";

const ItineraryView = ({ itinerary, classes }) => {
    // Initialize an array of states to keep track of whether each item is open or closed
    const [openStates, setOpenStates] = useState(Array(itinerary.length).fill(true));

    // Function to toggle the state of an item at a given index
    const toggleItem = (index) => {
        const newOpenStates = [...openStates];
        newOpenStates[index] = !newOpenStates[index];
        setOpenStates(newOpenStates);
    };

    return (
        <ol className={`relative border-l border-dark mt-6 ${classes}`}>
            {itinerary.map((item, index) => (
                <li key={index} className="mb-10 ml-4">
                    <div className="absolute w-3 h-3 bg-dark rounded-full mt-1.5 -left-1.5 border border-dark"></div>
                    <time className="mb-1 text-md font-body leading-none text-dark">Day {index + 1}</time>

                    <div
                        id={`smthn-${index}`}
                        data-accordion="collapse"
                        data-active-classes="text-primary"
                        data-inactive-classes="text-primary"
                    >
                        <h2 id={`smthn-${index}-heading`}>
                            <button
                                type="button"
                                className={`text-xl font-semibold text-primary mb-3 w-full ${styles.flexBetween}`}
                                data-accordion-target={`#smthn-${index}-body`}
                                aria-expanded={openStates[index]}
                                aria-controls={`smthn-${index}-body`}
                                onClick={() => toggleItem(index)}
                            >
                                <span>{item.place}</span>
                                <svg
                                    data-accordion-icon
                                    role="button"
                                    className={`w-3 h-3 rotate-${openStates[index] ? '0' : '180'} shrink-0 transition-transform`}
                                    aria-hidden={openStates[index]}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                                </svg>
                            </button>
                        </h2>
                        <div id={`smthn-${index}-body`} className={openStates[index] ? '' : 'hidden'} aria-labelledby={`smthn-${index}-heading`}>
                            <p className={`mb-4 text-base font-body text-dark ${styles.bodyText}`}>{item.content}</p>
                        </div>
                    </div>
                </li>
            ))}
        </ol>
    );
};


export default ItineraryView;