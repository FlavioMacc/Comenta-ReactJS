const initialState = {
  rows:[],
  progressNumber: 0,
  selectValue: 'fattura',
  date: (new Date()).toLocaleDateString( window.userLang , {day: 'numeric', month: 'numeric', year: 'numeric'}),

  suggArticles:[{id: 0, codice: "loading", descrizione: "0"}],
};

function rootReducer(state = initialState, action) {

  if(action.type === 'ADD_ROW'){
    let newRows = state.rows;
    newRows.push({idArticolo: action.articolo,idLotto:action.lotto,quantita:action.quantita});
    return {
      ...state,
      rows: newRows
    }
  }

  if(action.type === 'UPDATE_ROW'){ 
    let newRows = state.rows;
    newRows[action.index]={idArticolo: action.articolo,idLotto:action.lotto,quantita:action.quantita};
    return {
      ...state,
      rows: newRows
    }
  }

  if(action.type === 'UPDATE_NP'){
    let numProg = action.progressNumber;
    return{
      ...state,
      progressNumber: numProg
    }
  }

  if(action.type === 'UPDATE_DT'){
    let selVal = action.docType 
   return {
     ...state,
     selectValue:selVal
   }
  }

  if(action.type === 'CLEAR_ROWS'){
    let newRows= [];
    return{
      ...state,
      rows: newRows
    }
  }

   if(action.type === 'DELETE_ROW'){
    let newRows = state.rows.filter((_, i) => i !== action.idRow);
    return{
      ...state,
      rows:newRows
    }
  }

  if(action.type === 'UPDATE_DATE'){
    let newDate = action.date; 
    return{
      ...state,
      date:newDate
    }
  }

  if(action.type === 'SET_SUGG_ART'){
    let newSuggArticles = action.articles; 
    return{
      ...state,
      suggArticles:newSuggArticles
    }
  }

  if(action.type === 'SET_ROWS'){
    let newRows = action.newRows; 
    return{
      ...state,
      rows:newRows
    }
  }

  return state;
}

export default rootReducer;