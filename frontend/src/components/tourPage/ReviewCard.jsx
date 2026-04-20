import styles from "../styles"

const ReviewCard = ({ review, title }) => {
    return (
        <div className={`review-card ${styles.flexCenter} w-[30rem] col-span-1 flex-col border border-dark rounded-xl text-center px-12 py-10`}>
            <div className="info w-full">
                <h2 className={`${styles.cardTitle}`}>{review?.customer}</h2>
                <p className={`${styles.cardSubtitle}`}>{title} | {review?.city}</p>
                <hr className="border border-gray-300 mb-8 mt-4" />
            </div>
            <div className="card-body">
                <h3 className="text-xl font-bold font-body mb-3">{review?.review?.title}</h3>
                <p className={`${styles.bodyText} text-center`}>
                    {review?.review?.content}</p>
            </div>
        </div>
    )
}

export default ReviewCard;