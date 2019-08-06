import React from 'react';

// Teach Autosuggest how to calculate suggestions for any given input value.
export const getSuggestions = (value,suggArticles) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0 ? [] : suggArticles.filter(lang =>
      lang.codice.toLowerCase().slice(0, inputLength) === inputValue
    );
  };
  
  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
export const getSuggestionValue = suggestion => suggestion.codice;
  
  // Use your imagination to render suggestions.
export const renderSuggestion = suggestion => (
    <div>
      {suggestion.codice}
    </div>
  );