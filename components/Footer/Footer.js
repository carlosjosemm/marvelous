import { useAtom } from "jotai";
import styled from "styled-components";
import { themeContextAtom } from "../../app/atoms";
import { useCallback } from "react";

const StyledFooter = styled.footer`
  margin: 0;
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4rem;
  background-color: ${(props) => props.theme.colors.foreground};
  color: ${(props) => props.theme.colors.font};
  box-shadow: 0px -1px 1px 1px ${(props) => props.theme.colors.shadow};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  > p {
    margin: 0 auto;
    text-align: center;
  }
`;
const StyledButton = styled.button`
  margin: 0.5rem auto 0 auto;
  text-align: center;
  border: 1px solid ${(props) => props.theme.colors.font};
  color: ${(props) => props.theme.colors.font};
  border-radius: 5px;
  padding: 5px 7px;
  background-color: transparent;
  cursor: pointer;
  font-weight: 400;
`;
const Footer = () => {
  const [themeContext, setThemeContext] = useAtom(themeContextAtom);
  const handleTogleTheme = useCallback((ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    setThemeContext((prevTheme) => {
      return prevTheme == "light" ? "dark" : "light";
    });
  }, []);
  return (
    <StyledFooter>
      <StyledButton onClick={handleTogleTheme}>
        Switch to {themeContext == "light" ? "Dark" : "Light"} mode
      </StyledButton>
      <p>© 2023 Marvelous. All rights reserved.</p>
    </StyledFooter>
  );
};

export default Footer;
