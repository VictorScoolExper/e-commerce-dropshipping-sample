import { Icon } from "@material-ui/core";
import { Facebook, Instagram, MailOutline, Phone, Room, Twitter } from "@material-ui/icons";
import styled from "styled-components";
import {mobile} from '../responsive';

const Container = styled.div`
    display: flex;
    ${mobile({flexDirection: "column"})}
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
    margin: 20px 0px;
`;

const SocialContainer = styled.div`
    display: flex;
`;

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`;

const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({display: "none"})}
`;

const Title = styled.h3`
    margin-bottom: 30px;
`;

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`;

const Right = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({backgroundColor: "#c4bfbf"})}
`;

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;

`;

const Payment = styled.img`
    width: 40%;
`;

const Footer = () => {
  return (
    <Container>
        <Left>
        <Logo>BADDIE B.</Logo>
            <Desc>We are dedicated to helping you find your style and you deciding for yourself</Desc>
            <SocialContainer>
                <SocialIcon color="3B5999">
                    <Icon>
                        <Facebook/>
                    </Icon>
                </SocialIcon>
                <SocialIcon color="E4405F">
                    <Icon>
                        <Instagram/>
                    </Icon>
                </SocialIcon>
                <SocialIcon color="55ACEE">
                    <Icon>
                        <Twitter/>
                    </Icon>
                </SocialIcon>
            </SocialContainer>
        </Left>
        <Center>
            <Title>Useful Links</Title>
            <List>
                <ListItem>Home</ListItem>
                <ListItem>Cart</ListItem>
                <ListItem>Man Fashion</ListItem>
                <ListItem>Woman Fashion</ListItem>
                <ListItem>Accesories</ListItem>
                <ListItem>My Account</ListItem>
                <ListItem>Order Tracking</ListItem>
                <ListItem>Home</ListItem>
                <ListItem>Wishlist</ListItem>
                <ListItem>Terms</ListItem>
            </List>
        </Center>
        <Right>
            <Title>Contact</Title>
            <ContactItem>
                <Icon><Room style={{marginRight: "10px"}} /></Icon>
                622 Dixie Path addres
            </ContactItem>
            <ContactItem>
                <Icon><Phone style={{marginRight: "10px"}} /></Icon>
                +1 123 456 7890
            </ContactItem>
            <ContactItem>
                <Icon><MailOutline style={{marginRight: "10px"}} /></Icon>
                contact@baddieb.com
            </ContactItem>
            <Payment src="https://www.pngitem.com/pimgs/m/47-479964_accepted-payment-types-payment-types-hd-png-download.png"/>
        </Right>
    </Container>
  )
}

export default Footer