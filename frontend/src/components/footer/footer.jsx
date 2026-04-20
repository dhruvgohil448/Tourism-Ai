import React from 'react';
import styles from '../styles';

export default function Footer() {

    const ROUTES = ['Home', 'Tours', 'Explore All']

    return (

        <footer class="bg-gray-200 mt-12 shadow">
            <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div class="sm:flex sm:items-center sm:justify-between">
                    <a href={'/'} className='font-semibold navbar-head text-2xl text-dark'>Travel <span className='text-primary'>Beyond</span></a>

                    <ul class="flex flex-wrap items-center mb-6 text-md font-medium font-body text-gray-500 sm:mb-0 dark:text-gray-400">
                        {ROUTES.map((item, i) => (
                            <li key={i}>
                                <a href="#" class="mr-4 hover:underline md:mr-6 ">{item}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

                <div className="w-full flex justify-around items-center">
                    <img className='max-w-[45rem]' src={process.env.PUBLIC_URL + "images/bs1.png"} alt="" />
                    <div className="content">
                        <div className="item mb-6">
                            <h1 className={`${styles.cardTitle} mb-2`}>Address</h1>
                            <p className={`${styles.bodyText}`}>
                                Travel Beyond Mumbai Office, <br />
                                123 Suburban Street, <br />
                                Andheri West, <br />
                                Mumbai, Maharashtra, <br />
                                India 400053
                            </p>
                        </div>
                        <div className="item mb-6">
                            <h1 className={`${styles.cardTitle} mb-2`}>Contact Us</h1>
                            <p className={`${styles.bodyText}`}>
                                Telephone: (123) 456-7890 <br />
                                Mobile: +91 944567 32334 <br />
                                travelbeyond@explore.in
                            </p>
                        </div>
                        <div className="item mb-6">
                            <h1 className={`${styles.cardTitle} mb-2`}>Office Hours</h1>
                            <p className={`${styles.bodyText}`}>
                                Monday: 8am – 7pm <br />
                                Tuesday: 8am – 5pm <br />
                                Wednesday: 8am – 5pm <br />
                                Thursday: 8am – 7pm <br />
                                Friday: 8am – 5pm
                            </p>
                        </div>
                    </div>
                </div>

                <span class="block text-lg text-gray-500 sm:text-center dark:text-gray-400 mt-6">© 2023 <a href="/" class="hover:underline">Travel Beyond™</a>. All Rights Reserved.</span>
            </div>
        </footer>


    )
}