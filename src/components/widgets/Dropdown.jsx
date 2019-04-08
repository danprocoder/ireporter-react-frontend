import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../../assets/scss/widgets/dropdown.scss';

class Dropdown extends Component {
  constructor(props) {
    super(props);

    const { selectedIndex } = this.props;

    this.state = {
      selectedIndex,
      menuShown: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const newState = {
      selectedIndex: nextProps.selectedIndex,
    };
    if (nextProps.disabled) {
      newState.menuShown = false;
    }
    this.setState(newState);
  }

  onItemClick(index) {
    const { onItemSelected, changeOnItemSelected } = this.props;

    const newState = {
      menuShown: false,
    };
    if (changeOnItemSelected) {
      newState.selectedIndex = index;
    }

    this.setState(newState, () => {
      if (onItemSelected) {
        onItemSelected(index);
      }
    });
  }

  toggleMenuShown() {
    const { menuShown } = this.state;

    this.setState({
      menuShown: !menuShown,
    });
  }

  render() {
    const { className, items, disabled } = this.props;

    const { selectedIndex, menuShown } = this.state;

    // Props for root element of the dropdown.
    const rootProps = {
      className: 'dropdown no-selected',
    };
    if (className) {
      rootProps.className += ` ${className}`;
    }

    // Props for selected wrapper.
    const selectedWrapperProps = {};
    if (!disabled) {
      selectedWrapperProps.onClick = () => this.toggleMenuShown();
    }

    return (
      <div {...rootProps}>
        <a href="#" className="selected-wrapper" {...selectedWrapperProps}>
          <span className="selected">{items[selectedIndex]}</span>
          <i className="fa fa-caret-down" />
        </a>
        {menuShown && (
        <ul className="dropdown-menu">
          {items.map((item, index) => (
            <li key={index.toString()}>
              <a href="#" onClick={() => this.onItemClick(index)}>{item}</a>
            </li>
          ))}
        </ul>
        )}
      </div>
    );
  }
}

Dropdown.defaultProps = {
  changeOnItemSelected: true,
  selectedIndex: 0,
  disabled: false,
  className: undefined,
  onItemSelected: undefined,
};

Dropdown.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onItemSelected: PropTypes.func,
  selectedIndex: PropTypes.number,
  changeOnItemSelected: PropTypes.bool,
  items: PropTypes.array.isRequired,
};

export default Dropdown;
