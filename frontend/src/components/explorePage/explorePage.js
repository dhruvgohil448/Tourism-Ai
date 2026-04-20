import { useEffect, useState } from "react";
import styles from "../styles";
import FilterComponent from "./FilterComponent";
import TourCard from "./TourCard";
import { useAxios } from "../../services/api.services";
import { useLocation } from "react-router-dom";


const ExplorePage = () => {
    const location = useLocation();

    const [filters, setFilters] = useState({
        tour_type: [],
        categories: [],
        months: [],
        price: '',
        days: 12,
        bestseller: false
    });

    const [tours, error, isReady, reload] = useAxios({
        url: 'tours/',
        method: 'get'
    });

    useEffect(() => {
        console.log(filters.bestseller)
        const searchParams = new URLSearchParams('');
        if (filters.tour_type.length > 0) {
            searchParams.set("types", filters.tour_type.join(","));
        }
        if (filters.categories.length > 0) {
            searchParams.set("categories", filters.categories.join(","));
        }
        if (filters.price !== "") {
            searchParams.set("price", filters.price);
        }
        if (filters.months.length > 0) {
            searchParams.set("months", filters.months.join(","));
        }
        if (filters.days) {
            searchParams.set("duration", filters.days.toString());
        }
        if (filters.bestseller) {
            searchParams.set("bestseller", filters.bestseller.toString());
        }

        setTimeout(() => {
            reload(`tours/?${searchParams.toString()}`);
        }, 1000);
    }, [filters])

    useEffect(() => {
        // if (location.state) {
        //     Object.keys(location.state).map((item, idx) => {
        //         setFilters({
        //             ...filters,
        //             [item]: 
        //         })
        //     })
        // }
    }, []);

    const MONTHS = {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December'
    };
    const CATEGORIES = {
        North_India: 'North India',
        South_India: 'South India',
        West_India: 'West India',
        East_India: 'East India',
        Foreign: 'Foreign',
    };
    const TYPE_CHOICES = {
        foreign: 'Foreign',
        monsoon_musts: 'Monsoon Musts',
        winter_wonders: 'Winter Wonders',
        summer_specials: 'Summer Specials',
        pilgrimage: 'Pilgrimage',
        trekking: 'Trekking',
        camping: 'Camping',
        safari: 'Safari',
        agro_tourism: 'Agro Tourism',
        rafting: 'Rafting',
        carnival: 'Carnival'
    };
    const PRICES = {
        htl: "High To Low",
        lth: "Low to High"
    }

    return (
        <section className={`w-full px-10 sm:px-14 flex justify-start items-start flex-col h-auto mt-14`}>
            <header className="mb-8 w-3/4">
                <h1 className="font-primary font-bold text-4xl text-primary">Explore All Tours</h1>
                <p className={`${styles.bodyText} mt-2`}>
                    Embark on unforgettable journeys with our travel booking platform. Delve into captivating destinations
                    and incredible experiences. Your dream adventure is just a click away – explore today!
                </p>
            </header>
            <div className={`flex items-start justify-center w-full`}>
                <div className={`${styles.flexCenter} filters flex-col w-1/4 border-2 border-primary rounded-xl p-4`}>
                    <FilterComponent title={"Tour Type"} data={TYPE_CHOICES} filters={filters} setFilters={setFilters} filterName={'tour_type'} />
                    <FilterComponent title={"Categories"} data={CATEGORIES} filters={filters} setFilters={setFilters} filterName={'categories'} />

                    <div className="filter-item w-full mb-4">
                        <h1 className={`font-medium text-lg text-primary mb-2`}>BestSellers</h1>
                        <div className="flex items-center mb-1">
                            <input
                                id="bestseller-filter"
                                type="checkbox"
                                value="True"
                                className={`w-4 h-4 bg-primary text-primary border-white rounded focus:ring-primary`}
                                onChange={(e) => {
                                    // console.log(e.target.checked)
                                    setFilters((prevFilters) => ({
                                        ...prevFilters,
                                        bestseller: e.target.checked
                                    }))
                                }} />
                            <label for="bestseller-filter" class={`${styles.cardSubtitle} ml-2 text-sm font-body font-medium text-dark`}>Filter our bestseller</label>
                        </div>
                    </div>

                    <div className="filter-item w-full mb-4">
                        <h1 className={`font-medium text-lg text-primary mb-2`}>Price</h1>
                        {Object.keys(PRICES).map((key, idx) => (
                            <div key={key} class="flex items-center mb-1">
                                <input type="radio" value={key} name="price" className={`w-4 h-4 bg-primary text-primary border-white rounded focus:ring-primary`}
                                    onChange={() => {
                                        setFilters((prevFilters) => ({
                                            ...prevFilters,
                                            price: key
                                        }))
                                    }} />
                                <label class={`${styles.cardSubtitle} ml-2 text-sm font-body font-medium text-dark`}>{PRICES[key]}</label>
                            </div>
                        ))}
                    </div>

                    <FilterComponent title={"Departure Month"} data={MONTHS} filters={filters} setFilters={setFilters} filterName={'months'} />

                    <div className="filter-item w-full mb-4">
                        <h1 className={`font-medium text-lg text-primary mb-2`}>Minimum Number of Days ({filters.days})</h1>
                        <input
                            type="range"
                            min={3} max={15} step={1} defaultValue={filters.days}
                            className="transparent h-[4px] w-full cursor-pointer rounded-lg appearance-none border-transparent bg-gray-300"
                            onChange={(e) => {
                                setFilters((prevFilters) => ({
                                    ...prevFilters,
                                    days: e.target.value
                                }))
                            }} />
                    </div>

                </div>
                <div className="w-3/4 rounded-lg max-h-[200vh] overflow-y-auto pt-4 px-10">
                    {/* <div className="before:absolute before:inset-x-0 before:inset-y-0 before:z-10 before:content-'' before:bg-gradient-to-t from-white via-white to-transparent h-8 top-0" />
                    <div className="after:absolute after:inset-x-0 after:inset-y-0 after:z-10 after:content-'' after:bg-gradient-to-b from-transparent via-white to-white h-8 bottom-0" /> */}
                    {isReady ? (
                        <div className="grid grid-cols-2 gap-4">
                            {tours?.length > 0 ? (
                                <>
                                    {tours.map((tour, idx) => (
                                        <TourCard key={idx} tour={tour} />
                                    ))}
                                </>
                            ) : (
                                <h1 className={`${styles.titleText}`}>Sorry, we couldn't find any matches for your search.</h1>
                            )}
                        </div>
                    ) : (
                        <h1 className={`${styles.titleText}`}>Loading ...</h1>
                    )}
                </div>
            </div>
        </section >
    );
}

export default ExplorePage;