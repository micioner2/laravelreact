
import React from 'react';

function Header(props) {
    const {title, subTitle} = props
    
    return (
        <div className="box-header">
            <h3 className="box-title">{title}</h3> &nbsp;&nbsp;&nbsp;
            <button className="btn btn-primary" onClick={() => props.abrirModal('R') }><i className="fa fa-plus"></i>&nbsp; {subTitle}</button>
        </div>
    );
}

export default Header;