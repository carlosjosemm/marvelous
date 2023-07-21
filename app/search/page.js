'use client'
import SearchContainer from "../../components/Hero/SearchContainer";
import useFetchSearchData from "../../hooks/useFetchSearchData";

const SearchPage = () => {
    const [content, loading] = useFetchSearchData()
    
    if (loading) {
        return <h1>Loading search results...</h1>
    }

    return (
        <SearchContainer content={content}/>
     );
}
 
export default SearchPage;