// react-testing-library renders your components to document.body,
// this adds jest-dom's custom assertions
import '@testing-library/jest-dom/extend-expect';
const {defaults} = require('jest-config');
//jest.setTimeout(15000)
//console.log(defaults)