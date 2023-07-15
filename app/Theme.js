import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  breakpoints: {
    mobileSmall: '320px',
    mobileLarge: '640px',
    tablet: '768px',
    laptop: '1024px',
    laptopLarge: '1280px'
  },
  colors: {
    powderWhite: "#FFFDF9",
    persianGreen: "#06B49A",
    lightBlue: "#AFDBD2",
    onyx: "#36313D"
  },
  fonts: ["sans-serif", "Roboto"],
  fontSizes: {
    small: "1em",
    medium: "2em",
    large: "3em"
  }
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;