import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar/navbar';
import LandingPage from './components/landingPage/landingPage';

import styles from './components/styles';
import './App.css';
import TourPage from './components/tourPage/tourPage';
import Footer from './components/footer/footer';
import ExplorePage from './components/explorePage/explorePage';
import CheckOutPage from './components/tourPage/checkoutPage';
import AboutUsPage from './components/aboutPage';
import ItineraryPage from './components/travelPlanner/Itinerary';
import TravelPlannerPage from './components/travelPlanner/travelPlanner';

// Axios for api fetching
// Montserrat Portico

function App() {
  return (
    <>
      <Router>
        <div id="root-container relative text-dark">
          <div className="sticky top-0 w-full z-10" style={{width: '-webkit-fill-available'}}>
            <Navbar />
          </div>

          <Routes>
            <Route exact path='/' element={<AboutUsPage />} />
            <Route exact path='/tour/:id' element={<TourPage />} />
            <Route exact path='/tour/:id/checkout' element={<CheckOutPage />} />
            <Route exact path='/explore' element={<ExplorePage />} />
            <Route exact path='/itinerary/:id' element={<ItineraryPage />} />
            <Route exact path='/travelplanner' element={<TravelPlannerPage />} />
          </Routes>

          <div className="footer-container bottom-0">
            <Footer />
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
