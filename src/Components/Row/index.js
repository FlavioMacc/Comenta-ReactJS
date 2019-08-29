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

    const valCol=[articolo,lotto,quantita];
    const col=["articolo","lotto","quantita"]
    const items = []

    for (let i=0; i < 3; i++) {
      items.push(
        <Col lg>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">{col[i]}:</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              value={valCol[i]}
              onChange={(e) =>this.onChange(e,col[i])}
              aria-label={col[i]}
              aria-describedby="basic-addon1"
            />
            </InputGroup>
        </Col>
      )
    }

    return (
      <>
        {items}
      </>
    );
  }
}

export default Line;