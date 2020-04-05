import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

export default class Index extends Component {
    render() {
        return (
            <div className="container">
                <Header/>
                <Footer/>
            </div>
        );
    }
}

ReactDOM.render(
    <Router>
        <Index/>
    </Router>,
    document.getElementById('app')
);
