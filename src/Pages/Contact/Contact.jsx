import { NavLink } from 'react-router-dom'
import './Contact.css'

const Contact = () => {

  function handleFB() {
    window.open("https://www.facebook.com/profile.php?id=61564900846836", '_blank');
  }
  function handleIG() {
    window.open("https://www.instagram.com/goat_wiki/", '_blank');
  }


  return (

    <>
      <div className="MainCContainer">
        <div className="ContactContainer1">

          <div className="CreditContainer1">
            <h2>About Us</h2>
            <p>Hi, We're Webbros, a group of passionate bloggers and the creators of GoatWiki. We share our love for goats and their diverse breeds, hoping to connect with fellow enthusiasts. Thanks for visiting! </p>
            <NavLink className="ContactNavs" to="/About">Read More About Us</NavLink>
            <NavLink className="ContactNavs" to="/PrivacyPolicy">Privacy Policy</NavLink>
            <NavLink className="ContactNavs" to="/TermsConditions">Terms and Conditions</NavLink>
          </div>

          <div className="CreditContainer2">
            <h2>Contact Us:</h2>
            <p>author@goatwiki.com</p>
            <h2>Follow Us To Get Latest Updates As Soon As They are Released!:</h2>
            <div className="FollowImg">
              <img src="/assets/fbLogo.png" alt="pic" onClick={handleFB} />
              <img src="/assets/igLogo.png" alt="pic" onClick={handleIG} />
            </div>
          </div>
        </div>

        <div className="CompanyContainer">
          <p>Copyright 	&#169;2024 Webbros</p>
        </div>
      </div>

    </>
  )
};

export default Contact
