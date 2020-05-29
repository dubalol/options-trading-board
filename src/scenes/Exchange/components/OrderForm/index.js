import React from "react"
import styled from "styled-components"

class OrderForm extends React.Component {
  render() {
    const { focus } = this.props;
    return (
      <Div>
        {!focus && `Default Order Form`}
        {focus && `Form for ${this.props.focus.label}`}
      </Div>
    )
  }
}

const Div = styled.div`
  background-color: ${props => props.theme.bgCard1};
  border-bottom: 1px solid ${props => props.theme.borderCard};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default OrderForm;