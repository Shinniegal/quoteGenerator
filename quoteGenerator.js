const quoteContainer = document.getElementById('quote-container');
const quoteContent = document.getElementById('quote-content');
const  quoteAuthor = document.getElementById('quote-author');
const twitterButton = document.getElementById('twitter-button');
const  newQuoteButton = document.getElementById('next-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// SPINNER LOADING
function loading() {
    loader.hidden = false;
    quoteContainer.hidden =true;
}

// CONTENT LOADED

function completed() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// SHOW NEXTQUOTE
  function newQuote() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
// to check the author field is blank, if it is , it should bring UNKNOWN
    if (!quote.author) {
        quoteAuthor.textContent = 'Unknown';
    } else {
        quoteAuthor.textContent = quote.author;
    }
// to check if quote length is more than 120 and reduce the font
    if (quote.text.length > 120) {
        quoteContent.classList.add('long-quote');
    } else {
        quoteContent.classList.remove('long-quote');
    }
// Show quote and Hide Loader
    quoteContent.textContent = quote.text;
    completed();
  }
 // LINK apiQuote Site

    async function getQuotes() {
        loading();
        const apiUrl = 'https://type.fit/api/quotes';
// Error Catching
        try {
            const response = await fetch(apiUrl);
            apiQuotes = await response.json();
            newQuote();
        } catch (error) {
            //Catch Error Here
        }
    }

// Tweet code

    function tweetQuote() {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteContent.innerText} - ${quoteAuthor.innerText}`;
        window.open(twitterUrl, '_blank');
    }

// Event Listeners

    twitterButton.addEventListener('click', tweetQuote);
    newQuoteButton.addEventListener('click', newQuote);

// On LOAD

    getQuotes();