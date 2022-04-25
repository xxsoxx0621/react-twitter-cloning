import React from 'react';
import {Link} from 'react-router-dom';
import Styled from "styled-components";

const Div = Styled.div`
    display:flex;
    align-items:flex-end;
    justify-content: flex-end;
    color:#fff;
`;
const Ul = Styled.ul`
    color:#fff;
    list-style:none;
    display:flex;
    justify-content:space-between;
    
`;
const Li = Styled.li`
    color:#fff;
    list-style:none;
    margin-right:10px;
`;
export const Navigation = ({userObj}) => {
    console.log(userObj);
    return (
        <Div>
            <Ul>
                <Li>
                    <Link to="/" style={{color: "#FFF",textDecoration:"none"}}> Home </Link>
                </Li>
                <Li>
                    <Link to="/profile" style={{color: "#FFF",textDecoration:"none"}}>{userObj.displayName}의 Profile</Link>
                </Li>
            </Ul>
        </Div>

    )
}