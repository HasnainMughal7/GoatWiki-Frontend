import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useEffect } from 'react'
import { initGA, logPageView } from './analytics';
import { Analytics } from "@vercel/analytics/react"
import Navbar from './Components/Nav/Navbar.jsx'
import Home from './Pages/Home/Home.jsx'
import About from './Pages/Others/About.jsx'
import Contact from './Pages/Contact/Contact.jsx'
import KikoGoats from './Pages/Categories/KikoGoats.jsx'
import SpanishGoats from './Pages/Categories/SpanishGoats.jsx'
import BoerGoats from './Pages/Categories/BoerGoats.jsx'
import NigerianDwarfGoats from './Pages/Categories/NigerianDwarfGoats.jsx'
import DamascusGoats from './Pages/Categories/DamascusGoats.jsx'
import Post from './Components/PostCard/Post.jsx'
import PrivacyPolicy from './Pages/Others/PrivacyPolicy.jsx'
import TermsConditions from './Pages/Others/TermsConditions.jsx'
import ScrollToTop from './Pages/Others/ScrollToTop.jsx'
import Error from './Pages/Others/Error.jsx'
import All from './Pages/All/All.jsx'
import Login from './Pages/AdminPanel/Pages/Login.jsx';
import APHome from './Pages/AdminPanel/Pages/APHome.jsx';
import APCreate from './Pages/AdminPanel/Pages/APCreate.jsx';
import APDelete from './Pages/AdminPanel/Pages/APDelete.jsx';
import ProtectedRoute from './Pages/AdminPanel/Components/ProtectedRoute.jsx';
import { AdminAuthProvider } from './Pages/AdminPanel/Components/AdminAuthContext.jsx';
import AdminNav from './Pages/AdminPanel/Components/AdminPanelNavbar/AdminNav.jsx';
import APModify from './Pages/AdminPanel/Pages/APModify.jsx';
import APModifyOthers from './Pages/AdminPanel/Pages/APModifyOthers.jsx';
import axios from 'axios';
import APModifyScripts from './Pages/AdminPanel/Pages/APModifyScripts.jsx';




const AppContent = ({ children }) => {
  const location = useLocation()

  let fetching = false
  useEffect(() => {
    if (fetching) return
    fetching = true
    axios.get('https://goatwiki-backend-production.up.railway.app/api/getScripts')
      .then((res) => {

        const AnalyticsObj = res.data.find((dat) => dat.ScriptCategory === "analytics")
        const AdsenseObj = res.data.find((dat) => dat.ScriptCategory === "adsense")

        if (AnalyticsObj) {
          const MeasureID = AnalyticsObj.Sections[0].ScriptContent;
          initGA(MeasureID);
          logPageView(location.pathname + location.search)
        }

        if (AdsenseObj) {
          // Inject AdSense Script
          const htmlScript = AdsenseObj.Sections.find(section => section.ScriptType === "HtmlScriptTag");
          if (htmlScript && !document.querySelector(`script[src*="pagead2.googlesyndication.com"]`)) {
            const script = document.createElement("script")
            script.async = true
            script.src = extractSrcFromScript(htmlScript.ScriptContent)
            script.crossOrigin = "anonymous"
            document.head.appendChild(script)
          }

          // Inject Meta Tag
          const metaTag = AdsenseObj.Sections.find(section => section.ScriptType === "MetaTag");
          if (metaTag && !document.querySelector(`meta[name="google-adsense-account"]`)) {
            const meta = document.createElement("meta")
            meta.name = "google-adsense-account"
            meta.content = extractContentFromMeta(metaTag.ScriptContent)
            document.head.appendChild(meta)
          }
        }
      })
      .catch(err => console.error("Error fetching scripts:", err))
  }, [location]);

  const extractSrcFromScript = (scriptString) => {
    const match = scriptString.match(/src="([^"]+)"/);
    return match ? match[1] : "";
  };

  const extractContentFromMeta = (metaString) => {
    const match = metaString.match(/content="([^"]+)"/);
    return match ? match[1] : "";
  };

  return (
    <>
      <Analytics />
      <ScrollToTop />
      <Navbar />
      {children}
    </>
  );
};

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (<AppContent><Home /><Contact /></AppContent>),
    },
    {
      path: "/About",
      element: (<AppContent><About /></AppContent>),
    },
    {
      path: "/KikoGoats",
      element: (<AppContent><KikoGoats /><Contact /></AppContent>),
    },
    {
      path: "/SpanishGoats",
      element: (<AppContent><SpanishGoats /><Contact /></AppContent>),
    },
    {
      path: "/BoerGoats",
      element: (<AppContent><BoerGoats /><Contact /></AppContent>),
    },
    {
      path: "/NigerianDwarfGoats",
      element: (<AppContent><NigerianDwarfGoats /><Contact /></AppContent>),
    },
    {
      path: "/DamascusGoats",
      element: (<AppContent><DamascusGoats /><Contact /></AppContent>),
    },
    {
      path: "/AllPosts",
      element: (<AppContent><All /><Contact /></AppContent>),
    },
    {
      path: "/Post/:permalink",
      element: (<AppContent><Post /><Contact /></AppContent>),
    },
    {
      path: "/PrivacyPolicy",
      element: (<AppContent><PrivacyPolicy /></AppContent>),
    },
    {
      path: "/TermsConditions",
      element: (<AppContent><TermsConditions /></AppContent>),
    },
    {
      path: "/Admin/login",
      element: (
        <AdminAuthProvider>
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        </AdminAuthProvider>
      ),
    },
    // Protected Routes:
    {
      path: "/Admin",
      element: (
        <AdminAuthProvider>
          <ProtectedRoute>
            <AdminNav />
            <APHome />
          </ProtectedRoute>
        </AdminAuthProvider>
      ),
    },
    {
      path: "/Admin/Create",
      element: (
        <AdminAuthProvider>
          <ProtectedRoute>
            <AdminNav />
            <APCreate />
          </ProtectedRoute>
        </AdminAuthProvider>
      ),
    },
    {
      path: "/Admin/Modify/:id?",
      element: (
        <AdminAuthProvider>
          <ProtectedRoute>
            <AdminNav />
            <APModify />
          </ProtectedRoute>
        </AdminAuthProvider>
      ),
    },
    {
      path: "/Admin/ModifyOthers",
      element: (
        <AdminAuthProvider>
          <ProtectedRoute>
            <AdminNav />
            <APModifyOthers />
          </ProtectedRoute>
        </AdminAuthProvider>
      ),
    },
    {
      path: "/Admin/ModifyScripts",
      element: (
        <AdminAuthProvider>
          <ProtectedRoute>
            <AdminNav />
            <APModifyScripts />
          </ProtectedRoute>
        </AdminAuthProvider>
      ),
    },
    {
      path: "/Admin/Delete/:id?",
      element: (
        <AdminAuthProvider>
          <ProtectedRoute>
            <AdminNav />
            <APDelete />
          </ProtectedRoute>
        </AdminAuthProvider>
      ),
    },
    {
      path: "*",
      element: (<AppContent><Error /></AppContent>),
    },
  ])
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>GoatWiki</title>
        </Helmet>
      </HelmetProvider>
      <RouterProvider router={router} />
    </>
  )
}

export default App

