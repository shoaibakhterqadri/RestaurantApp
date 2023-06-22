import React from "react";
import BannerImage from "../../assets/image/delivery-1.png";
import "../../style/index.css";

const Hero = () => {
  return (
    <section className=" text-white body-font">
      <div className="container mx-auto flex px-5 md:flex-row flex-col items-center pt-10 md:pt-0">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="font-[Poppins] sm:text-4xl mb-4 font-medium text-white">
            <span className="text-[48px]">
              Good Food Choices are Good Investments
            </span>
          </h1>
          <p className="mb-8 text-xl">
          "Welcome to our food paradise, where we passionately curate delightful flavors, elevating your dining experience to new heights."
          </p>
          <div className="flex w-full md:justify-start justify-center items-end gap-3">
            <button className="bg-[#fff] text-[#000021] px-5 py-2 rounded-full hover:bg-[#fff]">
              Make a Reservation
            </button>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src={BannerImage}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
