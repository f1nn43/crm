import React, { useEffect, useState } from 'react';

const SettCompany = () => {
    const API_KEY = "cc18f61ff8866b4e1521c97b6adf659a821b7024"; // Замените на ваш API ключ
    const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party";
    const [INN, setINN] = useState('');
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Token " + API_KEY
                },
                body: JSON.stringify({query: INN})
            };

            try {
                const response = await fetch(url, options);
                const data = await response.json(); // Парсим JSON
                setCompanies(data.suggestions); // Устанавливаем компании из ответа
                console.log(data.suggestions)} catch (error) {
                console.error("Error:", error);
            }
        };

        if (INN) {
            fetchData();
        }
    }, [INN]);

    return (
        <div>
            <input type="text" value={INN} onChange={e => setINN(e.target.value)}/>
            <ul>
                {companies.map((company, index) => (
                    <li key={index}>{company.value}</li>
                ))}
            </ul>
        </div>
    );
};

export default SettCompany;
