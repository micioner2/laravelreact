
import React from 'react';
import ReactDom from 'react-dom';

const { default: Application } = require("./Application");

if(document.getElementById('root')){
    ReactDom.render(<Application />, document.getElementById('root'));
}

