import React, { Component, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import * as action from "./store/actions";
import Spinner from "./components/UI/Spinner/Spinner";

const Chekout = React.lazy(() => import("./containers/Chekout/Chekout"));
const Auth = React.lazy(() => import("./containers/Auth/Auth"));
const Logout = React.lazy(() => import("./containers/Auth/Logout/Logout"));
const Orders = React.lazy(() => import("./containers/Orders/Orders"));

class App extends Component {
	componentDidMount() {
		const { authenticationAttempAfterRefresh } = this.props;
		authenticationAttempAfterRefresh();
	}

	render() {
		const { isAuth } = this.props;
		return (
			<div>
				<Layout>
					<Suspense
						fallback={
							<div style={{ height: "calc(100vh - 56px)", display: "flex" }}>
								<Spinner />
							</div>
						}
					>
						<Switch>
							{isAuth ? <Route path="/orders" component={Orders} /> : null}
							{isAuth ? <Route path="/chekout" component={Chekout} /> : null}
							<Route path="/auth" component={Auth} />
							<Route path="/logout" component={Logout} />
							<Route path="/" exact component={BurgerBuilder} />
							<Redirect to="/" />
						</Switch>
					</Suspense>
				</Layout>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	isAuth: state.auth.token !== null,
});

const mapDispatchToProps = (dispatch) => ({
	authenticationAttempAfterRefresh: () =>
		dispatch(action.authenticationAttempAfterRefresh()),
});

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
