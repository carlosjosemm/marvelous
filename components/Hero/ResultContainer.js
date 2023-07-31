import styled from "styled-components";
import ContentPreview from "./ContentPreview";

const StyledRowContainer = styled.div`
  max-width: 100%;
  justify-self: stretch;
  align-self: stretch;
  display: grid;
  @media only screen and (min-width: ${(props) =>
      props.theme.breakpoints.laptop}) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media only screen and (max-width: ${(props) =>
      props.theme.breakpoints.laptop}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media only screen and (max-width: ${(props) =>
      props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media only screen and (max-width: ${(props) =>
      props.theme.breakpoints.mobileLarge}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (max-width: ${(props) =>
      props.theme.breakpoints.mobileSmall}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
const StyledResultTitle = styled.h3`
  color: ${(props) => props.theme.colors.font};
  @media only screen and (min-width: ${(props) =>
      props.theme.breakpoints.laptop}) {
    grid-column: span 4;
  }
  @media only screen and (max-width: ${(props) =>
      props.theme.breakpoints.laptop}) {
    grid-column: span 3;
  }
  @media only screen and (max-width: ${(props) =>
      props.theme.breakpoints.tablet}) {
    grid-column: span 3;
  }
  @media only screen and (max-width: ${(props) =>
      props.theme.breakpoints.mobileLarge}) {
    grid-column: span 2;
  }
  @media only screen and (max-width: ${(props) =>
      props.theme.breakpoints.mobileSmall}) {
    grid-column: span 1;
  }
`;
const ResultsContainer = ({ contentRow }) => {
  return (
    <StyledRowContainer>
      <StyledResultTitle>
        Search results for {`${contentRow.searchParam}`}
      </StyledResultTitle>
      {contentRow.results.map((result, index) => {
        return (
          <ContentPreview
            contentData={result}
            secSearchParam={contentRow.secondarySearchParams}
            key={index * 1000 * Math.random()}
          />
        );
      })}
    </StyledRowContainer>
  );
};

export default ResultsContainer;
