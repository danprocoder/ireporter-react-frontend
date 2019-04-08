import React from 'react';
import { number as numberProp } from 'prop-types';
import OneLineText from './OneLineText';

const TableRowLoading = ({ rows, cols }) => (
  [...Array(rows)].map((r, i) => (
    <tr key={i.toString()} className="row-loading">
      {[...Array(cols)].map((c, j) => <td key={j.toString()}><OneLineText /></td>)}
    </tr>
  ))
);

TableRowLoading.propTypes = {
  rows: numberProp.isRequired,
  cols: numberProp.isRequired,
};

export default TableRowLoading;
