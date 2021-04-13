import React, { useState } from 'react';
import { Container, Section } from './style';
import {CopyToClipboard} from 'react-copy-to-clipboard';

export const TextInput: React.FC = () => {
    const [value, setValue] = useState('')
    const [result, setResult] = useState('')
    const copy = `https://babulink.herokuapp.com/${result}`

    const [active, setActive] = useState(false)
    const [error, setError] = useState(false);
    const [isCopy, setIsCopy] = useState(false)

    const handleChange = (event) => {
        return setValue(event.target.value)
    }
    
    function handleCopy() {
        return setIsCopy(true)
    }

    function handleClick() {
        fetch('https://babulink.herokuapp.com/add', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "url": value})
        })
        .then((response) => response.json())
        .then((response) => {
            setResult(response.data)
            setActive(true)
        })

        .catch((err) => {
            setError(true)
        })
    }
    return (
        <Container>
            <Section>
                {
                    !active ? ( 
                        <>
<<<<<<< HEAD
                            { !error ? (
                                <div className="title">
                                    <h1>Babulink</h1>
                                    <p>Diga adeus para urls grandes, encurte gratuitamente no campo abaixo.</p>
                                </div> ) : (
                                    <>
                                        <div className="title">
                                            <h1>Babulink</h1>
                                            <p>Diga adeus para urls grandes, encurte gratuitamente no campo abaixo.</p>
                                        </div>
                                    </>
                                )
                            }   
=======
                            <div className="title">
                                <h1>Babulink</h1>
                                <p>Diga adeus para urls grandes, encurte gratuitamente no campo abaixo.</p>
                            </div>
>>>>>>> 4e2c701eb39de891e25b2dac40d07053ed090f39
                            <form onSubmit={handleClick}>
                                <input className="input" placeholder="Digite a url" onChange={handleChange} />  
                                <button className="button" type="button" onClick={handleClick}>Encurtar</button>
                            </form>
                        </>
                    ) : (
                        <>
                            <div className="result">
                            <h1>Babulink</h1>

                            <label>{`${copy}`}</label>
                            <CopyToClipboard text={copy}>
                                <button className="copyButton" type="button" onClick={handleCopy}>Copiar</button>
                            </CopyToClipboard>
                            </div>
                            {
                                !isCopy ? (
                                    <></>
                                ) : (
                                    <div className="popup">
                                        <p>Copiado com sucesso!</p>
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
