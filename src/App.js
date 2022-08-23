// import React from "react";
import { Route, Switch, Link, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import TripDashboard from "./Components/TripDashboard/TripDashboard";

function App() {
	return (
		<Router>
			{/* <Navbar /> */}
			<Switch>
				<Route exact path='/'>
					<Home />
				</Route>
				<PrivateRoute
					path='/dashboard'
					component={TripDashboard}></PrivateRoute>
			</Switch>
		</Router>
	);
}

export default App;
