import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import axios from "axios"
import CardAP from "../Components/CardAP/CardAP"
import Loadinganim from "../../../Components/loadingScreen/Loadinganim"
import Slider from 'react-slick';
import './AdminPanel.css'
import { HelmetProvider } from "react-helmet-async"
import { Helmet } from "react-helmet"

const APHome = () => {

    const [postArray, setPostArray] = useState(null);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        accessibility: false,
    };


    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(
                    `https://goatwiki-backend-production.up.railway.app/api/getAllForNavAndAP`
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

        const postsToShow = [...postArray].reverse()

        return (
            <>
                <HelmetProvider>
                    <Helmet>
                        <title>GoatWiki Admin Panel</title>
                    </Helmet>
                </HelmetProvider>
                <div className="APhomemain">
                    <div className="CardAPcontainer">
                        <Slider {...settings}>
                        {
                            postsToShow.map((post) => (
                                <div key={post.id} className="APCardd">

                                    <CardAP key={post.id} Ind={post.id} />

                                    <div className="APhomeBtns">
                                        <NavLink id="APhomeDel" to={`/Admin/Delete/${post.id}`}>
                                            <p>Delete</p>
                                            <img src="/assets/Delete.png" alt="delete" />
                                        </NavLink>
                                        <NavLink id="APhomeEdit" to={`/Admin/Modify/${post.id}`}>
                                            <p>Edit</p>
                                            <img src="/assets/Edit.png" alt="delete" />
                                        </NavLink>
                                    </div>
                                </div>
                            ))
                        }
                        </Slider>

                    </div>
                </div>
            </>
        )
    }
}

export default APHome
