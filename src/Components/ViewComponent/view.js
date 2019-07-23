import React from 'react';
import './view.css';
import axios from 'axios';
import Row from '../RowComponent/row.js'

class View extends React.Component{
    constructor(props){
        super(props);

        this.addRow = this.addRow.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
        //this.sentToDB = this.sentToDB.bind(this);

        this.state = {
            rows:[],
            progressNumber:null,
            data : null,
            selectValue: 'fattura'
        }
    }
    componentDidMount(){

        axios.get(`http://localhost:8080/getProgressNumber`)
        .then(res => {
            const progressNumber = res.data;
            this.setState({ progressNumber });
        })
    }
    
    addRow(){
        var rows = this.state.rows;
        rows.push(<Row />);
        this.setState({rows: rows});
    }

    sentToDB(){
        axios.post("http://localhost:8080/insertDocument",null, {params:{
            codice: this.state.selectValue,
            //data: this.state.data,
            data: "11/11/2011",
            righeDoc : this.state.rows.state
          }})
          .then(function (response) {
            console.log(response);
          })
    }

    handleChange(event) {
        this.setState({selectValue: event.target.value});
      }

      submit() {
        alert('drugs ' + this.state.selectValue);
        this.sentToDB();
        //event.preventDefault();
      }

    render(){
        return(
            <div className="view">
                <div className="head">
                    <span>{this.props.head}</span>
                </div><br/>
                <div className="form">
                    
                        <table>
                            <tr>
                                <td>
                                    <select name="codice" 
                                    value={this.state.selectValue}
                                    onChange={this.handleChange}>
                                        <option>Fattura</option>
                                        <option>Ordine</option>
                                        <option>Carico</option>
                                    <option>Scarico</option>
                                    </select>
                                </td>
                                <td>
                                    Numero Progressivo:<input type="text" value={this.state.progressNumber} name="progressivo" readOnly/>
                                </td>
                                <td>
                                    data: <input type="text" name="data"/>
                                </td>
                                <td>
                                    <button onClick={this.addRow}>Aggiungi Riga</button>
                                </td>
                            </tr>
                            {this.state.rows.map((r) => (
                            <tr>
                                {r}
                            </tr>
                            ))}
                        </table><br />
                        <input type="submit" value="INVIA" onClick={this.submit}/>
                </div>
            </div>
        )
    }
}

export default View;