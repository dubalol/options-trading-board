import React from "react"
import { connect } from "react-redux";
import styled from "styled-components";

const mapStateToProps = (state, ownProps) => ({
  openInterest: state.contracts[ownProps.id].open_interest,
  bid: state.contracts[ownProps.id].bid,
  ask: state.contracts[ownProps.id].ask,
})

class Call extends React.Component {
  render() {
    const { openInterest, bid, ask } = this.props;
    return (
      <Div>
        <Span>{openInterest}</Span>
        <Span>{bid}</Span>
        <Span>{ask}</Span>
      </Div>
    )
  }
}

const Div = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  transition: all .2s ease-in;
  &:hover {
    background-color: pink;
  }
`;

const Span = styled.span`
  border: 1px solid black;
  text-align: right;
  width: 80%;
  transition: all .2s ease-in;
  &:hover {
    background-color: red;
  }
`;

export default connect(mapStateToProps)(Call);