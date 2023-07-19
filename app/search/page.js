'use client'
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchPage = () => {
    const [loading, setLoading] = useState(true);

    const searchParams = useSearchParams()
    const getSearchMatrix = () => {
        const hero = searchParams.getAll('hero');
        const comic = searchParams.getAll('comic');
    }

    if (loading) {
        return <h1>Loading search results...</h1>
    }

    return (
        <h1>Search results here...</h1>
     );
}
 
export default SearchPage;