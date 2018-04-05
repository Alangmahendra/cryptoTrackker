import React, { Component } from 'react'
import { ExchangeAction } from '../actions/ExchangeAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Reuslts from './ExchangeResults'

class Exchange extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coinQuantity: '',
      cryptoCurrencyTypeSelected: 'BTC',
      currencyTypeSelected: 'USD',
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
    
  }

  handleOnchange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  toogleConvert = () => {
   this.props.ExchangeAction(this.state.coinQuantity, this.state.cryptoCurrencyTypeSelected, this.state.currencyTypeSelected)
  }

  render() {
    const { cryptoCoinType, currencyType, coinQuantity, cryptoCurrencyTypeSelected, currencyTypeSelected } = this.state
    
    return (
      <div>
        <input type='number' placeholder='insert your crypto currency quantity ' name="coinQuantity" value={coinQuantity} onChange={this.handleOnchange} />
        
        <select name="cryptoCurrencyTypeSelected" onChange={this.handleOnchange} value={cryptoCurrencyTypeSelected}>

          {
            cryptoCoinType.map(coin => (
              <option value={coin.code} key={coin.code}>{coin.name}</option>)
            )
          }

        </select>
        <select name="currencyTypeSelected" onChange={this.handleOnchange} value={currencyTypeSelected}>
          {
            currencyType.map(currency => (
            <option value={currency.code} key={currency.code}>{currency.name}</option>)
          )
          }
        </select>
        <button onClick={this.toogleConvert}>convert</button>
          <div>
            <Reuslts isLoading={this.props.exchange.isLoading} isError={this.props.exchange.isError} exchangeSuccess={this.props.exchange.exchangeSuccess}/>
          </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
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
