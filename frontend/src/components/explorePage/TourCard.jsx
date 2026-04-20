import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../services/api.services";
import { button } from "../styles";


const TourCard = ({ tour }) => {
    const navigate = useNavigate();

    return (
        <div class="max-w-md bg-gray-200 rounded-lg shadow p-4 cursor-pointer">
            <a href="#">
                <img class="rounded-2xl hover:-translate-x-5 hover:-translate-y-2 transition-transform" src={API_ENDPOINT + tour?.image} alt={tour?.title}
                    style={{
                        minWidth: "100%",
                        height: "14rem",
                        objectFit: "cover"
                    }}
                />
            </a>
            <div class="p-4">
                <h5 class="mb-2 text-2xl text-primary font-bold tracking-tight text-gray-900">{tour?.title}</h5>
                <p class="mb-3 font-body font-normal text-dark line-clamp-4"
                    style={{
                        display: '-webkit-box',
                        WebkitLineClamp: '4',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}>{tour?.overview}</p>
                <button type="button" className={`${button.outline} text-base w-full`}
                    onClick={() => {
                        navigate(`/tour/${tour?.id}/`)
                    }}>
                    Book now!
                </button>
            </div>
        </div>
    );
}

export default TourCard;

export const HotelCard = ({ hotel }) => {
    const navigate = useNavigate();

    const hotelImages = [
        "/assets/hotels/hotel_1.png",
        "/assets/hotels/hotel_2.png",
        "/assets/hotels/hotel_3.png",
        "/assets/hotels/hotel_4.png",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80"
    ];

    // Select a consistent image based on hotel name
    const getHotelImage = () => {
        if (hotel.image && hotel.image.startsWith('http') && !hotel.image.includes('source.unsplash.com')) {
            return hotel.image;
        }
        const index = hotel.name ? hotel.name.length % hotelImages.length : 0;
        return hotelImages[index];
    };

    const displayImage = getHotelImage();

    return (
        <div className="max-w-md bg-gray-200 rounded-lg shadow p-4 cursor-pointer">
            <a 
                href={hotel.bookingUrl || (hotel.partnerName?.toLowerCase().includes('.') ? `https://www.${hotel.partnerName?.toLowerCase()}` : `https://www.${hotel.partnerName?.toLowerCase()}.com`)} 
                target="_blank" 
                rel="noopener noreferrer"
            >
                <img className="rounded-2xl hover:-translate-x-5 hover:-translate-y-2 transition-transform" 
                    src={displayImage} 
                    alt="hotel image"
                    onError={(e) => {
                        const index = Math.floor(Math.random() * hotelImages.length);
                        e.target.src = hotelImages[index];
                    }}
                    style={{
                        minWidth: "100%",
                        height: "14rem",
                        objectFit: "cover"
                    }}
                />
            </a>
            <div className="p-4">
                <h5 className="mb-2 text-2xl text-primary font-bold tracking-tight text-gray-900">{hotel.name}</h5>
                <p className="font-body font-normal text-dark line-clamp-4"
                    style={{
                        display: '-webkit-box',
                        WebkitLineClamp: '4',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}> - {hotel.relevantPoiDistance}</p>
                <p className="mb-3 font-body font-normal text-dark line-clamp-4"
                    style={{
                        display: '-webkit-box',
                        WebkitLineClamp: '4',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}> - Average Rating of {hotel.stars} out of 5</p>
                <button 
                    type="button" 
                    className={`${button.outline} text-base w-full`}
                    onClick={() => {
                        let partner = hotel.partnerName?.toLowerCase() || "";
                        const url = hotel.bookingUrl || (partner.includes('.') ? `https://www.${partner}` : `https://www.${partner}.com`);
                        window.open(url, "_blank");
                    }}
                >
                    {hotel.lowestPrice} ( {hotel.partnerName} )
                </button>
            </div>
        </div>
    );
}
