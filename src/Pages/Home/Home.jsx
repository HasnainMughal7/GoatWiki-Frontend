import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import axios from 'axios';
import Card from '../../Components/Card/Card';
import Loadinganim from '../../Components/loadingScreen/Loadinganim';
import Map from '../../Components/World Map/Map';
import Typewriter from 'typewriter-effect';
import './Home.css'


const Home = () => {

  const [animate, setAnimate] = useState(false);
  const [postArray, setPostArray] = useState(null);


  let fetching = false
  useEffect(() => {
    const fetchPost = async () => {
      if(fetching) return
      try {
        fetching = true
        const response = await axios.get(
          `https://goatwiki-backend-production.up.railway.app/api/getIdOfAll`
        )
        setPostArray(response.data)
      }
      catch (err) {
        console.error(err)
      }
    }
    fetchPost()
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [])


  if (postArray === null) {
    return (
      <>
        <Loadinganim></Loadinganim>
      </>
    )
  }
  else {

    const posts = [...postArray].reverse()
    const postsToShow = posts.length > 7 ? posts.slice(0, 7) : posts;


    return (
      <>
        <HelmetProvider>
          <Helmet>
            <title>Home - GoatWiki</title>
            <link rel="canonical" href="https://goatwiki.com/" />
            <script type="application/ld+json">
              {`{
              "@context": "https://schema.org/",
            "@type": "WebSite",
            "name": "GoatWiki",
            "url": "https://goatwiki.com/"
            }`}
            </script>
            <meta name='Title' content='Home - GoatWiki' />
            <meta name='Description' content='Explore the world of goats with Goat Wiki! Learn about each breed’s unique story, personality, and charm. Perfect for farmers, enthusiasts, and learners alike.' />
            <meta name="robots" content="follow, index" />
            <meta name="keywords" content="GoatWiki, goatwiki, GoatWiki home, Goatwiki home page, goatwiki home" />
            <meta property="og:site_name" content="GoatWiki" />
          </Helmet>
        </HelmetProvider>

        <div className="HmainContainer">

          <div className={`HfirstContainer ${animate ? 'HFirstConatinerAnim' : ''}`}>
            <div className="HTitle">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .pauseFor(4900)
                    .typeString("Welcome to the World of Goats!")
                    .start();
                }}
              />
            </div>
            <div className="Habout">
              <p className={`${animate ? 'HaboutPAnim' : ''} HaboutP`}>Discover the fascinating universe of goats—where each breed has a unique story,
                personality, and charm. Whether you&#39;re a seasoned farmer, a curious enthusiast, or
                someone looking to learn more, Goat Wiki is your ultimate guide for understanding
                these remarkable animals. Explore, learn, and connect with a community passionate
                about everything goat related. Dive in and let your journey with goats begin with
                Goat Wiki!</p>
            </div>
          </div>

          <div className="RecentPostContainer">
            <div className="RPTitleContainer">
              <hr />
              <div className="RPTitle"><p>Recent Posts</p></div>
              <hr />
            </div>
            <div className="RPosts">
              <motion.div
                initial={{ x: window.innerWidth > 600 ? 950 : 350 }}
                whileInView={{ x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true, amount: 0.01 }}
                className="RPosts1">
                {postsToShow.slice(0, 4).map(post => (
                  <Card key={post.id} Ind={post.id} />
                ))}
              </motion.div>
              {postsToShow.length > 4 && (
                <motion.div
                  initial={{ x: 950 }}
                  whileInView={{ x: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className={postsToShow.length <= 4 ? "RPosts2 RPosts2Empty" : "RPosts2"}>
                  {postsToShow.slice(4).map(post => (
                    <Card key={post.id} Ind={post.id} />
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          <div className="MapContainer">
            <div className="MapTitleContainer">
              <hr />
              <div><p>Check Out This Cool Goat Population Map!</p></div>
              <hr />
            </div>
            <Map />
          </div>

          <div className="EndTitle">
            <p className="GlowingText">Daily Blogs About Your Goat!</p>
          </div>

        </div>
      </>
    )
  }
}

export default Home
