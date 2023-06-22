import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { OfferCard } from "../../style/CommonClasses";
import { getApiMethod } from "../../Api";

function Offer() {
  const [allOffers, setAllOffers] = useState([])
  const init = async () => {
    const { data, status } = await getApiMethod("/offer/getAllOffer");
    if (status === 200) {
      const imageUrl = data?.map(({ image }) => {
        return image?.url
      })
      setAllOffers(imageUrl)
      // setTableListData(data);
    }
  }
  useEffect(() => {
    init()
  }, [])
  const customeSlider = useRef();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    prevArrow: <></>,
    nextArrow: <></>,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          // initialSlide: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
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
  return (
    <div className="Offer w-[92%] mx-auto py-3 justify-center items-center">
      <div className="flex items-center justify-end pe-5 mb-5 w-[92%] mx-auto">
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
        className="flex justify-center items-center"
      >
        {
          allOffers?.map((url) => {
            return <div className="">
              <img
                alt="ecommerce"
                className={OfferCard}
                src={url}
              />
            </div>
          })
        }
      </Slider>
    </div>
  );
}

export default Offer;
