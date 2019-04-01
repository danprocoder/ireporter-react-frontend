import React from 'react';
import { faBullhorn, faTwitter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default (
    <div>
        <div>
            <div className="bg-images-container">
                <img src="../../assets/images/protest.jpeg" className="active" />
                <img src="../../assets/images/bad-road.jpg" />
            </div>
			<div class="container">
				<div class="welcome-text-container section t-center">
					<div class="large-text">LET&apos;S MAKE NIGERIA A BETTER PLACE!</div>
					<div class="info-text">Bring any form of corruption to the notice of appropriate authorities and the general public. Also report on things that needs government intervention.</div>
					<div class="button-area"><a href="signup.html" class="reporter-signup-btn">Become a Reporter</a></div>
				</div>
			</div>
        </div>
        <div className="section report">
            <div className="container">
                <div class="grid-container">
                    <div class="grid-50">
                        <h3 class="red-flag"><FontAwesomeIcon icon={faBullhorn} /> Report cases linked to <span>corruption</span></h3>
                        <div class="m-top">
                            <div class="examples">Bribery, looted money, etc.</div>
                            <div class="button-area"><a href="login.html" class="button js-link-red-flag">Report!</a></div>
                        </div>
                    </div>
                    <div class="grid-50">
                        <h3 class="intervention"><FontAwesomeIcon icon={faBullhorn} /> Report things that need government <span>intervention</span></h3>
                        <div class="m-top">
                            <div class="examples">Bad roads, electricity issues, etc.</div>
                            <div class="button-area"><a href="login.html" class="button js-link-intervention">Report!</a></div>
                        </div>
                    </div>

                    <div class="clearfix"></div>
                </div>
            </div>
        </div>

        <footer>
            <div class="container">
                <div class="f-left">iReporter &copy; 2019</div>
                <div class="f-right m-top-768">
                    <div class="footer-header">Follow Us</div>
                    <div class="m-top">
                        <a href="#" class="social"><FontAwesomeIcon icon={['fab', 'facebook-f']} /></a>
                        <a href="#" class="social"><FontAwesomeIcon icon={['fab', 'twitter']} /></a>
                    </div>
                </div>

                <div class="f-right newsletter m-top-768">
                    <div class="footer-header">Subscribe to our newsletter</div>
                    <form action="#" class="m-top">
                        <div class="field-wrapper">
                            <input type="text" name="" placeholder="Your email address" class="text-field" />
                            <input type="submit" value="SUBSCRIBE" class="subscribe-btn" />
                        </div>
                    </form>
                </div>

                <div class="clearfix"></div>
            </div>
        </footer>

        {/*<script>
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
        </script>*/}
    </div>
);
