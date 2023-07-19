import styled from 'styled-components'
import Image from 'next/image';
import logo from '../../public/media/img/marvel-logo.png'
import 'material-icons/iconfont/outlined.css';
import 'material-icons/iconfont/filled.css';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { searchParamsAtom } from '../../app/atoms';
import { useRouter } from 'next/navigation';

const StyledHeader = styled.header`
    margin: 0;
    position: relative;
    top: 0;
    left: 0;
    min-width: 100vw;
    max-height: 4rem;
    min-height: 4rem;
    background-color: tomato; 
    display: grid;
    grid-template-columns: auto auto auto 1fr auto auto;
    align-items: center;
    > form > input {
        width: 100%;
    }
`
const VertDivider = styled.div`
    border-left: 1px solid #38546d; 
    border-right: 1px solid #16222c; 
    height: 80%;
    position: relative;
`
const Header = () => {
    const [search, setSearch] = useState('')
    const [searchParams, setSearchParams] = useAtom(searchParamsAtom)
    const router = useRouter()

    const handleChange = (ev) => {
        const value = ev.target.value;
        setSearch((prev) => value);
    }
    const handleSubmit = (ev) => {
        ev.preventDefault();
        // getting the input value
        const value = ev.target.children[0].value;
        // getting both heroes and comics params (if present, defaults to empty)
        const heroes = value.split('=')[0] ?? []
        const comics = value.split('=')[1] ?? []
        // set params globally in Atom
        setSearchParams(
            {heroes: heroes, comics: comics}
        )
        // building the url with the query params
        const getQuery = (arr, entry) => {
            // exit when no params present
            if (arr.length < 1) {
                return ''
            }
            // removing blank spaces and upper cases
            const formattedArray = arr.split(',').map((elem) => elem.replaceAll(' ', '').toLowerCase())
            let query = ''
            // accumulating the query string
            formattedArray.forEach((elem) => {
                query += `${entry}=${elem}&`
            });
            return query
        }
        // const url = `/search?${heroes.length > 0 ? 'hero='+heroes+'&': ''}${comics.length > 0 ? 'comic='+comics : ''}`
        const url = `/search?${getQuery(heroes, 'hero')}${getQuery(comics, 'comic')}`

        // pushing to the search page
        router.push(url);
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
            <span className="material-icons-outlined" data-testid="searchicon">search</span>
            <form onSubmit={handleSubmit}>
            <input data-testid="searchinput" value={search} onChange={handleChange} />
            </form>
            <span className="material-icons-outlined" data-testid="favicon">star_border</span>
            <VertDivider data-testid="divider2" />
        </StyledHeader>
     );
}

export default Header;