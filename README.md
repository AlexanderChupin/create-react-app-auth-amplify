#ALC comments and links
- [Getting Started with Fullstack Continuous Deployments \- AWS Amplify](https://docs.aws.amazon.com/amplify/latest/userguide/deploy-backend.html)
- [API \(GraphQL\) \- Overview \- Amplify Docs](https://docs.amplify.aws/cli/graphql-transformer/overview)
- [API \(GraphQL\) \- Fetch data \- Amplify Docs](https://docs.amplify.aws/lib/graphqlapi/query-data/q/platform/js#using-aws-appsync-sdk)
- [Getting Started · Jest](https://jestjs.io/docs/en/getting-started)
- [Running Tests](https://create-react-app.dev/docs/running-tests/)
- [How to use React Testing Library Tutorial \- RWieruch](https://www.robinwieruch.de/react-testing-library)
- [How to Start Testing Your React Apps Using the React Testing Library and Jest](https://www.freecodecamp.org/news/8-simple-steps-to-start-testing-react-apps-using-react-testing-library-and-jest/)
- [Get rid of "Unresolved function/method/variable" warning in Jest test files – IDEs Support \(IntelliJ Platform\) \| JetBrains](https://intellij-support.jetbrains.com/hc/en-us/community/posts/115000357324-Get-rid-of-Unresolved-function-method-variable-warning-in-Jest-test-files)
- [Developing and testing GraphQL APIs, Storage and Functions with Amplify Framework Local Mocking features \| AWS Mobile Blog](https://aws.amazon.com/blogs/mobile/amplify-framework-local-mocking/)
- [reactjs \- react typescript testing TypeError: MutationObserver is not a constructor \- Stack Overflow](https://stackoverflow.com/questions/61036156/react-typescript-testing-typeerror-mutationobserver-is-not-a-constructor)
- [testing\-library/user\-event: 🐕 Simulate user events for react\-testing\-library](https://github.com/testing-library/user-event)


# Create-react-app with AWS Amplify Auth 

This auth starter implements withAuthenticator HOC to provide a basic authentication flow for signing up signing in users as well as protected client side routing using AWS Amplify. Auth features: User sign up, User sign in, Multi-factor Authentication, User sign-out.

[View Demo](https://master.d2ka7y7551sk8n.amplifyapp.com/)

![Amplify Auth](src/images/auth.gif)

## Deploy with the AWS Amplify Console

The AWS Amplify Console provides hosting for fullstack serverless web apps. [Learn more](https://console.amplify.aws). Deploy this app to your AWS account with a single click:

[![amplifybutton](https://oneclick.amplifyapp.com/button.svg)](https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/aws-samples/create-react-app-auth-amplify)

The Amplify Console will fork this repo in your GitHub account, and then build and deploy your backend and frontend in a single workflow. Your app will be available at `https://master.appid.amplifyapp.com`.

## Run locally with the Amplify CLI

1. Clone the repo that was just forked in your account

  ```
  git clone git@github.com:<username>/create-react-app-auth-amplify.git

  cd create-react-app-auth-amplify && npm install
  ```

2. Import the backend environment deployed by the Amplify Console to your repo (the `amplify/team-provider.json` file contains information on all backend environments in your AWS account). The GIF below shows how you to copy the `amplify env import` command from the Amplify Console. 

<img src="https://github.com/aws-samples/create-react-app-auth-amplify/blob/master/src/images/import-backend.gif" width="800"/>

3. Paste this command into your terminal at the root of your repo. You should see the `amplify/team-provider.json` updated with a backend named `amplify`.

  ```
  amplify pull
  ```

![img](src/images/amplify-pull.mov)

4. Run locally

  ```
  npm start
  ```

Checkout Nader Dabit's [Complete Guide to User Authentication](https://dev.to/dabit3/the-complete-guide-to-user-authentication-with-the-amplify-framework-2inh).
