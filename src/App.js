import React from 'react';
import './App.css';

function App() {
    const [rawText, setRawText] = React.useState('');
    const [displayedText, setDisplayedText] = React.useState('');
    const [options, setOptions] = React.useState({
        PER: true
    });

    const callback = React.useCallback(async (entities, raw_text) => {
        const answ = await fetch('/anonymize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                entities,
                raw_text
            })
        }).then(res => res.text());

        setDisplayedText(answ);
    }, []);

    return (
        <div className="App">
            <h2>Анонимизатор текста</h2>
            <div className="PPPPPPPP">
                <textarea placeholder="Текст для очистки"
                onChange={(e) => {setRawText(e.target.value)}} 
                value={rawText} className="ToSend" type="text"/>
                <div>
                    <button onClick={() => callback(Object.keys(options).filter(option => options[option]), rawText)}>Отправить</button>
                    <br/>
                    <br/>
                    <div className="Checkboxes">
                        <input type="checkbox" id="PER" onChange={(e) => {setOptions(prev => ({...prev, PER: e.target.checked}))}} checked={options['PER']} />
                        <label for="PER">Имена</label><br />
                        <input type="checkbox" id="LOC" onChange={(e) => {setOptions(prev => ({...prev, LOC: e.target.checked}))}} checked={options['LOC']} />
                        <label for="LOC">Места</label><br />
                        <input type="checkbox" id="ORG" onChange={(e) => {setOptions(prev => ({...prev, ORG: e.target.checked}))}} checked={options['ORG']} />
                        <label for="ORG">Организации</label><br />
                        <input type="checkbox" id="DATE" onChange={(e) => {setOptions(prev => ({...prev, DATE: e.target.checked}))}} checked={options['DATE']} />
                        <label for="DATE">Даты</label>
                    </div>
                </div>
            </div>
            <div>
                <h3>Обезличенный текст</h3>
                <div className="ToDisplay">
                    { displayedText }
                </div>
            </div>
        </div>
    );
}

export default App;
