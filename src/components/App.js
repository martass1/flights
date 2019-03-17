import React, { Component } from 'react';
import axios from 'axios';

import Filter from './Filter';
import FlightResults from './FlightResults';


class App extends Component {

  state = {
    flights: [],
    filterData: { from: null,
                  to: null,
                  date: null},
    error: false,
    loading: false,
  }

  // sets filter data in state from filter
  setFilterData = (key, val) => {
    this.setState(prevState => ({ 
      filterData: {
          ...prevState.filterData,
          [key]: val
        }
      }
    ))
  }

  // API request search after button clicked
  getSearchedFlights = () => {
    this.setState(prevState => ({ 
        ...prevState,
        error: false,
        loading: true,
      }
    ))
    
    const from = this.state.filterData.from;
    const to = this.state.filterData.to;
    const date = this.state.filterData.date === null ? new Date().toLocaleDateString("en-GB") : this.state.filterData.date;

    axios.get(`https://api.skypicker.com/flights?v=2&locale=en&flyFrom=${from}&to=${to}&dateFrom=${date}&dateTo=${date}`)
      .then(res => {
        const flights = res.data.data;
        this.setState({ flights });
        this.setState(prevState => ({ 
            ...prevState,
            error: flights.length > 0 ? false : true,
            loading: false,
          }
        ))
      })
      .catch(err => {
        this.setState(prevState => ({ 
            ...prevState,
            error: true,
            loading: false,
          }
        ))
      })
  }

  render() {
    return (
      <div className="App">
        <Filter search={this.getSearchedFlights} setFilterData={this.setFilterData}  />
        <FlightResults flights={this.state.flights} loading={this.state.loading} error={this.state.error}/>
      </div>
    );
  }
}

export default App;
