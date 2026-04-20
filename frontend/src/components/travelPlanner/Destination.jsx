import React, { useState } from "react";

const Destination = ({ cities, setCities, index}) => {
    const handleAddCity = () => {
        const newCityKey = String(cities.length);
        setCities((prevCities) => [
            ...prevCities,
            { city: "", dates: "", key: newCityKey },
        ]);
    };

    const predefinedCities = ["New York", "Los Angeles", "London"];

    const handleDeleteCity = (indexToRemove) => {
        // Create a new array without the city at the specified index
        const newCities = cities.filter((_, index) => index !== indexToRemove);
        // Update the state with the new array of cities
        setCities(newCities);
    };

    return (
        <div className="flex flex-1 flex-col">
            <label htmlFor={cities[index]} className="mb-4 text-base md:text-lg">
                Where do you want to go?
            </label>

            <div className="flex flex-row gap-2 items-center">
                <select
                    id={cities[index]}
                    className="w-[60%] h-11 p-2 rounded-md border border-solid border-gray-300 outline-none"
                    value={cities[index]?.city}
                    onChange={(e) => {
                        const selectedCity = e.target.value;
                        const newCities = [...cities];
                        newCities[index].city = selectedCity;
                        setCities(newCities);
                    }}
                >
                    <option value="">Select a city</option>
                    {predefinedCities.map((cityOption, index) => (
                        <option key={index} value={cityOption}>
                            {cityOption}
                        </option>
                    ))}
                </select>
                <button
                    className="text-red-600"
                    onClick={() => handleDeleteCity(index)}
                    aria-label={`Delete ${cities}`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="#FF8A65"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                    </svg>
                </button>
            </div>

            <div className="ml-6 h-5 border-l-2 border-solid border-gray-200"></div>

            <button
                className="flex w-[29%] items-center gap-1.5 rounded-lg bg-red-500 px-3 py-1.5 text-sm text-white transition-colors hover:bg-red-400 md:ml-1.5"
                type="button"
                onClick={handleAddCity}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    className="text-lg iconify iconify--mdi"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentColor"
                        d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"
                    ></path>
                </svg>
                Add destination
            </button>
        </div>
    );
};

export default Destination;
