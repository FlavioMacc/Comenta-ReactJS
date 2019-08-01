const initialState = {
  rows:[],
  progressNumber: 0,
  selectValue: 'fattura'
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
    let numProg = action.numProg;
    return{
      ...state,
      progressNumber: numProg
    }
  }

  if(action.type === 'UPDATE_DT'){
    let selVal = action.DocType 
   return {
     ...state,
     selectValue:selVal
   }
  }

  if(action.type === 'CLEAR_ROWS'){
   return{
     ...state,
     rows: []
   }
  }

   if(action.type === 'DELETE_ROW'){
    let newRows = state.rows.filter((_, i) => i !== action.idRows);;
    return{
      ...state,
      rows:newRows
    }
  }

  return state;
}


export default rootReducer;