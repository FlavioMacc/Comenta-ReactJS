import React from 'react';
import './row.css';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

class Row extends React.Component{
    constructor(props){
        super(props);
        this.articleChange = this.articleChange.bind(this);
        this.lottoChange = this.lottoChange.bind(this);
        this.quantityChange = this.quantityChange.bind(this);
        this.state = {
           // articles : [],
            articolo:null,
            lotto:null,
            quantita:null
        }
    }

    /*componentDidMount(){
        axios.get(`http://localhost:8080/getAllArticles`)
        .then(res => {
            const articles = res.data;
            this.setState({ articles });
        })
    }*/

    articleChange(event) {
        this.setState({articolo: event.target.value});
        alert(event.target.value);
      }

      lottoChange(event) {
        this.setState({lotto: event.target.value});
      }

      quantityChange(event) {
        this.setState({quantita: event.target.value});
      }

    render(){
        return(
            <>
                <td>codice Articolo:<input type="text" name="articolo" onChange={this.articleChange}/></td>
                <td>codice Lotto:<input type="text" name="lotto" onChange={this.lottoChange}/></td>
                <td>quantita:<input type="number" name="quantita" onChange={this.quantityChange}/></td>
            </> 
        )
    }
    
}

export default Row;