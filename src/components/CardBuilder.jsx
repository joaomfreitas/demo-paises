import React from 'react';
import { withRouter } from 'react-router-dom'

function CardBuilder(props) {
    const { cardData } = props;
    const imgSrc = `https://www.countryflagsapi.com/png/${cardData.cca2}`;
    if (cardData.capital === '') {
        cardData.capital = 'Not available';
    }

    const handleRedirect = () => {
        props.history.push(`country/${cardData.name.common}`)
    };

    return (
        <div className='card' onClick={() => { handleRedirect() }}>
            <div className='container'>
                <div className='left-half'>
                    <h4>{cardData.name.common}</h4>
                    <p>Capital: {cardData.capital ? cardData.capital[0] : "-------"}</p>
                </div>
                <div className='right-half'>
                    <img src={imgSrc} />
                </div>
            </div>
        </div>
    )
}

export default withRouter(CardBuilder);