'use client'
import { useSearchParams } from "next/navigation";

const SearchPage = () => {
    const searchParams = useSearchParams()
    const getSearchMatrix = () => {
        const hero = searchParams.getAll('hero');
        const comic = searchParams.getAll('comic');
    }
    return (
        <h1>Search results here...</h1>
     );
}
 
export default SearchPage;