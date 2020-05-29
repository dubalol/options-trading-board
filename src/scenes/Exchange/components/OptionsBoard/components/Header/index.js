import React from "react"
import styled from "styled-components";
import moment from "moment"

class Header extends React.Component {
  render() {
    return (
      <Div>
        <b>{moment(this.props.date).format("YYYY MMMM D").toUpperCase()}</b>
      </Div>
    )
  }
}

const Div = styled.div`
  padding: 0.5em 0em 0.5em 0em;
  font-size: 0.9em;
  background-color: ${props => props.theme.bgExpirationHeader};
  text-align: center;
`;

export default Header;