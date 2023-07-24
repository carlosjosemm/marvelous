import styled from "styled-components";

 const HeroInfoStyled = styled.section`
    padding: 1rem;
    background-color: transparent;
    color: ${props => props.theme.colors.font};
 `
 const HeroInfo = ({herodata}) => {
    // getting the comics url from the hero
    const heroUrl = herodata.urls.reduce(
        (target, url) => {
        url.type == 'comiclink' ? target = url.url : null;
        return target
    })

    return ( 
        <HeroInfoStyled>
            <h2>{herodata.name}</h2>
            <h3>{herodata.description}</h3>
            <h4>Full list of comics from {herodata.name ?? "Hero's name"} <a href={heroUrl} target="_blank" >HERE</a></h4>
        </HeroInfoStyled>
     );
 }
export default HeroInfo;