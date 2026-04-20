import React from 'react';
import './navbar.css';
import styles from '../styles';
// import Button from '../Button';

export default function Navbar() {

    const ROUTES = [
        {name: "Home", route: "/"},
        {name: "Tours", route: "#tours"},
        {name: "Explore All", route: "/explore"},
    ]

    return (
        <nav className='navbar relative px-20 w-100 h-full w-full bg-dark rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 px-4 py-4'>
            <div className={`container ${styles.flexBetween}`}>

                <a href={'/'} className='font-semibold navbar-head text-2xl'>Travel <span className='text-primary'>Beyond</span></a>

                <div className={`${styles.flexCenter}`}>

                    {ROUTES.map((item, i) => <a key={i} href={item.route} className='nav-link mx-3 text-lg'>{item.name}</a>)}

                </div>
            </div>
        </nav>
    )
}