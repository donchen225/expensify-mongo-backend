import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Colors, FontSize, Spacing } from '../constants';

export const BoxLayout = styled.div`
    align-items: center;
    background-image: linear-gradient(180deg, #1a6edb, #618bff);
    background-size: cover;
    display: flex;
    height: 100vh;
    justify-content: center;
    width: 100vw;
`; 

export const BoxLayoutBox = styled.div`
    background: white;
    border-radius: 3px;
    padding: ${Spacing.m_size} ${Spacing.m_size};
    margin-bottom: ${Spacing.small};
    text-align: center;
    width: 20rem;
    opacity: 0.9;
`;

export const Title = styled.h2`
    font-size: ${FontSize.large};
    font-weight: 600;
    line-height: 1;
    margin: ${Spacing.s_size} 0;
`; 

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const Input = styled.input`
    background: ${Colors.light_blue};
    border: 1px solid #ccc;
    margin: 0 ${Spacing.xs_size} ${Spacing.s_size} ${Spacing.xs_size};
    padding: ${Spacing.xs_size} ${Spacing.xs_size};
`;

export const ForgotLink = styled(Link)`
    align-self: flex-start;
    color: #1a6edb;
    font-size: ${FontSize.small};
    margin: 0 ${Spacing.xs_size} ${Spacing.s_size} ${Spacing.xs_size};
`;

export const SubmitButton = styled.button`
    background-image: linear-gradient(180deg, #1a6edb, #618bff);
    border: none;
    color: white;
    cursor: pointer;
    font-size: ${FontSize.large};
    font-weight: 300;
    margin: 0 ${Spacing.xs_size} ${Spacing.s_size} ${Spacing.xs_size};
    padding: ${Spacing.xs_size} ${Spacing.xs_size};
    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 1rem 2rem rgba(0,0,0,.2); 
    }
`;

export const Line = styled.hr`
    border-top: 1px solid #ccc;
    display: block;
    height: 1px;
`;

export const ButtonContainer = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin: ${Spacing.m_size};
`;

export const GoogleButton = styled.button`
    align-items: center;
    background-image: linear-gradient(180deg, #1a6edb, #618bff);
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    font-size: ${FontSize.large};
    font-weight: 300;
    padding: ${Spacing.xs_size};
    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 1rem 2rem rgba(0,0,0,.2); 
    }
`;

export const FacebookButton = styled.button`
    align-items: center;
    background-image: linear-gradient(180deg, #1a6edb, #618bff);
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    font-size: ${FontSize.large};
    font-weight: 300;
    justify-content: space-evenly;
    padding: ${Spacing.xs_size};
    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 1rem 2rem rgba(0,0,0,.2); 
    }
`;

export const ButtonText = styled.span`
    margin-left: ${Spacing.xs_size};
`;

export const SignupLink = styled(Link)`
    color: #1a6edb;
    font-size: ${FontSize.small};
    font-weight: 300;
    margin-bottom: ${Spacing.xs_size};
`;

export const LoginLink = styled(Link)`
    color: #1a6edb;
    font-size: ${FontSize.small};
    font-weight: 300;
    margin-bottom: ${Spacing.xs_size};
`;

export const Footer = styled.div`
    align-items: center;
    font-size: ${FontSize.small};
    display: flex;
    justify-content: center;
`;

export const FooterText = styled.span`
    color: ${Colors.grey};
    font-weight: 700;
    margin: 0 ${Spacing.s_size} ${Spacing.xs_size} 0;
`;

export const ErrorMessage = styled.span`
    color: ${Colors.red};
    font-size: ${FontSize.small};
    margin-bottom: ${Spacing.xs_size};
`;

export const Message = styled.span`
    color: ${Colors.blue};
    font-size: ${FontSize.small};
    margin-bottom: ${Spacing.xs_size};
`;
