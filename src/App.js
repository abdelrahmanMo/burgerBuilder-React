import React, { Component } from 'react';
import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import {BrowserRouter,Route,Redirect} from 'react-router-dom'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import {connect} from 'react-redux'
import * as actions from './store/actions/index'
class App extends Component {
  componentDidMount(){

    this.props.onTryAutoLogin();
  }
  render() {
    let routes =(
      <Layout>
      <Route path='/' exact component={BurgerBuilder} />
     <Route path='/auth' component={Auth} />
     <Redirect to= "/"></Redirect>
    </Layout>
    );
    if(this.props.isAuthenticated){
      routes = (
        <Layout>
        <Route path='/checkout'  component={Checkout} />
        <Route path='/orders' component={Orders} />
        <Route path='/logout' component={Logout} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to= "/"></Redirect>
      </Layout>
      );
    }
    return (
      <BrowserRouter>
      <div >
      {routes}
      </div>    
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state =>{
  return{
    isAuthenticated : state.auth.token !==null
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    onTryAutoLogin : () => dispatch(actions.authCheckState()) 
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
