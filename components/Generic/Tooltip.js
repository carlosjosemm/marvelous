import styled from "styled-components";

const StyledTooltipContent = styled.span`
  visibility: hidden;
  position: absolute;
  ${(props) => (props.$position == "bottom" ? "top: calc(100% + 5px);" : "")}
  ${(props) => (props.$position == "bottom" ? "margin-left: -2rem;" : "")}
    border-radius: 4px;
  font-size: 1rem;
  transition: display 0.3s, background-color 0.3s, width 0.3s,
    padding 0.3s ease-in-out;
  &:before {
    content: "";
    width: 0;
    height: 0;
    ${(props) => (props.$position == "bottom" ? "left: 1rem;" : "left: -4px;")}
    ${(props) => (props.$position == "bottom" ? "top: -4px;" : "top: 10px;")}
      position: absolute;
    border: 5px solid transparent;
    ${(props) =>
      props.$position == "bottom"
        ? "transform: rotate(135deg);"
        : "transform: rotate(45deg);"}
    transition: border 0.4s ease-in-out;
  }
`;
const StyledTooltipTrigger = styled.span``;
const StyledTooltipWrapper = styled.span`
  cursor: default;
  position: relative;
  & ${StyledTooltipTrigger}:hover + ${StyledTooltipContent} {
    visibility: visible;
    color: ${(props) => props.theme.colors.altText};
    background-color: ${(props) => props.theme.colors.tooltip};
    width: max-content;
    padding: 8px 8px;
    &:before {
      border-color: transparent transparent
        ${(props) => props.theme.colors.tooltip}
        ${(props) => props.theme.colors.tooltip};
    }
  }
  @media only screen and (max-width: ${(props) =>
      props.theme.breakpoints.tablet}) {
    & ${StyledTooltipTrigger}:hover + ${StyledTooltipContent} {
      visibility: hidden;
    }
  }
`;

const Tooltip = ({ children, tooltipContent, position }) => {
  return (
    <StyledTooltipWrapper>
      <StyledTooltipTrigger>{children}</StyledTooltipTrigger>
      <StyledTooltipContent $position={position}>
        {tooltipContent}
      </StyledTooltipContent>
    </StyledTooltipWrapper>
  );
};

export default Tooltip;
