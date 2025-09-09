import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios';
import Loadinganim from '../../Components/loadingScreen/Loadinganim';
import './Navbar.css'




const Navbar = () => {

    const [PostsArray, setPostsArray] = useState(null);

    const [animate, setAnimate] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [IsVisible, setIsVisible] = useState(false);
    const [query, setQuery] = useState('');
    const [NavMenu, setNavMenu] = useState(false);
    const Location = useLocation();

    let filteredArray
    const fetchPost = async () => {
        try {
            const response = await axios.get(
                `https://goatwiki-backend-production.up.railway.app/api/getAllForNavAndAP`
            )
            setPostsArray(response.data)
        }
        catch (err) {
            console.error(err)
        }
    }

    if (PostsArray != null) {
        filteredArray = query
            ? PostsArray.filter(item => item.Title.toLowerCase().includes(query.toLowerCase()))
            : PostsArray;
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        setAnimate(true);

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    function handleSearch(e) {
        setQuery(e.target.value);
    }
    function handleMenuOpen() {
        window.innerWidth < 601 ? setNavMenu(true) : setNavMenu(false);
    }
    function handleMenuClose() {
        setNavMenu(false);
    }

    if (window.innerWidth < 601) {
        return (
            <>
                <nav>
                    <div className={`NmainContainer ${isSticky ? 'Navsticky' : ''} ${animate ? 'NmainContainerAnim' : ''}`}>

                        <NavLink to="/" className="leftContainerNavlink">
                            <div className="leftContainer">
                                <img src="/assets/LOGO.png" alt="logo" className={animate ? 'NavLogoAnim' : ''} />
                                <h1 className={animate ? 'NavElementsAnim' : ''}>GoatWiki</h1>
                            </div>
                        </NavLink>

                        <div className={`${NavMenu ? 'menuBtnOpen' : ''} menuBtn`} onClick={handleMenuOpen}><img src="/assets/menu.png" alt="menu pic" /></div>
                        <div className={`${NavMenu ? 'closeBtnOpen' : ''} closeBtn`} onClick={handleMenuClose}><img src="/assets/close.png" alt="menu pic" /></div>

                        <div className={`${NavMenu ? 'MenuContainerActive' : ''} MenuContainerInactive`}>

                            <div className={`centerContainer ${animate ? 'NavElementsAnim' : ''}`}>
                                <input type="text" placeholder='Search' className="SearchBar" onFocus={() => {
                                    setIsVisible(true)
                                    fetchPost()
                                }} onBlur={() => { setTimeout(() => setIsVisible(false), 200) }} onChange={handleSearch} value={query} />
                                <img src="/assets/searchICON.png" alt="search icon" />
                                {IsVisible && (
                                    <div className="SearchMenu">
                                        <ul className="SearchDrop">
                                        {
                                            PostsArray === null ?
                                                <Loadinganim></Loadinganim> :
                                                filteredArray.length > 0 ? (filteredArray.map(post => (
                                                    <NavLink
                                                        to={`/Post/${post.metaPermalink}`}
                                                        key={post.id}
                                                        onClick={() => { setIsVisible(false) }}
                                                        className="SearchResultNavlink">
                                                        <li>{post.Title}</li>
                                                    </NavLink>))) :
                                                    <li>No Results Found!</li>
                                        }
                                        </ul>
                                    </div>
                                )}
                            </div>


                            <div className={`rightContainer ${animate ? 'NavElementsAnim' : ''}`}>
                                <NavLink className={`rightContainerNavlink ${Location.pathname === '/' ? 'activeR' : ''
                                    }`} to="/" onClick={() => { setNavMenu(false) }}><button>Home</button></NavLink>
                                <NavLink className={`rightContainerNavlink ${Location.pathname === '/AllPosts' ? 'activeR' : ''
                                    }`} to="/AllPosts" onClick={() => { setNavMenu(false) }}><button>All Posts</button></NavLink>
                                <div className="dropdown">
                                    <NavLink to="#" className={`cateNavl ${['/Category1', '/Category2', '/Category3'].includes(location.pathname) ? 'activeR' : ''
                                        }`}><button className="cate">Categories <img src="/assets/arrowUp.png" alt='Arrow Up' id="arrowUp" /><img src="/assets/arrowDown.png" alt='Arrow Down' id="arrowDown" /></button></NavLink>
                                    <div className="dropContent">
                                        <NavLink className="cateNavlink" to="/KikoGoats" onClick={() => { setNavMenu(false) }}>Kiko Goats</NavLink>
                                        <NavLink className="cateNavlink" to="/SpanishGoats" onClick={() => { setNavMenu(false) }}>Spanish Goats</NavLink>
                                        <NavLink className="cateNavlink" to="/BoerGoats" onClick={() => { setNavMenu(false) }}>Boer Goats</NavLink>
                                        <NavLink className="cateNavlink" to="/NigerianDwarfGoats" onClick={() => { setNavMenu(false) }}>Nigerian Dwarf Goats</NavLink>
                                        <NavLink className="cateNavlink" to="/DamascusGoats" onClick={() => { setNavMenu(false) }}>Damascus Goats</NavLink>
                                    </div>
                                </div>
                                <NavLink className={`rightContainerNavlink ${Location.pathname === '/About' ? 'activeR' : ''
                                    }`} to="/About" onClick={() => { setNavMenu(false) }}><button>About</button></NavLink>


                            </div>
                        </div>

                    </div>

                </nav>
            </>
        )
    }
    else {
        return (
            <>
                <nav>
                    <div className={`NmainContainer ${isSticky ? 'Navsticky' : ''} ${animate ? 'NmainContainerAnim' : ''}`}>

                        <NavLink to="/" className="leftContainerNavlink">
                            <div className="leftContainer">
                                <img src="/assets/LOGO.png" alt="logo" className={animate ? 'NavLogoAnim' : ''} />
                                <h1 className={animate ? 'NavElementsAnim' : ''}>GoatWiki</h1>
                            </div>
                        </NavLink>

                        <div className={`centerContainer ${animate ? 'NavElementsAnim' : ''}`}>
                            <input type="text" placeholder='Search' className="SearchBar" onFocus={() => {
                                setIsVisible(true)
                                fetchPost()
                            }} onBlur={() => { setTimeout(() => setIsVisible(false), 200) }} onChange={handleSearch} value={query} />
                            <img src="/assets/searchICON.png" alt="search icon" />
                            {IsVisible && (
                                <div className="SearchMenu">
                                    <ul className="SearchDrop">
                                        {
                                            PostsArray === null ?
                                                <Loadinganim></Loadinganim> :
                                                filteredArray.length > 0 ? (filteredArray.map(post => (
                                                    <NavLink
                                                        to={`/Post/${post.metaPermalink}`}
                                                        key={post.id}
                                                        onClick={() => { setIsVisible(false) }}
                                                        className="SearchResultNavlink">
                                                        <li>{post.Title}</li>
                                                    </NavLink>))) :
                                                    <li>No Results Found!</li>
                                        }
                                    </ul>
                                </div>
                            )}
                        </div>


                        <div className={`rightContainer ${animate ? 'NavElementsAnim' : ''}`}>
                            <NavLink className={`rightContainerNavlink ${Location.pathname === '/' ? 'activeR' : ''
                                }`} to="/"><button>Home</button></NavLink>
                            <NavLink className={`rightContainerNavlink ${Location.pathname === '/AllPosts' ? 'activeR' : ''
                                }`} to="/AllPosts"><button>All Posts</button></NavLink>
                            <div className="dropdown">
                                <NavLink to="#" className={`cateNavl ${['/Category1', '/Category2', '/Category3'].includes(location.pathname) ? 'activeR' : ''
                                    }`}><button className="cate">Categories <img src="/assets/arrowUp.png" alt='Arrow Up' id="arrowUp" /><img src="/assets/arrowDown.png" alt='Arrow Down' id="arrowDown" /></button></NavLink>
                                <div className="dropContent">
                                    <NavLink className="cateNavlink" to="/KikoGoats">Kiko Goats</NavLink>
                                    <NavLink className="cateNavlink" to="/SpanishGoats">Spanish Goats</NavLink>
                                    <NavLink className="cateNavlink" to="/BoerGoats">Boer Goats</NavLink>
                                    <NavLink className="cateNavlink" to="/NigerianDwarfGoats">Nigerian Dwarf Goats</NavLink>
                                    <NavLink className="cateNavlink" to="/DamascusGoats">Damascus Goats</NavLink>
                                </div>
                            </div>
                            <NavLink className={`rightContainerNavlink ${Location.pathname === '/About' ? 'activeR' : ''
                                }`} to="/About"><button>About</button></NavLink>


                        </div>

                    </div>

                </nav>
            </>
        )
    }


}

export default Navbar
