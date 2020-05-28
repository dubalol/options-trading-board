import React from "react"
import styled from "styled-components"

class Graph extends React.Component {
  render() {
    const { focus } = this.props;
    return (
      <Div>
        {!focus && `Select a contract`}
        {focus && `Graph for ${this.props.focus.label}`}
      </Div>
    )
  }
}

const Div = styled.div`
height: 100%; 
border: 1px solid black;
`;

export default Graph;