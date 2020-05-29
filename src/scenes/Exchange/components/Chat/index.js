import React from "react";
import styled from "styled-components";

class Chat extends React.Component {
  render() {
    return(
      <Div>
        Chat
      </Div>
    )
  }
}

const Div = styled.div`
  border: 3px solid ${props => props.theme.borderCard};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Chat;