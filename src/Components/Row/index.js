import './row.css';
import React from 'react';

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.articleChange = this.articleChange.bind(this);
    this.lottoChange = this.lottoChange.bind(this);
    this.quantityChange = this.quantityChange.bind(this);

    this.setValue = this.setValue.bind(this);

    this.state = {
        index:this.props.index,
        articolo: null,
        lotto: null,
        quantita: null,
    };
  }

  setValue(nameVariable,value){

    const {index} = this.state;
    this.props.func(index,nameVariable,value);
  }

  articleChange(event) {
    this.setState({ articolo: event.target.value });
    this.setValue("articolo",event.target.value) 
  }

  lottoChange(event) {
    this.setState({ lotto: event.target.value });
    this.setValue("lotto",event.target.value);
  }

  quantityChange(event) {
    this.setState({ quantita: event.target.value });
    this.setValue("quantita",event.target.value);
  }

  render() {
    //const {row} = this.props;
    
    return (
      <>
        <td>
          codice Articolo:
          <input type="text" name="articolo" onChange={this.articleChange} />
        </td>
        <td>
          codice Lotto:
          <input type="text" name="lotto" onChange={this.lottoChange} />
        </td>
        <td>
          quantita:
          <input type="number" name="quantita" onChange={this.quantityChange} />
        </td>
      </>
    );
  }
}

export default Row;