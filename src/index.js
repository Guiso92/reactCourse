import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import { shuffle, sample } from 'underscore'

const authors = [
    {
        name: 'Mark Twain',
        imageUrl: 'images/authors/marktwain.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['The Adventures of Huckleberry Finn']
    },
    {
        name: 'Charles Dickens',
        imageUrl: 'images/authors/charlesDickens.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['The Adventures of Charles Dickens']
    },
    {
        name: 'Joseph Conrad',
        imageUrl: 'images/authors/josephConrad.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['The Adventures of Joseph Conrad']
    },
    {
        name: 'Stephen King',
        imageUrl: 'images/authors/stephenKing.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['The Adventures of Stephen King']
    },
    {
        name: 'William Shakespeare',
        imageUrl: 'images/authors/williamShakespeare.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['The Adventures of William Shakespeare']
    }
]

function getTurnData(authors) {
    const allBooks = authors.reduce(function (p, c, i) {
        return p.concat(c.books);
    }, []);
    const fourRandomBooks = shuffle(allBooks).slice(0, 4);
    const answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find((author) =>
            author.books.some((title) =>
                title === answer))
    }
}

const state = {
    turnData: getTurnData(authors),
    highlight: ''
}

function onAnswerSelected(answer) {
    const isCorrect = state.turnData.author.books.some((book) => book === answer);
    state.highlight = isCorrect ? 'correct' : 'wrong';

    render();
}

function render () {
    ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} />, document.getElementById('root'));
}
render();

serviceWorker.unregister();
