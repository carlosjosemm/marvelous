'use client'
import Message from "../../components/Generic/Message";
import Spinner from "../../components/Generic/Spinner";
import SearchContainer from "../../components/Hero/SearchContainer";
import useFetchSearchData from "../../hooks/useFetchSearchData";

const SearchPage = () => {
    const [content, loading, error] = useFetchSearchData()
    
    if (loading) {
        return (
            <Spinner>
                <Message><h1>Loading search results...</h1></Message>
            </Spinner>
        )
    }

    if (error) {
        return <Message><h2>Error: {error.message}</h2></Message>
    }

    return (
        <SearchContainer content={content}/>
     );
}
 
export default SearchPage;