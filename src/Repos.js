import React, { Component } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const reposQuery = gql`
  query Myrepositories($first: Int!) {
    viewer {
      repositories(first: $first) {
        edges {
          node {
            name
          }
        }
      }
    }
  }
`;
class Repos extends Component {
  render() {
    return (
      <Query query={reposQuery} variables={{ first: 20 }}>
        {({ data, loading, error }) => {
          if (loading) return <p>loading...</p>;
          if (error) return <p>{error.message}</p>;
          return (
            <ul>
              <h2>First 20 repositories</h2>
              {data.viewer.repositories.edges.map(({ node }) => (
                <li key={node.name}>{node.name}</li>
              ))}
            </ul>
          );
        }}
      </Query>
    );
  }
}

export default Repos;
