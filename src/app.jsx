import React, { useState, useEffect } from 'react';
import './style.css';
const sampleWords = [
    { word: "PROGRAMMING", hint: "The process of creating software applications." },
    { word: "JAVASCRIPT", hint: "A popular programming language used for web development." },
    { word: "REACT", hint: "A JavaScript library for building user interfaces." },
    { word: "BOOTSTRAP", hint: "A front-end framework for web development." },
    { word: "HTML", hint: "The standard markup language for creating web pages." },
    { word: "CSS", hint: "A style sheet language used for describing the look and formatting of a document." },
    { word: "NODEJS", hint: "A JavaScript runtime environment." },
    { word: "EXPRESS", hint: "A web application framework for Node.js." },
    { word: "MONGODB", hint: "A document-oriented database program." },
    { word: "PYTHON", hint: "A high-level programming language." }
];

const getRandomWord = () => {
    const randomPlace = Math.floor(Math.random() * sampleWords.length);
    return sampleWords[randomPlace];
};

const WordGame = () => {
    const [wordData, setWordData] = useState(getRandomWord());
    const [msg, setMsg] = useState("");
    const [chosenLetters, setChosenLetters] = useState([]);
    const [hints, setHints] = useState(3);
    const [gameOver, setGameOver] = useState(false);
    const [wrongGuesses, setWrongGuesses] = useState(0);

    useEffect(() => {
        if (wrongGuesses >= 3) {
            setGameOver(true);
            setMsg(`Game Over! The word was: ${wordData.word}`);
        }
    }, [wrongGuesses, wordData.word]);

    useEffect(() => {
        const checkWordGuessedFunction = () => {
            return wordData.word.split('').every(letter => chosenLetters.includes(letter));
        };

        if (chosenLetters.length > 0 && checkWordGuessedFunction() && !gameOver) {
            setMsg("Congratulations! You've guessed the word! 🎉");
            setGameOver(true);
        }
    }, [chosenLetters, wordData.word, gameOver]);

    const letterSelectFunction = (letter) => {
        if (!chosenLetters.includes(letter) && !gameOver) {
            setChosenLetters([...chosenLetters, letter]);
            if (!wordData.word.includes(letter)) {
                setWrongGuesses(wrongGuesses + 1);
            }
        }
    };

    const hintFunction = () => {
        if (hints > 0 && !gameOver) {
            const hiddenLetters = wordData.word.split('').filter(letter => !chosenLetters.includes(letter));
            if (hiddenLetters.length > 0) {
                const randomLetter = hiddenLetters[Math.floor(Math.random() * hiddenLetters.length)];
                setChosenLetters([...chosenLetters, randomLetter]);
                setHints(hints - 1);
            }
        }
    };

    const removeCharacterFunction = () => {
        if (!gameOver) {
            setChosenLetters(chosenLetters.slice(0, -1));
        }
    };

    const displayLettersFunction = () => {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
        return letters.map((letter, index) => (
            <button
                key={index}
                className={`letter-button ${chosenLetters.includes(letter) ? 'chosen' : ''}`}
                onClick={() => letterSelectFunction(letter)}
                disabled={chosenLetters.includes(letter) || gameOver}
            >
                {letter}
            </button>
        ));
    };

    const restartGameFunction = () => {
        setWordData(getRandomWord());
        setMsg("");
        setChosenLetters([]);
        setHints(5);
        setGameOver(false);
        setWrongGuesses(0);
    };

    return (
        <div className="container">
            <h1>Word Guessing Game</h1>
            <div className="word-container">
                {Array.from(wordData.word).map((letter, index) => (
                    <div key={index} className={`letter-box ${chosenLetters.includes(letter) ? 'visible' : ''}`}>
                        {chosenLetters.includes(letter) ? letter : '_'}
                    </div>
                ))}
            </div>
            
            <p className="word-description">Hint: {wordData.hint}</p>
            
            {msg && (
                <div className="message">
                    <p>{msg}</p>
                </div>
            )}
            
            <div className="button-section">
                <div className="guess-section">
                    <button onClick={restartGameFunction} className="restart-button">
                        Restart
                    </button>
                    <button onClick={removeCharacterFunction} disabled={!chosenLetters.length || gameOver} className="remove-button">
                        Remove Letter
                    </button>
                </div>
                
                <div className="letter-selection">
                    {displayLettersFunction()}
                </div>
                
                <div className="hints">
                    Hints Remaining: {hints}{" "}
                    <button onClick={hintFunction} disabled={hints === 0 || gameOver} className="hint-button">
                        Get Hint
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WordGame;