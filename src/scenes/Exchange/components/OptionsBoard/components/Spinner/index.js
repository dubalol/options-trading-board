import React from "react";
import { css } from "@emotion/core";
import GridLoader from "react-spinners/GridLoader";
 
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 50px auto;
  border-color: red;
`;
 
class Spinner extends React.Component {
  render() {
    return (
      <div className="sweet-loading">
        <GridLoader
          css={override}
          size={150}
          color={"#3c526b"}
          loading={true}
        />
      </div>
    );
  }
}

export default Spinner