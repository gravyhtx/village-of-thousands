import React from 'react'
import {Navbar, Icon} from 'react-materialize'
import { Link } from 'react-router-dom'

export default function AdminPage() {
    return (
        <Navbar
            alignLinks="right"
            className="admin-dashboard_navbar black"
            brand={<Link to="/admin/dashboard"><b className="admin-dashboard_navbar-header">Village of Thousands</b></Link>}
            id="mobile-nav"
            menuIcon={<Icon>menu</Icon>}
            options={{
                draggable: false,
                edge: 'left',
                inDuration: 250,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                outDuration: 200,
                preventScrolling: true
            }}
        >
        
            <Link to="/admin/orders">
                <div>
                    Orders
                </div>
            </Link>

            <Link to="/admin/drop">
                <div>
                    Create New Drop
                </div>
            </Link>

        </Navbar>
    )
}