import React, { useState } from "react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Offer from "./components/offers";
import About from "./components/about";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Dishes from "./components/dishes";
import Testimonal from "./components/testimonal";
import Footer from "./components/footer";
import Heading from "./components/Heading";
import Feedback from "./components/feedback";

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      
      <Navbar setOpen={setOpen} />
      <Hero />
      <Offer />
      <Heading>About</Heading>
      <About />
      <Heading>Dishes</Heading>
      <Dishes open={open} setOpen={setOpen} />
      <Heading>Testimonals</Heading>
      <Testimonal />
      <Heading>Get In Touch</Heading>
      <Feedback />
      <Footer />
    </div>
  );
};

export default App;
