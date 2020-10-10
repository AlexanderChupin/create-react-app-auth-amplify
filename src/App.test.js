import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { render } from '@testing-library/react';
import userEvent  from '@testing-library/user-event'
import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  // Tip: all queries are also exposed on an object
  // called "queries" which you could import here as well
  waitFor,
  screen,
  fireEvent
} from '@testing-library/dom'

describe('alc smoke tests',()=>{
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    //console.log(div);
    ReactDOM.unmountComponentAtNode(div);
  })
  it('use jsdom in this test file', () => {
    const element = document.createElement('div');
    expect(element).not.toBeNull();
  })
})

describe('alc Auth tests',()=> {
  it('testing jest async calls and timout', async () => {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("done!"), 6000) //The function execution “pauses” and resumes when the promise settles, with result becoming its result. So the code above shows “done!” in one second.
    });
    let result = await promise;
    expect(result).toBe('done!')
  }, 7000); //ALC. default jest timeout is 5000ms

  it('testing jest dom starting loading Auth scripts', async () => {
    const { getByText } = render(<App />);
    // debug document
    //screen.debug()
    await  waitFor (()=>expect(getByText('Loading...')).toBeInTheDocument())
  },10000);

  it('testing jest dom async \'Sign In\' button is displayed', async () => {
    const {getByText} = render(<App/>);
    // debug document
    //screen.debug()
    await waitFor(() => expect(screen.getByPlaceholderText('Enter your username')).toBeInTheDocument())
    //screen.debug()
    await userEvent.type(screen.getByPlaceholderText('Enter your username'), 'smarten.pump@gmail.com')
    // fireEvent.change(screen.getByPlaceholderText('Enter your username'), {
    //   target: { value: 'smarten.pump@gmail.com' },
    // });
    expect(screen.getByPlaceholderText('Enter your username')).toHaveValue('smarten.pump@gmail.com')
    await userEvent.type(screen.getByPlaceholderText('Enter your password'), 'alex_Amplify2020')
    // fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
    //   target: { value: 'alex_Amplify2020' },
    // });
    expect(screen.getByPlaceholderText('Enter your password')).toHaveValue('alex_Amplify2020')
    //expect(screen.getByPlaceholderText('Enter your password')).toHaveValue('alex_Amplify2020')
    // <button>Submit</button>
    fireEvent(
        getByText('Sign In'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
    )
    //ALC email patter validation
    // regex - How to validate an email address in JavaScript - Stack Overflow https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    const regexEmail = /smarten.pump@gmail.com/i;
    const hello = /^Hello /i
    let finalRe = new RegExp(hello.source+regexEmail.source);
    await waitFor(() => expect(getByText(finalRe)).toBeInTheDocument(),{"timeout":2000})
    screen.debug()

  });

/*  it('testing jest dom async typing user name', async () => {
    const {getByText} = render(<App/>);
    //screen.debug()
    //const uName = screen.getByPlaceholderText('Enter your username')
    await userEvent.type(screen.getByRole('textbox'), 'smarten.pump@gmail.com')
    //screen.debug()
    await waitFor(() => expect(screen.getByDisplayValue('smarten.pump@gmail.com')).toBeInTheDocument())
    screen.debug()
    //waitFor(() => expect(document.onload).toHaveBeenCalledTimes(1))
    //expect(getByText('Reset password')).toBeInTheDocument();
  }, 10000);*/
})

/*import gql from 'graphql-tag';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsconfig from './aws-exports';

const client = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.API_KEY, // or type: awsconfig.aws_appsync_authenticationType,
    apiKey: awsconfig.aws_appsync_apiKey,
  }
});

var ret='';
import { listTodos } from './graphql/queries';
client.query({
  query: gql(listTodos)
}).then(({ data: { listTodos } }) => {
  console.log(listTodos.items);
  ret = listTodos.items;
});

describe('AWSAppSyncClient methods', function() {
  it('listTodos', function () {
    //console.log('ALC from the test'+listTodos.items);
    let result = 2+3;
    expect(result).toBe(5);
  });
});*/
