// import React, { Component } from 'react'
// import socketIOClient from "socket.io-client"
// import { getAndSaveAction } from '../actions/getAndSaveAction'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

// const BarChart = require('react-chartjs').Bar

// class HistoryDay extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       response: false,
//       endpoint: "http://127.0.0.1:5000",
//       todayPrice: {},
//       yesterdayprice: {},
//       twodaysprice: {},
//       threedaysprice: {},
//       fourdaysprice: {}
//     }
//   }
//   componentDidMount() {
//     this.props.getAndSaveAction()
//     const { endpoint } = this.state;
//     const socket = socketIOClient(endpoint);
//     socket.on("BTCFromAPI", data => {
//       console.log('data dari res server', data[data.length - 1].createdAt)
//       // this.setState({ btcHistory: data.BTC })
//       // this.setState({ ethHistory: data.ETH })
//       // this.setState({ ltcHistory: data.LTC })
//     })
//   }
//   render() {
//     return (
//       <div>
//         <h1></h1>
//       </div>
//     )
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     crypto: state.getAndSave
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({
//     getAndSaveAction,
//   }, dispatch)
// }
// export default connect(mapStateToProps, mapDispatchToProps)(HistoryDay)