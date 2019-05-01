import React from 'react';
import { Link } from 'react-router-dom';
import Template from './Template';
import '../../../assets/scss/user/landing-page.scss';

const LandingPage = () => (
  <Template>
    <div className="user-landing-page">
      <div className="container">
        <div className="content">
          <div className="grid-container clearfix">
            <div className="grid-50">
              <div className="gray-bg">
                <p>Found any incident linked to corruption?</p>
                <Link to="/red-flag/new" className="button">Report now!</Link>
              </div>
            </div>
            <div className="grid-50">
              <div className="gray-bg">
                <p>
                  Call for a government agency to intervene e.g repair bad road sections,
                  {' '}
                  collapsed bridges, flooding e.t.c
                </p>
                <Link to="/intervention/new" className="button">Ask for intervention</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Template>
);

export default LandingPage;
