import { useEffect } from "react";

// https://www.ibrahima-ndaw.com/blog/react-fullscreen-slider/

interface Props {
  slideImage: any;
  slideText: any;
  slideSubTitle: any;
  slideTitle: any;
  slideURL: any;
  images: any;
}

const useSlider = ({
  slideImage,
  slideText,
  slideSubTitle,
  slideTitle,
  slideURL,
  images,
}: Props) => {
  let slideCounter = 0;

  //   const [image, setImage] = useState(images[0].src);
  //   const [text, setText] = useState(images[0].text);
  //   const [subTitle, setSubTitle] = useState(images[0].subTitle);
  //   const [title, setTitle] = useState(images[0].title);
  //   const [url, setURL] = useState(images[0].url);

  //useState to keep track of which slide the user is on instead on constantly keeping to the first slide
  useEffect(() => startSlider());
  //   useEffect(() => currentSlider());

  //   const currentSlider = () => {
  //     slideImage.current.style.backgroundImage = image;
  //     slideText.current.innerHTML = text;
  //     slideSubTitle.current.innerHTML = subTitle;
  //     slideTitle.current.innerHTML = title;
  //     slideURL.current.innerHTML = url;
  //   };

  //   const setSlider = () => {
  //     setImage(slideImage);
  //     setText(slideText);
  //     setSubTitle(slideSubTitle);
  //     setTitle(slideTitle);
  //     setURL(slideURL);
  //   };

  const imageSizing = () => {
    slideImage.current.style.backgroundRepeat = "no-repeat";
    slideImage.current.style.backgroundSize = "cover";
  };
  const startSlider = () => {
    slideImage.current.style.backgroundImage = `linear-gradient(to right, rgba(34, 34, 34, 0.4), rgba(68, 68, 68, 0.4)), url(${images[0].src})`;
    imageSizing();
    // slideImage.current.style.backgroundImage = `url(${images[0].src})`;
    // slideImage.current.style.backgroundImage = "url(" + images[0].src + ")";
    slideText.current.innerHTML = images[0].text;
    slideSubTitle.current.innerHTML = images[0].subTitle;
    slideTitle.current.innerHTML = images[0].title;
    slideURL.current.innerHTML = images[0].url;
    // setSlider();
  };

  const handleSlide = (slide: any) => {
    slideImage.current.style.backgroundImage = `linear-gradient(to right, rgba(34, 34, 34, 0.4), rgba(68, 68, 68, 0.4)), url(${
      images[slide - 1].src
    })`;
    imageSizing();
    // slideImage.current.style.backgroundImage = `url(${images[slide - 1].src})`;
    slideText.current.innerHTML = images[slide - 1].text;
    slideSubTitle.current.innerHTML = images[slide - 1].subTitle;
    slideTitle.current.innerHTML = images[slide - 1].title;
    slideURL.current.innerHTML = images[slide - 1].url;
    // setSlider();
    animateSlide(slideImage);
  };

  const animateSlide = (slideImage: any) => {
    slideImage.current.classList.add("fadeIn");
    setTimeout(() => {
      slideImage.current.classList.remove("fadeIn");
    }, 700);
  };

  const goToPreviousSlide = () => {
    if (slideCounter === 0) {
      handleSlide(images.length);
      slideCounter = images.length;
    }
    handleSlide(slideCounter);
    slideCounter--;
  };

  const goToNextSlide = () => {
    if (slideCounter === images.length - 1) {
      startSlider();
      slideCounter = -1;
      animateSlide(slideImage);
    }
    slideImage.current.style.backgroundImage = `linear-gradient(to right, rgba(34, 34, 34, 0.4), rgba(68, 68, 68, 0.4)), url(${
      images[slideCounter + 1].src
    })`;
    imageSizing();
    // slideImage.current.style.backgroundImage = `url(${
    //   images[slideCounter + 1].src
    // })`;
    slideText.current.innerHTML = images[slideCounter + 1].text;
    slideSubTitle.current.innerHTML = images[slideCounter + 1].subTitle;
    slideTitle.current.innerHTML = images[slideCounter + 1].title;
    slideURL.current.innerHTML = images[slideCounter + 1].url;
    // setSlider();
    slideCounter++;
    animateSlide(slideImage);
  };

  return { goToPreviousSlide, goToNextSlide };
};

export default useSlider;
