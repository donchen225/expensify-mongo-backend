import React, { useState } from 'react';
import axios from '../services/index';
import { BoxLayout, BoxLayoutBox, Title, Form, Input, SubmitButton, Footer, FooterText, SignupLink, Line, Message } from '../styles/Authentication';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const sendPasswordResetEmail = async (email) => {
        console.log("sendPasswordResetEmail is called");
        const res = await axios.post('/recover', { email });
        setMessage(res.data.message);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        sendPasswordResetEmail(email);
    }
    return (
        <BoxLayout>
            <BoxLayoutBox>
                <Title> Forgot Password </Title>
                <Form onSubmit={onSubmit}>
                    <Input 
                        placeholder="Email"
                        type="input"
                        onChange={onEmailChange}
                        value={email}
                    />
                    {message && <Message> {message} </Message>}
                    <SubmitButton> Continue </SubmitButton>
                </Form>
                <Line/>
                <Footer>
                    <FooterText> Don't have an account? </FooterText>
                    <SignupLink to="/signup"> Sign Up </SignupLink>
                </Footer>
            </BoxLayoutBox>
        </BoxLayout>
    )
}

export default ForgotPasswordPage;
