import React from "react";
import NavbarMobile from "../components/NavbarMobile";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div className='leading-normal tracking-normal text-white gradient'>
        <div className='pt-24'>
          <div className='container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center'>
            <div className='flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left md:self-center'>
              <p className='uppercase tracking-loose w-full'>
                Welcome to GrowTogether!
              </p>
              <h1 className='my-4 text-5xl font-bold leading-tight'>
                Your digital gardening companion
              </h1>
              <p className='leading-normal text-2xl mb-8'>
                that ensures your plants thrive and bloom to their fullest
                potential. Whether you're a seasoned botanist or just stepping
                into the world of greenery, our app offers tailored advice,
                catering to each unique plant in your collection.
              </p>
              <div className='flex'>
                <Link to='/login'>
                  <Button name={"Explore Now"}></Button>
                </Link>
                <Link to='/plantcare'>
                  <Button name={"Learn More"}></Button>
                </Link>
              </div>
            </div>
            <div className='w-full md:w-3/5 py-6 text-center'>
              <img className='w-full' src='https://i.imgur.com/JqwO3ge.png' />
            </div>
          </div>
        </div>
      </div>
      <NavbarMobile />
    </>
  );
};

export default HomePage;
