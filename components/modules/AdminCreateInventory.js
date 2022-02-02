import React from 'react';


export default function AdminCreateInventory(props) {

    let dropNumber = props.collections;

    if (dropNumber < 10) {
        dropNumber = `00${dropNumber}`;
    } else if (dropNumber < 100) {
        dropNumber = `0${dropNumber}`;
    }

    return (
        <div className="container row">
            <div className="spacer" />
            {/* <!-- Container 01 --> */}
                <div className="admin-dashboard_stats-container col s12">
                    <div className="vot-container darken-3">
                        <div className="inner-card left-align">
                            <section>
                                <h1 className="about-header">{"//"}DROP #{dropNumber}{"//"}</h1>
                                <div className="spacer" />
                                <div className="row no-margin">

                                    <div className="col s4 center black admin_drop-header">
                                        <div className="drop-form_header">TITLE</div>
                                    </div>

                                    <div className="col s2 center black admin_drop-header">
                                        <div className="drop-form_header">COLOR</div>
                                    </div>

                                    <div className="col s1 center black admin_drop-header">
                                        <div className="drop-form_header">SIZE</div>
                                    </div>

                                    <div className="col s1 center drop-form_header droid_icon black admin_drop-header">
                                        <i className="material-icons drop-form_header-icon">person</i>
                                    </div>

                                    <div className="col s1 center black drop-form_header droid_icon admin_drop-header">
                                        {/* <div className="drop-form_header">PHYS</div> */}
                                        <i className="material-icons drop-form_header-icon">android</i>
                                    </div>

                                    <div className="col s2 center black admin_drop-header">
                                        <div className="drop-form_header">QTY</div>
                                    </div>

                                    <div className="col s1 center black admin_drop-header">
                                        <div className="drop-form_header">X</div>
                                    </div>
                                </div>
                                <div className="row container-fluid">
                                    <div className="col s4 center black" id="title-col">
                                        <input readOnly className="editable-text" type="text" name="name" placeholder="VoT Logo Tee" />
                                        <input readOnly className="editable-text" type="text" name="name" placeholder="VoT Logo Tee" />
                                    </div>
                                
                                    <div className="col s2 center black color-col">
                                        <input readOnly className="editable-text" type="text" name="name" placeholder="Black" />
                                        <input readOnly className="editable-text" type="text" name="name" placeholder="Black" />
                                    </div>

                                    <div className="col s1 center black size-col">
                                        <input readOnly className="editable-text" type="text" name="name" placeholder="S" />
                                        <input readOnly className="editable-text" type="text" name="name" placeholder="M" />
                                    </div>

                                    <div className="col s1 center black">
                                        {/* <input readOnly className="editable-text" type="text" name="name" placeholder="U" /> */}
                                        <div className="editable-text">
                                            <i className="material-icons gender-product-line">all_inclusive</i>
                                        </div>
                                        {/* <input readOnly className="editable-text" type="text" name="name" placeholder="U" /> */}
                                        <div className="editable-text">
                                            <i className="material-icons gender-product-line">all_inclusive</i>
                                        </div>
                                    </div>

                                    <div className="col s1 center black">
                                        <div className="editable-text">
                                            <i className="material-icons checked_physical-product-line" id="checked_physical-product-line">check</i>
                                        </div>
                                        <div className="editable-text">
                                            <i className="material-icons checked_physical-product-line" id="checked_physical-product-line">check</i>
                                        </div>
                                    </div>

                                    <div className="col s2 center black ">
                                        <input className="editable-text" type="text" name="name" placeholder="0" />
                                        <input className="editable-text" type="text" name="name" placeholder="0" />
                                    </div>

                                    <div className="col s1 center black">
                                        <div className="editable-text">
                                        <i className="material-icons delete-product-line" id="delete-product-line">delete</i>
                                        </div>
                                        <div className="editable-text">
                                        <i className="material-icons delete-product-line" id="delete-product-line">delete</i>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            {/* <!-- Container 01 --> */}
        </div>
    )
}