import React, { Component } from "react";
import socketIOClient from "socket.io-client"
import { getAndSaveAction } from '../actions/getAndSaveAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Line } from 'react-chartjs-2'
import Notification from './Notification'
import Notif from './Notification2'


class Today extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:5000",
      pricesLimitBTC: null,
      pricesLimitLTC: null,
      pricesLimitETH: null
    };
  }


  componentWillMount() {
    console.log(this.props)
    this.props.getAndSaveAction()
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    console.log('ini state di didmount', this.state)
    socket.on("BTCFromAPI", data => {
      this.setState({ response: data[data.length - 1], AllHistory: data },()=>{
        const { response, pricesLimitBTC, pricesLimitETH, pricesLimitLTC } = this.state

      console.log(Number(response.BTC) , Number(pricesLimitBTC),Number(response.BTC) >= Number(pricesLimitBTC))

        if(pricesLimitBTC){
          if((Number(response.BTC) >= Number(pricesLimitBTC))){
            console.log(Number(response.BTC) , Number(pricesLimitBTC),Number(response.BTC) >= Number(pricesLimitBTC))
            console.log('lebih atau sama dengan')
            
          }else {
            console.log('kurang dari limit')
          }
        }else{
          console.log('masih kosong')
        }
      })
    })

  }

  handleOnchange = (e) => {
    console.log('handle on change')
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  LineChart = (coin) => {
    const { AllHistory } = this.state;
    let Label = (coin === 'BTC') ? 'Bitcoin' : (coin === 'ETH') ? 'Etherium' : 'Litecoin'
    return {
      labels: AllHistory.map(e => e.createdAt),
      datasets: [
        {
          label: Label,
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: AllHistory.map(e => e[coin])
        }
      ]
    }
  }


  render() {
    // console.log(this.state.message)
    const { response, AllHistory, pricesLimitBTC, pricesLimitETH, pricesLimitLTC } = this.state

    const loader = {
      "border": " 16px solid #f3f3f3",
      "borderTop": " 16px solid #adad85",
      "borderRadius": "50%",
      "width": "120px",
      "height": "120px",
      "animation": "spin 2s linear infinite"
    }

    return (
      <div>
        <div style={{ textAlign: "center" }}>
          {response
            ? <div>
              <p>
                1 bitcoin : {response.BTC} ||
                1 litecoin : {response.LTC} ||
                1 ETH : {response.ETH}
              </p>
            </div>
            : <center>
              <p>ssssttt theres an a loading bellow</p>
            </center>
          }
        </div>

        <div>
          {
            AllHistory
              ? <div>
                {['BTC', 'LTC', 'ETH'].map(crypto => (
                  <div key={crypto}>
                    <h1>
                      {(crypto === 'BTC') ? 'Bitcoin' : (crypto === 'ETH') ? 'Etherium' : 'Litecoin'}
                    </h1>
                    <Line
                      data={this.LineChart(crypto)}
                    />
                    <br />
                  </div>
                ))}
              </div>
              : <center>
                <p style={loader}></p>
              </center>
          }
        </div>
        <div>
          <h1>set limit for prices</h1>
          <div>
            <input placeholder="BTC" type="number" name="pricesLimitBTC" value={pricesLimitBTC} onChange={this.handleOnchange} />
            {/* {console.log('btc', pricesLimitBTC)} */}

            <input placeholder="LTC" type="number" name="pricesLimitLTC" value={pricesLimitLTC} onChange={this.handleOnchange} />

            <input placeholder="ETH" type="number" name="pricesLimitETH" value={pricesLimitETH} onChange={this.handleOnchange} />
            <Notif/> <Notification/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    crypto: state.getAndSave
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getAndSaveAction,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Today)