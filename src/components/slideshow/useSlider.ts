import { useEffect, useState, useCallback } from "react";

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
  const [image, setImage] = useState(images[0].src);
  const [text, setText] = useState(images[0].text);
  const [subTitle, setSubTitle] = useState(images[0].subTitle);
  const [title, setTitle] = useState(images[0].title);
  const [url, setURL] = useState(images[0].url);
  const [slideCounter, setSlideCounter] = useState(0);

  const setSlider = useCallback(() => {
    setImage(slideImage);
    setText(slideText);
    setSubTitle(slideSubTitle);
    setTitle(slideTitle);
    setURL(slideURL);
  }, [slideImage, slideSubTitle, slideText, slideTitle, slideURL]);

  const imageSizing = useCallback(() => {
    slideImage.current.style.backgroundRepeat = "no-repeat";
    slideImage.current.style.backgroundSize = "cover";
  }, [slideImage]);

  const startSlider = useCallback(() => {
    slideImage.current.style.backgroundImage = `linear-gradient(to right, rgba(34, 34, 34, 0.4), rgba(68, 68, 68, 0.4)), url(${images[0].src})`;
    imageSizing();
    slideText.current.innerHTML = images[0].text;
    slideSubTitle.current.innerHTML = images[0].subTitle;
    slideTitle.current.innerHTML = images[0].title;
    slideURL.current.innerHTML = images[0].url;
    setSlider();
  }, [
    imageSizing,
    images,
    setSlider,
    slideImage,
    slideSubTitle,
    slideText,
    slideTitle,
    slideURL,
  ]);

  useEffect(() => {
    startSlider();
  }, [startSlider]);

  // useState to keep track of which slide the user is on instead on constantly keeping to the first slide
  useEffect(() => {
    currentSlider();
    animateSlide(slideImage);
  }, [useSlider]);

  const currentSlider = () => {
    slideImage.current.style.backgroundImage = image;
    slideText.current.innerHTML = text;
    slideSubTitle.current.innerHTML = subTitle;
    slideTitle.current.innerHTML = title;
    slideURL.current.innerHTML = url;
    setSlideCounter(slideCounter);
  };

  const handleSlide = (slide: any) => {
    slideImage.current.style.backgroundImage = `linear-gradient(to right, rgba(34, 34, 34, 0.4), rgba(68, 68, 68, 0.4)), url(${
      images[slide - 1].src
    })`;
    imageSizing();
    slideText.current.innerHTML = images[slide - 1].text;
    slideSubTitle.current.innerHTML = images[slide - 1].subTitle;
    slideTitle.current.innerHTML = images[slide - 1].title;
    slideURL.current.innerHTML = images[slide - 1].url;
    setSlider();
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
      let length = images.length;
      handleSlide(length);
      length--;
      setSlideCounter(images.length - 1);
    } else {
      handleSlide(slideCounter);
      setSlideCounter(slideCounter - 1);
    }
  };

  const goToNextSlide = () => {
    if (slideCounter === images.length - 1) {
      startSlider();
      setSlideCounter(slideCounter - images.length + 1);
      animateSlide(slideImage);
    } else {
      slideImage.current.style.backgroundImage = `linear-gradient(to right, rgba(34, 34, 34, 0.4), rgba(68, 68, 68, 0.4)), url(${
        images[slideCounter + 1].src
      })`;
      imageSizing();
      slideText.current.innerHTML = images[slideCounter + 1].text;
      slideSubTitle.current.innerHTML = images[slideCounter + 1].subTitle;
      slideTitle.current.innerHTML = images[slideCounter + 1].title;
      slideURL.current.innerHTML = images[slideCounter + 1].url;
      setSlider();
      setSlideCounter(slideCounter + 1);
      animateSlide(slideImage);
    }
  };

  return { goToPreviousSlide, goToNextSlide };
};

export default useSlider;
