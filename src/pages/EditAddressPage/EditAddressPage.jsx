import React, { useState } from "react";
import { Header } from '../../components/Header/Header'
import { City } from "../../components/Inputs/City";
import { Complement } from "../../components/Inputs/Complement";
import { Neighbourhood } from "../../components/Inputs/Neighbourhood";
import { Number } from "../../components/Inputs/Number";
import { State } from "../../components/Inputs/State";
import { Street } from "../../components/Inputs/Street";
import { AddressPageStyle } from "./style";
import { Button } from "../../components/Button/Button";
import { useForm } from "../../hooks/useForm";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import { useNavigate } from "react-router-dom";
import {
    validateStreet, validateNumber, validateComplement,
    validateNeighbourhood, validateCity, validateState
} from "../../constants/constants";
import { goToProfilePage } from "../../routes/coordinator";

const EditAddressPage = () => {

    const navigate = useNavigate()

    const [form, onChange] = useForm({
        street: JSON.parse(localStorage.getItem("street")),
        number: JSON.parse(localStorage.getItem("number")),
        neighbourhood: JSON.parse(localStorage.getItem("neighbourhood")),
        city: JSON.parse(localStorage.getItem("city")),
        state: JSON.parse(localStorage.getItem("state")),
        complement: JSON.parse(localStorage.getItem("complement")),
    })

    const [isValid, setIsValid] = useState(true)
    const [isStreetValid, setIsStreetValid] = useState(true)
    const [isNumberValid, setIsNumberValid] = useState(true)
    const [isComplementValid, setIsComplementValid] = useState(true)
    const [isNeighbourhoodValid, setIsNeighbourhoodValid] = useState(true)
    const [isCityValid, setIsCityValid] = useState(true)
    const [isStateValid, setIsStateValid] = useState(true)

    const [errorText, setErrorText] = useState(undefined)

    const EditAddress = () => {
        axios.put(`${BASE_URL}/address`, form, {
            headers: {
                auth: localStorage.getItem("token")
            }
        })
            .then((response) => {
                setIsValid(true)
                localStorage.setItem("token", response.data.token)
                goToProfilePage(navigate)
            })
            .catch((error) => {
                setErrorText(error.response.data.message)
                setIsValid(false)
            })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setIsStreetValid(validateStreet(form.street))
        setIsNumberValid(validateNumber(form.number))
        setIsNeighbourhoodValid(validateNeighbourhood(form.neighbourhood))
        setIsCityValid(validateCity(form.city))
        setIsStateValid(validateState(form.state))
        setIsComplementValid(validateComplement(form.complement))
        isStateValid && isNumberValid && isComplementValid && isNeighbourhoodValid && isCityValid && isStateValid && EditAddress()
    }

    return (
        <>
            <Header showArrow={'true'} showTitle={'true'} title={'Endereço'} />
            <AddressPageStyle>

                {isValid ?

                    <form onSubmit={onSubmit}>
                        <Street name="street" value={form.street} onChange={onChange} color="#B8B8B8" isValid={isStreetValid} />
                        <Number name="number" value={form.number} onChange={onChange} color="#B8B8B8" isValid={isNumberValid} />
                        <Complement name="complement" value={form.complement} onChange={onChange} color="#B8B8B8" isValid={isComplementValid} />
                        <Neighbourhood name="neighbourhood" value={form.neighbourhood} onChange={onChange} color="#B8B8B8" isValid={isNeighbourhoodValid} />
                        <City name="city" value={form.city} onChange={onChange} color="#B8B8B8" isValid={isCityValid} />
                        <State name="state" value={form.state} onChange={onChange} color="#B8B8B8" isValid={isStateValid} />
                        <Button type="submit" color="#5CB646" buttonTitle="Salvar" />
                    </form>

                    :

                    <form onSubmit={onSubmit}>
                        <Street name="street" value={form.street} onChange={onChange} color="#e02020" isValid={isStreetValid} />
                        <Number name="number" value={form.number} onChange={onChange} color="#e02020" isValid={isNumberValid} />
                        <Complement name="complement" value={form.complement} onChange={onChange} color="#e02020" isValid={isComplementValid} />
                        <Neighbourhood name="neighbourhood" value={form.neighbourhood} onChange={onChange} color="#e02020" isValid={isNeighbourhoodValid} />
                        <City name="city" value={form.city} onChange={onChange} color="#e02020" isValid={isCityValid} />
                        <State name="state" value={form.state} onChange={onChange} color="#e02020" isValid={isStateValid} />
                        <p>{errorText}.</p>
                        <Button type="submit" color="#5CB646" buttonTitle="Salvar" />
                    </form>}
            </AddressPageStyle>
        </>
    )
}

export default EditAddressPage;