import React, { useState, useEffect } from 'react'
import CardBuilder from "./CardBuilder";
import { getAll, getByCountryName } from "../utils/apiCalls";

const arraySort = require('array-sort');

function MainPage() {
    const [cardsData, setCardsData] = useState([]);
    const [countryName, setCountryName] = useState('');
    const [sortBy, setSortBy] = useState('name.common');
    const [buttonsSort, setButtonsSort] = useState([]);
    const [updating, setUpdating] = useState(0);

    const Buttons = [
        { placeholder: 'Name', value: 'name.common' },
        //this one stopped working as intended when I had to change the api used
        // { placeholder: 'Relevance', value: 'gini' },
        { placeholder: 'Population', value: 'population' },
        { placeholder: 'Area', value: 'area' }
    ];

    useEffect(() => {
        fetchApiData(countryName);
        buttonsCreate()
    }, []);

    useEffect(() => {
        let reverse = true;
        if (sortBy === 'name.common') reverse = false;
        if (sortBy !== '') {
            const sort = arraySort(cardsData, sortBy, { reverse: reverse });
            setCardsData(sort);
            setUpdating(updating + 1);
            buttonsCreate()
        }
    }, [sortBy]);

    useEffect(() => {
        const delayBounce = setTimeout(() => {
            if (countryName.length >= 1) {
                fetchApiData(countryName);
            }
            else if (countryName.length === 0) {
                fetchApiData('');
            }
        }, 800)

        return () => clearTimeout(delayBounce);
    }, [countryName])


    const fetchApiData = async (country) => {
        let reverse = true;
        if (sortBy === 'name.common') reverse = false;
        if (country === '') {
            const result = await getAll();
            setCardsData(arraySort(result.data, sortBy, { reverse: reverse }));
        }
        else {
            const result = await getByCountryName(country);
            setCardsData(arraySort(result.data, sortBy, { reverse: reverse }));
        }
    };

    const handleSearch = (e) => {
        setCountryName(e.target.value);
    };

    const buttonsCreate = () => {
        const btns = [];
        Buttons.map((data) => {
            let css = 'btn-sort';
            let disable = false;

            if (data.value === sortBy) { css = 'btn-picked'; disable = true }

            return btns.push(<button key={data.value} disabled={disable} className={css} onClick={() => {
                setSortBy(data.value)
            }}>{data.placeholder}</button>
            )
        });
        setButtonsSort(btns);
    };

    return (
        <div>
            <div className='box'>
                <div>
                    <input type='search' className='search-bar' placeholder='Search by country name' value={countryName} onChange={handleSearch} />
                </div>
                <div className='sort-by'>
                    {buttonsSort}
                </div>
            </div>
            <div>
                {cardsData.map((data, index) => {
                    return <CardBuilder key={index} cardData={data} />
                })}
            </div>
        </div>
    )
}

export default MainPage