import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from '../actions/auth';
import { BoxLayout, BoxLayoutBox, Title, Form, Input, SubmitButton, SignupLink, ButtonContainer, FacebookButton, GoogleButton, ForgotLink, ButtonText, Footer, FooterText, Message, ErrorMessage, Line } from '../styles/Authentication';

const LoginPage = () => {
    const dispatch = useDispatch();
    const errorMessage = useSelector(state => state.auth.errorMessage);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onEmailChange = (e) => {
        const email = e.target.value;
        setEmail(email);
    }  
    const onPasswordChange = (e) => {
        const password = e.target.value;
        setPassword(password);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }))
    }

    return (
        <BoxLayout>
            <BoxLayoutBox>
                <Title> Log In </Title>
                <Form onSubmit={onSubmit}>
                    <Input 
                        placeholder="Email" 
                        type="email"
                        autoFocus
                        value={email}
                        onChange={onEmailChange}
                    />
                    <Input 
                        placeholder="Password" 
                        type="text"
                        autoFocus
                        value={password}
                        onChange={onPasswordChange}
                    />
                    {
                        errorMessage ? <ErrorMessage> {errorMessage} </ErrorMessage> : null
                    }
                    <ForgotLink to='/forgot'> Forgot password? </ForgotLink>
                    <SubmitButton type="submit" onSubmit={onSubmit}> Continue </SubmitButton>
                </Form>
                <Line/>
                <ButtonContainer>
                    <FacebookButton> 
                        <img src="/images/facebook.svg" alt="facebook-logo" width="20" height="30"/>
                        <ButtonText> Continue </ButtonText>
                    </FacebookButton>
                    <GoogleButton> 
                        <img src="/images/google.svg" alt="google-logo" width="20" height="30"/>
                        <ButtonText> Continue </ButtonText> 
                    </GoogleButton>
                </ButtonContainer>
                <Line/>
                <Footer>
                    <FooterText> Don't have an account? </FooterText>
                    <SignupLink to="/signup"> Sign Up </SignupLink>
                </Footer>
            </BoxLayoutBox>
        </BoxLayout>
    )
}

export default LoginPage;
