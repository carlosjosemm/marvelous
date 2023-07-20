import styled from "styled-components";
import ContentPreview from "./ContentPreview";

const StyledRowContainer = styled.div`
    max-width: 100%;
    justify-self: stretch;
    align-self: stretch;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
`
const StyledResultTitle = styled.h3`
    grid-column: span 4;
`
const ResultsContainer = ({contentRow}) => {
    console.log(contentRow)
    const type = contentRow.searchParams.length > 1 ? 'multiple' : 'single';
    return ( 
        <StyledRowContainer>
            <StyledResultTitle>Search results for {`${contentRow.searchParams.join(' & ')}`}</StyledResultTitle>
            {
                contentRow.results.map((result, index) => {
                    return (
                        <ContentPreview contentData={result} type={type} key={index*1000*Math.random()}/>
                    )
                })
            }
        </StyledRowContainer>
     );
}
 
export default ResultsContainer;