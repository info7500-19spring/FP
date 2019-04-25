import React, { Component } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
// import platformContract from "./contracts/Platform.json";
// import getWeb3 from "./utils/getWeb3";

import "./App.css";
import {Link} from "react-router-dom";
// import INFO from "./info";
import Info from"./info";
// import getWeb3 from "./utils/getWeb3";
// import platformContract from "./contracts/Platform";
// import Web3 from "web3";

class AddDiploma extends Component {
    constructor(props) {
        super(props);

        this.state = {
            storageValue: 0,
            web3: Info.web3,
            accounts: Info.accounts,
            contract: Info.contract,
            studentAddress:'',
            degree:'',
            date:''
        };
        // this.state = {
        //     storageValue: 0,
        //     web3: null,
        //     accounts: null,
        //     contract: null,
        //     studentAddress:'',
        //     degree:'',
        //     date:''
        // };
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
    // componentDidMount = async () => {
    //
    //     try {
    //         // if(this.state.web3==null) {
    //
    //         // Get network provider and web3 instance.
    //         const web3 = await getWeb3();
    //
    //         // Use web3 to get the user's accounts.
    //         const accounts = await web3.eth.getAccounts();
    //
    //         // Get the contract instance.
    //         const networkId = await web3.eth.net.getId();
    //
    //         // const deployedNetwork = SimpleStorageContract.networks[networkId];
    //         const deployedNetwork = platformContract.networks[networkId];
    //
    //         // const instance = new web3.eth.Contract(
    //         //   SimpleStorageContract.abi,
    //         //   deployedNetwork && deployedNetwork.address,
    //         // );
    //         const instance = new web3.eth.Contract(
    //             platformContract.abi,
    //             deployedNetwork && deployedNetwork.address,
    //         );
    //
    //
    //         // Set web3, accounts, and contract to the state, and then proceed with an
    //         // example of interacting with the contract's methods.
    //         // this.setState({ web3, accounts, contract: instance }, this.runExample);
    //         this.setState({web3, accounts, contract: instance});
    //
    //
    //
    //         // userInfo.web3 = this.state.web3;
    //         // userInfo.accounts = this.state.accounts;
    //         // userInfo.contract = this.state.contract;
    //
    //
    //
    //     } catch (error) {
    //
    //         // Catch any errors for any of the above operations.
    //         alert(
    //             `Failed to load web3, accounts, or contract. Check console for details.`
    //         );
    //         console.error(error);
    //     }
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
    addToplatform() {
        if (this.state.contract && this.state.accounts) {
            const studentAddress = this.state.studentAddress;
            const degree = this.state.degree;
            const date = this.state.date;
            console.log(studentAddress);
            console.log(degree);
            console.log(date);
            this.state.contract.methods.addDipoloma(studentAddress,degree,date).send({from: this.state.accounts[0]})
                .then((result) => {
                    console.log(result);
                }).catch((err) => {
                console.log('error');
                console.log(err);
            });
        } else {
            this.setState(prevState => ({
                ...prevState,
                error: new Error('instance not loaded')
            }))
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
                    this.addToplatform();
                }}>
                    <div className="title">Add Diploma</div>
                    <div className="leftpart">
                        <div className="addText">Student Address:</div>
                        <div className="username-field">
                            <input
                                name="studentAddress"
                                type="text"
                                value={this.state.studentAddress}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="addText">Degree:</div>
                        <div className="username-field">
                            <input
                                name="degree"
                                type="text"
                                value = {this.state.degree}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="addText">Date: </div>
                        <div className="username-field">
                            <input
                                name="date"
                                type="text"
                                value={this.state.date}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="rightpart">
                        <input className="button" type = "submit" name="submit" value = "Submit"/>
                        <Link to="/home" className="abutton">Back</Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddDiploma;