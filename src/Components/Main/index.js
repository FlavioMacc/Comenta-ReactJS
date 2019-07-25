import React from 'react';
import './view.css';
import Row from '../Row/index.js';
import axios from 'axios';


class Main extends React.Component {
  constructor(props) {
    super(props);

    this.checkRow = this.checkRow.bind(this);
    this.dataChange = this.dataChange.bind(this);
    this.resetValueRow = this.resetValueRow.bind(this);
    this.valueChange = this.valueChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);

    this.state = {
      rows: [],
      progressNumber: null,
      selectValue: 'fattura',
      data: null,

      articolo:'',
      lotto:'',
      quantita:'',

    };
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/getProgressNumber`).then(res => {
      const progressNumber = res.data;
      this.setState({ progressNumber });
    });
  }

  /*addRow() {
    const {rows} = this.state;

    rows.push({ idArticolo:null , idLotto:null , quantita:null });
    this.setState({rows});
  }*/

  /*onChange(index,nameVariable,value){
    const {rows} = this.state;

    var oldRow = rows[index];
    var row=null;

    switch(nameVariable){
      case "articolo":
          row = [{ idArticolo:value , idLotto:oldRow['idLotto'] , quantita:oldRow['quantita'] }];
        break;

      case "lotto":
          row = [{ idArticolo:oldRow['idArticolo'] , idLotto:value , quantita:oldRow['quantita'] }];
        break;

      case "quantita":
          row = [{ idArticolo:oldRow['idArticolo'] , idLotto:oldRow['idLotto'] , quantita:value }];
        break;

      default:
        break;
    }

    //alert("old "+oldRow['idArticolo']+" "+oldRow['idLotto']+" "+oldRow['quantita']);
    //alert("new "+row[0]['idArticolo']+" "+row[0]['idLotto']+" "+row[0]['quantita']);

    rows[index]=row[0];

    this.setState(rows);
  }*/

  sentToDB() {
    const { rows, selectValue,data } = this.state;
    var json=JSON.stringify(rows);

    axios.post('http://localhost:8080/insertDocument?codice='+selectValue+'&data='+data,json,{headers: {'Content-Type': 'application/json',}})
      .then(response => {
        console.log(response);
      });
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
          alert(message);
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
    this.setState({ data: event.target.value });
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
    this.setState({articolo:'' , lotto:'' , quantita:''});
  }

  deleteRow(index){
    alert("un giorno cacnellero la riga ->"+(index+1));
  }


  render() {
    const { head } = this.props;
    const { selectValue, progressNumber, rows,articolo,lotto,quantita} = this.state;

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
                  name="codice"
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
                Numero Progressivo:
                <input type="text" value={progressNumber} name="progressivo" readOnly />
              </td>
              <td>
                data: <input type="text" name="data"  onChange={this.dataChange}/>
              </td>
            </tr>
            <tr className="exampleRow">
              <td>codice Articolo:<input type="text" name="articolo" value={articolo} onChange={(e)=>this.valueChange(e,"articolo")}/></td>
              <td>codice Lotto:<input type="text" name="lotto" value={lotto} onChange={(e)=>this.valueChange(e,"lotto")}/></td>
              <td>quantita:<input type="number" name="quantita" value={quantita} onChange={(e)=>this.valueChange(e,"quantita")}/></td>
              <td><button type="button" onClick={this.checkRow}>Aggiungi Riga</button></td>
            </tr>
            {rows.map((row, index) => (
              /*<tr>
                <Row index={index} func={this.onChange}/>
              </tr>*/
            <tr>
               <Row index={index} articolo={articolo} lotto={lotto} quantita={quantita} />
               <td><button onClick={() =>this.deleteRow(index)}>Elimina Riga</button></td>
            </tr>
            ))}
          </table>
          <br />
          <input type="submit" value="INVIA" onClick={this.submit} />
        </div>
      </div>
    );
  }
}

export default Main;