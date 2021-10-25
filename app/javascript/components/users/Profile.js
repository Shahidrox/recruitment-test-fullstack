import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { useHistory, Link } from "react-router-dom"


class Prpfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: '',
      hours: '',
      minutes: '',
      seconds: ''
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(()=>{
      let timeleft = new Date('2021/12/5').getTime() - new Date().getTime();
      let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
      let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
      this.setState({
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
      });
    }, 1000);
  }
  render() {
    const style = {
      backgroundColor: '#000000'
    };
    return (
      <div className="content-page" style={style}>
        <header id="header" className="d-flex align-items-center">
          <div className="container d-flex flex-column align-items-center">
            <div className="countdown d-flex justify-content-center" data-count="2021/12/5">
              <div>
                <h3>{this.state.days.toString()}</h3>
                <h4>Days</h4>
              </div>
              <div>
                <h3>{this.state.hours.toString()}</h3>
                <h4>Hours</h4>
              </div>
              <div>
                <h3>{this.state.minutes.toString()}</h3>
                <h4>Minutes</h4>
              </div>
              <div>
                <h3>{this.state.seconds.toString()}</h3>
                <h4>Seconds</h4>
              </div>
            </div>
          </div>
        </header>
        <footer className="footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <script>document.write(new Date().getFullYear())</script>2021 © Code
              </div>
              <div className="col-md-3"></div>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}

export default Prpfile