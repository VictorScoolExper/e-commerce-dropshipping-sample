import { useState } from "react";
import styled from "styled-components"
import {mobile} from "../responsive";
import {login} from "../redux/apiCall";
import {useDispatch, useSelector} from 'react-redux';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255, 255, 255, 0.5), 
        rgba(255, 255, 255, 0.5)
        ), 
        url("https://images.unsplash.com/photo-1571678432797-0fd4f9061c4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80") 
        center;
    /* background-repeat: no-repeat; */
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 30%;
    padding: 20px;
    background-color: white;
    ${mobile({width: "75%"})}
`;

const Title = styled.h1`
    font-size: 34px;
    font-weight: 600;
`;

const FORM = styled.form`
    display: flex;
    flex-direction: column;

`;

const Inputs = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 15px 0px;
    padding: 10px;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    margin: 5px 0px;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;

    &:disabled{
        color: green;
        cursor: not-allowed;
    }
`;

const Link = styled.a`
    margin: 10px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`;

const Error = styled.span`
    color: red;
`;

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const {isFetching, error} = useSelector((state)=> state.user)

    const handleClick = (e) =>{
        e.preventDefault();
        login(dispatch, {username, password});
    }

  return (
    <Container>
        <Wrapper>
            <Title>SIGN IN</Title>
            <FORM>
                <Inputs placeholder="username" onChange={(e)=> setUsername(e.target.value)} />
                <Inputs type={"password"} placeholder="password" onChange={(e)=> setPassword(e.target.value)} />
                <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
                {error && <Error>Something went wrong...</Error>}
                <Link>FORGOT THE PASSWORD?</Link>
                <Link>CREATE A NEW ACCOUNT</Link>
            </FORM>
        </Wrapper>
    </Container>
  )
}

export default Login