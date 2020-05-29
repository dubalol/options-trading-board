import React from "react"
import styled from "styled-components"

class OrderBook extends React.Component {
  render() {
    const { focus } = this.props;
    return (
      <Div>
        {!focus && `Default Content`}
        {focus && `Order book for ${this.props.focus.label}`}
      </Div>
    )
  }
}

const Div = styled.div`
  background-color: ${props => props.theme.bgCard1};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default OrderBook;