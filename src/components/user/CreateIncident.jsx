import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string as stringProp } from 'prop-types';
import { post as axiosPost, patch as axiosPatch } from 'axios';
import Template from './Template';
import Image from '../widgets/Image';
import FormErrorText from '../FormErrorText';
import LoadingButton from '../LoadingButton';
import '../../../assets/scss/user/create-incident.scss';

class CreateIncident extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      imageUrls: [],
      currentStep: 1,
      isWorking: false,
      submitEvidenceBtnDisabled: false,
    };

    this.numFilesToUpload = 0;
    this.numFilesUploaded = 0;
    this.incidentId = null;
  }

  onTextInputValueChanged({ target }) {
    const { fieldValues } = this.state;

    fieldValues[target.name] = target.value;
    this.setState({
      fieldValues,
    });
  }

  createIncident() {
    this.setState({ isWorking: true });

    const { authToken, incidentType } = this.props;

    const { fieldValues } = this.state;

    axiosPost(`${incidentType}s`, fieldValues, {
      baseURL: API_HOST,
      headers: {
        'x-access-token': authToken,
      },
    })
      .then(response => response.data.data[0])
      .then((responseData) => {
        this.incidentId = responseData.id;

        this.setState({
          isWorking: false,
          currentStep: 2,
        });
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

  saveImageUrl(url) {
    const { authToken, incidentType } = this.props;

    return axiosPatch(`/${incidentType}s/${this.incidentId}/addImage`, { url }, {
      baseURL: API_HOST,
      headers: {
        'x-access-token': authToken,
      },
    });
  }

  showFileUploadWidget(e) {
    e.preventDefault();

    window.cloudinary.createUploadWidget({
      cloudName: 'dpcvutcpf',
      uploadPreset: 'ymigpsga',
      clientAllowedFormats: ['png', 'jpg', 'jpeg'],
      maxFiles: 3,
      maxFileSize: 1024 * 1024 * 3, // 5MB
      showCompletedButton: false,
    }, (error, result) => {
      if (error) {
        // Pass
      } else if (result.event === 'upload-added') {
        this.numFilesToUpload += 1;
      } else if (result.event === 'queues-start') {
        this.setState({
          submitEvidenceBtnDisabled: true,
        });
      } else if (result.event === 'success') {
        this.numFilesUploaded += 1;

        const url = result.info.secure_url;

        this.saveImageUrl(url)
          .then(() => {
            const { imageUrls } = this.state;

            imageUrls.push(url);

            const newState = { imageUrls };

            if (this.numFilesUploaded === this.numFilesToUpload) {
              newState.submitEvidenceBtnDisabled = false;
            }

            this.setState(newState);
          });
      }
    }).open();
  }

  render() {
    const { incidentType } = this.props;

    const {
      currentStep, isWorking, fieldErrors, imageUrls, submitEvidenceBtnDisabled,
    } = this.state;

    return (
      <Template>
        <div className="container incident-form">
          <div className="header-container">
            <div className="header">
              Create
              {' '}
              {incidentType === 'red-flag' ? 'a Red Flag' : 'an Intervention'}
            </div>

            <div className="steps">
              <span className={['step', currentStep === 1 ? 'active' : undefined].join(' ')}>
                &mdash;
                <span className="num">1</span>
                {' '}
                <span className="text">Create Incident</span>
              </span>
              <span className={['step', currentStep === 2 ? 'active' : undefined].join(' ')}>
                &mdash;
                <span className="num">2</span>
                {' '}
                <span className="text">
                  Upload Evidence
                  {' '}
                  <span className="optional">(optional)</span>
                </span>
              </span>
            </div>
          </div>

          <div>
            <div className="steps-container">
              {currentStep === 1 && (
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
                      <input type="text" id="title" name="title" className="text-field" onChange={e => this.onTextInputValueChanged(e)} />
                      <FormErrorText message={fieldErrors.title} />
                    </div>

                    <div className="field-section">
                      <label htmlFor="comment">
                        Comment
                        {' '}
                        <span className="required">*</span>
                      </label>
                      <textarea id="comment" name="comment" className="text-field" rows="14" onChange={e => this.onTextInputValueChanged(e)} />
                      <FormErrorText message={fieldErrors.comment} />
                    </div>

                    <div className="form-section">
                      <div className="form-section-body">
                        <div className="grid-container clearfix">
                          <div className="grid-10">
                            <label htmlFor="lat">Lat</label>
                            <input type="text" id="lat" name="lat" className="text-field" onChange={e => this.onTextInputValueChanged(e)} />
                          </div>
                          <div className="grid-10">
                            <label htmlFor="long">Long</label>
                            <input type="text" id="long" name="long" className="text-field" onChange={e => this.onTextInputValueChanged(e)} />
                          </div>
                        </div>

                        <FormErrorText message={fieldErrors.lat} />
                        <FormErrorText message={fieldErrors.long} />
                      </div>
                    </div>

                    <div className="field-section">
                      <LoadingButton
                        loading={isWorking}
                        value={incidentType === 'red-flag' ? 'Create Red Flag' : 'Create Intervention'}
                        onClick={() => this.createIncident()}
                      />
                    </div>
                  </form>
                </div>
              )}

              {currentStep === 2 && (
                <div className="step-body" id="evidence-upload-step">
                  {imageUrls.length === 0 && (
                    <div className="uploader-container">
                      <a href="#" className="upload-btn" onClick={e => this.showFileUploadWidget(e)}>
                        <i className="fa fa-cloud-upload-alt" />
                        {' '}
                        Click here to upload evidence
                      </a>
                      <div className="max">
                        <b>3</b>
                        {' '}
                        files max
                      </div>
                    </div>
                  )}

                  {imageUrls.length > 0 && (
                    <div className="uploaded-files">
                      <div className="success-message">
                        <i className="fa fa-check" />
                        {' '}
                        {imageUrls.length}
                        {' '}
                        file
                        {imageUrls.length > 1 ? 's' : ''}
                        {' '}
                        uploaded successfully
                      </div>
                      <div className="uploaded-thumbnails">
                        {imageUrls.map((src, index) => (
                          <Image src={src} key={index.toString()} />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="clearfix finish-btn">
                    <LoadingButton
                      disabled={submitEvidenceBtnDisabled}
                      onClick={() => { window.location = `/red-flag/${this.incidentId}`; }}
                      value="Finish"
                    />
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </Template>
    );
  }
}

CreateIncident.propTypes = {
  incidentType: stringProp.isRequired,
  authToken: stringProp.isRequired,
};

const state2props = state => ({
  authToken: state.usersReducer.user.authToken,
});

export default connect(state2props)(CreateIncident);
