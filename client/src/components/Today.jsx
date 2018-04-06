import React, { Component } from "react";
import socketIOClient from "socket.io-client"
import { getAndSaveAction } from '../actions/getAndSaveAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Line } from 'react-chartjs-2'



class Today extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:5000"
    };
  }


  componentDidMount() {
    console.log(this.props)
    this.props.getAndSaveAction()
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    console.log('ini state di didmount', this.state)
    socket.on("BTCFromAPI", data => {
      this.setState({ response: data[data.length - 1],AllHistory:data })
    })

  }


  LineChart = (coin) =>{
    const { AllHistory } = this.state;
    let Label = (coin==='BTC')?'Bitcoin':(coin==='ETH')?'Etherium':'Litecoin'
    return {
      labels: AllHistory.map(e=>e.createdAt),
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
          data: AllHistory.map(e=>e[coin])
        }
      ]
    }
  }


  render() {
    console.log(this.state.message)
    const { response, AllHistory } = this.state;
    console.log(AllHistory?AllHistory.length:0);
   
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          {response
            ? <p>
              1 bitcoin : {response.BTC} ||
              1 litecoin : {response.LTC} ||
              1 ETH : {response.ETH}
              {console.log('ini state', response)}
            </p>
            : <p>Loading...
            {console.log('ini state di loading', response)}
            </p>}
        </div>
        <div>
          {
            AllHistory
              ? <div>
                  {['BTC','LTC','ETH'].map(crypto=>(
                    <div>
                      <h1>
                        {(crypto==='BTC')?'Bitcoin':(crypto==='ETH')?'Etherium':'Litecoin'}
                      </h1>
                    <Line
                      data={this.LineChart(crypto)}
                    />
                    <br/><br/><br/>
                    </div>
                  ))}
                  
                  {/* {console.log('mapping btc',AllHistory.map(coin=>coin.BTC))} */}
              </div>
              : <p>
                LOADING....
              {console.log('ini state BtcHistory di loading', AllHistory)}
              </p>
          }
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