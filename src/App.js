import React from 'react';
import './App.css';

function App() {
    const [rawText, setRawText] = React.useState('');
    const [displayedText, setDisplayedText] = React.useState('');

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
            <div className="PPPPPPPP">
                <textarea placeholder="Текст для очистки"
                onChange={(e) => {setRawText(e.target.value)}} 
                value={rawText} className="ToSend" type="text"/>
                <button onClick={() => callback(['LOC', 'PER'], rawText)}>Отправить</button>
            </div>
            <div className="ToDisplay">
                { displayedText || 'Вычищенный текст' }
            </div>
        </div>
    );
}

export default App;
