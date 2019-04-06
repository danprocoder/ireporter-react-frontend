import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import Dropdown from './Dropdown.jsx';

class IncidentStatusDropdown extends Component {
  constructor(props) {
    super(props);

    this.dropdownItems = [
      'In Draft',
      'Under Investigation',
      'Resolved',
      'Rejected',
    ];

    this.state = {
      selectedIndex: this.getSelectedIndex(),
      working: false,
    };
  }

  getSelectedIndex() {
    const { incident } = this.props;

    return this.dropdownItems
      .map(i => i.toLowerCase().replace(/ /g, '-'))
      .indexOf(incident.status);
  }

  changeIncidentState(index) {
    // Disable the dropdown.
    this.setState({ working: true });

    const { incident, authToken } = this.props;

    const newStatus = this.dropdownItems.map(i => i.toLowerCase().replace(/ /g, '-'))[index];

    axios.patch(`${incident.type}s/${incident.id}/status`, {
      status: newStatus,
    }, {
      baseURL: API_HOST,
      headers: {
        'x-access-token': authToken,
      },
    })
      .then(() => {
        this.setState({
          selectedIndex: index,
          working: false,
        });
      })
      .catch((error) => {
        // Enable the dropdown.
        this.setState({ working: false });
      });
  }

  render() {
    const { className } = this.props;

    const { selectedIndex, working } = this.state;

    const extraProps = {
      disabled: working, // Dropdown will be disabled if a HTTP request is happening.
    };
    if (className) {
      extraProps.className = className;
    }

    return (
      <Dropdown
        selectedIndex={selectedIndex}
        changeOnItemSelected={false}
        onItemSelected={i => this.changeIncidentState(i)}
        items={this.dropdownItems}
        {...extraProps}
      />
    );
  }
}

IncidentStatusDropdown.defaultProps = {
  className: undefined,
};

IncidentStatusDropdown.propTypes = {
  incident: PropTypes.object.isRequired,
  className: PropTypes.string,
  authToken: PropTypes.string.isRequired,
};

const state2props = (state) => {
  const { user } = state.usersReducer;
  return {
    authToken: user.authToken,
  };
};

export default connect(state2props)(IncidentStatusDropdown);
