import React, { useEffect, useState } from "react";
import {Header} from '../../components/Header/Header'
import { Email } from "../../components/Inputs/Email";
import { Name } from "../../components/Inputs/Name";
import { CPF } from "../../components/Inputs/CPF";
import logo from '../../images/logo.png';
import { SignupPageStyle, TextContainer } from "./style";
import { Password } from "../../components/Inputs/Password";
import { Button } from "../../components/Button/Button";
import { useForm } from "../../hooks/useForm";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import { goToAddAddressPage } from "../../routes/coordinator";
import { useNavigate } from "react-router-dom";
import { validateCPF, validateEmail, validatePassword, validateName } from "../../constants/constants";

const SignupPage = () => {

    const navigate = useNavigate()

    const [form, onChange] = useForm({
        name: "",
        email: "",
        cpf: "",
        password: "",
    })

    const [confirmPassword, setConfirmPassword] = useState("")
    const [isValid, setIsValid] = useState(true)
    const [isEmailValid, setIsEmailValid] = useState(true)
    const [isPasswordValid, setIsPasswordValid] = useState(true)
    const [isCPFValid, setIsCPFValid] = useState(true)
    const [isNameValid, setIsNameValid] = useState(true)
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true)
    const [errorText, setErrorText] = useState(undefined)

    const SignUp = () => {
        axios.post(`${BASE_URL}/signup`, form)
        .then((response) => {
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("ProductCart", JSON.stringify([]))
            goToAddAddressPage(navigate)
        })
        .catch((error) => {
            setErrorText(error.response.data.message)
            setIsValid(false)
        })
    }

    useEffect(() => {
        if (form.password === confirmPassword) {
            setIsConfirmPasswordValid(true)
        } else {
            setIsConfirmPasswordValid(false)
        }
    }, [confirmPassword, form.password])

    const onSubmit = (e) => {
        e.preventDefault();
        setIsEmailValid(validateEmail(form.email))
        setIsPasswordValid(validatePassword(form.password))
        setIsCPFValid(validateCPF(form.cpf))
        setIsNameValid(validateName(form.name))
        isEmailValid && isPasswordValid && isCPFValid && isNameValid && isConfirmPasswordValid && SignUp()  
    }
    
    return(
        <>
        <Header showArrow={'true'} showTitle={'false'} title={'Cadastro'}/>
        <SignupPageStyle>
            <img src={logo} alt="Future Eats"/>
            <TextContainer>
                <p>Cadastrar</p>
            </TextContainer>

            {isValid ?

                <form onSubmit={onSubmit}>
                    <Name name="name" value={form.name} onChange={onChange} color="#B8B8B8" isValid={isNameValid}/>
                    <Email name="email" value={form.email} onChange={onChange} color="#B8B8B8" isValid={isEmailValid}/>
                    <CPF name="cpf" value={form.cpf} onChange={onChange} color="#B8B8B8" isValid={isCPFValid}/>
                    <Password name="password" value={form.password} onChange={onChange} label="Senha*" placeholder="Mínimo 6 caracteres" color="#B8B8B8" isValid={isPasswordValid} errorMessage="A senha deve possuir no mínimo 6 caracteres"/>
                    <Password name="password-check" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}} label="Confirmar*" placeholder="Confirme a senha anterior" color="#B8B8B8" isValid={isConfirmPasswordValid} errorMessage="Deve ser a mesma que a anterior."/>
                    <Button type="submit" color={'#5cb646'} buttonTitle="Criar"/>
                </form>
                
                : 
                
                <form onSubmit={onSubmit}>
                    <Name name="name" value={form.name} onChange={onChange} color="#e02020" isValid={isNameValid}/>
                    <Email name="email" value={form.email} onChange={onChange} color="#e02020" isValid={isEmailValid}/>
                    <CPF name="cpf" value={form.cpf} onChange={onChange} color="#e02020" isValid={isCPFValid}/>
                    <Password name="password" value={form.password} onChange={onChange} label="Senha*" placeholder="Mínimo 6 caracteres" color="#e02020" isValid={isPasswordValid} errorMessage="A senha deve possuir no mínimo 6 caracteres"/>
                    <Password name="password-check" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}} label="Confirmar*" placeholder="Confirme a senha anterior" color="#e02020" isValid={isConfirmPasswordValid} errorMessage="Deve ser a mesma que a anterior."/>
                    {isEmailValid && isPasswordValid && isCPFValid && isNameValid && isConfirmPasswordValid ? <p>{errorText}.</p> : undefined}
                    <Button type="submit" color={'#5cb646'} buttonTitle="Criar"/>
                </form>}

        </SignupPageStyle>
        </>
    )
}

export default SignupPage;