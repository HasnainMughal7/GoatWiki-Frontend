import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from "react";
import axios from 'axios';
import Loadinganim from '../../Components/loadingScreen/Loadinganim';
import Card from '../../Components/Card/Card';
import './Allpg.css';


const All = () => {

  const [PostsArray, setPostsArray] = useState(null);

  let fetching = false
  useEffect(() => {
    const fetchPost = async () => {
      if(fetching) return
      try {
        fetching = true
        const response = await axios.get(
          `https://goatwiki-backend-production.up.railway.app/api/getIdOfAll`
        )
        setPostsArray(response.data)
      }
      catch (err) {
        console.error(err)
      }
    }
    fetchPost()
  }, [])

  if (PostsArray === null) {
    return (
      <>
        <Loadinganim></Loadinganim>
      </>
    )
  }
  else {

    return (
      <>
        <HelmetProvider>
          <Helmet>
            <title>All Posts - GoatWiki</title>
            <link rel="canonical" href="https://goatwiki.vercel.app/AllPosts" />
            <meta name="Title" content="All Posts" />
            <meta name="Description" content="Explore our all the posts up till now and derive the immense knowledge!" />
            <meta name="keywords" content="goatwiki, goat wiki, goatwiki all posts" />
            <meta name="robots" content="follow, index" />
          </Helmet>
        </HelmetProvider>
        <div className="AllPgContainer">

          <div className="AllPgTitle">
            <h1>All Posts</h1>
          </div>

          <div className="AllPgPostsContainer">
            {[...PostsArray].reverse().map(post => (<Card Ind={post.id} key={post.id} />))}
          </div>

        </div>
      </>
    )
  }
}

export default All
