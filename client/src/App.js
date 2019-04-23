import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from "./Home";
import AddDiploma from "./addDiploma";
import Check from "./Check";
import AddPerson from "./addPerson";
export default class App extends React.Component {

    render() {
        return <React.Fragment>
            <Router>
                <Route path="/home" component={Home} />
                <Route path="/addDiploma" component={AddDiploma}/>
                <Route path="/check" component={Check}/>
                <Route path="/addPerson" component={AddPerson}/>
            </Router>
        </React.Fragment>
    }
}