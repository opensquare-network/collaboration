import styled from "styled-components";
import { Dropdown } from "semantic-ui-react";

const StyledDropdown = styled(Dropdown)`
  width: 100%;
  height: 64px !important;
  border-radius: 0 !important;

  :active,
  :hover,
  :focus {
    border-color: #cccccc !important;
  }

  &.active,
  & .menu {
    border-color: #cccccc !important;
  }

  .ui.selection.dropdown {
    min-height: 48px !important;
  }

  &.ui.dropdown .menu > .item {
    padding: 0 !important;
  }

  .icon {
    top: 50% !important;
    transform: translate(0, -9px) !important;
    opacity: 0.24 !important;
  }

  .menu {
    border-radius: 0 !important;
  }
`;

export default StyledDropdown;
