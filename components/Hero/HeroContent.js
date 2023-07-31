import styled from "styled-components";
import ComicPreview from "../Comic/ComicPreview";

const HeroContentStyled = styled.section`
  padding: 0;
  width: 100%;
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 1ch;
  grid-column-start: span 2;
  background-color: transparent;
  color: ${(props) => props.theme.colors.font};
  > h3 {
    grid-column: span 5;
    margin-bottom: 0;
    margin-left: 1ch;
  }
  @media only screen and (max-width: ${(props) =>
      props.theme.breakpoints.laptop}) {
    grid-template-columns: repeat(4, 1fr);
    > h3 {
      grid-column: span 4;
    }
  }
  @media only screen and (max-width: ${(props) =>
      props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(4, 1fr);
    > h3 {
      grid-column: span 4;
    }
  }
  @media only screen and (max-width: ${(props) =>
      props.theme.breakpoints.mobileLarge}) {
    grid-template-columns: repeat(2, 1fr);
    > h3 {
      grid-column: span 2;
    }
  }
`;
const HeroContent = ({ comicsData, heroName }) => {
  // limit the visible comics to 10
  const finalComicList = comicsData.slice(0, 20);

  return (
    <HeroContentStyled>
      {comicsData.length > 1 && <h3>Latest comics from {heroName}</h3>}
      {finalComicList.length > 0 &&
        finalComicList.map((comic) => {
          return <ComicPreview comicData={comic} key={comic.id} />;
        })}
    </HeroContentStyled>
  );
};
export default HeroContent;
