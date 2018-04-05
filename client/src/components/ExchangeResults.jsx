import React, { Component } from 'react'

export default class Results extends Component {
  render() {
    const loader = {
      "border": " 16px solid #f3f3f3",
      "borderTop": " 16px solid #adad85",
      "borderRadius": "50%",
      "width": "120px",
      "height": "120px",
      "animation": "spin 2s linear infinite"
    }

    if (this.props.isLoading) {
      return (
        <center>
          <div style={loader}>loading</div>
        </center>
      )
    } else if (this.props.isError) {
      return (
        <center>
          <h1>ERROR!!!!! NOT valid structure</h1>
        </center>
      )
    }
    else {
      return (
        <h1>{this.props.exchangeSuccess}</h1>
      )
    }
  }
}
