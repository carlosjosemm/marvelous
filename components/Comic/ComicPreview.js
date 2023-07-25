import styled from 'styled-components'

const StyledContentPreview = styled.div`
    display: flex;
    margin: 1ch;
    padding-top: 1ch;
    -webkit-bx-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    height: 100%;
    word-wrap: break-word;
    background-color: transparent;
    background-clip: border-box;
    border: 1px solid ${props => props.theme.colors.tooltip};
    border-radius: 0.25rem;
    text-align: center;
    img {
        height: 200px
    }
    &:hover {
        animation: scale-up-center 0.3s ease-in-out forwards;
        cursor: pointer;
    }
    &:not(:hover) {
        animation: scale-down-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) forwards;
    }
    @keyframes scale-up-center {
        0% {
        transform: scale(1);
        }
        100% {
        transform: scale(1.05);
        }
    }

    @keyframes scale-down-center {
        0% {
        transform: scale(1.05);
        }
        100% {
        transform: scale(1);
        }
    }
`

const ComicPreview = ({comicData}) => {
    const thumbnailURL = `${comicData.thumbnail.path.replace('http:', 'https:')}.${comicData.thumbnail.extension}`
    let href = '';
    for (const url of comicData.urls) {
        url.type == 'detail' ? href = url.url : null;
    }

    return (
        <a href={href} target='_blank'>
        <StyledContentPreview>
            <img src={thumbnailURL} style={{objectFit: 'contain'}}/>
            <p>{comicData.title}</p>
        </StyledContentPreview>
        </a>
     );
}
 
export default ComicPreview;