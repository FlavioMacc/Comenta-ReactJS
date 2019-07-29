import './row.css';
import React from 'react';


class Row extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        index:this.props.index,
        articolo: this.props.articolo,
        lotto: this.props.lotto,
        quantita: this.props.quantita,
    };
  }

  render() {
    const {articolo,lotto,quantita} = this.state;
    return (
      <>
        <td>
          codice Articolo:
          <input type="text" name="articolo" value={articolo} readOnly/>
        </td>
        <td>
          codice Lotto:
          <input type="text" name="lotto" value={lotto} readOnly/>
        </td>
        <td>
          quantita:
          <input type="number" name="quantita" value={quantita} readOnly/>
        </td>
      </>
    );
  }
}

export default Row;