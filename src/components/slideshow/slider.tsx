import React, { useRef, useState } from "react";
import withStyles, { WithStylesProps } from "react-jss";

import Button from "../button";
import LeftArrow from "../icons/left-arrow";
import RightArrow from "../icons/right-arrow";
import Information from "../icons/information";
import useSlider from "./useSlider";

const styles = {
  "@keyframes fadeIn": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
  image: {
    animationName: "$fadeIn",
    animationDuration: "1s",
    height: "100vh",
    position: "relative",
  },

  sliderContainer: {
    display: "flex",
    "align-items": "center",
    "flex-direction": "row",
    "justify-content": "space-between",
    padding: "2rem",
    height: "inherit",
  },
  bodyContainer: {
    "text-align": "left",
    width: "50%",
    "@media (max-width: 600px)": {
      width: "100%",
    },
  },
  text: {
    "font-size": "1rem",
  },
  noText: {
    "font-size": "0rem",
  },
  buttonLR: {
    color: "#ffffff !important",
    height: "75px !important",
    width: "75px !important",
    "background-color": "transparent",
    border: "none",
    outline: "none",
    margin: "0px 20px",
    transition: "color 0.75s",
    "&:hover": {
      color: "#5E1219 !important",
    },
    "z-index": "99",
    cursor: "pointer",
    "@media (max-width: 600px)": {
      display: "none",
    },
  },
  subTitleContainer: {
    display: "flex",
    "flex-direction": "row",
    "align-items": "center",
    "justify-content": "flex-start",
    height: "3rem",
  },
  infoButton: {
    height: "75px !important",
    width: "75px !important",
    display: "flex",
    "flex-direction": "row",
    "justify-content": "center",
    "align-items": "center",
  },
  dots: {
    position: "absolute",
    bottom: "32px",
    left: "0",
    right: "0",
    display: "flex",
    "flex-direction": "row",
    "justify-content": "center",
    gap: "12px",
    "z-index": "99",
    "pointer-events": "none",
  },
  dot: {
    width: "14px",
    height: "14px",
    "border-radius": "50%",
    "background-color": "rgba(255, 255, 255, 0.65)",
    "box-shadow": "0 2px 6px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(0, 0, 0, 0.3)",
    transition: "background-color 0.3s, transform 0.3s",
  },
  dotActive: {
    "background-color": "#5E1219",
    transform: "scale(1.25)",
    "box-shadow": "0 2px 8px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(0, 0, 0, 0.4)",
  },
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
  images: any;
}

const Slider: React.FunctionComponent<IProps> = ({ classes, images }) => {
  const slideImage = useRef<null | HTMLDivElement>(null);
  const slideText = useRef(null);
  const slideSubTitle = useRef(null);
  const slideTitle = useRef(null);
  const slideURL = useRef<null | HTMLAnchorElement>(null);
  const sliderProps = {
    slideImage,
    slideText,
    slideSubTitle,
    slideTitle,
    slideURL,
    images,
  };
  const { goToPreviousSlide, goToNextSlide } = useSlider(sliderProps);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const handlePrev = () => {
    goToPreviousSlide();
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  };
  const handleNext = () => {
    goToNextSlide();
    setCurrentIndex((i) => (i + 1) % images.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (delta > 50) handlePrev();
    else if (delta < -50) handleNext();
  };

  const getLink = () => {
    console.log("slideURL current: ", slideURL.current?.textContent);
    let link = slideURL.current;
    if (link !== null) {
      return link.textContent;
    }
    return null as any;
  };

  return (
    <div
      ref={slideImage}
      className={classes.image}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className={classes.sliderContainer}>
        <div className={classes.buttonLR}>
          <Button onClick={handlePrev}>
            <LeftArrow />
          </Button>
        </div>
        <div className={classes.bodyContainer}>
          <h3 ref={slideTitle}>{null}</h3>
          <div className={classes.subTitleContainer}>
            <h6 ref={slideSubTitle}>{null}</h6>
            <div className={classes.infoButton}>
              <Button onClick={() => window.open(getLink())}>
                <Information />
              </Button>
            </div>
          </div>
          <small ref={slideText} className={classes.text} />
          <br />
          <small ref={slideURL} className={classes.noText}></small>
        </div>
        <div className={classes.buttonLR}>
          <Button onClick={handleNext}>
            <RightArrow />
          </Button>
        </div>
      </div>
      <div className={classes.dots}>
        {images.map((_: unknown, i: number) => (
          <span
            key={i}
            className={`${classes.dot} ${i === currentIndex ? classes.dotActive : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

export default withStyles(styles)(Slider);
