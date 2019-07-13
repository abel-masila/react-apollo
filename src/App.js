import React from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

import "./App.css";

const query = gql`
  {
    viewer {
      name
      email
      bio
    }
  }
`;
function App() {
  return (
    <div className="App">
      <Query query={query}>
        {result => {
          if (result.loading) return <p>loading...</p>;
          if (result.error) return <p>{result.error.message}</p>;
          return (
            <div>
              <h1>Name: {result.data.viewer.name}</h1>
              <p>Email: {result.data.viewer.email}</p>
              <p>Bio: {result.data.viewer.bio}</p>
            </div>
          );
        }}
      </Query>
    </div>
  );
}

export default App;
