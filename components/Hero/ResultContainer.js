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
    return ( 
        <StyledRowContainer>
            <StyledResultTitle>Search results for {`${contentRow.searchParam}`}</StyledResultTitle>
            {
                contentRow.results.map((result, index) => {
                    return (
                        <ContentPreview contentData={result} secSearchParam={contentRow.secondarySearchParams} key={index*1000*Math.random()}/>
                    )
                })
            }
        </StyledRowContainer>
     );
}
 
export default ResultsContainer;