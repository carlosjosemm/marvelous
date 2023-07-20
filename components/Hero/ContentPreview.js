import { styled } from "styled-components";

const StyledHeroPreview = styled.div`
    margin: 1ch;
    position: relative;
    -webkit-bx-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    height: 380px;
    word-wrap: break-word;
    background-color: transparent;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0, 0.125);
    border-radius: 0.5rem;
    text-align: center;
    img {
        height: 380px;
        width: 100%;
        display: block;
    }
    div {
        text-align: left;
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        padding: 1.25rem;
        color: white;
        font-weight: 700;
        text-shadow: 0 0 5px black, 0 0 5px black;
        background: linear-gradient(transparent, black 90%);
    }
    overflow: hidden;
`
const ContentPreview = ({contentData, type}) => {
    console.log(contentData);
    if (type == 'single') {
        return ( 
            <a href='' target='_blank'>
            <StyledHeroPreview>
                <img src={`${contentData.thumbnail.path}.${contentData.thumbnail.extension}`} style={{objectFit: 'cover'}}/>
                <div>
                    <p>{contentData.name}</p>
                </div>
            </StyledHeroPreview>
            </a>
        );
    }

    if (type == 'multiple') {
        return ( 
            <a href='' target='_blank'>
            <StyledHeroPreview>
                <img src={`${contentData.hero.thumbnail.path}.${contentData.hero.thumbnail.extension}`} style={{objectFit: 'cover'}}/>
                <div>
                    <p>{contentData.hero.name}</p>
                </div>
            </StyledHeroPreview>
            </a>
    
        ); 
    }
    
}
 
export default ContentPreview;