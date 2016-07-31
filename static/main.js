
var React = require('react');
var ReactDOM = require('react-dom');

var ExampleComponent = require('./example-component').ExampleComponent;

ReactDOM.render(
  <div>
    <ExampleComponent />
  </div>,
  document.getElementById('container')
);

