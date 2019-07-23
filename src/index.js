import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Head from './Components/HeadComponent/head.js';
import View from './Components/ViewComponent/view.js';
import Row from './Components/RowComponent/row.js';

class MainComponent extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (this.props.component)      
    }
}

mainComponent(
    <View 
        head={<Head />}
    />
);

function mainComponent(component){
    ReactDOM.render(
        <MainComponent component={component} />,
        document.getElementById('root')
    );
}