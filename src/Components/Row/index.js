import './row.css';
import React from 'react';

class Row extends React.Component {
  constructor(props) {
    super(props);
    //this.articleChange = this.articleChange.bind(this);
    //this.lottoChange = this.lottoChange.bind(this);
    //this.quantityChange = this.quantityChange.bind(this);

    //this.setValue = this.setValue.bind(this);

    this.state = {
        index:this.props.index,
        articolo: this.props.articolo,
        lotto: this.props.lotto,
        quantita: this.props.quantita,
    };
  }

  /*setValue(nameVariable,value){

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
  }*/

  render() {
    //const {func} = this.props;
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
      

      /*<>
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
      </>*/
    );
  }
}

export default Row;