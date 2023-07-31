import styled from "styled-components";

const ComicThumbnail = styled.img`
  @media only screen and (min-width: ${(props) =>
      props.theme.breakpoints.laptop}) {
    max-width: 450px;
  }
  @media only screen and (max-width: ${(props) =>
      props.theme.breakpoints.laptop}) {
    max-width: 380px;
  }
  @media only screen and (max-width: ${(props) =>
      props.theme.breakpoints.tablet}) {
    max-width: 280px;
  }
  @media only screen and (max-width: ${(props) =>
      props.theme.breakpoints.mobileLarge}) {
    max-width: 180px;
    margin: 0 auto;
  }
  @media only screen and (max-width: ${(props) =>
      props.theme.breakpoints.mobileSmall}) {
    max-width: 160px;
    margin: 0 auto;
  }
`;
export default ComicThumbnail;
