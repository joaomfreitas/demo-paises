import React, { useEffect, useState } from 'react'
import { getByCountryName, getImagesByCountry } from "../utils/apiCalls";
import { isEven, isOdd } from "../utils/numberUtils";
import { withRouter } from 'react-router-dom'
import Portal from "../utils/Portal";
import BuildModal from "./BuildModal";

function CountryPage(props) {
    const [arrayImages, setArrayImages] = useState([]);
    const [portalOpen, setPortalOpen] = useState(false);
    const [portalImage, setPortalImage] = useState('');
    const [countryData, setCountryData] = useState([]);

    useEffect(() => {
        fetchApi();
    }, []);

    const fetchApi = async () => {
        await getByCountryName(props.match.params.name).then(response => {
            setCountryData(response.data[0]);
        }).then(async () => {
            await getImagesByCountry(props.match.params.name).then(response => {
                setArrayImages(response);
            })
        }).catch(() => {
            pushHomepage()
        })
    };

    const openPortal = () => {
        setPortalOpen(!portalOpen);
    };

    const handleImage = (image) => {
        setPortalImage(image);
        openPortal();
    };

    const pushHomepage = () => {
        props.history.push('/');
    };

    const imgSrc = `https://www.countryflagsapi.com/png/${countryData.cca2}`;

    return (
        <div>
            <div className='back-homepage'>
                <button className='btn-sort' onClick={pushHomepage}>Back to homepage</button>

            </div>
            {countryData.length !== 0 &&
                <div className='content'>
                    <div className='container'>
                        <div className='country_information'>
                            <h2>About {countryData.name.common} </h2>
                            <div className='content-reverse'>
                                <div className='left-half'>
                                    <img alt='' src={imgSrc} />
                                </div>
                                <div className='right-half'>
                                    <h4>Capital: <span className='sub-font'> {countryData.capital ? countryData.capital[0] : "--------"} </span> </h4>
                                    <h4>Area: <span className='sub-font'>{countryData.area}</span></h4>
                                    <h4>Population: <span className='sub-font'> {countryData.population} </span> </h4>
                                    <h4>People known as: <span className='sub-font'> f: {countryData.demonyms.eng.f}, m: {countryData.demonyms.eng.m} </span> </h4>

                                    <h4>Also know as: {countryData.altSpellings.map((data, index) => {
                                        if (index === countryData.altSpellings.length - 1) {
                                            return <span key={data} className='sub-font' >{data}</span>
                                        }
                                        else {
                                            return <span key={data} className='sub-font' >{data}, </span>
                                        }
                                    })}</h4>
                                    <h4>Region: <span className='sub-font'>{countryData.region}</span></h4>
                                    <h4>Sub-region: <span className='sub-font'>{countryData.subregion}</span></h4>
                                    <h4>Timezone: <span className='sub-font'>{countryData.timezones[0]}</span></h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='container'>
                        <div className='country_images'>
                            <h2 className="no-span">Images</h2>
                            <div className='row'>
                                <div className='column'>
                                    {arrayImages.map((data, index) => {
                                        if (isEven(index) || index === 0) {
                                            return <img className='images' key={index} onClick={() => {
                                                handleImage(data)
                                            }} alt='' src={data} />
                                        } else return null;
                                    })}
                                </div>
                                <div className='column'>
                                    {arrayImages.map((data, index) => {
                                        if (isOdd(index)) {
                                            return <img className='images' key={index} onClick={() => {
                                                handleImage(data)
                                            }} alt='' src={data} />
                                        } else return null;
                                    })}
                                </div>
                            </div>
                            {portalOpen &&
                                <Portal id='modal-root'>
                                    <BuildModal openPortal={openPortal} image={portalImage} />
                                </Portal>
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )

}

export default withRouter(CountryPage);