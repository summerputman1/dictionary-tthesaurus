const wordForm = document.querySelector('form');
const displayHTML = document.querySelector('.inner-container');
const errorDisplay = document.querySelector('.error');

const showError = function(){
    displayHTML.innerHTML = `
    <section class="error">
        <h2>Oops! Something went wrong</h2>
        <p>Double check your spelling and try again!</p>
    </section>
    `;
};

const updateUI = (data) => {
    const { searchWord, wordSyn, wordType } = data;
    const word = searchWord.word;
    const defs = searchWord.results
        .map(item => item.definition)
        .splice(0, 4)
        .map(stringDef => `<li class="capitalization">${stringDef}</li>`)
        .join('\n');
    const syns = wordSyn
        .map(stringSyn => `<li>${stringSyn}</li>` )
        .join(`\n`);
    const syllables = searchWord.syllables.list
        .map(stringSyllables => `<p>${stringSyllables}</p>`)
        .join(` - `);

    displayHTML.innerHTML = `
    <div class="display-word">
    <h2 class="capitalization">${word}</h2>
    <h3 class="typeOf">${wordType[0]}</h3>
    <h3 class="pronunciation">${syllables}</h3>
</div>
<div class="display-def output">
    <h2>Definition of <span>${word}</span></h2>
    <ol>
        ${defs}
    </ol>
</div>
<div class="display-syn output">
    <h2>Synonyms of <span>${word}</span></h2>
    <ul>
        ${syns}
    </ul>
</div>
    `;
};

function updateWord(word) {
    return Promise.all([
        getWord(word),
        getSyn(word),
        getType(word)
    ])
    .then(results => {
        const searchWord = results[0];
        const wordSyn = results[1];
        const wordType = results[2];

        return { searchWord, wordSyn, wordType };
    })
};

wordForm.addEventListener('submit', e => {
    e.preventDefault();

    const word = wordForm.searchWord.value.trim();
    wordForm.reset();

    // update the UI with new word
    updateWord(word)
        .then(data => updateUI(data))
        .catch(err => {
            console.log(err);
            showError();
        });
});