import React, { Component } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
// import platformContract from "./contracts/Platform.json";
// import getWeb3 from "./utils/getWeb3";

import "./App.css";
// import INFO from "./info";
import userInfo from"./info";
import { Link} from "react-router-dom";
// import {BrowserRouter as Router, Route, Link} from "react-router-dom";
// import Detail from  "./Detail";
// import Web3 from "web3";

class Check extends Component {
    constructor(props) {
        super(props);

        this.state = {
            storageValue: 0,
            web3: userInfo.web3,
            accounts: userInfo.accounts,
            contract: userInfo.contract,
            studentAddress:'',
            universityAddress:'',
            degree:'',
            date:'',
            path:'',
        };
        this.addToSimpleStorage = this.addToSimpleStorage.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    // runExample = async () => {
    //   const { accounts, contract } = this.state;

    //   // Stores a given value, 5 by default.
    //   await contract.methods.set(5).send({ from: accounts[0] });

    //   // Get the value from the contract to prove it worked.
    //   const response = await contract.methods.get().call();

    //   // Update state with the result.
    //   this.setState({ storageValue: response });
    // };

    addToSimpleStorage() {
        if (this.state.contract && this.state.accounts) {
            const value = this.storageAmountInput.value;
            console.log('value to be stored is');
            console.log(value);
            this.state.contract.methods.set(value).send({from: this.state.accounts[0]})
                .then((result) => {
                    return this.state.contract.methods.get().call()
                }).then((result) => {
                this.setState({
                    storageValue: result
                });
            }).catch((err) => {
                console.log('error');
                console.log(err);
            });
        } else {
            this.setState(prevState => ({
                ...prevState,
                error: new Error('simple storage instance not loaded')
            }))
        }
    }

    viewFromplateform(){
        if(this.state.contract && this.state.accounts){

            const studentAddress = this.state.studentAddress;
            const universityAddress = this.state.universityAddress;
            this.state.contract.methods.viewDiploma(studentAddress,universityAddress).call()
                .then((result) => {

                    console.log("this is the result: " + result);

                    // this.setState({
                    //     degree: result.degree,
                    //     date: result.date,
                    // })
                    // console.log("in the then degree:" + this.state.degree);
                    // console.log("in the then date:" + this.state.date);

                }).catch((err)=>{
                    console.log('error');
                    console.log(err);
            });

            var data = {degree: this.state.degree, date: this.state.date};
            data = JSON.stringify(data);
            this.setState({
                path:`/detail/${data}`,
            })
            console.log("path is:"+this.state.path);
        }else {
            this.setState((prevState =>({
                ...prevState,
                error: new Error('instance not loaded')
            })))
        }
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }


    render() {
        // console.log("web3 is: " + this.state.web3 + " accounts is: " + this.state.accounts + "contract is: " + this.state.contract);
        if (!this.state.web3) {
            console.log("ADD RENDER_________ accounts is: " + this.state.accounts+ " web3 is: " + this.state.web3 + " contract is: " + this.state.contract);
            return <div>Loading Web3, accounts, and contract...</div>;

        }
        return (
            <div id="container">
                <form className="pure-form pure-form-stacked" onSubmit= {(e) => {
                    e.preventDefault();
                    // this.addToSimpleStorage();
                    this.viewFromplateform();
                }}>
                    <div className="title">Check Diploma</div>
                    <div className="addText">Student Address:</div>
                    <div className="username-field">
                        <input
                            name="studentAddress"
                            type="text"
                            value={this.state.studentAddress}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="addText1">University Address:</div>
                    <div className="username-field1">
                        <input
                            name="universityAddress"
                            type="text"
                            value = {this.state.universityAddress}
                            onChange={this.handleChange}
                        />
                    </div>
                    <input type = "submit" name="submit" value = "submit"/>
                </form>
                {/*<Router>*/}
                {/*    <link to = {this.state.path}>Check</link>*/}
                {/*    <Route path='/detail/:data' component={Detail} />*/}
                {/*</Router>*/}

                <div><Link to="/home">Back</Link></div>
            </div>
        );
    }
}

export default Check;