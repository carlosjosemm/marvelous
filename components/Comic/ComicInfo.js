import styled from "styled-components";

 const ComicInfoStyled = styled.section`
    padding: 1rem;
    color: ${props => props.theme.colors.font};
    > h4 {
        margin-top: 1ch;
        margin-bottom: 1ch;
    }
    > p {
        margin-top: 2rem;
    }
 `
 const ComicInfo = ({comicData}) => {
    // getting the published date from the comic data
    let publishedDate;
    for (const dateObj of comicData.dates) {
        if (dateObj.type == 'onsaleDate') {
            publishedDate = new Date(dateObj.date).toDateString().slice(4)
            publishedDate = `${publishedDate.slice(0,-5)}, ${publishedDate.slice(-4)}`
        }
    }
    // getting artist names
    let writerName,
        pencilerName,
        coverArtistName;

    for (const creatorObj of comicData.creators.items) {
        if (creatorObj.role == 'writer') {
            writerName = creatorObj.name;
        }
        if (creatorObj.role.includes('penciler')) {
            pencilerName = creatorObj.name;
        }
        if (creatorObj.role.includes('penciler (cover)')) {
            coverArtistName = creatorObj.name;
        }
    }
    const comicDescription = comicData.description

    return ( 
        <ComicInfoStyled>
            <h2>{comicData.title ?? "Comic title"}</h2>
            <h4>Published: {publishedDate}</h4>
            <h4>Writer: {writerName}</h4>
            <h4>Penciler: {pencilerName}</h4>
            <h4>Cover Artist: {coverArtistName}</h4>
            <p>{comicDescription}</p>
        </ComicInfoStyled>
     );
 }
export default ComicInfo;