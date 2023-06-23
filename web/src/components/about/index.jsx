import React from "react";
import Chef from "../../assets/image/chef.png";


const About = () => {
  return (
    <section className="text-white body-font" id="about">
      <div className="container px-5 py-8 mx-auto flex flex-wrap w-[92%]">
        <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
          <img
            alt="feature"
            className="object-cover object-center h-full w-full"
            src={Chef}
          />
        </div>
        <div className="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
          <div className="flex flex-col mb-10 lg:items-start items-center">
            <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <path d="M9 7H5.6A2.6 2.6 0 0 0 3 9.6V20h6v-6h6v6h6v-10.4A2.6 2.6 0 0 0 18.4 7H15M9 7V4c0-1.105.895-2 2-2s2 .895 2 2v3" />
              </svg>
            </div>
            <div className="flex-grow">
              <h2 className="text-white text-lg title-[Poppins] font-medium mb-3">
                Delicious Food
              </h2>
              <p className="leading-relaxed text-base">
                Indulge in our wide variety of mouthwatering dishes made with
                the freshest ingredients. Our chefs strive to deliver a
                memorable dining experience for our customers.
              </p>
            </div>
          </div>
          <div className="flex flex-col mb-10 lg:items-start items-center">
            <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <path d="M19 6h-1a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2h8a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-9 0v12M9 6h6" />
              </svg>
            </div>
            <div className="flex-grow">
              <h2 className="text-white text-lg title-font font-medium mb-3">
                Elegant Ambience
              </h2>
              <p className="leading-relaxed text-base">
                Immerse yourself in a sophisticated dining atmosphere where
                every detail is carefully curated to create a memorable
                ambiance. Our restaurant offers a perfect setting for any
                occasion.
              </p>
            </div>
          </div>
          <div className="flex flex-col mb-10 lg:items-start items-center">
            <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <path d="M7 2L17 2C19.2091 2 21 3.79086 21 6V18C21 20.2091 19.2091 22 17 22H7C4.79086 22 3 20.2091 3 18V6C3 3.79086 4.79086 2 7 2Z" />
                <path d="M17 2V6H7V2" />
                <path d="M7 10H17M7 14H17M12 18H17" />
              </svg>
            </div>
            <div className="flex-grow">
              <h2 className="text-white text-lg title-font font-medium mb-3">
                Exquisite Cuisine
              </h2>
              <p className="leading-relaxed text-base">
                Indulge in our exquisite cuisine crafted by our talented chefs.
                We source the finest ingredients to create a menu that delights
                the senses and satisfies the palate. Whether you're a fan of
                seafood, steak, or vegetarian dishes, we have something for
                everyone.
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default About;
