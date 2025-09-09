import { NavLink } from 'react-router-dom'
import './Others.css'


const Error = () => {
  return (
    <>
     <div className="ErrorMainContainer">
        <img src="/assets/errorgoat.png" alt="Cool Goat" />
        <h2>Oops! This Cool Goat wandered off the path.</h2>
        <h2>Lets Get You Back Home Buddy!</h2>
        <NavLink to="/">Go Home</NavLink>
     </div>
    </>
  )
}

export default Error
