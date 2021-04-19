import React, { useState } from 'react';
import { Container, Section } from './style';
import {CopyToClipboard} from 'react-copy-to-clipboard';

export const TextInput: React.FC = () => {
    const [value, setValue] = useState('')
    const [result, setResult] = useState('')
    const copy = `https://babulink.herokuapp.com/${result}`

    const [active, setActive] = useState(false)
    const [isCopy, setIsCopy] = useState(false)
    const [error, setError] = useState(false)

    const handleChange = (event) => {
        return setValue(event.target.value)
    }
    
    function handleCopy() {
        return (
            setIsCopy(true),
            localStorage.setItem('url', copy)
        )
    }

    function handleClick() {
        fetch('https://babulink.herokuapp.com/add', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "url": !value ? setError(true) : value })
        })
        .then((response) => response.json())
        .then((response) => {
            setResult(response.data)
            setActive(true)
        })

        .catch((err) => {})
    }
    return (
        <Container>
            <Section>
                {
                    !active ? ( 
                        <section>
                            <div className="title">
                                <h1>Babulink</h1>
                                <p>Diga adeus para urls grandes, encurte gratuitamente no campo abaixo.</p>
                            </div> 

                            <form onSubmit={handleClick}>
                                <input className="input" placeholder="Digite a url" onChange={handleChange} />  
                                <button className="button" type="button" onClick={handleClick}>Encurtar</button>
                                { error ? ( <div className="popup"><p>Preencha todos os campos!</p></div>) : !error}
                            </form>
                        </section>
                    ) : (
                        <>
                            <div className="result">
                                <h1>Babulink</h1>

                                <label>{`${copy}`}</label>
                                <CopyToClipboard text={copy}>
                                    <button className="copyButton" type="button" onClick={handleCopy}>Salvar</button>
                                </CopyToClipboard>
                            </div>
                            {
                                !isCopy ? (
                                    <></>
                                ) : (
                                    <div className="popup">
                                        <p>Url salva com sucesso e copiada para área de transferência!</p>
                                    </div>
                                )
                            }
                        </>
                    )
                }
            </Section>
        </Container>
    )
}