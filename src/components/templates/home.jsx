import React from 'react';

export default (
  <div>
    <div>
      <div className="bg-images-container">
        <img src="../../assets/images/protest.jpeg" className="active" alt="img1" />
        <img src="../../assets/images/bad-road.jpg" alt="img2" />
      </div>

      <div className="container">
        <div className="welcome-text-container section t-center">
          <div className="large-text">LET&apos;S MAKE NIGERIA A BETTER PLACE!</div>
          <div className="info-text">Bring any form of corruption to the notice of appropriate authorities and the general public. Also report on things that needs government intervention.</div>
          <div className="button-area"><a href="signup.html" className="reporter-signup-btn">Become a Reporter</a></div>
        </div>
      </div>
    </div>

    <div className="section report">
      <div className="container">
        <div className="grid-container">
          <div className="grid-50">
            <h3 className="red-flag">
              <i className="fa fa-bullhorn" />
              {' '}
              Report cases linked to
              {' '}
              <span>corruption</span>
            </h3>

            <div className="m-top">
              <div className="examples">Bribery, looted money, etc.</div>
              <div className="button-area"><a href="login.html" className="button js-link-red-flag">Report!</a></div>
            </div>

          </div>

          <div className="grid-50">
            <h3 className="intervention">
              <i className="fa fa-bullhorn" />
              {' '}
              Report things that need government
              {' '}
              <span>intervention</span>
            </h3>
            <div className="m-top">
              <div className="examples">Bad roads, electricity issues, etc.</div>
              <div className="button-area"><a href="login.html" className="button js-link-intervention">Report!</a></div>
            </div>
          </div>

          <div className="clearfix" />
        </div>
      </div>
    </div>

    <footer>
      <div className="container">
        <div className="f-left">iReporter &copy; 2019</div>

        <div className="f-right m-top-768">
          <div className="footer-header">Follow Us</div>
          <div className="m-top">
            <a href="#" className="social"><i className="fa fa-facebook" /></a>
            <a href="#" className="social"><i className="fa fa-twitter" /></a>
          </div>
        </div>

        <div className="f-right newsletter m-top-768">
          <div className="footer-header">Subscribe to our newsletter</div>

          <form action="#" className="m-top">
            <div className="field-wrapper">
              <input type="text" name="" placeholder="Your email address" className="text-field" />
              <input type="submit" value="SUBSCRIBE" className="subscribe-btn" />
            </div>
          </form>
        </div>

        <div className="clearfix" />
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
