const styles = {
    flexCenter: "flex justify-center items-center",
    flexBetween: "flex justify-between items-center",

    titleText: "font-semibold text-4xl mb-3 text-primary",
    bodyText: "font-light font-body text-left",

    cardTitle: "font-semibold text-3xl text-primary",
    cardSubtitle: "font-medium text-lg text-dark"
};

export const formInput = {
    floatingInput: "font-body block px-2.5 pb-2.5 pt-4 w-full text-sm text-dark bg-transparent rounded-lg border-2 border-dark appearance-none focus:outline-none focus:border-primary focus:ring-0 peer",
    floatingLabel: "font-body absolute text-sm text-dark duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
}

export const button = {
    primary: "text-white bg-primary hover:text-dark border-2 border-primary hover:border-dark hover:bg-transparent focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-md px-5 py-4 text-center mr-2 mb-2 transition-colors",
    primaryWhite: "text-white bg-primary hover:text-white border-2 border-primary hover:border-white hover:bg-transparent focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-md px-5 py-4 text-center mr-2 mb-2 transition-colors",
    outline: "text-dark bg-transparent hover:text-white border-2 border-dark hover:border-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-md px-5 py-4 text-center mr-2 mb-2 transition-colors",
}

export const layout = {
    section: `w-full sm:px-3 px-5 ${styles.flexCenter}`
};

export default styles;