import React, { Component } from 'react';
import OneLineText from './OneLineText';

class TableRowLoading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return [...Array(this.props.rows)].map(i => <tr key={i} className="row-loading">
      {[...Array(this.props.cols)].map(j => <td key={j}><OneLineText /></td>)}
    </tr>);
  }
}

export default TableRowLoading;
