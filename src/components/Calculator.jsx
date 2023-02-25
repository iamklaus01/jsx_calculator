import React from "react";
import Pad from "./Pad";
import "../styles/Calculator.css"

const pads = ["clear", "add", "subtract", "seven", "eight", "nine", "multiply", "four", "five", "six" , "divide", "one", "two", "three", "equals", "zero", "decimal"];

const content = ["CLEAR", "+", "-", "7", "8", "9", "*", "4", "5", "6" , "/", "1", "2", "3", "=", "0", "."];

const digits = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];

const operations = ["+", "-", "*", "/"]



export default class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        to_display: "0",
        current_number: "",
        current_operation:"",
        all_operations: [],
        all_numbers:[]
        }
        this.handleClick = this.handleClick.bind(this);
        this.enterDigit = this.enterDigit.bind(this);
        this.enterDecimal = this.enterDecimal.bind(this);
        this.handleOperation = this.handleOperation.bind(this);
        this.clear = this.clear.bind(this);
        this.calculate = this.calculate.bind(this);
    }
  
    handleClick(e){
        let pad = e.currentTarget.innerText;
        if(digits.includes(pad)){
        this.enterDigit(pad)
        }else if(operations.includes(pad)){
        if(this.state.to_display === "0"){
            if(pad ==="-"){
            this.setState((state)=> {
                return {
                to_display: pad,
                current_number: pad,
                current_operation:"",
                all_operations: [],
                all_numbers:[]
                }
            });
            }
        }else{
            this.handleOperation(pad)
        }
        }else if(pad === "."){
        this.enterDecimal()
        }else if(pad === "="){
        let result = this.calculate(this.state.current_number);
        this.setState({
            to_display: result.toString(),
            current_number: result.toString(),
            current_operation:"",
            all_operations: [],
            all_numbers:[]
        })
        }else{
        this.clear();
        }
    }
  
    enterDigit(digit){
        let value = this.state.to_display;
        if(value === "0"){
        value = digit;
        }else if(! operations.includes(value.slice(-1))){
        value += digit;
        }else{
        if(digit === '.'){
            if(this.state.current_number.includes(".")){
            digit = "";
            }else{
            value += ".";
            }
        }else{
            value += digit;
        }
        }
        this.setState((state) => {
        return{
            to_display: value,
            current_number: state.current_number + digit,
            current_operation: state.current_operation,
            all_operations: state.all_operations,
            all_numbers: state.all_numbers
        };
        });
    }
  
    handleOperation(op){
        if(operations.includes(this.state.to_display.slice(-1))){
        if(op === "-"){
            if(this.state.current_operation === "*"){
            this.setState((state) => {
                return{
                to_display: state.to_display+ op,
                current_number: state.current_number,
                current_operation: "*-",
                all_operations: [...state.all_operations.slice(1,-1), "*-"],
                all_numbers: [...state.all_numbers]
                };
            });
            }else{
            this.setState((state) => {
                return{
                to_display: state.to_display+op,
                current_number: state.current_number,
                current_operation: op,
                all_operations: [...state.all_operations],
                all_numbers: [...state.all_numbers]
                };
            });
            }
        }else{
            this.setState((state) => {
            return{
            to_display: state.to_display.substring(0, state.to_display.length-1) + op,
            current_number: state.current_number,
            current_operation: op,
            all_operations: [...state.all_operations.slice(0, state.all_operations.length-1), op],
            all_numbers: [...state.all_numbers]
            };
        });
        }
        
        }else{
        this.setState((state) => {
            return{
            to_display: state.to_display+op,
            current_number: "",
            current_operation: op,
            all_operations: [...state.all_operations, op],
            all_numbers: [...state.all_numbers, state.current_number]
            };
        });
        }
    }
  
    enterDecimal(){
        console.log(this.state.current_number, this.state.to_display)
        if( !this.state.current_number.includes(".") && this.state.to_display.slice(-1) !=="."){
        this.setState((state)=>{
            return {
            to_display: state.to_display+".",
            current_number:state.current_number+".",
            current_operation:state.current_operation,
            all_operations: [...state.all_operations],
            all_numbers: [...state.all_numbers]
            }
        });
        }
    }
  
    clear(){
        this.setState({
        to_display: "0",
        current_number: "",
        current_operation:"",
        all_operations: [],
        all_numbers:[]
        })
    }
  
    calculate(last_number){
        let numbers = [...this.state.all_numbers, last_number];
        let ops = this.state.all_operations
        console.log(ops)
        while(ops.indexOf("*-") > -1){
        let index = ops.indexOf("*-");
        let result = parseFloat(numbers[index]) * (-1* parseFloat(numbers[index+1]));
        numbers[index] = result;
        numbers.splice(index+1,1);
        ops.splice(index,1);
        }
        while(ops.indexOf("*") > -1){
        let index = ops.indexOf("*");
        let result = parseFloat(numbers[index]) * parseFloat(numbers[index+1]);
        numbers[index] = result;
        numbers.splice(index+1,1);
        ops.splice(index,1);
        }
        while(this.state.all_operations.indexOf("/") > -1){
        let index = ops.indexOf("/");
        let result = parseFloat(numbers[index]) / parseFloat(numbers[index+1]);
        numbers[index] = result;
        numbers.splice(index+1,1)
        ops.splice(index,1)
        }
        while(this.state.all_operations.indexOf("-") > -1){
        let index = ops.indexOf("-");
        let result = parseFloat(numbers[index]) - parseFloat(numbers[index+1]);
        numbers[index] = result;
        numbers.splice(index+1,1)
        ops.splice(index,1)
        }
        while(this.state.all_operations.indexOf("+") > -1){
        let index = ops.indexOf("+");
        let result = parseFloat(numbers[index]) + parseFloat(numbers[index+1]);
        numbers[index] = result;
        numbers.splice(index+1,1)
        ops.splice(index,1)
        }
        console.log(numbers)
        return numbers[0];
    }
  
  render(){
    const all_pads = pads.map((item, i) => <Pad key={item} attr={item} text={content[i]} handleClick={this.handleClick}/>);
    return(
      <div className="calculator">
        <div id="display">
          {this.state.to_display}
        </div>
        <div className="pads-wrapper">
          {all_pads}
        </div>
        <p className = "footer-title">Made with &hearts; by Klaus</p>
      </div>    
    );
  }
}
