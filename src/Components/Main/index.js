import React from 'react';
import './view.css';
import Line from '../Row/index.js';
import axios from 'axios';
import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import Calendar from 'react-calendar';
import Autosuggest from 'react-autosuggest';

import {addRow} from '../../js/action/action.js';
import {refNP} from '../../js/action/action.js';
import {upDocType} from '../../js/action/action.js';
import {clearRows} from '../../js/action/action.js';
import {delRow} from '../../js/action/action.js';
import {changeDate} from '../../js/action/action.js';
import {setSuggArticles} from '../../js/action/action.js';
import {setRows} from '../../js/action/action.js';
import {updateRow} from '../../js/action/action.js';

import {getSuggestions} from '../../js/constant/index.js';
import {getSuggestionValue} from '../../js/constant/index.js';
import {renderSuggestion} from '../../js/constant/index.js';

//======================================================
class Main extends React.Component {
  constructor(props) {
    super(props);

    this.checkRow = this.checkRow.bind(this);
    this.addCheckRow = this.addCheckRow.bind(this);
    this.dataChange = this.dataChange.bind(this);
    this.updateRow = this.updateRow.bind(this);
    this.resetValueRow = this.resetValueRow.bind(this);
    this.valueChange = this.valueChange.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      articolo:'',
      lotto:'',
      quantita:'',

      value: '',
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/getProgressNumber`).then(res => {
      const progressNumber = res.data;
      this.props.refNP(progressNumber);
      console.log(this.props);
    });
  }
//========================================  
  /*async resechLottoCode(articoloCode){
    var lottoCode=null;
    var idArticolo=null;

    await axios.get(`http://localhost:8080/getIdArticleForCode`,{ params: { codice: articoloCode } })
    .then(res => { idArticolo = res.data });

    await axios.get(`http://localhost:8080/getCodeLottoForIdArticle?idArticle=`+idArticolo)
    .then(res => { lottoCode = res.data });

    alert("lotto code->"+lottoCode);
    return lottoCode;
  }*/

  onChange2 = date => {
    const DATE_OPTIONS = {day: 'numeric', month: 'numeric', year: 'numeric'};
    let dateImp = date.toLocaleDateString( window.userLang , DATE_OPTIONS )
    this.props.changeDate(dateImp);
  } 

