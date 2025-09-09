import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Loadinganim from "../../../../Components/loadingScreen/Loadinganim";
import Error2 from "../../../Others/Error2";
import './CardAP.css'


const CardAP = (props) => {

  const CardIndex = props.Ind;
  const [post, setPost] = useState(null);


  useEffect(() => {
    const fetchPost = async () => {
      try {
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
        <NavLink to={`/Post/${post.metaPermalink}`} className="CardAPNavlink">
          <div className="CardAPContainer">

            <div className="CardAPPic">
              <img src={post.FPic} alt="pic" />
            </div>

            <div className="CardAPTitle">
              <p>{post.Title}</p>
            </div>

            <div className="CardAPEndContent">
              <p>{post.PublishingDate}</p>
            </div>

          </div>
        </NavLink>
      </>
    )
  }
}

export default CardAP
