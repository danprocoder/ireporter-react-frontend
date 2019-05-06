import React from 'react';
import { Link } from 'react-router-dom';
import protestImg from '../../../assets/images/protest.jpeg';
import badRoadPic from '../../../assets/images/bad-road.jpg';

export default (isLoggedIn, isAdmin, firstname) => (
  <div className="home-section">
    <div className="carousel">

      <div className="carousel-images">
        <div className="carousel-images-inner">
          <img src={protestImg} className="active" alt="img1" />
          <img src={badRoadPic} alt="img2" />
        </div>
      </div>

      <div className="carousel-text">
        <div className="container">
          <div className="welcome-text-container section t-center">
            <div className="large-text">WELCOME TO IREPORTER</div>
            <div className="info-text">Bring any form of corruption to the notice of appropriate authorities and the general public. Also report on things that needs government intervention.</div>
            <div className="button-area">
              {isLoggedIn ? (
                <Link to={isAdmin ? '/admin' : '/dashboard'} className="reporter-signup-btn">
                  Continue as
                  {' '}
                  {firstname}
                  {' '}
                  &rarr;
                </Link>
              ) : (
                <Link to="/signup" className="reporter-signup-btn">Become a Reporter</Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="section report">
      <div className="container">
        <div className="section-header">Let&apos;s Make Nigeria a Better Place</div>
        <div className="section-divider">
          <i className="fa fa-bullhorn" />
        </div>
        <div className="grid-container">
          <div className="grid-50">
            <h3 className="red-flag">
              Found any case linked to corruption
              ?
            </h3>

            <div className="m-top">
              <div className="examples">Bribery, looted money, etc.</div>
              <div className="button-area">
                <a href={isLoggedIn ? '/red-flag/new' : '/login'} className="button js-link-red-flag">Report!</a>
              </div>
            </div>

          </div>

          <div className="grid-50">
            <h3 className="intervention">
              Found any incident that needs government intervention?
            </h3>
            <div className="m-top">
              <div className="examples">Bad roads, electricity issues, etc.</div>
              <div className="button-area">
                <a href={isLoggedIn ? '/intervention/new' : '/login'} className="button js-link-intervention">Report!</a>
              </div>
            </div>
          </div>

          <div className="clearfix" />
        </div>
      </div>
    </div>

    <footer>
      <div className="container clearfix">
        <div className="f-left">iReporter &copy; 2019</div>

        <div className="f-right m-top-768">
          <div className="footer-header">Follow Us</div>
          <div className="m-top">
            <a href="#" className="social"><i className="fab fa-facebook" /></a>
            <a href="#" className="social"><i className="fab fa-twitter" /></a>
          </div>
        </div>
      </div>
    </footer>

  </div>
);
/*
<script>
let curIndex = 0;
function imgClass(img) {
    return {
        add(cls) {
            img.classList.add(cls);
            return this;
        },
        remove(cls) {
            img.classList.remove(cls);
            return this;
        },
    }
}
const images = document.querySelectorAll('.bg-images-container img');
setInterval(() => {
    for (let i = 0; i < images.length; i++) {
    imgClass(images[i]).remove('active').add('fade-out');
    }
    curIndex = (curIndex + 1 >= images.length ? 0 : curIndex + 1);
    imgClass(images[curIndex]).remove('fade-out').add('active');
}, 4000);
</script>
*/
