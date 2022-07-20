import styled from "styled-components";

export default styled.article`
  background-color: red;
  position: relative;

  label {
    display: flex;

    span,
    input {
      width: 3em;
    }
    input {
      color: inherit;
      border: 1px solid black;

      &[disabled] {
        border-top: 1px solid transparent;
        border-left: 1px solid transparent;
        border-right: 1px solid transparent;
        background: transparent;
      }
    }
  }

  .actions {
    position: absolute;
    top: 0;
    right: 0;
    width: 5em;

    button {
      width: 50%;

      &.big {
        width: 100%;
      }
    }
  }
`;
