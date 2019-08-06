import React from 'react';
import './view.css';
import Row from '../Row/index.js';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import Calendar from 'react-calendar';
import { connect } from 'react-redux';

import {addRow} from '../../js/action/action.js';
import {refNP} from '../../js/action/action.js';
import {upDocType} from '../../js/action/action.js';
import {clearRows} from '../../js/action/action.js';
import {delRow} from '../../js/action/action.js';
import {changeDate} from '../../js/action/action.js';
import {changeCssCal} from '../../js/action/action.js';
import {setSuggArticles} from '../../js/action/action.js';

import {getSuggestions} from '../../js/constant/index.js';
import {getSuggestionValue} from '../../js/constant/index.js';
import {renderSuggestion} from '../../js/constant/index.js';

//======================================================
class Main extends React.Component {
  constructor(props) {
    super(props);

    this.checkRow = this.checkRow.bind(this);
    this.dataChange = this.dataChange.bind(this);
    //this.resechLottoCode = this.resechLottoCode.bind(this);
    this.showHideCalendar = this.showHideCalendar.bind(this);
    this.resetValueRow = this.resetValueRow.bind(this);
    this.valueChange = this.valueChange.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      articolo:'',
      lotto:'',
      quantita:'',

      value: '',
      suggestions: [],

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
  /*resechLottoCode(articoloCode){
    var lottoCode=null;
    var idArticolo=null;

    axios.get(`http://localhost:8080/getIdArticleForCode`,{ params: { codice: articoloCode } })
    .then(res => { idArticolo = res.data });

    axios.get(`http://localhost:8080/getCodeLottoForIdArticle?idArticle=`+idArticolo)
    .then(res => { lottoCode = res.data });

    alert("lotto code->"+lottoCode);
    return lottoCode;
  }*/

  onChange2 = date => {
    const DATE_OPTIONS = {day: 'numeric', month: 'numeric', year: 'numeric'};
    let dateImp = date.toLocaleDateString( window.userLang , DATE_OPTIONS )
    this.props.changeDate(dateImp);

    //this.setState({ data:date.toLocaleDateString( window.userLang , DATE_OPTIONS ) })
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

    setTimeout(() => {
      this.setState({
        suggestions: getSuggestions(value,this.props.suggArticles)
      });
    }, 100);

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

  checkRow(){
    const {selectValue} = this.props;
    const {articolo,lotto,quantita} = this.state;
    
    if(articolo!= '' && lotto!= '' && quantita!= ''){
      var row ={idArticolo:articolo , idLotto:lotto , quantita:quantita};
      var json=JSON.stringify(row);

      axios.post('http://localhost:8080/checkRow?codice='+selectValue,json,{headers: {'Content-Type': 'application/json'}})
        .then(response => { 

          const message = response.data;

          if(message == "ok"){
            this.props.addRow(articolo , lotto , quantita);
            this.resetValueRow();
          }else{
            alert(message);
          }
          //console.log(response);
        });
    }else{
      alert("Valori Mancanti")
    }

    console.log(this.props);
  }
  
  handleChange(event) {
    this.props.clearRows();
    this.props.upDocType(event.target.value);
  }

  dataChange(event){
    this.props.dataChange(event.target.value);
  }

  valueChange(event,nameVariable){

    if(nameVariable == 'articolo'){
      this.setState({ articolo: event.target.value });
    }else if(nameVariable == 'lotto'){
      this.setState({ lotto: event.target.value });
    }else if(nameVariable == 'quantita'){
      this.setState({ quantita: event.target.value });
    }
  }

  resetValueRow(){
    this.setState({articolo:'' , lotto:'' , quantita:'',value:''});
  }

  deleteRow(index){
    this.props.delRow(index);
    console.log(this.props);
  }

  showHideCalendar(){
    const {cssCalendar} = this.props;

    if(cssCalendar == 'hideCalendar'){
      this.props.changeCssCal('showCalendar');
    }else if(cssCalendar == 'showCalendar'){
      this.props.changeCssCal('hideCalendar');
    }

  }


  render() {
    const { head,rows,progressNumber,date,selectValue,cssCalendar } = this.props;
    const {articolo,lotto,quantita,value, suggestions} = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Codice Articolo',
      value,
      onChange: this.onChange
    };

    //

    return (
      <div className="view">
        <div className="head">
          <span>{head}</span>
        </div>
        <br />
        <div className="form">
          <table>
            <tr>
              <td>
                <select
                  value={selectValue}
                  onChange={this.handleChange}
                >
                  <option>Fattura</option>
                  <option>Ordine</option>
                  <option>Carico</option>
                  <option>Scarico</option>
                </select>
              </td>
              <td>
                <input type="text" value={"Numero Progressivo: "+progressNumber} className="input" placeholder="codice Lotto" readOnly />
              </td>
              <td>
                <div className="calendar">
                  <p className={cssCalendar}><Calendar onChange={this.onChange2}/></p>
                  <input type="text" className="input" placeholder="Data yyyy/mm/gg" value={date} onChange={this.dataChange}/>
                  <img src={require('./calendar.png')} onClick={this.showHideCalendar}/>
                </div>
              </td>
              <td>
                
              </td>
            </tr>
            <tr className="exampleRow">
              <td><Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps} 
                  />
              </td>
              <td><input type="text" placeholder="codice Lotto" className="input" value={lotto} onChange={(e)=>this.valueChange(e,"lotto")}/></td>
              <td><input type="number" placeholder="quantita" className="input" value={quantita} onChange={(e)=>this.valueChange(e,"quantita")}/></td>
              <td><button type="button" className="Button" onClick={this.checkRow}>Aggiungi Riga</button></td>
            </tr>
            {rows.map((row, index) => (
            <tr className="rows">
               <Row index={index} articolo={row.idArticolo} lotto={row.idLotto} quantita={row.quantita} />
               <td><button className="Button" onClick={() =>this.deleteRow(index)}>Elimina Riga</button></td>
            </tr>
            ))}
          </table>
          <br />
        </div>
        <div className="footer">
          <input type="submit" value="INVIA" className="Button" onClick={this.sentToDB} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rows: state.rows,
    progressNumber: state.progressNumber,
    selectValue: state.selectValue,
    date: state.date,
    cssCalendar: state.cssCalendar,
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
    changeCssCal : (cssCalendar) => dispatch(changeCssCal(cssCalendar)),
    setSuggArticles : (articles) => dispatch(setSuggArticles(articles)),
  }
}

export default connect (mapStateToProps,mapDispatchToProps)(Main);