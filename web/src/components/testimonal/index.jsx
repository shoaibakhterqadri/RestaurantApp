import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { getApiMethod } from "../../Api";
import userImage from '../../assets/image/user.png'

function Offer() {
  const customeSlider = useRef();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    prevArrow: <></>,
    nextArrow: <></>,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1060,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          // initialSlide: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          // centerMode: true,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          // centerMode: true,
        },
      },

    ],
  };
  const nextBtn = () => {
    customeSlider.current.slickNext();
  };

  const previousBtn = () => {
    customeSlider.current.slickPrev();
  };
  const [allFeedback, setAllFeedback] = useState([])
  const init = async () => {
    const { data, status } = await getApiMethod("/feedback/getFeedbacks");
    if (status == 200) {
      setAllFeedback(data)
    }

  }

  useEffect(() => {
    init()
  }, [])
  return (
    <div className="container px-5 py-8 mx-auto w-[92%]">
      <div className="flex items-center justify-end pe-5 mb-5 w-full mx-auto">
        <svg
          width="22px"
          height="22px"
          onClick={previousBtn}
          viewBox="0 0 16 16"
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
          className="seo-pages-1o6k71p arrow"
          role="img"
          version="1.1"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.522 14a.75.75 0 0 1-.555-.245l-4.773-5.25a.754.754 0 0 1 0-1.01l4.773-5.25a.75.75 0 0 1 1.11 1.01L5.764 8l4.315 4.745A.75.75 0 0 1 9.521 14Z"
          />
        </svg>
        <svg
          width="22px"
          height="22px"
          onClick={nextBtn}
          viewBox="0 0 16 16"
          fill="#fff" // Set fill color to white
          xmlns="http://www.w3.org/2000/svg"
          className="seo-pages-1grs31x arrow"
          role="img"
          version="1.1"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.48 14a.75.75 0 0 0 .555-.245l4.773-5.25a.754.754 0 0 0 0-1.01l-4.773-5.25a.75.75 0 0 0-1.11 1.01L10.239 8l-4.314 4.745A.75.75 0 0 0 6.48 14Z"
          />
        </svg>
      </div>

      <Slider
        {...settings}
        ref={customeSlider}
        className="flex flex-wrap -m-4 justify-center items-center text-white"
      >
        {
          allFeedback?.map((item) => {
            return <div className="p-2 lg:w-1/3">
              <div className="bg-[#161c4A] rounded-[30px] border-[4px] border-[#000235e8] py-[24px] px-[24px] cursor-grab shadow-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="block w-5 h-5 text-white mb-4"
                  viewBox="0 0 975.036 975.036"
                >
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z" />
                </svg>
                <p className="max-w-[300px] mb-3">
                  {item?.message}
                </p>
                <div className="inline-flex items-center">
                  <img
                    alt="testimonial"
                    src={userImage}
                    className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                  />
                  <span className="flex-grow flex flex-col pl-4">
                    <span className="title-font font-medium text-white">
                      {item?.name}
                    </span>
                    <span className="text-white text-sm">{item?.email}</span>
                  </span>
                </div>
              </div>
            </div>
          })
        }
      </Slider>
    </div>
  );
}

export default Offer;

