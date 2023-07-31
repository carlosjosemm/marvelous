import { styled } from "styled-components";

const StyledMessage = styled.div`
  color: ${(props) => props.theme.colors.font};
  background-color: transparent;
  width: 100%;
  text-align: center;
  margin-top: 1rem;
  > * {
    margin: 0 auto;
  }
`;

const Message = ({ children }) => {
  return <StyledMessage>{children}</StyledMessage>;
};

export default Message;
