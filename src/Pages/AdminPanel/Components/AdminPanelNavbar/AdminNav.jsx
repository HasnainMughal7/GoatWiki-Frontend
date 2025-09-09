import { NavLink, useLocation } from 'react-router-dom'
import './AdminNav.css'

const AdminNav = () => {

    const Location = useLocation();

    return (
        <>
            <div className='AdminNav'>
                <div className="NavContent">

                    <NavLink to="/Admin/" className="Navtitle">Admin Panel</NavLink>


                    <div className="AdminNavs">
                    <NavLink to="/Admin"        className={Location.pathname === '/Admin'                ? 'activeAP' : ''}>Home</NavLink>
                    <NavLink to="/Admin/Create" className={Location.pathname === '/Admin/Create'         ? 'activeAP' : ''}>Create</NavLink>
                    <NavLink to="/Admin/Modify" className={Location.pathname === '/Admin/Modify' || /^\/Admin\/Modify\/\d+$/.test(Location.pathname) ? 'activeAP' : ''}>Modify</NavLink>
                    <NavLink to="/Admin/ModifyOthers" className={Location.pathname === '/Admin/ModifyOthers' ? 'activeAP' : ''}>Modify Others</NavLink>
                    <NavLink to="/Admin/ModifyScripts" className={Location.pathname === '/Admin/ModifyScripts' ? 'activeAP' : ''}>Modify Scripts</NavLink>
                    <NavLink to="/Admin/Delete" className={Location.pathname.startsWith('/Admin/Delete') ? 'activeAP' : ''}>Delete</NavLink>
                    </div>
                
                </div>
            </div>
        </>
    )
}

export default AdminNav
