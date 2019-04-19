import React, { Component } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
import platformContract from "./contracts/Platform.json";
import getWeb3 from "./utils/getWeb3";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storageValue: 0,
      web3: null,
      accounts: null,
      contract: null,
      studentAddress:'',
      degree:'',
      date:''
    };
    this.addToSimpleStorage = this.addToSimpleStorage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = async () => {
    try {
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
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

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
          console.log(result)
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
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
        <h2>Interactive Dapp Example</h2>
        <p>
          You should be able to use this form to interact with the storage smart
          contract.
        </p>
        <form className="pure-form pure-form-stacked" onSubmit= {(e) => {
                e.preventDefault();
                // this.addToSimpleStorage();
                this.addToplatform();
              }}>
            <label> student address:
            <input
              name="studentAddress"
              type="text"
              value={this.state.studentAddress}
              onChange={this.handleChange}
            />
            </label>
            <br />
            <label> degree:
            <input
              name="degree"
              type="text"
              value = {this.state.degree}
              onChange={this.handleChange}
            />
            </label>
            <br />
            <label> date:
            <input
              name="date"
              type="text"
              value={this.state.date}
              onChange={this.handleChange}
            />
            </label>
            <input type = "submit" value = "Submit"/>
        </form>
      </div>
    );
  }
}

export default App;
