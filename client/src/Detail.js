import React, { Component } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
// import platformContract from "./contracts/Platform.json";
// import getWeb3 from "./utils/getWeb3";

import "./App.css";
import {Link} from "react-router-dom";
// import INFO from "./info";
import userInfo from"./info";
// import Web3 from "web3";

class Detail extends Component {
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
            date:''
        };
        this.addToSimpleStorage = this.addToSimpleStorage.bind(this);
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



    render() {
        // console.log("web3 is: " + this.state.web3 + " accounts is: " + this.state.accounts + "contract is: " + this.state.contract);
        if (!this.state.web3) {
            console.log("ADD RENDER_________ accounts is: " + this.state.accounts+ " web3 is: " + this.state.web3 + " contract is: " + this.state.contract);
            return <div>Loading Web3, accounts, and contract...</div>;

        }
        var data = JSON.parse(this.props.params.data);
        var {_degree, _date} = data;
        this.setState({
            degree:_degree,
            date:_date,
        })


        return (
            <div className="App">
                <form className="pure-form pure-form-stacked" onSubmit= {(e) => {
                    e.preventDefault();
                    // this.addToSimpleStorage();
                    this.viewFromplateform();
                }}>
                    <label> student degree:
                        <input
                            name="degree"
                            type="text"
                            value={this.state.degree}
                        />
                    </label>
                    <br />
                    <label> date:
                        <input
                            name="date"
                            type="text"
                            value = {this.state.date}
                        />
                    </label>
                    <br />
                </form>
                <div><Link to="/home">Back</Link></div>
            </div>
        );
    }
}

export default Detail;