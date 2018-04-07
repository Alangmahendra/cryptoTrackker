import React, { Component } from 'react'
import Notify from '../Notify/notify'

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ignore: true,
      title: ''
    };
  }

  handlePermissionGranted(){
    console.log('Permission Granted');
    this.setState({
      ignore: false
    });
  }
  handlePermissionDenied(){
    console.log('Permission Denied');
    this.setState({
      ignore: true
    });
  }
  handleNotSupported(){
    console.log('Web Notification not Supported');
    this.setState({
      ignore: true
    });
  }

  handleNotificationOnClick(e, tag){
    console.log(e, 'Notification clicked tag:' + tag);
  }

  handleNotificationOnError(e, tag){
    console.log(e, 'Notification error tag:' + tag);
  }

  handleNotificationOnClose(e, tag){
    console.log(e, 'Notification closed tag:' + tag);
  }

  handleNotificationOnShow(e, tag){
    this.playSound();
    console.log(e, 'Notification shown tag:' + tag);
  }

  playSound(filename){
    document.getElementById('sound').play();
  }

  handleButtonClick() {

    if(this.state.ignore) {
      return;
    }

    const now = Date.now();

    const title = 'Reach prices limit';
    const body = 'Hello' + new Date();
    const tag = now;

    const options = {
      tag: tag,
      body: body,
      lang: 'en',
      dir: 'ltr',
      sound: './src/sound.mp3'
    }
    this.setState({
      title: title,
      options: options
    });
  }

  render() {

    return (
      <div>
        <button onClick={this.handleButtonClick.bind(this)}>Notif!</button>
        <Notify
          ignore={this.state.ignore && this.state.title !== ''}
          notSupported={this.handleNotSupported.bind(this)}
          onPermissionGranted={this.handlePermissionGranted.bind(this)}
          onPermissionDenied={this.handlePermissionDenied.bind(this)}
          onShow={this.handleNotificationOnShow.bind(this)}
          onClick={this.handleNotificationOnClick.bind(this)}
          onClose={this.handleNotificationOnClose.bind(this)}
          onError={this.handleNotificationOnError.bind(this)}
          timeout={5000}
          title={this.state.title}
          options={this.state.options}
        />
         <audio id='sound' preload='auto'>
          <source src='./src/sound.mp3' type='audio/mpeg' />
          <source src='./src/sound.ogg' type='audio/ogg' />
          <embed hidden='true' autostart='false' loop='false' src='./src/sound.mp3' />
        </audio>
      </div>
    )
  }
}
