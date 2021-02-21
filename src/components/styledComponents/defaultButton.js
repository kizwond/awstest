import styled from "styled-components"
import {Button} from 'antd';

const defaultButton = styled(Button)`
    font-size: ${(props) => props.fontSize || "11px"};
    width: ${(props) => props.width || "100%"};
`

export default defaultButton