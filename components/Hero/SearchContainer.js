import styled from "styled-components";
import HeroContainer from "./HeroContainer";
import ResultsContainer from "./ResultContainer";

const StyledSearchContainer = styled(HeroContainer)`
    grid-template-columns: auto;
    row-gap: 1ch;
`
const SearchContainer = ({content}) => {
    return ( 
            <StyledSearchContainer>
                {
                content.map((row) => {
                    return  <ResultsContainer contentRow={row}/>  
                })
            }
            </StyledSearchContainer>
     );
}
 
export default SearchContainer;