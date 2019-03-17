import React from 'react';
import deburr from 'lodash/deburr';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';


function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) =>
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          ),
        )}
      </div>
    </MenuItem>
  );
}


const styles = theme => ({
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  input: {
    width: 220,
  }
});

class PlaceAutosuggest extends React.Component {
  state = {
    single: '',
    suggestions: [],
	};
	
	handleSuggestionsFetchRequested = debounce(throttle(({ value }) => {
		const inputValue = deburr(value.trim()).toLowerCase();
	
		if (inputValue.length > 0)
			axios.get(`https://api.skypicker.com/places?term=${inputValue}&v=2&locale=en`)
					.then(res => {
						const places = res.data.map(data => (
							{label: data.value, id: data.id }
						));
						this.setState({
							suggestions: places
						})
					})
	}, 500), 500);
	

	getSuggestionValue = (suggestion) => {
		this.props.setFilterData(this.props.name, suggestion.id);
		return suggestion.label;
	}

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
		});
  };

  render() {
		const { classes } = this.props;

		let placeholder = '';
		placeholder = this.props.name === 'from' ? 'Type origin place' : placeholder;
		placeholder = this.props.name === 'to' ? 'Type desired destination' : placeholder;

    const autosuggestProps = {
      renderInputComponent,
			suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue: this.getSuggestionValue,
      renderSuggestion,
    };

    return (
			<Autosuggest
				{...autosuggestProps}
				inputProps={{
					classes,
					placeholder: placeholder,
					value: this.state.single,
					onChange: this.handleChange('single'),
				}}
				theme={{
					container: classes.container,
					suggestionsContainerOpen: classes.suggestionsContainerOpen,
					suggestionsList: classes.suggestionsList,
					suggestion: classes.suggestion,
				}}
				renderSuggestionsContainer={options => (
					<Paper {...options.containerProps} square>
						{options.children}
					</Paper>
				)}
			/>

        
    );
  }
}

export default withStyles(styles)(PlaceAutosuggest);
