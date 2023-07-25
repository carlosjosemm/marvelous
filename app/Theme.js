import { useAtom, useAtomValue } from "jotai";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { themeContextAtom } from "./atoms";

const globalTheme = {
  light: {
    breakpoints: {
      mobileSmall: '320px',
      mobileLarge: '640px',
      tablet: '768px',
      laptop: '1024px',
      laptopLarge: '1280px'
    },
    colors: {
      foreground:  "#FFFFFF",
      background: "#F7F8FA",
      font: '#3E3E3E',
      icon: 'grey',
      shadow: 'lightgrey',
      tooltip: 'rgba(0, 0, 0, 0.7)',
      altText: 'white'
    },
    fonts: {
      opensans: "Open sans",
      systemui: 'system-ui'
    },
  },
  dark: {
    breakpoints: {
      mobileSmall: '320px',
      mobileLarge: '640px',
      tablet: '768px',
      laptop: '1024px',
      laptopLarge: '1280px'
    },
    colors: {
      foreground:  "#242129",
      background: "#36313D",
      font: 'white',
      icon: '#AFDBD2',
      shadow: 'black',
      tooltip: 'rgba(227, 227, 227, 0.7)',
      altText: 'black'
    },
    fonts: {
      opensans: "Open sans",
      systemui: 'system-ui'
    },  
  }
};

const Theme = ({ children }) => {
  const themeContext = useAtomValue(themeContextAtom);
  return (
    <ThemeProvider theme={globalTheme[themeContext]}>{children}</ThemeProvider>
  )
};

export default Theme;