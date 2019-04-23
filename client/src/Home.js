import React, { Component } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
import platformContract from "./contracts/Platform.json";
import getWeb3 from "./utils/getWeb3";
import {Link} from 'react-router-dom';
import userInfo from './info';

import "./App.css";


class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            storageValue: 0,
            web3: userInfo.web3,
            accounts: userInfo.accounts,
            contract: userInfo.contract,
            studentAddress:'',
            degree:'',
            date:''

        };

    }

    componentDidMount = async () => {

            try {
                if(this.state.web3==null) {

                    // Get network provider and web3 instance.
                    const web3 = await getWeb3();

                    // Use web3 to get the user's accounts.
                    const accounts = await web3.eth.getAccounts();

                    // Get the contract instance.
                    const networkId = await web3.eth.net.getId();

                    // const deployedNetwork = SimpleStorageContract.networks[networkId];
                    const deployedNetwork = platformContract.networks[networkId];

                    // const instance = new web3.eth.Contract(
                    //   SimpleStorageContract.abi,
                    //   deployedNetwork && deployedNetwork.address,
                    // );
                    const instance = new web3.eth.Contract(
                        platformContract.abi,
                        deployedNetwork && deployedNetwork.address,
                    );


                    // Set web3, accounts, and contract to the state, and then proceed with an
                    // example of interacting with the contract's methods.
                    // this.setState({ web3, accounts, contract: instance }, this.runExample);
                    this.setState({web3, accounts, contract: instance});



                    userInfo.web3 = this.state.web3;
                    userInfo.accounts = this.state.accounts;
                    userInfo.contract = this.state.contract;

                }else{
                    console.log("HOME__________ accounts is: " + this.state.accounts + " web3 is: " + this.state.web3 + " contract is: " + this.state.contract);
                }

            } catch (error) {

                // Catch any errors for any of the above operations.
                alert(
                    `Failed to load web3, accounts, or contract. Check console for details.`
                );
                console.error(error);
            }
    };


    render() {
        if (!this.state.web3) {
            console.log("HOME RENDER_______ accounts is: " + this.state.accounts+ " web3 is: " + this.state.web3 + " contract is: " + this.state.contract);
            return <div>Loading Web3, accounts, and contract...</div>;
        }


        return (
            <div id="container">
                <div className="welcome">
                    <div className="welcome-user">Smart Contract Example</div>
                    <div className="welcome-text">Your Truffle Box is installed and ready.
                        If your contracts compiled and migrated successfully, below will show a stored value of 5 (by default).
                        Try changing the value stored on <strong>line 40</strong> of App.js.
                        The stored value is: {this.state.storageValue}
                        Interactive Dapp Example.
                        You should be able to use this form to interact with the storage smart contract.
                    </div>
                    <div className="home">
                        <ul><Link to="/addDiploma">Add Diploma</Link></ul>
                        <ul><Link to="/Check">Check</Link></ul>
                        <ul><Link to="/addPerson">Add Person</Link></ul>
                    </div>
                    {/*<div className="home">*/}
                    {/*    <ul><Link to="/Check">Check</Link></ul>*/}
                    {/*</div>*/}
                </div>
            </div>
        );
    }
}

export default Home;