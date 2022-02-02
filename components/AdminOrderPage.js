import React, {Component} from 'react';

export default class AdminOrderPage extends Component {
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
        <div className=" container-fluid row">
            <div className="spacer" />
            {/* <!-- Container 01 --> */}
                <div className="admin-dashboard_stats-container col s12">
                    <div className="vot-container darken-3">

                    <div className="spacer" />

                    <form>

                        <label className="col s3">
                            Vendor:
                            <input type="text" name="name" />
                        </label>
                        <label className="col s3">
                            Vendor:
                            <input type="text" name="name" />
                        </label>
                        <label className="col s3">
                            Vendor:
                            <input type="text" name="name" />
                        </label>
                        <div className="spacer" />
                        <input type="submit" value="Add New Product" />
                        <div className="spacer" />
                    </form>

                    <div className="spacer" />

                    </div>
                </div>
            {/* <!-- Container 01 --> */}
        </div>
    )
}}