import React, { Component } from 'react';
import { object as objectProp, string as stringProp } from 'prop-types';
import { connect } from 'react-redux';
import { get as axiosGet } from 'axios';
import Template from './Template';
import '../../../assets/scss/user/profile-page.scss';

class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redFlags: {
        inDraft: 0,
        underInvestigation: 0,
        resolved: 0,
        rejected: 0,
      },
      interventions: {
        inDraft: 0,
        underInvestigation: 0,
        resolved: 0,
        rejected: 0,
      },
    };
  }

  componentDidMount() {
    this.loadIncidentCounts();
  }

  loadIncidentCounts() {
    const { authToken } = this.props;

    const axiosData = {
      baseURL: API_HOST,
      headers: {
        'x-access-token': authToken,
      },
    };

    Promise.all([
      axiosGet('red-flags/stats', axiosData),
      axiosGet('interventions/stats', axiosData),
    ])
      .then(response => ({
        redFlags: response[0].data.data[0],
        interventions: response[1].data.data[0],
      }))
      .then((data) => {
        this.setState({
          redFlags: {
            inDraft: data.redFlags['in-draft'],
            underInvestigation: data.redFlags['under-investigation'],
            rejected: data.redFlags.rejected,
            resolved: data.redFlags.resolved,
          },
          interventions: {
            inDraft: data.interventions['in-draft'],
            underInvestigation: data.interventions['under-investigation'],
            rejected: data.interventions.rejected,
            resolved: data.interventions.resolved,
          },
        });
      })
      .catch();
  }

  render() {
    const { user } = this.props;

    const { redFlags, interventions } = this.state;

    return (
      <Template>
        <div className="user-profile">
          <div className="user-bio">
            <div className="container">
              <div className="name">
                {user.firstname}
                {' '}
                {user.lastname}
              </div>
              <div className="meta">
                <span className="meta-data f-left">
                  <span className="label">Nickname</span>
                  <span className="value">{user.username}</span>
                </span>
                <span className="meta-data f-left">
                  <span className="label">Email</span>
                  <span className="value">{user.email}</span>
                </span>
                <span className="meta-data f-left last">
                  <span className="label">Mobile</span>
                  <span className="value">{user.phoneNumber}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="container">
            <div>
              <div className="counters">
                <div className="grid-container t-center clearfix">
                  <div className="red-flag grid-50">
                    <div className="inner">
                      <div className="header">
                        Red Flags
                        <i className="fa fa-bullhorn f-right" />
                      </div>
                      <div className="body clearfix">
                        <div className="counter in-draft">
                          <div className="num">{redFlags.inDraft}</div>
                          <div className="text">In Draft</div>
                        </div>
                        <div className="counter under-investigation">
                          <div className="num">{redFlags.underInvestigation}</div>
                          <div className="text">under investigation</div>
                        </div>
                        <div className="counter resolved">
                          <div className="num">{redFlags.resolved}</div>
                          <div className="text">resolved</div>
                        </div>
                        <div className="counter rejected last">
                          <div className="num">{redFlags.rejected}</div>
                          <div className="text">Rejected</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="intervention grid-50">
                    <div className="inner">
                      <div className="header">
                        Interventions
                        <i className="fa fa-bullhorn f-right" />
                      </div>
                      <div className="body clearfix">
                        <div className="counter in-draft">
                          <div className="num">{interventions.inDraft}</div>
                          <div className="text">In Draft</div>
                        </div>
                        <div className="counter under-investigation">
                          <div className="num">{interventions.underInvestigation}</div>
                          <div className="text">under investigation</div>
                        </div>
                        <div className="counter resolved">
                          <div className="num">{interventions.resolved}</div>
                          <div className="text">Resolved</div>
                        </div>
                        <div className="counter rejected last">
                          <div className="num">{interventions.rejected}</div>
                          <div className="text">Rejected</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Template>
    );
  }
}

ProfilePage.propTypes = {
  authToken: stringProp.isRequired,
  user: objectProp.isRequired,
};

const state2props = ({ usersReducer }) => ({
  authToken: usersReducer.user.authToken,
  user: usersReducer.user.data,
});

export default connect(state2props)(ProfilePage);
