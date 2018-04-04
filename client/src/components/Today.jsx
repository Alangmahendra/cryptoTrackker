import React, { Component } from "react";
import socketIOClient from "socket.io-client"
import { getAndSaveAction } from '../actions/getAndSaveAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


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
    console.log(this.state)
    socket.on("BTCFromAPI", data => {
      this.setState({ response: data[data.length-1] })
    })

  }
  render() {
    console.log(this.state.message)
    const { response } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        {response
          ? <p>
            1 bitcoin : {response.BTC} ||
              1 litecoin : {response.LTC} ||
              1 ETH : {response.ETH}
            {console.log('ini state', response)}
            {/* {console.log('bentuk data',this.state.message[this.state.message.length -1])} */}
          </p>
          : <p>Loading...
            {console.log('ini state', response)}
          </p>}
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