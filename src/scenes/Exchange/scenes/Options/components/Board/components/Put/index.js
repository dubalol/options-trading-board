import React from "react"
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import { focusContract } from "../../../../../../../../services/options/actions"

const mapStateToProps = (state, ownProps) => ({
  clock: state.contracts[ownProps.id].clock,
  openInterest: state.contracts[ownProps.id].open_interest,
  bid: state.contracts[ownProps.id].bid,
  ask: state.contracts[ownProps.id].ask,
})

class Put extends React.Component {
  constructor() {
    super()
    this.state = { 
      updating: false,
      bidUpdating: false,
      askUpdating: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { clock, bid, ask } = this.props;
    
    if (clock > prevProps.clock){
      this.setState({
        updating: true,
        bidUpdating: bid !== prevProps.bid,
        askUpdating: ask !== prevProps.ask
      })
  
      setTimeout(() => {
        this.setState({
          updating: false,
          bidUpdating: false,
          askUpdating: false
        })
      }, 200)
    }

    return;
  }

  handleClick(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(focusContract(this.props.id))
  }

  render() {
    const { updating, bidUpdating, askUpdating } = this.state;
    const { openInterest, bid, ask } = this.props;
    return (
      <Div onClick={this.handleClick} updating={updating}>
        <Span updating={bidUpdating}>{bid}</Span>
        <Span updating={askUpdating}>{ask}</Span>
        <Span>{openInterest}</Span>
      </Div>
    )
  }
}

const Div = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  transition: all .2s ease-in;
  ${(props) => props.updating ? UpdatingDiv : 'background-color: inherit;'};
  &:hover {
    background-color: pink;
  }
`;

const UpdatingDiv = css`
  background-color: pink;
`;

const Span = styled.span`
  border: 1px solid black;
  text-align: right;
  width: 80%;
  transition: all .2s ease-in;
  ${(props) => props.updating ? UpdatingSpan : 'background-color: inherit;'};
  &:hover {
    background-color: red;
  }
`;

const UpdatingSpan = css`
  background-color: red;
`

export default connect(mapStateToProps)(Put);