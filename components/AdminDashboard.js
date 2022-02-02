import React, {Component, } from 'react';
import AdminNav from './modules/AdminNav';
import AdminStats from './modules/AdminStats';
import AdminOrders from './modules/AdminOrders';

export default class AdminDashboard extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = { value: true };
    // }
    componentDidMount() {
    }
  
    componentWillUnmount() {
    }
    
    render() {
        return (
            <div className="admin-dashboard">
                <AdminNav />
                <AdminStats />
                <div className="spacer" />
                <AdminOrders />
                <br/><br/><br/>
            </div>
        )      
    }
}