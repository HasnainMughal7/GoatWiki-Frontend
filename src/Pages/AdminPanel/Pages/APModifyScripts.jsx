import { useEffect, useState } from "react"
import Loadinganim from "../../../Components/loadingScreen/Loadinganim"
import { HelmetProvider } from "react-helmet-async"
import { Helmet } from "react-helmet"
import axios from "axios"


const APModifyScripts = () => {

    const [selectedItem, setSelectedItem] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [item, setItem] = useState(null)
    const [itemExists, setItemExists] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(``)

    const [sections, setSections] = useState([])

    async function fetchItem() {
        setIsLoading(true)
        try {
            const response = await axios.get(
                `https://goatwiki-backend-production.up.railway.app/api/GetScriptsForAdmin`
            )
            if (response.data && response.data !== "" && Object.keys(response.data).length > 0) {
                setItemExists(true)
                const Obj = response.data.find((object) => object.ScriptCategory === selectedItem)
                setItem(Obj)
                if (Obj.ScriptCategory === 'analytics') {
                    setSections(Obj.Sections)
                }
                else {
                    const ScriptTag = Obj.Sections.find((object) => object.ScriptType === "HtmlScriptTag")
                    const MetaTag = Obj.Sections.find((object) => object.ScriptType === "MetaTag")
                    setSections([ScriptTag, MetaTag])
                }
            }
        }
        catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }
    function autoResize(e) {
        if (e.target.value === "") {
            e.target.style.height = '4vh';
        } else {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
        }
    }
    async function SubmitItem(e) {

        try {
            await e.preventDefault()

            if (submitting) return
            setSubmitting(true)

            const FinalItem = {
                id: item.id,
                ScriptCategory: item.ScriptCategory,
                Sections: sections,
            }
            const response = await axios.post('https://goatwiki-backend-production.up.railway.app/api/UploadScripts', FinalItem)
            setSuccess(response.data.msg)
        }
        catch (err) {
            setSuccess("UNSUCCESSFUL")
            console.error(err)
            throw new Error("Upload process halted due to an error.")

        }
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Modify Scripts | Admin Panel | GoatWiki</title>
                </Helmet>
            </HelmetProvider>

            <div className="APMOmainContainer">
                {
                    isLoading && <Loadinganim />
                }
                {!isLoading && item === null && (
                    <>
                        <h1>Modify Scripts</h1>
                        <div className="AP-dropdown-menu-container">
                            <select className='AP-dropdown-menu' required value={selectedItem} onChange={(e) => { setSelectedItem(e.target.value) }}>
                                <option value="">    Select      </option>
                                <option value="adsense">Google Adsense Code</option>
                                <option value="analytics">Google Analytics Code</option>
                            </select>
                        </div>
                        <button className='AP-start-btn' onClick={() => { selectedItem.length > 0 ? fetchItem() : null }}>MODIFY This Blog!</button>
                    </>
                )}
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
                                        <h1>Upload Successful! ✅</h1>
                                        <button className='AP-msg-close-btn AP-msg-btns' onClick={() => { window.location.reload() }}>
                                            Close
                                        </button>
                                    </div>
                                </>
                            )}
                            {success === "UNSUCCESSFUL" && (
                                <>
                                    <div className="AP-msg-box">
                                        <h1>Upload Failed! ❌</h1>
                                        <button className='AP-msg-btns' onClick={() => { setSubmitting(false); setSuccess('') }}>
                                            Try Again
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    )
                }
                {
                    !isLoading && itemExists && (
                        <>
                            <div className="AP-start">
                                <h1>Modify Selected Item</h1>
                            </div>

                            <div className="AP-formContainer">
                                <form onSubmit={SubmitItem}>
                                    {
                                        item.ScriptCategory === 'analytics' && (
                                            <>
                                                <h1>
                                                    Enter Your New Analytics Id:
                                                </h1>
                                                <div className='AP-content-inps'>
                                                    <textarea className='AP-inps' required placeholder="Analytics ID" value={sections[0].ScriptContent} onInput={autoResize} onChange={(e) => {
                                                        const updatedContent = e.target.value;
                                                        setSections([{ ScriptType: 'Mid', ScriptContent: updatedContent }])
                                                    }} />
                                                </div>
                                                <button type='submit' className='AP-submit-btn'>
                                                    SUBMIT!
                                                </button>

                                            </>
                                        )
                                    }
                                    {
                                        item.ScriptCategory === 'adsense' && (
                                            <>
                                                <h2>
                                                    Enter Your New Adsense Code:
                                                </h2>
                                                <div className='AP-content-inps'>
                                                    <textarea className='AP-inps' required placeholder="Script Tag" value={sections[0].ScriptContent} onInput={autoResize} onChange={(e) => {
                                                        const updatedContent = e.target.value;
                                                        setSections((prevSections) =>
                                                            prevSections.map((sec) =>
                                                                sec.ScriptType === "HtmlScriptTag" ? { ...sec, ScriptContent: updatedContent } : sec
                                                            )
                                                        )
                                                    }} />
                                                    <textarea className='AP-inps' required placeholder="Meta Tag" value={sections[1].ScriptContent} onInput={autoResize} onChange={(e) => {
                                                        const updatedContent = e.target.value;
                                                        setSections((prevSections) =>
                                                            prevSections.map((sec) =>
                                                                sec.ScriptType === "MetaTag" ? { ...sec, ScriptContent: updatedContent } : sec
                                                            )
                                                        )
                                                    }} />
                                                </div>
                                                <h2> (Edit Ads.txt in hostinger file manager)</h2>
                                                <h2> (Please write crossOrigin instead of crossorigin in Script Tag)</h2>
                                                <button type='submit' className='AP-submit-btn'>
                                                    SUBMIT!
                                                </button>

                                            </>
                                        )
                                    }


                                </form>
                            </div>
                        </>
                    )
                }

            </div >
        </>
    )
}

export default APModifyScripts
