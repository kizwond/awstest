import styled from "styled-components";

const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  width: 100%;
  background: #fff;
  margin: 0 15px;
  font-size: 4em;
  &:hover {
    background: gray;
    cursor: pointer;
  }
`;

export default Item;
