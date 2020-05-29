// TODO: Combine Call and Put into one OptionContract component
import React from "react"
import { connect } from "react-redux";
import styled from "styled-components";
import { focusContract } from "../../../../../../services/options/actions"

const mapStateToProps = (state, ownProps) => ({
  clock: state.contracts[ownProps.id].clock,
  openInterest: state.contracts[ownProps.id].open_interest,
  bid: state.contracts[ownProps.id].bid,
  ask: state.contracts[ownProps.id].ask,
})

class Call extends React.Component {
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
        bidUpdating: bid > prevProps.bid ? 'good' : bid < prevProps.bid ? 'bad' : false,
        askUpdating: ask > prevProps.ask ? 'good' : ask < prevProps.ask ? 'bad' : false
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
    const { openInterest, bid, ask, isEven } = this.props;

    const oi = Number.parseInt(openInterest)
    let oiDisplay = oi >= 1000 ? (oi / 1000).toFixed(1).toLocaleString() + 'K' : oi;
    if (isNaN(oi)) oiDisplay = '-';

    let bidDisplay = bid === 0 ? '-' : Number(bid).toFixed(2).toLocaleString()
    let askDisplay = ask === 0 ? '-' : Number(ask).toFixed(2).toLocaleString()

    return (
      <Div isEven={isEven} onClick={this.handleClick} updating={updating}>
        <Span>{oiDisplay}</Span>
        <Span updating={bidUpdating}>{bidDisplay}</Span>
        <Span updating={askUpdating}>{askDisplay}</Span>
      </Div>
    )
  }
}

const Div = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  transition: all .2s ease-in;
  background-color: ${props => {
    return props.isEven ? props.theme.bgMain : props.theme.bgEveryOtherContract
  }};
  &:hover {
    transition: none;
    background-color: ${props => props.theme.bgFocusContract};
  }
`;

const Span = styled.span`
  padding: 0.5em 1em 0.5em 0em;
  text-align: right;
  width: 80%;
  transition: all .2s ease-in;
  color: ${props => {
    if (props.updating === 'good') return props.theme.textBetterPrice
    if (props.updating === 'bad') return props.theme.textWorsePrice
  }};
  background-color: ${props => {
    if (props.updating === 'good') return props.theme.bgBetterPrice
    if (props.updating === 'bad') return props.theme.bgWorsePrice
  }};
  &:hover {
    background-color: ${props => props.theme.bgFocusPrice};
  }
`;

export default connect(mapStateToProps)(Call);