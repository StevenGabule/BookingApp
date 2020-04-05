import React, {Component} from 'react';
import {Link, Route, Switch} from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import RestaurantsIndex from "../pages/Products";
import RestaurantAdd from "../pages/Products/components/add";

export default class Header extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link className="navbar-brand" to="/">BookApp</Link>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/restaurants'>Restaurants</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className="row">
                    <div className="col-md-12">
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route exact path='/about' component={About}/>
                            <Route exact path='/restaurants' component={RestaurantsIndex}/>
                            <Route exact path='/restaurant/new' component={RestaurantAdd}/>
                            {/*<Route exact path='/category' component={Categories}/>
                            <Route exact path='/category/add' component={Categories}/>
                            <Route exact path='/category/edit/:id' component={Categories}/>
                            <Route exact path='/*' component={Error404}/>*/}
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}
