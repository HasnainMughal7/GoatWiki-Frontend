import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { HelmetProvider } from "react-helmet-async"
import { Helmet } from "react-helmet"
import axios from "axios"
import './AdminPanel.css'
import Loadinganim from '../../../Components/loadingScreen/Loadinganim'

const APDelete = () => {
    const [selectedBlog, setSelectedBlog] = useState("")
    const [postArray, setPostArray] = useState([])
    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(``)
    const { id } = useParams()
    const navigate = useNavigate()

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
        if (id) {
            setSelectedBlog(id)
        }
    }, [])

    async function handleDeleteBlog() {
        try {
            const id = selectedBlog.length > 0 ? Number(selectedBlog) : null
            if (isNaN(id) || id === null) {
                // Nothing 
            }
            else {
                if (submitting) return
                setSubmitting(true)

                const response = await axios.delete('https://goatwiki-backend-production.up.railway.app/api/DeleteBlog',
                    {
                        params: { id: id }
                    }
                )
                setSuccess(response.data.msg)
            }
        }
        catch (err) {
            setSuccess("UNSUCCESSFUL")
            console.error(err)
        }
    }

    if (postArray.length < 1) {
        return (
            <div className="APD-main-container">
                <Loadinganim />
            </div>
        )
    }
    else {

        return (
            <>
            <HelmetProvider>
                <Helmet>
                    <title>Delete A Blog | Admin Panel | GoatWiki</title>
                </Helmet>
            </HelmetProvider>

                <div className="APD-main-container">
                    {
                        submitting && (
                            <div className="AP-msg-container">
                                {success === "" && (
                                    <>
                                        <div className="AP-msg-box">
                                            <Loadinganim />
                                        </div>
                                    </>
                                )}
                                {success === "SUCCESSFUL" && (
                                    <>
                                        <div className="AP-msg-box">
                                            <h1>Delete Successful! ✅</h1>
                                            <button className='AP-msg-close-btn AP-msg-btns' onClick={() => { navigate('/Admin/Delete'); window.location.reload() }}>
                                                Close
                                            </button>
                                        </div>
                                    </>
                                )}
                                {success === "UNSUCCESSFUL" && (
                                    <>
                                        <div className="AP-msg-box">
                                            <h1>Upload Failed! ❌</h1>
                                            <button className='AP-msg-btns' onClick={() => { navigate('/Admin/Delete'); window.location.reload() }}>
                                                Try Again
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        )
                    }
                    <h1>Delete A Blog</h1>
                    <div className="AP-dropdown-menu-container">
                        <select className='AP-dropdown-menu' required value={selectedBlog} onChange={(e) => { setSelectedBlog(e.target.value) }}>
                            <option value="">    Select Post      </option>
                            {
                                postArray.map((post) => {
                                    return (
                                        <option key={post.id} value={post.id}>{post.Title}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <button className='AP-delete-btn' onClick={handleDeleteBlog}>DELETE This Blog!</button>
                </div>
            </>
        )
    }
}


export default APDelete
