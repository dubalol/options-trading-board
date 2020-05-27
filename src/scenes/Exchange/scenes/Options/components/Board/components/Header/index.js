import React from "react"
import styled from "@emotion/styled";

class Header extends React.Component {
  render() {
    return (
      <Div>
        {this.props.date}
      </Div>
    )
  }
}

const Div = styled.div`
  border: 1px solid black;
  text-align: center;
`;

export default Header;