import React, { Component } from 'react'
import { ExchangeAction } from '../actions/ExchangeAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Exchange extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coinQuantity: '',
      currency: '',
      cryptoCoin: '',
      cryptoCurrencyTypeSelected: 'LTC',
      currencyTypeSelected: 'IDR',
      cryptoCoinType: [
        { name: 'BITCOIN', code: 'BTC' },
        { name: 'LITECOIN', code: 'LTC' },
        { name: 'ETHEREUM', code: 'ETH' }
      ],
      currencyType: [
        { name: 'US DOLLAR', code: 'USD' },
        { name: 'INDONESIAN RUPIAH', code: 'IDR' },
        { name: 'SINGAPORE DOLLAR', code: 'SGD' },
        { name: 'JAPANESE YEN', code: 'JPY' },
        { name: 'CHINESE YUAN', code: 'CNY' },
        { name: 'HONG KONG DOLLAR', code: 'HKD' },
        { name: 'KOREAN WON', code: 'KPW' }
      ]
    }
  }

  componentDidMount() {
    console.log(this.props)
    this.props.ExchangeAction(this.state.coinQuantity, this.state.cryptoCoinType, this.state.currencyTypeSelected)
  }

  handleOnchange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  renderResults() {
    const loader = {
      "border": " 16px solid #f3f3f3",
      "borderTop": " 16px solid #adad85",
      "borderRadius": "50%",
      "width": "120px",
      "height": "120px",
      "animation": "spin 2s linear infinite"
    }

    if (this.props.exchange.isLoading) {
      return (
        <center>
          <div style={loader} />
        </center>
      )
    } else if (this.props.exchange.isError) {
      return (
        <center>
          <h1>ERROR!!!!! NOT valid structure</h1>
        </center>
      )
    }
    else {
      return (
        <h1>{this.props.exchange.exchangeSuccess}</h1>
      )
    }
  }

  render() {
    const { cryptoCoinType, currencyType, coinQuantity, cryptoCurrencyTypeSelected, currencyTypeSelected,cryptoCoin,currency } = this.state
    return (
      <div>
        <input type='number' placeholder='insert your crypto currency quantity ' name='coinQuantity' value={coinQuantity} onChange={this.handleOnchange} />
        <select name='cryptoCoin'>

          {
            cryptoCoinType.map(coin => (
              <option value={coin.code} selected={cryptoCurrencyTypeSelected === coin.code}  key={coin.code}>{coin.name}</option>)
            )
          }

        </select>
        <select name="currency">
          {
            currencyType.map(currency => (
            <option value={currency.code} selected={currencyTypeSelected === currency.code} key={currency.code}>{currency.name}</option>)
          )
          }
        </select>
        <button onClick={this.props.ExchangeAction(coinQuantity,cryptoCurrencyTypeSelected,currencyType)}>convert</button>
        <div>
          {
            this.renderResults
          }
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  console.log('ini prpops di mapstate', this.props)
  console.log('ini state', state.exchange)
  return {
    exchange: state.exchange
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    ExchangeAction
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Exchange)
