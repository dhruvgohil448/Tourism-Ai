import React, { useState, useEffect } from 'react';

const CarouselView = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        const numImages = images.length;
        const interval = setInterval(() => {
            setCurrentIndex((currentIndex + 1) % numImages);
        }, 10000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, [currentIndex, images]);

    return (
        <div className="absolute w-full top-0 left-0 z-[-2]" data-carousel="slide">
            <div className="relative h-screen overflow-hidden">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`duration-700 ease-in-out ${currentIndex === index ? '' : 'hidden'}`}
                        data-carousel-item
                    >
                        <img
                            src={process.env.PUBLIC_URL + image}
                            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-contain"
                            alt={`Slide ${index + 1}`}
                        />
                    </div>
                ))}
            </div>

            <button
                type="button"
                className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-prev
                onClick={() => goToSlide((currentIndex - 1 + images.length) % images.length)}
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                    <svg
                        className="w-4 h-4 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>

            <button
                type="button"
                className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-next
                onClick={() => goToSlide((currentIndex + 1) % images.length)}
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                    <svg
                        className="w-4 h-4 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>
        </div>
    );
};

export default CarouselView;
