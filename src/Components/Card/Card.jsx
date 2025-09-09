import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Loadinganim from '../../Components/loadingScreen/Loadinganim';
import Error2 from "../../Pages/Others/Error2";
import './Card.css'


const Card = (props) => {

  const CardIndex = props.Ind;
  const [post, setPost] = useState(null);

  let fetching = false
  useEffect(() => {
    const fetchPost = async () => {
      if(fetching) return
      try {
        fetching = true
        const response = await axios.get(
          `https://goatwiki-backend-production.up.railway.app/api/getOneForCard`,
          {
            params: { id: CardIndex }
          }
        )
        setPost(response.data)
      }
      catch (err) {
        console.error(err)
      }
    }
    fetchPost()
  }, [])

  if (post === null) {
    return (
      <>
        <Loadinganim></Loadinganim>
      </>
    )
  }
  else {

    if (!post) {
      return <Error2 />;
    }

    return (
      <>
        <NavLink to={`/Post/${post.metaPermalink}`} className="CardNavlink">
          <div className="CardContainer">

            <div className="CardPic">
              <img src={post.FPic} alt="pic" />
            </div>

            <div className="CardTitle">
              <p>{post.Title}</p>
            </div>

            <div className="CardEndContent">
              <p>{post.PublishingDate.split("T")[0]}</p>
            </div>

          </div>
        </NavLink>
      </>
    )
  }
}

export default Card
