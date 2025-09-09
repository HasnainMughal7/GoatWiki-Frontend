import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import axios from 'axios';
import Loadinganim from '../../Components/loadingScreen/Loadinganim';
import './Others.css'

const About = () => {

  const [postArray, setPostArray] = useState(null)

  
  
  let fetching = false
  
  useEffect(() => {
    const fetchPost = async () => {
      if(fetching) return
      try {
        fetching = true
        const response = await axios.get(
          `https://goatwiki-backend-production.up.railway.app/api/getAbout`
        )
        setPostArray(response.data)
      }
      catch (err) {
        console.error(err)
      }
    }
    fetchPost()
  }, [])

  if (postArray === null) {
    return (
      <>
        <Loadinganim></Loadinganim>
      </>
    )
  }
  else {

    const postSections = [];
    for (let i = 1; i <= postArray.NumOfEntries; i++) {
      postSections.push({
        head: postArray[`Head${i}`],
        para: postArray[`Para${i}`],
      });
    }

    return (
      <>
        <HelmetProvider>
          <Helmet>
            <title>About - GoatWiki</title>
          </Helmet>
        </HelmetProvider>
        <div className="PPContainer">
          <div className="PPMainContainer">

            <div className="PPTitleContainer">
              <h1>About Us</h1>
            </div>

            <div className="PPContentContainer">
            {
              postSections.map((section, index) => (
                <div className='OBox' key={index}>
                  {section.head && <h2>{section.head}</h2>}
                  {section.para && <p>{section.para}</p>}
                </div>
              ))
            }
            </div>

          </div>
        </div>
      </>
    )
  }
}

export default About