  onChange = (event, { newValue }) => {

    axios.get(`http://localhost:8080/getTenArticlesForCode?codice=`+newValue).then(res => {
      const articles =  res.data;
      this.props.setSuggArticles(articles);
    });

    this.setState({
      value: newValue,
      articolo: newValue,
      //lotto: this.resechLottoCode(newValue)
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({ suggestions : getSuggestions(value,this.props.suggArticles)});
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  //========================================
  sentToDB() {
    const  {date,rows,selectValue} = this.props;
    var json=JSON.stringify(rows);

    if(rows.length > 0){
      axios.post('http://localhost:8080/insertDocument?codice='+selectValue+'&data='+date,json,{headers: {'Content-Type': 'application/json',}})
        .then(response => {
          console.log(response);
        });
    }else{
      alert("non ci sono dati da inviare");
    }
  }

  checkRow(row,type){
    const {selectValue} = this.props;
    if(row[0]!== '' && row[1]!== '' && row[2]!== ''){
      var rowI ={idArticolo:row[0] , idLotto:row[1] , quantita:row[2]};
      var json=JSON.stringify(rowI);

      axios.post('http://localhost:8080/checkRow?codice='+selectValue,json,{headers: {'Content-Type': 'application/json'}})
        .then(response => { 

          const message = response.data;

          if(message === "ok"){
            if(type === "insert"){
              this.props.addRow(row[0] , row[1] , row[2]);
              this.resetValueRow();
            }else if(type === "update"){
              this.props.updateRow(row[0] , row[1] , row[2],row[3]);
            }
          }else{
            alert(message);
          }
        });
    }else{
      alert("Valori Mancanti")
    }

    console.log(this.props);
  }

  addCheckRow(){
    const {articolo,lotto,quantita} = this.state;
    let row=[articolo,lotto,quantita];
    this.checkRow(row,"insert");
  }
  
  handleChange(event) {
    this.props.clearRows();
    this.props.upDocType(event.target.value);
  }

  dataChange(event){
    this.props.dataChange(event.target.value);
  }

  valueChange(event,nameVariable){

    if(nameVariable === 'articolo'){
      this.setState({ articolo: event.target.value });
    }else if(nameVariable === 'lotto'){
      this.setState({ lotto: event.target.value });
    }else if(nameVariable === 'quantita'){
      this.setState({ quantita: event.target.value });
    }
  }

  resetValueRow(){
    this.setState({articolo:'' , lotto:'' , quantita:'',value:''});
  }

  async deleteRow(index){
    let newRows;
    await this.props.delRow(index);

    newRows=this.props.rows;

    await this.props.clearRows();
    await this.props.setRows(newRows);
  }

  updateRow(row){
    this.checkRow(row,"update");
  }

  render() {
    const { head,rows,progressNumber,date,selectValue} = this.props;
    const {lotto,quantita,value} = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Codice Articolo',
      value,
      onChange: this.onChange
    };

    return (
      <Container fluid>
        <Container className="head" fluid>
          <span>{head}</span>
        </Container>
        <br />
          <Container className="form" fluid>
            <Row bsPrefix="headRow">
              <Col lg="auto">
                <p>INVOICE INFORMATION </p> 
              </Col>
              {/*<Col>
                <Button bsPrefix="headButton" variant="outline-light">-</Button>
              </Col>*/}
            </Row>
            <Row>
              <Col lg>
                <Form.Group controlId="invoiceSelect">
                    <Form.Control as="select" value={selectValue} onChange={this.handleChange}>
                      <option>Fattura</option>
                      <option>Ordine</option>
                      <option>Carico</option>
                      <option>Scarico</option>
                    </Form.Control>
                  </Form.Group>
              </Col>
              <Col lg>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="progNumber">Numero Progressivo:</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    readOnly
                    value={progressNumber}
                    aria-label="progressNumber"
                    aria-describedby="progNumber"
                  />
                </InputGroup>
              </Col>
              <Col lg>
                <InputGroup>
                  <InputGroup.Prepend /*ref={this.setWrapperRef}*/>
                    <InputGroup.Text id="image">
                      <OverlayTrigger rootClose={true} trigger="click" placement="bottom" overlay={<Tooltip id="calendar" bsPrefix="calendarSize"><Calendar onChange={this.onChange2}/></Tooltip>}>
                        <Image className="image" src={require('./calendar.png')} onClick={this.showCalendar}/>
                      </OverlayTrigger>
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    readOnly
                    value={date}
                    onChange={this.dataChange}
                    aria-label="progressNumber"
                    aria-describedby="progNumber"
                  />
                </InputGroup>
              </Col>
            </Row>
            <br />
            <Row bsPrefix="headRow">
              <Col lg="auto" >
                <p>INVOICE FORM</p>
              </Col>
            </Row>
            <Row>
              <Col lg>
                <Autosuggest
                    suggestions={this.props.suggArticles}
                    //onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                />
              </Col>
              <Col lg>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="lotto">Lotto:</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    value={lotto}
                    onChange={(e)=>this.valueChange(e,"lotto")}
                    aria-label="lottoCode"
                    aria-describedby="lotto"
                  />
                </InputGroup>
              </Col>
              <Col lg>
              <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="quantita">Quantita:</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    value={quantita}
                    onChange={(e)=>this.valueChange(e,"quantita")}
                    aria-label="quantitaNum"
                    aria-describedby="quantita"
                  />
              </InputGroup>
              </Col>
              <Col lg>
                <Button variant="secondary" block onClick={this.addCheckRow}>ADD ROW</Button>
              </Col>
            </Row>
            <br />
            <Row bsPrefix="headRow">
              <Col lg >
                <p>INVOICE ROWS</p>
              </Col>
            </Row>
            {rows.map((row, index) => (
              <>
              <Row>
                <Line index={index} articolo={row.idArticolo} lotto={row.idLotto} quantita={row.quantita} upRow={this.updateRow}/>
                <Col lg>
                  <ButtonGroup aria-label="ButtonRow">
                    <Button variant="secondary" onClick={() =>this.deleteRow(index)}>Delete Row</Button>
                    <Button variant="secondary" onClick={() =>this.updateRow(index)}>Update Row</Button>
                  </ButtonGroup>
                </Col>
              </Row>
              <br />
              </>
            ))}
          </Container>
          <br />

        <Container className="footer" fluid>
          <Button variant="secondary" size="lg" block onClick={this.sentToDB}>SEND</Button>
        </Container>

      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rows: state.rows,
    progressNumber: state.progressNumber,
    selectValue: state.selectValue,
    date: state.date,
    suggArticles:state.suggArticles,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addRow: (articolo,lotto,quantita) =>{dispatch(addRow(articolo,lotto,quantita))},
    refNP: (progressNumber) => {dispatch(refNP(progressNumber))},
    upDocType: (docType) => {dispatch(upDocType(docType))},
    clearRows: () =>{dispatch(clearRows())},
    delRow: (idRow) => {dispatch(delRow(idRow))},
    changeDate: (date) => dispatch(changeDate(date)),
    setSuggArticles : (articles) => dispatch(setSuggArticles(articles)),
    setRows : (newRows) => dispatch(setRows(newRows)),
    updateRow :(articolo,lotto,quantita,index) => dispatch(updateRow(articolo,lotto,quantita,index)),
  }
}

export default connect (mapStateToProps,mapDispatchToProps)(Main);