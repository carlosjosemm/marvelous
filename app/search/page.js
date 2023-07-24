'use client'
import Message from "../../components/Generic/Message";
import SearchContainer from "../../components/Hero/SearchContainer";
import useFetchSearchData from "../../hooks/useFetchSearchData";

const SearchPage = () => {
    const [content, loading] = useFetchSearchData()
    
    if (loading) {
        return <Message><h1>Loading search results...</h1></Message>
    }

    return (
        <SearchContainer content={content}/>
     );
}
 
export default SearchPage;