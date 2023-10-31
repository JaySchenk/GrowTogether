import React from "react";
import NavbarMobile from "../components/NavbarMobile";

const HomePage = () => {
  return (
    <>
      <div className=' flex items-center justify-center w-full sm:h-screen '>
        <div className='text-xl font-bold text-center w-2/3 justify-middle mb-14 mt-4'>
          Welcome to GrowTogether, your digital gardening companion that ensures
          your plants thrive and bloom to their fullest potential. Whether
          you're a seasoned botanist or just stepping into the world of
          greenery, our app offers tailored advice, catering to each unique
          plant in your collection. Gone are the days of wilted leaves and
          forgotten watering schedules. With GrowTogether, you'll receive timely
          reminders, ensuring your plants receive the right amount of water,
          sunlight, and care they deserve. Dive deep into our comprehensive
          plant care library, and watch as you and your plants grow together,
          fostering an environment of beauty and tranquility right at your
          fingertips. Join us, and let's cultivate a greener tomorrow, today.
        </div>
      </div>
      <NavbarMobile />
    </>
  );
};

export default HomePage;
