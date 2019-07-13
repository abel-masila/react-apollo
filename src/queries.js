import { gql } from "apollo-boost";

const reposQuery = gql`
  query Myrepositories($first: Int!) {
    viewer {
      repositories(first: $first) {
        edges {
          node {
            id
            name
            stargazers {
              totalCount
            }
            viewerHasStarred
          }
        }
      }
    }
  }
`;
const userQuery = gql`
  {
    viewer {
      name
      email
    }
  }
`;

const addStarquery = gql`
  mutation AddStar($repoid: ID!) {
    addStar(input: { starrableId: $repoid }) {
      starrable {
        stargazers {
          totalCount
        }
        viewerHasStarred
      }
    }
  }
`;
const removeStarquery = gql`
  mutation RemoveStar($repoid: ID!) {
    removeStar(input: { starrableId: $repoid }) {
      starrable {
        stargazers {
          totalCount
        }
        viewerHasStarred
      }
    }
  }
`;

export { reposQuery, userQuery, addStarquery, removeStarquery };
