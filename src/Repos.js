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
  handleMore = (data, fetchMore, current) => {
    fetchMore({
      variables: { first: current + 10 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }
        return Object.assign(prev, fetchMoreResult);
      }
    });
  };
  render() {
    return (
      <Query query={reposQuery} variables={{ first: 10 }}>
        {({ data, loading, fetchMore, error }) => {
          if (loading) return <p>loading...</p>;
          if (error) return <p>{error.message}</p>;
          let current = data.viewer.repositories.edges.length;
          return (
            <div>
              <ul>
                <h2>First {current}repositories</h2>
                {data.viewer.repositories.edges.map(({ node }) => (
                  <li key={node.name}>{node.name}</li>
                ))}
              </ul>
              <button onClick={() => this.handleMore(data, fetchMore, current)}>
                Load more
              </button>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Repos;
