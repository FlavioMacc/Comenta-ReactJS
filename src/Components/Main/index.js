import React from 'react';
import './view.css';
import Row from '../Row/index.js';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import Calendar from 'react-calendar';

//======================================================
  var articles = null;

  axios.get(`http://localhost:8080/getAllArticles`).then(res => {
    articles =  res.data;
  });

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : articles.filter(lang =>
    lang.codice.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.codice;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.codice}
  </div>
);
//======================================================
class Main extends React.Component {
  constructor(props) {
    super(props);

    this.checkRow = this.checkRow.bind(this);
    this.dataChange = this.dataChange.bind(this);
    this.showHideCalendar = this.showHideCalendar.bind(this);
    this.resetValueRow = this.resetValueRow.bind(this);
    this.valueChange = this.valueChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);

    /*const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    (new Date()).toLocaleDateString( window.userLang , DATE_OPTIONS )*/
    const DATE_OPTIONS = {day: 'numeric', month: 'numeric', year: 'numeric'};
    this.state = {
      rows: [],
      progressNumber: null,
      selectValue: 'fattura',
      data: (new Date()).toLocaleDateString( window.userLang , DATE_OPTIONS ),

      articolo:'',
      lotto:'',
      quantita:'',

      value: '',
      suggestions: [],
      cssCalendar: 'hideCalendar'

    };
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/getProgressNumber`).then(res => {
      const progressNumber = res.data;
      this.setState({ progressNumber });
    });
  }

//========================================

  onChange2 = date => {
    const DATE_OPTIONS = {day: 'numeric', month: 'numeric', year: 'numeric'};
    this.setState({ data:date.toLocaleDateString( window.userLang , DATE_OPTIONS ) })
  } 

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
      articolo: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  //========================================
  sentToDB() {
    const { rows, selectValue,data } = this.state;
    var json=JSON.stringify(rows);
    if(rows.length > 0){
      axios.post('http://localhost:8080/insertDocument?codice='+selectValue+'&data='+data,json,{headers: {'Content-Type': 'application/json',}})
        .then(response => {
          console.log(response);
        });
    }else{
      alert("non ci sono dati da inviare");
    }
  }

  checkRow(){
    const {rows,selectValue,articolo,lotto,quantita} = this.state;

    if(articolo!= '' && lotto!= '' && quantita!= ''){
      var row ={idArticolo:articolo , idLotto:lotto , quantita:quantita};
      var json=JSON.stringify(row);

      axios.post('http://localhost:8080/checkRow?codice='+selectValue,json,{headers: {'Content-Type': 'application/json'}})
        .then(response => { 

          const message = response.data;

          if(message == "ok"){
            rows.push({idArticolo:articolo , idLotto:lotto , quantita:quantita});
            this.setState({rows});
            this.resetValueRow();
          }else{
            alert(message);
          }

          console.log(response);
        });
    }else{alert("Valori Mancanti")}
  }
  
  handleChange(event) {
    this.state.rows = [];
    this.setState({ selectValue: event.target.value });
  }

  dataChange(event){
    this.setState({data: event.target.value});
  }

  submit() {
    this.sentToDB();
    // event.preventDefault();
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
    this.setState({
      rows: this.state.rows.filter((_, i) => i !== index)
      //rows: rows.slice(0, index).concat(rows.slice(index + 1, rows.length))
    });
  }

  showHideCalendar(){
    const {cssCalendar} = this.state
    if(cssCalendar == 'hideCalendar'){
      this.setState({cssCalendar:'showCalendar'});
    }else if(cssCalendar == 'showCalendar'){
      this.setState({cssCalendar:'hideCalendar'});
    }
  }


  render() {
    const { head } = this.props;
    const { selectValue, progressNumber, rows,articolo,lotto,quantita,value, suggestions,cssCalendar,data} = this.state;

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
                  <p className={cssCalendar}><Calendar onChange={this.onChange2} value={this.state.date}/></p>
                  <input type="text" className="input" placeholder="Data yyyy/mm/gg" value={data} onChange={this.dataChange}/>
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
               <Row index={index} articolo={articolo} lotto={lotto} quantita={quantita} />
               <td><button className="Button" onClick={() =>this.deleteRow(index)}>Elimina Riga</button></td>
            </tr>
            ))}
          </table>
          <br />
        </div>
        <div className="footer">
          <input type="submit" value="INVIA" className="Button" onClick={this.submit} />
        </div>
      </div>
    );
  }
}

export default Main;