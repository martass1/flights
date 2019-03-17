import React from 'react';
import Loader from 'react-loader-spinner';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import Flight from './Flight.js';


const styles = theme => ({
	loader: {   
    margin: 'auto',
    marginBottom: 60,
    marginTop: 60,
    },
  error: {   
      margin: 'auto',
      marginBottom: 60,
      marginTop: 60,
    }
  });

function FlightResults(props) {
  const { flights, loading, error, classes } = props;
  return (
	<div>
    { loading ? (
    <Grid container direction="row" justify="center" alignItems="flex-start" className={classes.loader}>
      <Loader 
        type="Plane"
        color="#00BFFF"
        height="50"	
        width="50"
        className={classes.loader} />
      </Grid>
    ) : '' }
    { error ? (
      <Grid container direction="row" justify="center" alignItems="flex-start" className={classes.error}>
        No flights explored...
      </Grid>  
    ) : '' }
	{ flights.map((flight,index) => <Flight flight={flight} key={index} /> ) }
	</div>
  );
}

export default withStyles(styles)(FlightResults);




