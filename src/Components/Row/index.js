import './row.css';
import React from 'react';

import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

class Line extends React.Component {
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
    if(nameVariable === 'articolo'){
      this.setState({ articolo: event.target.value });
      row=[event.target.value,lotto,quantita,index];
    }else if(nameVariable === 'lotto'){
      this.setState({ lotto: event.target.value });
      row=[articolo,event.target.value,quantita,index];
    }else if(nameVariable === 'quantita'){
      this.setState({ quantita: event.target.value });
      row=[articolo,lotto,event.target.value,index];
    }
    
    this.props.upRow(row);
  }

  render() {
    const {articolo,lotto,quantita} = this.state; 
    return (
      <>
        <Col lg>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Articolo:</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              value={articolo}
              onChange={(e) =>this.onChange(e,"articolo")}
              aria-label="articolo"
              aria-describedby="basic-addon1"
            />
            </InputGroup>
        </Col>

        <Col lg>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Lotto:</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              value={lotto}
              onChange={(e) =>this.onChange(e,"lotto")}
              aria-label="articolo"
              aria-describedby="basic-addon1"
            />
            </InputGroup>
        </Col>

        <Col lg>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Quantita:</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              value={quantita} 
              onChange={(e) =>this.onChange(e,"quantita")}
              aria-label="articolo"
              aria-describedby="basic-addon1"
            />
            </InputGroup>
        </Col>
      </>
    );
  }
}

export default Line;