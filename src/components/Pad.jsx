/* eslint-disable no-useless-constructor */
import React from "react";
import "../styles/Pad.scss"

export default class Pad extends React.Component {
    constructor(props){
      super(props);
    }
    render(){
      return(
        <div className={this.props.attr} id={this.props.attr} onClick={this.props.handleClick}>{this.props.text} </div>
      );
    }
  }