import { HelmetProvider } from 'react-helmet-async'
import { Helmet } from 'react-helmet'
import { useEffect, useState } from 'react'
import axios from "axios"
import './AdminPanel.css'
import Loadinganim from '../../../Components/loadingScreen/Loadinganim'
import { useNavigate } from 'react-router-dom'

const APCreate = () => {

    // STATE VARIABLES
    const [isDirty, setIsDirty] = useState(false)
    const [start, setStart] = useState(false)
    const [blogs, setBlogs] = useState([])
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [elementPanel, setElementPanel] = useState({})
    const [TableDimensionPanel, setTableDimensionPanel] = useState({})
    const [rows, setRows] = useState(0)
    const [cols, setCols] = useState(0)
    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(``)
    const navigate = useNavigate()


    // INPUT VARIABLES
    let NewBlogIndex;
    const [title, setTitle] = useState(``)
    const [category, setCategory] = useState(``)
    const [rp, setRp] = useState([])
    const [metaTitle, setMetaTitle] = useState(``)
    const [metaDes, setMetaDes] = useState(``)
    const [permalink, setPermalink] = useState(``)
    const [keywords, setKeywords] = useState(``)
    const [fpic, setFpic] = useState(null)
    const [fpicAlt, setFpicAlt] = useState(``)
    const [sections, setSections] = useState([])

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (isDirty) {
                e.preventDefault();
                e.returnValue = '';
            }
        }
        if (!start) {
            setElementPanel([]);
        }
        window.addEventListener('beforeunload', handleBeforeUnload)
        fetchPost()
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        }
    }, [start, isDirty]);

    async function fetchPost() {
        if (blogs.length <= 1) {
            try {
                const response = await axios.get(
                    `https://goatwiki-backend-production.up.railway.app/api/getAllForNavAndAP`
                )
                const blogss = response.data
                setBlogs(blogss.reverse())
            }
            catch (err) {
                console.error(err)
            }
            NewBlogIndex = blogs.length
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

    function handleCheckboxChange(id) {
        setRp((prev) => {
            if (prev.includes(id)) {
                return prev.filter((postId) => postId !== id)
            } else {
                return [...prev, id]
            }
        })
    }

    function RenderElementPanel(positionIndex = null) {
        const ElePanelisOpen = elementPanel[positionIndex] || false
        const TableDimenisOpen = TableDimensionPanel[positionIndex] || false

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

                            <button type='button' className='AP-elePanelBtns' onClick={() => { handleAddSection('anchor', positionIndex) }}>Hyper Link(Redirect)</button>

                            <button type='button' className='AP-elePanelBtns' onClick={() => { handleAddSection('Img', positionIndex) }}>Image</button>

                            <button type='button' className='AP-elePanelBtns' onClick={() => {
                                setTableDimensionPanel(
                                    (prev) => ({
                                        ...prev,
                                        [positionIndex]: !TableDimenisOpen,
                                    })
                                )
                                setElementPanel(
                                    (prev) => ({
                                        ...prev,
                                        [positionIndex]: false,
                                    })
                                )
                            }}>Table</button>

                            <button type='button' className='AP-elePanelBtns' onClick={() => { handleAddSection('Faq', positionIndex) }}>Frequently Asked Questions (FAQs)</button>

                        </div>

                    )
                }
                {
                    TableDimenisOpen && (
                        <div className="AP-TablePanel">
                            <input type="number" placeholder='Number of Rows' className='AP-inps' value={rows > 0 ? rows : ''} onChange={(e) => { setRows(e.target.value) }} />
                            <input type="number" placeholder='Number of Columns' className='AP-inps' value={cols > 0 ? cols : ''} onChange={(e) => { setCols(e.target.value) }} />
                            <button type='button' className='AP-TablePanelBtns' onClick={() => {
                                handleAddSection('Table', positionIndex, rows, cols)
                                setTableDimensionPanel(
                                    (prev) => ({
                                        ...prev,
                                        [positionIndex]: false,
                                    })
                                )
                            }}>GO</button>
                        </div>
                    )
                }
            </>
        );
    }

    function handleAddSection(type, positionIndex = null, numRows = 0, numCols = 0) {
        const newSections = [...sections];

        const typeCounters = {};
        newSections.forEach((section) => {
            const sectionType = section.Type;
            if (!typeCounters[sectionType]) {
                typeCounters[sectionType] = 0;
            }
            typeCounters[sectionType] = Math.max(typeCounters[sectionType], section.Order);
        });

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
        else if (type === 'Table') {
            newSection = {
                ...newSection,
                Headers: Array.from({ length: numCols }, (_, i) => ``),
                Content: Array.from({ length: numRows }, () =>
                    Object.fromEntries(
                        Array.from({ length: numCols }, (_, i) => [``, ""])
                    )
                )
            }
        }
        else if (type === 'anchor') {
            newSection = {
                ...newSection,
                Content: ``,
                AnchorLink: ``
            }
        }
        else if (type === 'Img') {
            newSection = {
                ...newSection,
                Content: null,
                ImgPath: ``,
                ImgAlt: ``
            }
        }
        else if (type === 'Faq') {
            newSection = {
                Order: newOrderNum,
                Type: type,
                Qs: ``,
                Ans: ``
            }
        }

        if (positionIndex === null) {
            newSections.unshift(newSection); // Add at the start
        } else {
            newSections.splice(positionIndex + 1, 0, newSection);
        }

        setSections(newSections)
        setIsDirty(true)

        setElementPanel(
            (prev) => ({
                ...prev,
                [positionIndex]: false, // Toggle this specific dropdown
            })
        )
    }

    async function uploadToCloudinary(file) {

        if (!file) {
            console.error("No file provided for upload.")
            return null
        }

        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", "FromFrontEnd")
        formData.append("folder", blogs.length ? `BlogPics/blog${blogs.length + 1}` : "BlogPics/blog_default")

        try {
            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/dsi0y6hwo/image/upload",
                formData
            )
            return response.data.secure_url
        } catch (error) {
            console.error("Error uploading image:", error)
            return null
        }
    }

    let uploadedImages = []

    async function SubmitBlog(e) {


        try {
            await e.preventDefault()

            if (submitting) return
            setSubmitting(true)

            let finalSections = []
            let finalFaqs = []
            let SectionCounter = 0

            for (const section of sections) {

                const prevSection = finalSections[finalSections.length - 1]
                if (section.Type === 'head') {
                    SectionCounter++
                    finalSections.push({
                        Section_OrderNum: SectionCounter,
                        AnchorLink: section.AnchorLink,
                        Content: section.Content,
                        Type: section.Type,
                    })
                }
                else if (section.Type === 'para') {
                    if (prevSection !== undefined) {
                        if (prevSection.Type === 'head' || prevSection.Type === 'Faq') {
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
                        AnchorLink: section.AnchorLink,
                        Content: section.Content,
                        Type: section.Type,
                    })
                }
                else if (section.Type === 'anchor') {
                    if (prevSection !== undefined) {
                        if (prevSection.Type === 'head' || prevSection.Type === 'para' || prevSection.Type === 'Faq') {
                            //nothing
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
                        AnchorLink: section.AnchorLink,
                        Content: section.Content,
                        Type: section.Type,
                    })
                }
                else if (section.Type === 'Img') {
                    if (prevSection !== undefined) {
                        if (prevSection.Type === 'head' || prevSection.Type === 'para' || prevSection.Type === 'anchor' || prevSection.Type === 'Faq') {
                            //nothing happens here
                        }
                        else {
                            SectionCounter++
                        }
                    }
                    else {
                        SectionCounter++
                    }
                    const ImgUrl = await uploadToCloudinary(section.Content)
                    if (!ImgUrl) {
                        setSuccess("UNSUCCESSFUL")
                        throw new Error("Image upload failed!")
                    }
                    uploadedImages.push(ImgUrl)
                    finalSections.push({
                        Section_OrderNum: SectionCounter,
                        ImgPath: ImgUrl ? ImgUrl : '',
                        ImgAlt: section.ImgAlt,
                        Type: section.Type,
                    })
                }
                else if (section.Type === 'Table') {
                    if (prevSection !== undefined) {
                        if (prevSection.Type === 'head' || prevSection.Type === 'para' || prevSection.Type === 'anchor' || prevSection.Type === 'Img' || prevSection.Type === 'Faq') {
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
                        Type: section.Type,
                        Headers: section.Headers,
                        Content: section.Content,
                    })
                }
                else if (section.Type === 'Faq') {
                    finalFaqs.push({
                        id: finalFaqs.length + 1,
                        [`Qs${finalFaqs.length + 1}`]: section.Qs,
                        [`Ans${finalFaqs.length + 1}`]: section.Ans,

                    })
                }
            }
            const FpicUrl = await uploadToCloudinary(fpic)
            uploadedImages.push(FpicUrl)
            if (!FpicUrl) {
                setSuccess("UNSUCCESSFUL")
                throw new Error("Featured image upload failed!")
            }
            const FinalBlog = {
                id: blogs.length,
                Title: title,
                Category: category,
                FPic: FpicUrl === undefined ? '' : FpicUrl,
                FPicAlt: fpicAlt,
                Sections: finalSections,
                faqs: finalFaqs,
                RelatedPosts: rp,
                NumOfEntries: SectionCounter,
                MetaTitle: metaTitle,
                MetaDescription: metaDes,
                Permalink: permalink.replace(/\s+/g, "-"),
                Keywords: keywords,
                PublishingDate: new Date().toISOString()
            }
            const response = await axios.post('https://goatwiki-backend-production.up.railway.app/api/UploadBlog', FinalBlog)
            if (response.data.msg === "SUCCESSFUL") {
                setSuccess(response.data.msg)
                setIsDirty(false)
            }
            else {
                if (uploadedImages.length > 0) {
                    for (const imgUrl of uploadedImages) {
                        try {
                            await axios.delete('https://goatwiki-backend-production.up.railway.app/api/DestroyImages', {
                                data: { public_id: `BlogPics/blog${blogs.length+1}/${imgUrl.split('/').pop().split('.')[0]}` },
                            })
                        } catch (deleteErr) {
                            console.error("Failed to delete image:", deleteErr);
                        }
                    }
                }
                setSuccess(response.data.msg)
                throw new Error("Upload process halted due to an error.")
            }

        }
        catch (err) {
            console.error(err)
            
            if (uploadedImages.length > 0) {
                for (const imgUrl of uploadedImages) {
                    try {
                        await axios.delete('https://goatwiki-backend-production.up.railway.app/api/DestroyImages', {
                            data: { public_id: `BlogPics/blog${blogs.length+1}/${imgUrl.split('/').pop().split('.')[0]}` },
                        })
                    } catch (deleteErr) {
                        console.error("Failed to delete image:", deleteErr);
                    }
                }
            }
            setSuccess("UNSUCCESSFUL")
            throw new Error("Upload process halted due to an error.")

        }

    }




    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Create A Blog | Admin Panel | GoatWiki</title>
                </Helmet>
            </HelmetProvider>

            <div className="APCmainContainer">
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
                                        <button className='AP-msg-btns' onClick={() => { navigate(`/Admin/Modify/${blogs.length}`); setIsDirty(false); window.location.reload() }}>
                                            Forgot Something? Modify This Blog ✏️
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
                    start ? (
                        <>
                            <div className="AP-start">
                                <h1>New Blog</h1>
                            </div>

                            <div className="AP-formContainer">
                                <form onSubmit={SubmitBlog}>
                                    <h1>
                                        Basic/Meta/SEO Information:
                                    </h1>

                                    <textarea className='AP-inps' placeholder='Title' required value={title} onChange={(e) => { setTitle(e.target.value); setIsDirty(true); }} onInput={autoResize} />

                                    <select className='AP-catinp' required onChange={(e) => { setCategory(e.target.value); setIsDirty(true); }}>
                                        <option value="">    Select Category      </option>
                                        <option value="kg">  Kiko Goats           </option>
                                        <option value="sg">  Spanish Goats        </option>
                                        <option value="bg">  Boer Goats           </option>
                                        <option value="ndg"> Nigerian Dwarf Goats </option>
                                        <option value="dg">  Damascus Goats       </option>
                                        <option value="none">NONE                 </option>
                                    </select>

                                    <div className='AP-rpinp'>
                                        <div className='AP-rpinpBtn' onClick={() => { setDropdownOpen(!dropdownOpen); fetchPost() }}>
                                            Select Related Posts ⬇️
                                        </div>
                                        {dropdownOpen && (
                                            <div className="AP-dropdown-options">
                                                {blogs.length > 1 ? blogs.map((post) => (
                                                    <div className='AP-dropdownbox' key={post.id}>
                                                        <input type="checkbox" id={`post-${post.id}`} checked={rp.includes(post.id)} onChange={() => handleCheckboxChange(post.id)} />
                                                        <label htmlFor={`post-${post.id}`}>
                                                            {post.Title}
                                                        </label>
                                                    </div>
                                                )) : <Loadinganim></Loadinganim>
                                                }
                                            </div>
                                        )}
                                    </div>

                                    <textarea className='AP-inps' placeholder='Meta Title' required value={metaTitle} onChange={(e) => { setMetaTitle(e.target.value); setIsDirty(true); }} onInput={autoResize} />

                                    <textarea className='AP-inps' placeholder='Meta Description' required value={metaDes} onChange={(e) => { setMetaDes(e.target.value); setIsDirty(true); }} onInput={autoResize} />

                                    <textarea className='AP-inps' placeholder='Meta Keywords (Comma Separated)' value={keywords} onChange={(e) => { setKeywords(e.target.value); setIsDirty(true); }} onInput={autoResize} />

                                    <textarea className='AP-inps' placeholder='Permalink (eg: What is a goat) (Please Do not use Any Special Character {eg: /|\;:()+= etc})' required value={permalink} onChange={(e) => { setPermalink(e.target.value); setIsDirty(true); }} onInput={autoResize} />

                                    <input type="file" accept='image/*' className='AP-fileinps' required onChange={(e) => {
                                        const file = e.target.files[0]
                                        if (file.type.startsWith("image/")) {
                                            setFpic(e.target.files[0])
                                            setIsDirty(true)
                                        }
                                        else {
                                            setFpic(null)
                                            e.target.value = null
                                        }
                                    }} />

                                    <textarea className='AP-inps' placeholder='Alterntive Text of Featuring Image' required value={fpicAlt} onChange={(e) => { setFpicAlt(e.target.value); setIsDirty(true); }} onInput={autoResize} />

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
                                                                        prevSections.map((sec) =>
                                                                            sec.Order === section.Order && sec.Type === section.Type
                                                                                ? { ...sec, Content: updatedContent }
                                                                                : sec
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
                                                                        prevSections.map((sec) =>
                                                                            sec.Order === section.Order && sec.Type === section.Type
                                                                                ? { ...sec, Content: updatedContent }
                                                                                : sec
                                                                        )
                                                                    )
                                                                }} />
                                                                {RenderElementPanel(index)}
                                                            </div>
                                                        )
                                                    }
                                                    else if (section.Type === 'anchor') {
                                                        return (
                                                            <div key={`section-anchor-${index}`} className='AP-content-inp-box'>
                                                                <img src="/assets/close.png" alt="close" onClick={() => {
                                                                    setSections((prevSections) =>
                                                                        prevSections.filter((_, i) => i !== index)
                                                                    )
                                                                }} />
                                                                <textarea className='AP-inps' required placeholder='HyperLink Content' value={section.Content} onInput={autoResize} onChange={(e) => {
                                                                    const updatedContent = e.target.value;
                                                                    setSections((prevSections) =>
                                                                        prevSections.map((sec) =>
                                                                            sec.Order === section.Order && sec.Type === section.Type
                                                                                ? { ...sec, Content: updatedContent }
                                                                                : sec
                                                                        )
                                                                    )
                                                                }} />
                                                                <textarea className='AP-inps' required placeholder='Link (URL)' value={section.AnchorLink} onInput={autoResize} onChange={(e) => {
                                                                    const updatedContent = e.target.value;
                                                                    setSections((prevSections) =>
                                                                        prevSections.map((sec) =>
                                                                            sec.Order === section.Order && sec.Type === section.Type
                                                                                ? { ...sec, AnchorLink: updatedContent }
                                                                                : sec
                                                                        )
                                                                    )
                                                                }} />
                                                                {RenderElementPanel(index)}
                                                            </div>
                                                        )
                                                    }
                                                    else if (section.Type === 'Img') {
                                                        return (
                                                            <div key={`section-image-${index}`} className='AP-content-inp-box'>
                                                                <img src="/assets/close.png" alt="close" onClick={() => {
                                                                    setSections((prevSections) =>
                                                                        prevSections.filter((_, i) => i !== index)
                                                                    )
                                                                }} />
                                                                <input type='file' accept='image/*' required className='AP-fileinps' ref={(inputRef) => {
                                                                    if (inputRef && section.Content instanceof File) {
                                                                        const dataTransfer = new DataTransfer()
                                                                        dataTransfer.items.add(section.Content)
                                                                        inputRef.files = dataTransfer.files
                                                                    }
                                                                }} onChange={(e) => {
                                                                    const updatedContent = e.target.files[0]
                                                                    if (updatedContent?.type.startsWith("image/")) {
                                                                        setSections((prevSections) =>
                                                                            prevSections.map((sec) =>
                                                                                sec.Order === section.Order && sec.Type === section.Type
                                                                                    ? { ...sec, Content: updatedContent }
                                                                                    : sec
                                                                            )
                                                                        )
                                                                    }
                                                                    else {
                                                                        setSections((prevSections) =>
                                                                            prevSections.map((sec) =>
                                                                                sec.Order === section.Order && sec.Type === section.Type
                                                                                    ? { ...sec, Content: null }
                                                                                    : sec
                                                                            )
                                                                        )
                                                                        e.target.value = null
                                                                    }
                                                                }} />
                                                                <textarea className='AP-inps' required placeholder='Image Alternative Text' value={section.ImgAlt} onInput={autoResize} onChange={(e) => {
                                                                    const updatedContent = e.target.value;
                                                                    setSections((prevSections) =>
                                                                        prevSections.map((sec) =>
                                                                            sec.Order === section.Order && sec.Type === section.Type
                                                                                ? { ...sec, ImgAlt: updatedContent }
                                                                                : sec
                                                                        )
                                                                    )
                                                                }} />
                                                                {RenderElementPanel(index)}
                                                            </div>
                                                        )
                                                    }
                                                    else if (section.Type === 'Table') {
                                                        return (
                                                            <div key={`section-table-${index}`} className='AP-content-inp-box'>
                                                                <img src="/assets/close.png" alt="close" onClick={() => {
                                                                    setSections((prevSections) =>
                                                                        prevSections.filter((_, i) => i !== index)
                                                                    )
                                                                }} />
                                                                <div className="section-Table-Container">
                                                                    <div className="AP-table-header-rows">
                                                                        {
                                                                            section.Headers.map((header, idx) => (
                                                                                <input type='text' key={`header-${section.Order}-${idx}`} placeholder='Heading' className='AP-Table-Header-Cell' value={header} onChange={(e) => {
                                                                                    const updatedHeaders = [...section.Headers]
                                                                                    updatedHeaders[idx] = e.target.value
                                                                                    setSections((prevSections) =>
                                                                                        prevSections.map((sec) =>
                                                                                            sec.Order === section.Order && sec.Type === section.Type
                                                                                                ? { ...sec, Headers: updatedHeaders }
                                                                                                : sec
                                                                                        )
                                                                                    )
                                                                                }} />
                                                                            ))
                                                                        }
                                                                    </div>
                                                                    {
                                                                        section.Content.map((row, rowIndex) => (
                                                                            <div key={`row-${section.Order}-${rowIndex}`} className='AP-table-rows'>
                                                                                {
                                                                                    section.Headers.map((header, colIndex) => (
                                                                                        <input type="text" key={`cell-${section.Order}-${rowIndex}-${colIndex}`} className='AP-Table-Cell' placeholder={`Content`} value={row[header + colIndex] || ""} onChange={(e) => {
                                                                                            const updatedRows = [...section.Content]
                                                                                            updatedRows[rowIndex] = {
                                                                                                ...updatedRows[rowIndex],
                                                                                                [header + colIndex]: e.target.value,
                                                                                            }
                                                                                            setSections((prevSections) =>
                                                                                                prevSections.map((sec) =>
                                                                                                    sec.Order === section.Order && sec.Type === section.Type
                                                                                                        ? { ...sec, Content: updatedRows }
                                                                                                        : sec
                                                                                                )
                                                                                            )
                                                                                        }} />
                                                                                    ))
                                                                                }
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                                {RenderElementPanel(index)}
                                                            </div>
                                                        )
                                                    }
                                                    else if (section.Type === 'Faq') {
                                                        return (
                                                            <div key={`section-faq-${index}`} className='AP-content-inp-box'>
                                                                <img src="/assets/close.png" alt="close" onClick={() => {
                                                                    setSections((prevSections) =>
                                                                        prevSections.filter((_, i) => i !== index)
                                                                    )
                                                                }} />
                                                                <textarea className='AP-inps' required placeholder='Question' value={section.Qs} onInput={autoResize} onChange={(e) => {
                                                                    const updatedContent = e.target.value;
                                                                    setSections((prevSections) =>
                                                                        prevSections.map((sec) =>
                                                                            sec.Order === section.Order && sec.Type === section.Type
                                                                                ? { ...sec, Qs: updatedContent }
                                                                                : sec
                                                                        )
                                                                    )
                                                                }} />
                                                                <textarea className='AP-inps' required placeholder='Answer' value={section.Ans} onInput={autoResize} onChange={(e) => {
                                                                    const updatedContent = e.target.value;
                                                                    setSections((prevSections) =>
                                                                        prevSections.map((sec) =>
                                                                            sec.Order === section.Order && sec.Type === section.Type
                                                                                ? { ...sec, Ans: updatedContent }
                                                                                : sec
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
                    ) : (
                        // Content before clicking new button
                        <div className="AP-start">
                            <button onClick={() => { if (!start) { setStart(true) } }}>
                                Add A New Blog!
                                <img src="/assets/add.png" alt="Add A Blog" />
                            </button>
                        </div>

                    )
                }
            </div>
        </>
    )
}
export default APCreate
