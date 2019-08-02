export const addRow = (articolo,lotto,quantita) =>{
    return {
        type:'ADD_ROW',
        articolo,
        lotto,
        quantita
    }
}

export const refNP = (progressNumber) => {
    return {
        type:'UPDATE_NP',
        progressNumber
    }
}

export const upDocType = (docType) => {
    return {
        type:'UPDATE_DT',
        docType
    }
}

export const clearRows = () => {
    return {
        type:'CLEAR_ROWS',
    }
}

export const delRow = (idRow) => {
    return {
        type:'DELETE_ROW',
        idRow
    }
}

export const changeDate = (date) => {
    return {
        type:'UPDATE_DATE',
        date
    }
}

export const changeCssCal = (cssCalendar) => {
    return {
        type:'UPDATE_CSS_CAL',
        cssCalendar
    }
}