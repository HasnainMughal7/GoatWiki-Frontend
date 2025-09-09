import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from "react";
import axios from 'axios';
import Loadinganim from '../../Components/loadingScreen/Loadinganim';
import Card from "../../Components/Card/Card";
import './Category.css'


const BoerGoats = () => {

  const [PostsArray, setPostsArray] = useState(null);


  
  let fetching = false
  useEffect(() => {
    const fetchPost = async () => {
      if(fetching) return
      try {
        fetching = true
        const response = await axios.get(
          `https://goatwiki-backend-production.up.railway.app/api/getAllForCategories`
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

    const filteredArray = [...PostsArray].reverse().filter(item => item.Category === "bg");


    if (filteredArray.length === 0) {
      return (
        <>
          <HelmetProvider>
            <Helmet>
              <title>Boer Goats - GoatWiki</title>
              <link rel="canonical" href="https://goatwiki.com/BoerGoats" />
              <meta name="Title" content="Boer Goats" />
              <meta name="Description" content="Explore our Boer goats category for in-depth articles on this robust breed. Learn about care, breeding, and more on Goat Wiki." />
              <meta name="robots" content="follow, index" />
            </Helmet>
          </HelmetProvider>
          <div className="CategoryContainer">

            <div className="CategoryTitle">
              <h1>No Content now but stay tuned!</h1>
            </div>

          </div>
        </>
      );
    }
    else {
      return (
        <>
          <HelmetProvider>
            <Helmet>
              <title>Boer Goats - GoatWiki</title>
              <link rel="canonical" href="https://goatwiki.com/BoerGoats" />
              <meta name="Title" content="Boer Goats" />
              <meta name="Description" content="Explore our Boer goats category for in-depth articles on this robust breed. Learn about care, breeding, and more on Goat Wiki." />
              <meta name="robots" content="follow, index" />
            </Helmet>
          </HelmetProvider>
          <div className="CategoryContainer">

            <div className="CategoryTitle">
              <h1>Boer Goats</h1>
            </div>

            <div className="CategoryPostsContainer">
              {filteredArray.map(post => (<Card Ind={post.id} key={post.id} />))}
            </div>

          </div>
        </>
      )
    }
  }
}

export default BoerGoats
