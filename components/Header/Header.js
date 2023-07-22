import styled from 'styled-components'
import Image from 'next/image';
// @ts-ignore
import logo from '../../public/media/img/marvel-logo.png'
import 'material-icons/iconfont/outlined.css';
import 'material-icons/iconfont/filled.css';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { secSearchParamsAtom } from '../../app/atoms';
import { useRouter } from 'next/navigation';

const StyledHeader = styled.header`
    margin: 0;
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    max-height: 4rem;
    min-height: 4rem;
    background-color: white; /* theme */
    display: flex;
    box-shadow: 0px 1px 2px 2px lightgray; /* theme */
    justify-content: space-between;
    align-items: center;
    > .searchicon {
        padding: 0 5px 0 1rem;
        color: grey; /* theme */
        cursor: default;
        user-select: none;
    }
    > .favicon {
        padding: 0 2rem 0 5px;
        color: grey; /* theme */
        cursor: pointer;
        user-select: none;
    }
    > form {
        flex: 1 1 auto;
        
    }
    > form > input {
        padding-left: 1rem;
        width: 100%;
        border: 0px solid white;
        border-radius: 5px;
        height: 1.5rem;
        font-size: 110%;
    }
    > form > input:focus-visible {
        outline: 0px;
    }
    > .lastDiv {
        margin-right: 3rem;
    }
`
const VertDivider = styled.div`
    border-left: 1px solid lightgray; 
    border-right: 1px solid lightgray; 
    height: 80%;
    position: relative;
    min-width: 1px;
    height: 3rem;
`
const Header = () => {
    const [search, setSearch] = useState('')
    const [searchParams, setSearchParams] = useAtom(secSearchParamsAtom)
    const router = useRouter()

    const handleChange = (ev) => {
        const value = ev.target.value;
        setSearch((prev) => value);
    }
    const handleSubmit = (ev) => {
        ev.preventDefault();
        const getQuery = (arr, entry) => {
            // exit when no params present
            if (arr.length < 1) {
                return ''
            }
            // removing blank spaces and upper cases
            const formattedArray = arr.split(',').map((elem) => elem.trim().toLowerCase())
            let query = ''
            // accumulating the query string
            formattedArray.forEach((elem) => {
                query += `${entry}=${elem}&`
            });
            return query
        }
        // getting the input value
        const value = ev.target.children[0].value;
        // checking for comic url as input
        if (value.includes('https://www.marvel.com/comics/issue') || value.includes('http://www.marvel.com/comics/issue')) {
            // getting the comic id
            const comicId = value.split('issue/')[1].split('/')[0];
            // escape hatch when invalid url provided
            if (comicId.length < 1) {
                router.push('/comic');
                return
            }
            const url = `/comic?${getQuery(comicId, 'comicId')}`
            // pushing to the search page
            router.push(url);
            return
        }

        // getting both heroes and comics params (if present, defaults to empty)
        const heroes = value.split('=')[0] ?? []
        const comics = value.split('=')[1] ?? []
        // building the url with the query params

        const url = `/search?${getQuery(heroes, 'hero')}${getQuery(comics, 'comic')}`
        // pushing to the search page
        router.push(url);
        return
    }
    return ( 
        <StyledHeader>
            <Image
                data-testid="logo" 
                src={logo} 
                alt='Marvel logo' 
                height={57}
                placeholder='blur' 
                quality={100}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 33vw"
             />
            <VertDivider data-testid="divider" />
            <span className="material-icons-outlined searchicon" data-testid="searchicon">search</span>
            <form onSubmit={handleSubmit}>
            <input data-testid="searchinput" value={search} onChange={handleChange} placeholder='Search'/>
            </form>
            <span className="material-icons-outlined favicon" data-testid="favicon">star_border</span>
        </StyledHeader>
     );
}

export default Header;