import styles from "../styles";


const FilterComponent = ({ title, data, filters, setFilters, filterName }) => {
    return (
        <div className="filter-item w-full mb-4">
            <h1 className={`font-medium text-lg text-primary mb-2`}>{title}</h1>
            <div className="grid grid-cols-2">
                {Object.keys(data).map((key, idx) => (
                    <div key={idx} class="flex items-center mb-1">
                        <input id={key} type="checkbox" value={key} className={`w-4 h-4 bg-primary text-primary border-white rounded focus:ring-primary`}
                            onChange={() => {
                                if (filters[filterName].includes(key)) {
                                    // If already selected, remove from the array
                                    setFilters((prevFilters) => ({
                                        ...prevFilters,
                                        [filterName]: prevFilters[filterName].filter(
                                            (item) => item !== key
                                        ),
                                    }));
                                } else {
                                    // If not selected, add to the array
                                    setFilters((prevFilters) => ({
                                        ...prevFilters,
                                        [filterName]: [...prevFilters[filterName], key],
                                    }));
                                }
                            }} />
                        <label for={key} class={`${styles.cardSubtitle} ml-2 text-sm font-body font-medium text-dark`}>{data[key]}</label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FilterComponent;