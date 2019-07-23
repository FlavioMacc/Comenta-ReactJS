import React from 'react';
import './view.css';
import Row from '../Row/index.js';
import axios from 'axios';


class Main extends React.Component {
  constructor(props) {
    super(props);

    this.addRow = this.addRow.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    // this.sentToDB = this.sentToDB.bind(this);

    this.state = {
      rows: [],
      progressNumber: null,
      selectValue: 'fattura',
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/getProgressNumber`).then(res => {
      const progressNumber = res.data;
      this.setState({ progressNumber });
    });
  }

  addRow() {
    const {rows} = this.state;
    var row = [{ articolo:null , lotto:null , quantita:null }];

    rows.push({row});
    this.setState({rows});
  }

  onChange(index,nameVariable,value){
    const {rows} = this.state;
    //var oldRows = this.state.rows;

    var oldRow = this.state.rows[index];
    var row=null;

    switch(nameVariable){
      case "articolo":
          row = [{ articolo:value , lotto:oldRow['lotto'] , quantita:oldRow['quantita'] }];
        break;

      case "lotto":
          row = [{ articolo:oldRow['articolo'] , lotto:value , quantita:oldRow['quantita'] }];
        break;

      case "quantita":
          row = [{ articolo:oldRow['articolo'] , lotto:oldRow['lotto'] , quantita:value }];
        break;

      default:
        break;
    }

    rows[index]=row;

    this.setState(rows);
    //var row = [articolo]
  }

  sentToDB() {
    const { rows, selectValue } = this.state;
    
    axios
      .post('http://localhost:8080/insertDocument', {headers: {'Content-Type': 'application/json',}}, {
        params: {
          codice: selectValue,
          data: '11/11/2011',
          righeDoc: rows.state,
        },
      })
      .then(response => {
        console.log(response);
      });
  }
  
  handleChange(event) {
    this.setState({ selectValue: event.target.value });
  }

  submit() {
    this.sentToDB();
    // event.preventDefault();
  }

  render() {
    const { head } = this.props;
    const { selectValue, progressNumber, rows,numRows} = this.state;

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
                <input
                  type="text"
                  value={progressNumber}
                  name="progressivo"
                  readOnly
                />
              </td>
              <td>
                data: <input type="text" name="data" />
              </td>
              <td>
                <button type="button" onClick={this.addRow}>
                  Aggiungi Riga
                </button>
              </td>
            </tr>
            {rows.map((row, index) => (
              <tr>
                <Row index={index} func={this.onChange}/>
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