import React from "react";

import AddStar from "./AddStar";
import RemoveStar from "./RemoveStar";

function ShowRepos(props) {
  const { current, data, refetch } = props;

  return (
    <div>
      <h2>First {current} repositories</h2>
      {data.viewer.repositories.edges.map(({ node }) => (
        <ul className="list" key={node.id}>
          <li>
            {node.name}

            {node.viewerHasStarred ? (
              <RemoveStar id={node.id} refetch={refetch} />
            ) : (
              <AddStar id={node.id} refetch={refetch} />
            )}
          </li>
          <li>stars {node.stargazers.totalCount}</li>
        </ul>
      ))}
      <button onClick={props.handleMore}>Load more</button>
    </div>
  );
}

export default ShowRepos;
