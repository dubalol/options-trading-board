import React from "react"
import { connect } from "react-redux";
import styled from "@emotion/styled";

const mapStateToProps = (state, ownProps) => ({
  openInterest: state.contracts[ownProps.id].open_interest,
  bid: state.contracts[ownProps.id].bid,
  ask: state.contracts[ownProps.id].ask,
})

class Put extends React.Component {
  render() {
    const { openInterest, bid, ask } = this.props;
    return (
      <Div>
        <Span>{bid}</Span>
        <Span>{ask}</Span>
        <Span>{openInterest}</Span>
      </Div>
    )
  }
}

const Div = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: end;
`;

const Span = styled.span`
  border: 1px solid black;
  text-align: right;
  width: 80%;
`;

export default connect(mapStateToProps)(Put);