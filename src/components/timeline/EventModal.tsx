import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";

import { TimelineEvent, imageMap } from "./constants";

type Classes = Record<string, string>;

type EventModalProps = {
  event: TimelineEvent | null;
  onClose: () => void;
  classes: Classes;
  originRectRef: React.MutableRefObject<() => DOMRect | null>;
};

const FLIP_DURATION_MS = 800;
const FADE_DURATION_MS = 300;
const EXIT_FLIP_DELAY_MS = FADE_DURATION_MS;
const TOTAL_EXIT_MS = EXIT_FLIP_DELAY_MS + FLIP_DURATION_MS;
const FLIP_EASING = "cubic-bezier(0.2, 0.8, 0.2, 1)";

type FlipDeltas = {
  scaleX: number;
  scaleY: number;
  translateX: number;
  translateY: number;
};

const computeFlip = (from: DOMRect, to: DOMRect): FlipDeltas => ({
  scaleX: from.width / to.width,
  scaleY: from.height / to.height,
  translateX:
    from.left + from.width / 2 - (to.left + to.width / 2),
  translateY:
    from.top + from.height / 2 - (to.top + to.height / 2),
});

export const EventModal: React.FC<EventModalProps> = ({
  event,
  onClose,
  classes,
  originRectRef,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const exitTimerRef = useRef<number | null>(null);
  const [renderedEvent, setRenderedEvent] = useState<TimelineEvent | null>(
    event
  );
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isExiting) return;
    if (event && event !== renderedEvent) {
      setRenderedEvent(event);
    } else if (!event && renderedEvent) {
      setRenderedEvent(null);
    }
  }, [event, renderedEvent, isExiting]);

  useEffect(
    () => () => {
      if (exitTimerRef.current !== null) {
        window.clearTimeout(exitTimerRef.current);
        exitTimerRef.current = null;
      }
    },
    []
  );

  const requestClose = useCallback(() => {
    if (isExiting || !renderedEvent) return;
    setIsExiting(true);
    exitTimerRef.current = window.setTimeout(() => {
      exitTimerRef.current = null;
      setIsExiting(false);
      onClose();
    }, TOTAL_EXIT_MS);
  }, [isExiting, renderedEvent, onClose]);

  useEffect(() => {
    if (!renderedEvent) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [renderedEvent, requestClose]);

  useLayoutEffect(() => {
    if (!renderedEvent || isExiting) return;
    const img = imageRef.current;
    if (!img) return;

    const runFlip = () => {
      const originRect = originRectRef.current();
      if (!originRect) return;
      const target = img.getBoundingClientRect();
      if (target.width === 0 || target.height === 0) return;
      const { scaleX, scaleY, translateX, translateY } = computeFlip(
        originRect,
        target
      );

      img.style.transformOrigin = "center center";
      img.style.transition = "none";
      img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;

      void img.offsetHeight;

      requestAnimationFrame(() => {
        img.style.transition = `transform ${FLIP_DURATION_MS}ms ${FLIP_EASING}`;
        img.style.transform = "none";
      });
    };

    if (img.complete && img.naturalWidth > 0) {
      runFlip();
    } else {
      const onLoad = () => runFlip();
      img.addEventListener("load", onLoad, { once: true });
      return () => img.removeEventListener("load", onLoad);
    }
  }, [renderedEvent, originRectRef, isExiting]);

  useLayoutEffect(() => {
    if (!isExiting) return;
    const img = imageRef.current;
    if (!img) return;
    const originRect = originRectRef.current();
    if (!originRect) return;
    const target = img.getBoundingClientRect();
    if (target.width === 0 || target.height === 0) return;
    const { scaleX, scaleY, translateX, translateY } = computeFlip(
      originRect,
      target
    );
    img.style.transformOrigin = "center center";
    img.style.transition = `transform ${FLIP_DURATION_MS}ms ${FLIP_EASING} ${EXIT_FLIP_DELAY_MS}ms`;
    img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
  }, [isExiting, originRectRef]);

  if (!renderedEvent) return null;

  const displayed = renderedEvent;
  const mainSrc = displayed.image ? imageMap[displayed.image] : undefined;
  const body = displayed.details?.body ?? displayed.description;
  const gallery = (displayed.details?.gallery ?? [])
    .map((key) => imageMap[key])
    .filter(Boolean);
  const links = displayed.details?.links ?? [];
  const linksTitle = displayed.details?.linksTitle;

  const backdropClass = [
    classes.modalBackdrop,
    isExiting && classes.modalBackdropExiting,
  ]
    .filter(Boolean)
    .join(" ");
  const contentClass = [
    classes.modalContent,
    isExiting && classes.modalContentExiting,
  ]
    .filter(Boolean)
    .join(" ");

  return ReactDOM.createPortal(
    <div
      className={backdropClass}
      onClick={requestClose}
      role="presentation"
    >
      <div
        className={contentClass}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-modal-title"
      >
        <button
          ref={closeButtonRef}
          type="button"
          className={classes.modalClose}
          onClick={requestClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 id="event-modal-title" className={classes.modalTitle}>
          {displayed.title}
        </h2>
        {mainSrc && (
          <img
            ref={imageRef}
            src={mainSrc}
            alt=""
            className={classes.modalImage}
          />
        )}
        {body && <p className={classes.modalBody}>{body}</p>}
        {gallery.length > 0 && (
          <div className={classes.modalGallery}>
            {gallery.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className={classes.modalGalleryImage}
              />
            ))}
          </div>
        )}
        {links.length > 0 && (
          <div className={classes.modalLinksSection}>
            {linksTitle && (
              <h3 className={classes.modalLinksTitle}>{linksTitle}</h3>
            )}
            <div className={classes.modalLinkWrapper}>
              {links.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.modalLink}
                >
                  {link.label ?? "Learn more"}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
