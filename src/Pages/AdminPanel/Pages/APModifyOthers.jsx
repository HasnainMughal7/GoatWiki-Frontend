import { useEffect, useState } from "react"
import Loadinganim from "../../../Components/loadingScreen/Loadinganim"
import { HelmetProvider } from "react-helmet-async"
import { Helmet } from "react-helmet"
import axios from "axios"


const APModifyOthers = () => {

    const [selectedItem, setSelectedItem] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [item, setItem] = useState(null)
    const [itemExists, setItemExists] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(``)
    const [isDirty, setIsDirty] = useState(false)
    const [elementPanel, setElementPanel] = useState({})

    const [sections, setSections] = useState([])

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (isDirty) {
                e.preventDefault();
                e.returnValue = '';
            }
        }
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        }
    }, [isDirty])

    async function loadData(ITEM) {

        const rawSections = ITEM.Sections
        const formattedSections = []

        const typeCounters = {}
        for (const section of rawSections) {
            const sectionType = section.Type;
            if (!typeCounters[sectionType]) {
                typeCounters[sectionType] = 0;
            }
            typeCounters[sectionType] = Math.max(typeCounters[sectionType], section.Order);
            const newOrderNum = typeCounters[section.Type] ? typeCounters[section.Type] + 1 : 1;
            let newSection = {
                Order: newOrderNum,
                Type: section.SectionType,
                Content: section.Content,
                Section_OrderNum: section.Section_OrderNum
            }
            formattedSections.push(newSection)
        }

        const sectionTypeOrder = { head: 1, para: 2 }

        formattedSections.sort((a, b) => {
            if (a.Section_OrderNum !== b.Section_OrderNum) {
                return a.Section_OrderNum - b.Section_OrderNum;
            }
            return (sectionTypeOrder[a.Type] || 99) - (sectionTypeOrder[b.Type] || 99);
        })

        setSections(formattedSections)

    }
    async function fetchItem() {
        setIsLoading(true)
        try {
            const response = await axios.get(
                `https://goatwiki-backend-production.up.railway.app/api/GetOthersForAdmin`,
                {
                    params: { name: selectedItem }
                }
            )
            if (response.data && response.data !== "" && Object.keys(response.data).length > 0) {
                setItem(response.data)
                setItemExists(true)
                loadData(response.data)
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
    function RenderElementPanel(positionIndex = null) {
        const ElePanelisOpen = elementPanel[positionIndex] || false

        return (
            <>
                <button type='button' className='AP-addcontent' onClick={() => {
                    setElementPanel(
                        (prev) => ({
                            ...prev,
                            [positionIndex]: !ElePanelisOpen,
                        })
                    )
                }}>
                    Add An Element 📝
                </button>
                {
                    ElePanelisOpen && (
                        <div className='AP-ElementPanel'>

                            <button type='button' className='AP-elePanelBtns' onClick={() => { handleAddSection('head', positionIndex) }}>Heading</button>

                            <button type='button' className='AP-elePanelBtns' onClick={() => { handleAddSection('para', positionIndex) }}>Paragraph</button>

                        </div>

                    )
                }
            </>
        );
    }

    function handleAddSection(type, positionIndex = null) {
        const newSections = [...sections]

        const typeCounters = {};
        newSections.forEach((section) => {
            const sectionType = section.Type
            if (!typeCounters[sectionType]) {
                typeCounters[sectionType] = 0;
            }
            typeCounters[sectionType] = Math.max(typeCounters[sectionType], section.Order);
        })

        const newOrderNum = typeCounters[type] ? typeCounters[type] + 1 : 1;

        let newSection = {
            Order: newOrderNum,
            Type: type
        }

        if (type === 'head' || type === 'para') {
            newSection = {
                ...newSection,
                Content: ``,
                AnchorLink: null
            }
        }

        if (positionIndex === null) {
            newSections.unshift(newSection)
        } else {
            newSections.splice(positionIndex + 1, 0, newSection);
        }

        setSections(newSections)
        setIsDirty(true)

        setElementPanel(
            (prev) => ({
                ...prev,
                [positionIndex]: false,
            })
        )
    }
    async function SubmitItem(e) {

        try {
            await e.preventDefault()

            if (submitting) return
            setSubmitting(true)

            let finalSections = []
            let SectionCounter = 0

            for (const section of sections) {
                const prevSection = finalSections[finalSections.length - 1]
                if (section.Type === 'head') {
                    SectionCounter++
                    finalSections.push({
                        Section_OrderNum: SectionCounter,
                        Content: section.Content,
                        SectionType: section.Type,
                    })
                }
                else if (section.Type === 'para') {
                    if (prevSection !== undefined) {
                        if (prevSection.SectionType === 'head') {
                            //nothing happens here
                        }
                        else {
                            SectionCounter++
                        }
                    }
                    else {
                        SectionCounter++
                    }
                    finalSections.push({
                        Section_OrderNum: SectionCounter,
                        Content: section.Content,
                        SectionType: section.Type,
                    })
                }
            }
            const FinalItem = {
                id: item.id,
                Title: item.Title,
                Sections: finalSections,
                UpdatedDate: new Date().toISOString()
            }
            
            const response = await axios.post('https://goatwiki-backend-production.up.railway.app/api/UploadOthers', FinalItem)
            setSuccess(response.data.msg)
            if (response.data.msg === "SUCCESSFUL") {
                setIsDirty(false)
            }

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
                    <title>Modify Others | Admin Panel | GoatWiki</title>
                </Helmet>
            </HelmetProvider>

            <div className="APMOmainContainer">
                {
                    isLoading && <Loadinganim />
                }
                {!isLoading && item === null && (
                    <>
                        <h1>Modify Others</h1>
                        <div className="AP-dropdown-menu-container">
                            <select className='AP-dropdown-menu' required value={selectedItem} onChange={(e) => { setSelectedItem(e.target.value) }}>
                                <option value="">    Select      </option>
                                <option value="pp">Privacy Policy</option>
                                <option value="tc">Terms And Conditions</option>
                                <option value="ab">About</option>
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
                                        <button className='AP-msg-close-btn AP-msg-btns' onClick={() => { setIsDirty(false); window.location.reload() }}>
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
                                    <h1>
                                        Content:
                                    </h1>

                                    {RenderElementPanel(null)}

                                    <div className={sections.length > 0 ? 'AP-content-inps' : 'AP-hide'}>
                                        {
                                            sections.length > 0 && (
                                                sections.map((section, index) => {
                                                    if (section.Type === 'head') {
                                                        return (
                                                            <div key={`section-head-${index}`} className='AP-content-inp-box'>
                                                                <img src="/assets/close.png" alt="close" onClick={() => {
                                                                    setSections((prevSections) =>
                                                                        prevSections.filter((_, i) => i !== index)
                                                                    )
                                                                }} />
                                                                <textarea className='AP-inps' required placeholder='Heading' value={section.Content} onInput={autoResize} onChange={(e) => {
                                                                    const updatedContent = e.target.value;
                                                                    setSections((prevSections) =>
                                                                        prevSections.map((sec, secIndex) =>
                                                                            secIndex === index ? { ...sec, Content: updatedContent } : sec

                                                                        )
                                                                    )
                                                                }} />
                                                                {RenderElementPanel(index)}
                                                            </div>
                                                        )
                                                    }
                                                    else if (section.Type === 'para') {
                                                        return (
                                                            <div key={`section-para-${index}`} className='AP-content-inp-box'>
                                                                <img src="/assets/close.png" alt="close" onClick={() => {
                                                                    setSections((prevSections) =>
                                                                        prevSections.filter((_, i) => i !== index)
                                                                    )
                                                                }} />
                                                                <textarea className='AP-inps' required placeholder='Paragraph' value={section.Content} onInput={autoResize} onChange={(e) => {
                                                                    const updatedContent = e.target.value;
                                                                    setSections((prevSections) =>
                                                                        prevSections.map((sec, secIndex) =>
                                                                            secIndex === index ? { ...sec, Content: updatedContent } : sec
                                                                        )
                                                                    )
                                                                }} />
                                                                {RenderElementPanel(index)}
                                                            </div>
                                                        )
                                                    }
                                                })
                                            )
                                        }
                                        <button type='submit' className='AP-submit-btn'>
                                            SUBMIT!
                                        </button>
                                    </div>


                                </form>
                            </div>
                        </>
                    )
                }

            </div>
        </>
    )
}

export default APModifyOthers
