import React, { useRef, useState } from "react";

import LeftArrow from "../icons/left-arrow";
import RightArrow from "../icons/right-arrow";

import { SlideshowSlide, slidesMap } from "./constants";

type Classes = Record<string, string>;

type SlideshowStackProps = {
  keys: string[];
  classes: Classes;
  imageRef?: React.Ref<HTMLImageElement>;
  hidden?: boolean;
};

export const SlideshowStack: React.FC<SlideshowStackProps> = ({
  keys,
  classes,
  imageRef,
  hidden,
}) => {
  const slides = keys.map((k) => slidesMap[k]).filter(Boolean);
  if (slides.length === 0) return null;
  const visible = slides.slice(0, 3);
  const positionClass = [
    classes.slideshowStackCardCenter,
    classes.slideshowStackCardLeft,
    classes.slideshowStackCardRight,
  ];
  const className = [
    classes.slideshowStack,
    hidden && classes.cardImageHidden,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={className} aria-hidden>
      {visible.map((slide, i) => (
        <img
          key={slide.src}
          ref={i === 0 ? imageRef : undefined}
          src={slide.src}
          alt=""
          className={`${classes.slideshowStackCard} ${
            positionClass[i] ?? classes.slideshowStackCardCenter
          }`}
        />
      ))}
    </div>
  );
};

type EventSlideshowProps = {
  keys: string[];
  classes: Classes;
  imageRef?: React.Ref<HTMLImageElement>;
};

export const EventSlideshow: React.FC<EventSlideshowProps> = ({
  keys,
  classes,
  imageRef,
}) => {
  const slides: SlideshowSlide[] = keys
    .map((k) => slidesMap[k])
    .filter(Boolean);
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  if (slides.length === 0) return null;

  const goPrev = () =>
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  const goNext = () => setIndex((i) => (i + 1) % slides.length);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (delta > 50) goPrev();
    else if (delta < -50) goNext();
  };

  const slide = slides[index];

  return (
    <div className={classes.slideshow}>
      <div
        className={classes.slideshowFrame}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <button
          type="button"
          className={`${classes.slideshowNav} ${classes.slideshowNavLeft}`}
          onClick={goPrev}
          aria-label="Previous slide"
        >
          <LeftArrow />
        </button>
        <img
          ref={imageRef}
          key={slide.src}
          src={slide.src}
          alt={slide.title}
          className={classes.slideshowImage}
        />
        <button
          type="button"
          className={`${classes.slideshowNav} ${classes.slideshowNavRight}`}
          onClick={goNext}
          aria-label="Next slide"
        >
          <RightArrow />
        </button>
      </div>
      <div className={classes.slideshowDots}>
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`${classes.slideshowDot} ${
              i === index ? classes.slideshowDotActive : ""
            }`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
      <h3 className={classes.slideshowTitle}>{slide.title}</h3>
      <h4 className={classes.slideshowSubTitle}>{slide.subTitle}</h4>
      <p className={classes.slideshowText}>{slide.text}</p>
      {slide.url && (
        <a
          href={slide.url}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.modalLink}
        >
          Learn more
        </a>
      )}
    </div>
  );
};
