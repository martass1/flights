import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import LuxonUtils from '@date-io/luxon';
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";


import PlaceSuggestion from './PlaceSuggestion.js';

const styles = theme => ({
  filter: {   
		maxWidth: 900,
		margin: 'auto',
		marginBottom: 60,
		marginTop: 90,
	},
	filterItem: {   
		margin: 12,
  },
  arrow: {   
    marginTop: 14,     
    marginRight: 4,     
  },
  datePicker: {   
    width: 150,    
  },
});

function Filter(props) {
	const { search, setFilterData, classes } = props;
	const [selectedDate, setSelectedDate] = useState(new Date());


	function handleDateChange(date){
		setSelectedDate(date);
		setFilterData('date', date.toFormat("dd/MM/yyyy"));
	}

  return (
		<Grid container direction="row" justify="center" alignItems="flex-start" className={classes.filter}>
			<Grid item className={classes.filterItem}> 
				<PlaceSuggestion label="From" name="from" setFilterData={setFilterData} />
			</Grid>
			<Grid item className={classes.arrow}> 
				&rarr;
			</Grid>
			<Grid item className={classes.filterItem}> 
				<PlaceSuggestion name="to" setFilterData={setFilterData} />
			</Grid>
			<Grid item className={classes.filterItem}> 
			<MuiPickersUtilsProvider utils={LuxonUtils}>
				<DatePicker
						keyboard
						format="dd/MM/yyyy"
						placeholder=""
						mask={ [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/] }
						disableOpenOnEnter
						value={selectedDate}
          	onChange={handleDateChange} 
            animateYearScrolling={true}
            className={classes.datePicker}
					/>
				</MuiPickersUtilsProvider>
			</Grid>
			<Grid item className={classes.filterItem}> 
				<Button variant="outlined" color="primary" onClick={search}>
					explore
				</Button>
			</Grid>
		</Grid>
  );
}

export default withStyles(styles)(Filter);




