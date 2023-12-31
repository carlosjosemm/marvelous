import styled from "styled-components";

const ComicContainer = styled.section`
  width: 100%;
  background-color: transparent;
  max-width: ${(props) => props.theme.breakpoints.laptopLarge};
  margin: 0 auto;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: auto 1fr;
  color: ${(props) => props.theme.colors.font};
  @media only screen and (max-width: ${(props) =>
      props.theme.breakpoints.mobileLarge}) {
    grid-template-columns: auto;
  }
`;
export default ComicContainer;
