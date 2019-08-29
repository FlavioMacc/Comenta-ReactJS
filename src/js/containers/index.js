import { connect } from 'react-redux';
import Main from '../../Components/Main/index.js';
import {addRow,refNP,upDocType,clearRows,delRow,changeDate,setSuggArticles,setRows,updateRow} from '../action/action.js';

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

const cometaContainer = connect (mapStateToProps,mapDispatchToProps)(Main)

export default cometaContainer;