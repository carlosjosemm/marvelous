'use client'
import styled from 'styled-components'
import Image from 'next/image';
// @ts-ignore
import logo from '../../public/media/img/marvel-logo.png'
import 'material-icons/iconfont/outlined.css';
import 'material-icons/iconfont/filled.css';
import { useCallback, useState } from 'react';
import { useAtom } from 'jotai';
import { secSearchParamsAtom } from '../../app/atoms';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMemo } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import Tooltip from '../Generic/Tooltip';

const StyledHeader = styled.header`
    margin: 0;
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    max-height: 5rem;
    min-height: 4rem;
    background-color: ${props => props.theme.colors.foreground}; /* theme */
    display: flex;
    box-shadow: 0px 1px 2px 2px ${props => props.theme.colors.shadow}; /* theme */
    justify-content: space-between;
    align-items: center;
    > .searchicon {
        padding: 0 5px 0 1rem;
        cursor: default;
        user-select: none;
    }
    .favicon {
        padding: 0 5px 0 5px;
        margin-right: 1.5rem;
        cursor: pointer;
        user-select: none;
    }
    .searchicon, .favicon, .advancedSearchIcon {
        color: ${props => props.theme.colors.icon};
    }
    > form {
        flex: 1 1 auto;
        display: flex;
        justify-content: stretch;
        ${(props) => props.$isAdvancedHeader ? 'align-self: flex-start;' : ''}
        ${(props) => props.$isAdvancedHeader ? 'height: 4rem;' : ''}
        ${(props) => props.$isAdvancedHeader ? '' : ''}
    }
    > form > input {
        padding-left: 1rem;
        width: 100%;
        border: 0px solid white;
        border-radius: 5px;
        height: 4rem;
        font-size: 110%;
        line-height: 3.5rem;
        background-color: transparent;
        color: ${props => props.theme.colors.font};
    }
    > form input:first-child {
        width: 100%;
    }
    > form > input:focus-visible {
        outline: 0px;
    }
    > .lastDiv {
        margin-right: 3rem;
    }
    .advancedSearchIcon {
        transition: transform 0.5s ease-in-out;
        cursor: pointer;
        user-select: none;
    }
    > form input[type="submit"] {
        display: none;
    }
    @media only screen and (max-width: ${props => props.theme.breakpoints.mobileLarge}) {
        > form {
            ${(props) => props.$isAdvancedHeader ? 'flex-direction: column;' : ''} 
            ${(props) => props.$isAdvancedHeader ? 'max-height: 7rem;' : ''}
            ${(props) => props.$isAdvancedHeader ? 'height: 7rem;' : ''}
        }
        > form input {
            background-color: ${props => props.$isAdvancedHeader ? props.theme.colors.foreground : 'transparent'};
        }
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
    const [search, setSearch] = useState({heroInput: '', comicInput: ''})
    const [searchParams, setSearchParams] = useAtom(secSearchParamsAtom)
    const [isAdvancedSearch, setIsAdvancedSearch] = useState(false)
    const size = useWindowSize();
    const router = useRouter()
    const path = usePathname()
    const isFavs = useMemo(() => path.startsWith('/favs'), [path])
    const tooltipContent = <p>Advanced Search</p>;
    const handleChange = (ev) => {
        // const value = ev.target.value;
        // setSearch((prev) => value);

        const { name, value } = ev.target;
        setSearch((prev) => {
            return {
            ...prev,
            [name]: value,
            };
        });
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const getQuery = (/**@type {string}*/ str, /**@type {string}*/ entry) => {
            // exit when no params present
            if (str.length < 1) {
                return ''
            }
            // removing blank spaces and upper cases
            const formattedArray = str.split(',').map((elem) => elem.trim().toLowerCase())
            let query = ''
            // accumulating the query string
            formattedArray.forEach((elem) => {
                query += `${entry}=${elem}&`
            });
            return query
        }
        if (!isAdvancedSearch) {
            // getting the input value
            const value = ev.target.children[0].value;
            // checking for comic url as input
            if (value.includes('https://www.marvel.com/comics/issue') || value.includes('http://www.marvel.com/comics/issue')) {
                // getting the comic id
                const comicId = value.split('issue/')[1].split('/')[0];
                // escape hatch when invalid url provided
                if (comicId.length < 1 || !comicId) {
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
        } else {
            // getting the inputs values
            /** @type {{heroInput: string, comicInput: string}} */
            let value
            for (const child of ev.target.children) {
                if (child.type != 'submit') {
                    value = {
                        ...value,
                        [child.name]: child.value
                    }
                }
            }
            
            // checking for comic url as input (hero)
            if (value.comicInput.includes('https://www.marvel.com/comics/issue') || value.comicInput.includes('http://www.marvel.com/comics/issue')) {
                // getting the comic id
                const comicId = value.comicInput.split('issue/')[1].split('/')[0];
                // escape hatch when invalid url provided
                if (comicId.length < 1 || !comicId) {
                    router.push('/comic');
                    return
                }
                const url = `/comic?${getQuery(comicId, 'comicId')}`
                // pushing to the search page
                router.push(url);
                return
            }
            // getting both heroes and comics params (if present, defaults to empty)
            const heroesString = value.heroInput ?? ''
            const comicsString = value.comicInput ?? ''
            // building the url with the query params

            const url = `/search?${getQuery(heroesString, 'hero')}${getQuery(comicsString, 'comic')}`
            // pushing to the search page
            router.push(url);
            return
        }
    }

    const flipIcon = useCallback((ev) => {
        ev.stopPropagation();
        if (!isAdvancedSearch) {
            setIsAdvancedSearch(true);
            ev.target.style.transform = 'rotate(180deg)'
        } else {
            setIsAdvancedSearch(false);
            ev.target.style.transform = 'rotate(0deg)'
        }
    }, [isAdvancedSearch])
    
    return ( 
        <StyledHeader $isAdvancedHeader={isAdvancedSearch}>
            <Link href='/hero'><Image
                data-testid="logo" 
                src={logo} 
                alt='Marvel logo' 
                height={size.width < 300 ? 30 : 57}
                placeholder='blur' 
                quality={100}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 33vw"
             />
             </Link>
            <VertDivider data-testid="divider" />
            <span className="material-icons-outlined searchicon" data-testid="searchicon">search</span>
            <Tooltip tooltipContent={tooltipContent} position='bottom'>
                <span tabIndex={0} className="material-icons-outlined advancedSearchIcon" data-testid="" onClick={flipIcon}>{size.width <= 640 ? 'keyboard_arrow_down' : 'keyboard_arrow_right'}</span>
            </Tooltip>
            <form onSubmit={handleSubmit}>
                <input 
                    data-testid="searchinput" 
                    value={search.heroInput} 
                    onChange={handleChange} 
                    placeholder={isAdvancedSearch ? 'Search heros' : 'Search'}
                    name='heroInput'
                />
                {isAdvancedSearch && 
                    <input 
                        data-testid="searchinput2" 
                        placeholder='Search comics'
                        value={search.comicInput}
                        onChange={handleChange}
                        name='comicInput'
                    />
                }
                <input type="submit" value="submit" />
            </form>
            <Link href="/favs" tabIndex={-1}>
                <span tabIndex={0} className="material-icons-outlined favicon" data-testid="favicon">{isFavs ? 'star' : 'star_border'}</span>
            </Link>
        </StyledHeader>
     );
}

export default Header;