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

  onChange(event,nameVariable){
    const {index,articolo,lotto,quantita} = this.state;
    let row;
    if(nameVariable == 'articolo'){
      this.setState({ articolo: event.target.value });
      row=[event.target.value,lotto,quantita,index];
    }else if(nameVariable == 'lotto'){
      this.setState({ lotto: event.target.value });
      row=[articolo,event.target.value,quantita,index];
    }else if(nameVariable == 'quantita'){
      this.setState({ quantita: event.target.value });
      row=[articolo,lotto,event.target.value,index];
    }
    
    this.props.upRow(row);
  }

  render() {
    const {articolo,lotto,quantita} = this.state; 
    return (
      <>
        <td>
          codice Articolo:
          <input type="text" name="articolo" value={articolo} onChange={(e) =>this.onChange(e,"articolo")} />
        </td>
        <td>
          codice Lotto:
          <input type="text" name="lotto" value={lotto} onChange={(e) =>this.onChange(e,"lotto")}/>
        </td>
        <td>
          quantita:
          <input type="number" name="quantita" value={quantita} onChange={(e) =>this.onChange(e,"quantita")}/>
        </td>
      </>
    );
  }
}

export default Row;