import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from 'axios';
import Loadinganim from '../../Components/loadingScreen/Loadinganim';
import Error from "../../Pages/Others/Error";
import Card from "../Card/Card.jsx";
import './Post.css'
import ScrollToTop from '../../Pages/Others/ScrollToTop.jsx';

const Post = () => {

  const { permalink } = useParams();

  const [post, setPost] = useState(null);

  let fetching;

  useEffect(() => {
    const fetchPost = async () => {
      if (fetching) {
        return
      }
      else {
        fetching = true
        try {
          const response = await axios.get(
            `https://goatwiki-backend-production.up.railway.app/api/GetOneByLink`,
            {
              params: { link: permalink }
            }
          )
          setPost(response.data)
          fetching = false
        }
        catch (err) {
          fetching = false
          console.error(err)
        }
      }
    }
    fetchPost()
  }, [permalink])

  if (post === null) {
    return (
      <>
        <Loadinganim></Loadinganim>
      </>
    )
  }
  else {

    const DisplayPost = post

    if (!DisplayPost) {
      return <Error />;
    }

    <ScrollToTop />

    const backgroundImageStyle = {
      backgroundImage: `url("${DisplayPost.FPic}")`,
    };

    const postSections = [];
    for (let i = 1; i <= DisplayPost.NumOfEntries; i++) {
      postSections.push({
        head: DisplayPost[`Head${i}`],
        para: DisplayPost[`Para${i}`],
        pic: DisplayPost[`Pic${i}`],
        alt: DisplayPost[`AltPic${i}`],
        anchorWord: DisplayPost[`AnchorWord${i}`],
        anchorlink: DisplayPost[`AnchorLink${i}`],
        table: DisplayPost[`table${i}`],
        DownloadablePic: DisplayPost[`DownloadableImage${i}`],
        DownloadablePicPath: DisplayPost[`DownloadableImagePath${i}`],
        DisclaimerHead: DisplayPost[`DisclaimerHead${i}`],
        DisclaimerPara: DisplayPost[`DisclaimerPara${i}`],
      });
    }

    const faqsArr = []
    if (DisplayPost.faqs) {
      DisplayPost.faqs.map(faq => faqsArr.push({
        Question: `Q${faq.id}:${faq[`Qs${faq.id}`]}`,
        Answer: faq[`Ans${faq.id}`],
      }))
    }


    function renderTable(tablee) {

      return (
        <table>
          <thead>
            <tr>
              {tablee.headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tablee.rows.map((row, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  {tablee.headers.map((header, colIndex) => {
                    if (header.length > 0) {
                      return <td key={colIndex}>{row[header + colIndex]}</td>;
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }

    return (
      <>
        <HelmetProvider>
          <Helmet key={DisplayPost.metaPermalink}>
            <meta name="keywords" content={DisplayPost.keywords} />
          </Helmet>
          <Helmet>
            <title>{DisplayPost.metaTitle}</title>
            <link rel="canonical" href={`https://goatwiki.vercel.app/Post/${DisplayPost.metaPermalink}`} />
            <meta name="title" content={DisplayPost.metaTitle} />
            <meta name="description" content={DisplayPost.metaDescription} />
            <meta name="publish_date" content={DisplayPost.PublishingDate} />


            <meta property="og:site_name" content="GoatWiki" />
            <meta property="og:title" content={DisplayPost.metaTitle} />
            <meta property="og:description" content={DisplayPost.metaDescription} />
            <meta property="og:type" content="article" />
            <meta property="og:image" content={DisplayPost.FPic} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:url" content={`https://goatwiki.vercel.app/Post/${DisplayPost.metaPermalink}`} />
            <meta property="article:published_time" content={DisplayPost.PublishingDate} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={DisplayPost.metaTitle} />
            <meta name="twitter:description" content={DisplayPost.metaDescription} />
            <meta property="twitter:image" content={DisplayPost.FPic} />
            <meta name="twitter:label1" content="Written by" />
            <meta name="twitter:data1" content="goatwiki.com" />

            <meta name="robots" content="follow, index" />

            <script type="application/ld+json">
              {`{
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": "https://goatwiki.vercel.app/Post/${DisplayPost.metaPermalink}"
                },
                "headline": "${DisplayPost.metaTitle}",
                "image": "https://goatwiki.vercel.app${DisplayPost.FPic}",
                "author": {
                  "@type": "Organization",
                  "name": "GoatWiki"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "GoatWiki",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://goatwiki.vercel.app/assets/LOGO.png"
                  }
                },
                "description": "${DisplayPost.metaDescription}",
                "datePublished": "${DisplayPost.PublishingDate}"
              }`}
            </script>
          </Helmet>
        </HelmetProvider>
        <div className="PContainer">

          <div className="PMainContainer">

            <div className="PTitleContainer" style={backgroundImageStyle}>
              <div className="PTitle"><h2>{DisplayPost.Title}</h2></div>
            </div>


            {
              postSections.map((section, index) => (
                <div className={section.DisclaimerHead ? 'DisPBox' : 'PBox'} key={index}>
                  {section.DisclaimerHead ? <h2>{section.DisclaimerHead}</h2> : section.head && <h2>{section.head}</h2>}
                  {section.DisclaimerPara ? <p>{section.DisclaimerPara}</p> : section.para && <p>{section.para}{section.anchorWord && <a className="PostAnchor" href={section.anchorlink} target="_blank"> {section.anchorWord}</a>}</p>}
                  {section.DownloadablePic ? section.pic && <a href={section.DownloadablePicPath} className="downPic" download><img src={section.pic} alt={section.alt} /></a> : section.pic && <img src={section.pic} alt={section.alt} />}
                  {section.table && renderTable(section.table)}
                </div>
              ))
            }

          </div>
          <div className="OtherThingsContainer">
            {
              DisplayPost.faqs && DisplayPost.faqs.length > 0 &&
              <div className="faqContainer">
                <h2>FAQs</h2>
                {
                  faqsArr.map((faq, index) => (
                    <div className="faqBox" key={index}>
                      <button>{faq.Question}<img src="/assets/arrowUp.png" alt='Arrow Up' id="faqarrowUp" /><img src="/assets/arrowDown.png" alt='Arrow Down' id="faqarrowDown" /></button>
                      <div className="ansbox">{faq.Answer}</div>
                    </div>
                  ))
                }
              </div>
            }
            {
              DisplayPost.RelatedPosts && DisplayPost.RelatedPosts.length > 1 &&
              <div className="RelPosContainer">
                <h2>Related Posts:</h2>
                <div className="RelPosBox">
                  {DisplayPost.RelatedPosts.map((post, ind) => (<Card key={ind} Ind={post} />))}
                </div>
              </div>
            }
          </div>

        </div>
      </>
    )
  }
}

export default Post
