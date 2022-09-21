import styled from "styled-components";
import {mobile} from "../responsive";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255, 255, 255, 0.5), 
        rgba(255, 255, 255, 0.5)
        ), 
        url("https://images.unsplash.com/photo-1662118166938-faa48a933767?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80") 
        center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 40%;
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
    flex-wrap: wrap;

`;

const Inputs = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`;

const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0px;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
`;


const Register = () => {
  return (
    <Container>
        <Wrapper>
            <Title>CREATE AN ACCOUNT</Title>
            <FORM>
                <Inputs placeholder="name" />
                <Inputs placeholder="last name" />
                <Inputs placeholder="email" />
                <Inputs placeholder="username" />
                <Inputs placeholder="password" />
                <Inputs placeholder="confirm password" />
                <Agreement>By creating an account, I consent to the processing of my personal
                    data in according with the <b>PRIVACY POLICY</b>.
                </Agreement>
                <Button>CREATE ACCOUNT</Button>
            </FORM>
        </Wrapper>
    </Container>
  )
}

export default Register