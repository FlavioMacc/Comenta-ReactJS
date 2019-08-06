//const DATE_OPTIONS = {day: 'numeric', month: 'numeric', year: 'numeric'};

const initialState = {
  rows:[],
  progressNumber: 0,
  selectValue: 'fattura',
  date: (new Date()).toLocaleDateString( window.userLang , {day: 'numeric', month: 'numeric', year: 'numeric'}),
  cssCalendar:'hideCalendar',

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

  if(action.type === 'UPDATE_CSS_CAL'){
    let newCssCalendar = action.cssCalendar; 
    return{
      ...state,
      cssCalendar:newCssCalendar
    }
  }

  if(action.type === 'SET_SUGG_ART'){
    let newSuggArticles = action.articles; 
    return{
      ...state,
      suggArticles:newSuggArticles
    }
  }

  return state;
}


export default rootReducer;