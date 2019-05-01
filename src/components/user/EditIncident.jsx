import React, { Component } from 'react';
import { string as stringProp, object as objectProp } from 'prop-types';
import { get as axiosGet, patch as axiosPatch } from 'axios';
import { connect } from 'react-redux';
import Template from './Template';
import FormErrorText from '../FormErrorText';
import LoadingButton from '../LoadingButton';

class EditIncident extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isWorking: false,
      fieldValues: {
        title: '',
        comment: '',
        lat: '',
        long: '',
      },
      fieldErrors: {
        title: '',
        comment: '',
        lat: '',
        long: '',
      },
      incidentFetchState: 'fetching',
    };

    this.incidentId = null;
  }

  componentDidMount() {
    this.populateForm();
  }

  onTextInputValueChanged({ target }) {
    const { fieldValues } = this.state;

    fieldValues[target.name] = target.value;

    this.setState({ fieldValues });
  }

  populateForm() {
    const { match, incidentType, authToken } = this.props;

    axiosGet(`${incidentType}s/${match.params.id}`, {
      baseURL: API_HOST,
      headers: {
        'x-access-token': authToken,
      },
    })
      .then(response => response.data.data[0])
      .then((incident) => {
        this.incidentId = incident.id;

        this.setState({
          fieldValues: {
            title: incident.title,
            comment: incident.comment,
            lat: incident.latitude,
            long: incident.longitude,
          },
          incidentFetchState: 'fetched',
        });
      })
      .catch(() => {
        this.setState({
          incidentFetchState: 'error',
        });
      });
  }

  submitForm() {
    this.setState({ isWorking: true });

    const { history, authToken, incidentType } = this.props;

    const { fieldValues } = this.state;

    axiosPatch(`${incidentType}s/${this.incidentId}`, fieldValues, {
      baseURL: API_HOST,
      headers: {
        'x-access-token': authToken,
      },
    })
      .then(() => {
        history.push(`/${incidentType}/${this.incidentId}`);
      })
      .catch((error) => {
        const newState = { isWorking: false };
        if (error.response) {
          if (typeof error.response.data.error === 'object') {
            newState.fieldErrors = error.response.data.error;
          } else {
            // Snackbar goes here.
          }
        }
        this.setState(newState);
      });
  }

  render() {
    const { incidentType } = this.props;

    const {
      fieldValues, fieldErrors, incidentFetchState, isWorking,
    } = this.state;

    return (
      <Template>
        {incidentFetchState === 'error' ? (
          <div>An error occurred. Please refresh your browser.</div>
        ) : (
          <div className="container incident-form">
            <div className="header-container">
              <div className="header">
                Edit
                {' '}
                {incidentType === 'red-flag' ? 'Red Flag' : 'Intervention'}
              </div>
            </div>

            <div>
              <div className="step-body" id="incident-creation-step">
                <div style={{
                  marginTop: '9px',
                  color: '#868686',
                }}
                >
                  <small>
                    <span className="required">*</span>
                    {' '}
                    Required fields
                  </small>
                </div>
                <form id="incident-form">
                  <div className="field-section">
                    <label htmlFor="title">
                      Title
                      {' '}
                      <span className="required">*</span>
                    </label>
                    <input type="text" id="title" name="title" className="text-field" value={fieldValues.title} onChange={e => this.onTextInputValueChanged(e)} />
                    <FormErrorText message={fieldErrors.title} />
                  </div>

                  <div className="field-section">
                    <label htmlFor="comment">
                      Comment
                      {' '}
                      <span className="required">*</span>
                    </label>
                    <textarea id="comment" name="comment" className="text-field" rows="14" onChange={e => this.onTextInputValueChanged(e)} value={fieldValues.comment} />
                    <FormErrorText message={fieldErrors.comment} />
                  </div>

                  <div className="form-section">
                    <div className="form-section-body">
                      <div className="grid-container clearfix">
                        <div className="grid-10">
                          <label htmlFor="lat">Lat</label>
                          <input type="text" id="lat" name="lat" className="text-field" value={fieldValues.lat || ''} onChange={e => this.onTextInputValueChanged(e)} />
                        </div>
                        <div className="grid-10">
                          <label htmlFor="long">Long</label>
                          <input type="text" id="long" name="long" className="text-field" value={fieldValues.long || ''} onChange={e => this.onTextInputValueChanged(e)} />
                        </div>
                      </div>

                      <FormErrorText message={fieldErrors.lat} />
                      <FormErrorText message={fieldErrors.long} />
                    </div>
                  </div>

                  <div className="field-section">
                    <LoadingButton
                      loading={isWorking}
                      value="Save Changes"
                      onClick={() => this.submitForm()}
                    />
                  </div>
                </form>
              </div>

            </div>

          </div>
        )}
      </Template>
    );
  }
}

EditIncident.propTypes = {
  authToken: stringProp.isRequired,
  incidentType: stringProp.isRequired,
  match: objectProp.isRequired,
  history: objectProp.isRequired,
};

const state2props = ({ usersReducer }) => ({
  authToken: usersReducer.user.authToken,
});

export default connect(state2props)(EditIncident);
