import React, { Component } from "react";
import socketIOClient from "socket.io-client"
import { getAndSaveAction } from '../actions/getAndSaveAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Line } from 'react-chartjs-2'
import Push from 'push.js'

Push.Permission.GRANTED

class Today extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://localhost:4000",
      pricesLimitBTC: '',
      pricesLimitLTC: '',
      pricesLimitETH: '',
      dataOffline:''
    };
  }

  componentWillMount() {
    console.log(this.props)
    this.props.getAndSaveAction()
    const { endpoint,response,dataOffline } = this.state;
    const socket = socketIOClient(endpoint);
    console.log('ini state di didmount', this.state)
    socket.on("BTCFromAPI", data => {
        this.setState({ response: data[data.length - 1], AllHistory: data,dataOffline:data[data.length - 1]}
        , () => {
        const { response, pricesLimitBTC, pricesLimitETH, pricesLimitLTC } = this.state

        if (pricesLimitBTC) {
          if ((Number(response.BTC) >= Number(pricesLimitBTC))) {
            Push.create('has reach limit', {
              body: "from BITCOIN limit",
              timeout: 4000,
              onClick: function () {
                window.focus();
                this.close();
              }
            })
          } else {
            console.log('field BTC kosong')
          }
        } else {
          console.log('patokan masih kosong')
        }

        if (pricesLimitLTC) {
          if ((Number(response.LTC) >= Number(pricesLimitLTC))) {
            Push.create('has reach limit', {
              body: "from LITECOIN limit",
              timeout: 4000,
              onClick: function () {
                window.focus();
                this.close();
              }
            })
          } else {
            console.log('patokan LTC kosong')
          }
        } else {
          console.log('patokan kosong')
        }

        if (pricesLimitETH) {
          if ((Number(response.ETH) >= Number(pricesLimitETH))) {
            Push.create('has reach limit', {
              body: "from ETHERIUM limit",
              timeout: 4000,
              onClick: function () {
                window.focus();
                this.close();
              }
            })
          } else {
            console.log('patokan ETH kosong')
          }
        } else {
          console.log('patokan kosong')
        }
      })
      
    })
    if(!navigator.onLine){
      this.setState({response:localStorage.getItem('Coinoffline')})
    }
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
    const { response, AllHistory, pricesLimitBTC, pricesLimitETH, pricesLimitLTC,dataOffline } = this.state
    localStorage.setItem('Coinoffline',dataOffline)

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
                1 BTC : ${response.BTC} ||
                1 LTC : ${response.LTC} ||
                1 ETH : ${response.ETH}
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
            {/* <Notification/> */}
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