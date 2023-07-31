import styled from "styled-components";
import Theme from "../../app/Theme";

const HeroContainer = styled.section`
  width: 100%;
  background-color: transparent;
  max-width: ${(props) => props.theme.breakpoints.laptopLarge};
  margin: 0 auto;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: auto 1fr;
`;
export default HeroContainer;
