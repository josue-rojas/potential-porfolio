import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import PropTypes from "prop-types";

// a background that fades out once and it adds a var in localStorage to check if a user has visited so the effect won't happen again

const FadeBackground = ({ backgroundImage, text }) => {
  const [isRendered, setIsRendered] = useState(false);
  const transitionTime = 2001;

  useEffect(() => {
    if (!localStorage.getItem("hasVisited")) setIsRendered(true);
  }, []);

  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      localStorage.setItem("hasVisited", true);
      setIsRendered(false);
    }, transitionTime);
    return () => clearTimeout(timer);
  }, [isRendered]);

  if (!isRendered) return "";
  return (
    <div className={styles.backgroundWrapper}>
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <span>{text}</span>
    </div>
  );
};

FadeBackground.propTypes = {
  backgroundImage: PropTypes.string,
  text: PropTypes.string
};

export default FadeBackground;
