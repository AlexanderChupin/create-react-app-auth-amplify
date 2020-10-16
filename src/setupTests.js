// set
//--env=jest-environment-jsdom-sixteen
// ALC not working process.env['jest-environment-jsdom-sixteen'] = '1'

// react-testing-library renders your components to document.body,
// this adds jest-dom's custom assertions
import '@testing-library/jest-dom';

const {defaults} = require('jest-config');
//jest.setTimeout(15000)
//console.log(defaults)