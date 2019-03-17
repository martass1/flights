import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 1.5,
    margin: 'auto',
    marginBottom: theme.spacing.unit * 1.5,    
    maxWidth: 800,
  },
});

function Flight(props) {
  const { flight, classes } = props;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={16}>
          <Grid item>
              <Typography variant="subtitle2">{ new Date(flight.dTimeUTC * 1000).toLocaleString("en-GB") }<small> (dep)</small></Typography>
              <Typography variant="subtitle2">{ new Date(flight.aTimeUTC * 1000).toLocaleString("en-GB") }<small> (arr)</small></Typography>              
              <Typography>{ flight.fly_duration }</Typography>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={16}>             
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                <strong>{ flight.cityFrom }</strong> ({ flight.countryFrom.code }) &rarr; <strong>{ flight.cityTo }</strong> ({ flight.countryTo.code }) 
                </Typography>
                <Typography gutterBottom></Typography>
                { flight.route.map((route,index) => <Typography gutterBottom key={index}> { route.cityFrom } &rarr; { route.cityTo } </Typography> ) } 
                
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{ flight.price } &euro;</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}


export default withStyles(styles)(Flight);




