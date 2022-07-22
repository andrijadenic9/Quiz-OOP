let quizHTML = document.querySelector('.quiz');
let heading = document.querySelector('.heading');
let questionHTML = document.querySelector('.question');
let options = document.querySelector('.options');
let footerQuestionCounter = document.querySelector('.question-counter');
let categories = document.querySelector('.choose-category');
let welcome = document.querySelector('.welcome');
let welcomeBtn = document.querySelector('.welcome button');
let finalAnswer = document.querySelector('.final-answer');
let questionHolder = document.querySelector('.question-holder');
let answerHistory = document.querySelector('.answer-history');
let displayResultHTML = document.querySelector('.display-result');
let playAgainHolder = document.querySelector('.play-again-holder');
let playAgain = document.querySelector('.play-again');
let loaderDIV = document.querySelector('.loader-div');
let footer = document.querySelector('footer');

welcomeBtn.addEventListener('click', getQuestionsAPI);

// ? PRITISKOM NA DUGME WELCOME POKRECEMO FUNKCIJU KOJA UZIMA API I DODELJUJE NASEM PRAZNOM AREJU "questions" IZ "questions.js" FAJLA
// ? PITANJA SA INTERNETA
function getQuestionsAPI() {
    welcome.style.display = 'none';
    loaderDIV.style.display = 'flex';

    // * FETCHUJEMO LINK SA KOGA UZIMAMO API
    fetch(`https://the-trivia-api.com/api/questions?categories=film_and_tv,sport_and_leisure,music,general_knowledge&limit=20&difficulty=easy`)
        .then(res => {
            return res.json();
        })

        // * PROLAZIMO KROZ SVA "loadedQuestions" KOJA SMO DOBILI SA INTERNETA, I SVAKO PITANJE FORMATIRAMO ONAKO KAKO SMO VEC ISKODIRALI DA PROPERTI NASIH PITANJA (OBJEKATA) IZGLEDAJU 
        .then((loadedQuestions) => {

            // * NA OVAJ NACIN FORMATIRAMO NASA PITANJA
            questions = loadedQuestions.map(question => {
                const formattedQuestion = {
                    questionText: question.question,
                    answer: question.correctAnswer,
                    points: 10,
                    id: quiz.questionID,
                    content: []
                }
                formattedQuestion.options = [formattedQuestion.answer, ...question.incorrectAnswers];
                formattedQuestion.category = question.category.replace('&', 'and');
                return formattedQuestion;
            });
            loaderDIV.style.display = 'none';

            // * ZOVEMO DA NAM SE PRIKAZE VIEW KATEGORIJA KOJE SMO DOBILI
            getCategoriesView();
        })
        .catch(err => {
            console.log(err);
        });
}

// ? PRAVIMO VIEW OD KATEGORIJA KOJE SMO DOBILI
function getCategoriesView() {
    quiz.questions = questions;

    // * ODLAZIMO U KLASU "Quiz" I VRACAMO AREJ IMENA SVIH KATEGORIJA KOJE IMAMO U "questions"
    let categoriesArray = quiz.allCategories();

    // * PRAVIMO DIVOVE SA IMENIMA KATEGORIJA
    let text = '';
    for (let i = 0; i < categoriesArray.length; i++) {
        text += `<div class="category">${categoriesArray[i]}</div>`;
    }
    categories.innerHTML = text;

    // * ZOVEMO F-JU U KOJOJ CEMO DA SELEKTUJEMO SVE KATEGORIJE I DA IM DODELIMO EVENT
    makeCategories();
}


// ? SELEKTUJEMO SVE KATEGORIJE I DAJEMO SVAKOG EVENT NA KLIK
function makeCategories() {
    let category = document.querySelectorAll('.category');

    category.forEach(cat => {
        cat.onclick = () => {

            // * PROSLEDJUJEMO F-JI TEXT KATEGORIJE NA KOJU SMO KLIKNULI
            getQuestions(cat.innerHTML);
        };
    });
    categories.style.display = 'flex';
}

// ? UZIMAMO TEKST KATEGORIJE NA KOJU SMO KLIKNULI
function getQuestions(category) {

    // * FILTRIRAMO KROZ SVA PITANJA I VRACAMO AREJ PITANJA U KOJIMA JE PROPERTI "category" ISTI KAO I ONAJ NA KOJI SMO KLIKNULI
    let currentQuestions = questions.filter(question => {
        return question.category === category;
    });

    // ! KLJUCNO
    // * POSTAVLJAMO DA NASA PITANJA SADA BUDU SAMO ONA PITANJA IZ TE KATEGORIJE
    // ! KLJUCNO
    quiz.questions = currentQuestions;

    // * POKRECEMO KVIZ
    startQuiz();
}

// ? PODESAVAMO DOM ZA POKRETANJE KVIZA
function startQuiz() {
    categories.style.display = 'none';
    quizHTML.style.display = 'block';
    questionHolder.style.display = 'block';

    // * ODLAZIMO U KLASU "Quiz" I ODATLE VRACAMO PRVO PRVI OBJEKAT TRENUTNOG PITANJA KOJE JE U NASEM AREJU PITANJA
    let currentQuestion = quiz.getCurrentQuestion();

    heading.innerHTML = `Quiz - category ${currentQuestion.category}`;
    questionHTML.innerHTML = currentQuestion.questionText;
    footerQuestionCounter.innerHTML = `Question ${quiz.questionIndex + 1} of ${quiz.questions.length}`;

    // * PRAVIMO DUGMICE NASIH OPCIJA ZA TRENUTNO PITANJE
    let text = '';
    for (let i = 0; i < currentQuestion.options.length; i++) {
        text += `<button class="option">${currentQuestion.options[i]}</button>`;
    }
    options.innerHTML = text;

    let option = document.querySelectorAll('.option');

    // * SVIM OPCIJAMA DAJEMO EVENT KAKO BISMO KORISNIKA PITALI DA LI JE TO KONACAN ODGOVOR
    option.forEach(opt => {
        opt.onclick = checkFinalAnswer;
    });
}

// ? F-JA KOJA PROVERAVA DA LI JE NAS ODGOVOR KONACAN
function checkFinalAnswer() {

    // * DISPLAYUJEMO PITANJE I SELEKTUJEMO DUGMICE KOJIMA DAJEMO EVENT NA CLICK
    questionHolder.style.display = 'none';
    finalAnswer.style.display = 'flex';
    let yes = document.querySelector('.yes');
    let no = document.querySelector('.no');
    // console.log(this, 'THIS');
    yes.onclick = () => {

        // * ZOVEMO F-JU KOJA PROVERAVA DA LI JE NAS ODOGVOR TACAN
        // ! OVOJ F-JI PROSLEDJUJEMO 'this', A TO CE BITI OBJEKAT 'option' ODNOSNO ODGOVOR NA KOJI SMO KLIKNULI U PROSLOJ F-JI KOJA JE POZVALA OVU F-JU
        checkAnswer(this); // * OVDE JE THIS 'option';
        finalAnswer.style.display = 'none';
        questionHolder.style.display = 'block';
    }
    no.onclick = () => {
        finalAnswer.style.display = 'none';
        questionHolder.style.display = 'block';
    }
}

// ? F-JA KOJA PROVERAVA DA LI SMO TACNO ODGOVORILI NA PITANJE I PRIHVATAMO ARGUMENT ODNOSNO NAS ODGOVOR
function checkAnswer(pickedAnswer) {

    let option = document.querySelectorAll('.option');
    let answer = pickedAnswer.innerHTML;

    // * IDEMO U KLASU 'Quiz' KAKO BISMO PROVERILI DA LI JE NAS ODOGVOR TACAN I OVDE VRACAMO TRENUTNO PITANJE TAKODJE
    let currentQuestion = quiz.verify(answer);

    // * UKOLIKO JE KORISNIK ODGOVORIO TACNO NA PITANJE, PODESAVAMO DOM KAKO NAM ODGOVARA, POVECAVAMO 'quiz.correctAnswer' I NA KRAJU SETUJEMO 'quiz.answer' PONOVO NA FALSE JER POLAZIMO NE ZNAMO KAKO CE NA SLEDECE PITANJE DA ODGOVORI KORISNIK, TO CEMO IZNAD DA PROVERIMO KADA PONOVO ZA TO DODJE RED
    if (quiz.answer) {
        for (let i = 0; i < option.length; i++) {
            option[i].style.backgroundColor = '#f84f4f';
        }
        pickedAnswer.style.backgroundColor = '#29D663';
        pickedAnswer.style.border = '5px solid #fff';

        quiz.correctAnswer++;
        quiz.answer = false;

        // * UKOLIKO JE KORISNIK ODGOVORIMO NETACNO NA PITANJE, PODESAVAMO DOM KAKO NAM ODGOVARA I POVECAVAMO 'quiz.wrongAnswer'
    } else {
        option.forEach(opt => {
            if (opt.innerHTML === currentQuestion.answer) {
                opt.style.backgroundColor = '#29D663';
            } else {
                opt.style.backgroundColor = '#f84f4f';
                pickedAnswer.style.border = '5px solid #fff';
            }
        });
        quiz.wrongAnswer++;
    }

    // * TRENUTNO PITANJE KOJE SMO VRATILI U SEBI IMA AREJ U KOJI PUSJEMO OVE 3 STVARI A SVE U CILJU DA KASNIJE MOZEMO CELOKUPNO NASE PITANJE PONOVO DA PRIKAZEMO U HISTORY DELU
    currentQuestion.content.push(questionHTML.innerHTML);
    currentQuestion.content.push(options.innerHTML);
    currentQuestion.content.push(pickedAnswer.style.backgroundColor);

    // ? PRAVIMO MALU PAUZU IZMEDJU PITANJA ----->
    setTimeout(() => { whaitAMinute() }, 1500);

    // ? <----- TAKO STO ZOVEMO FUNKCIJU KOJA CE NAM PROVERITI DA LI DA PONOVO POKRENEMO KVIZ ILI IZBACIMO REZULTAT
    function whaitAMinute() {

        // * ODLAZIMO U KLASU "Quiz" I TAMO POSTAVLJAMO PITANJE KOJE CE NAM VRATITI TRUE ILI FALSE I U ZAVISNOSTI OD TOGA CEMO POZVATI ILI PONOVNO PITANJE ODNOSNO F-JU 'startQuiz' ILI CEMO PRIKAZATI REZULTAT
        (!quiz.isEnd()) ? startQuiz() : displayResult();
    }
}

// ? FUKNCIJA KOJA PRIKAZUJE REZULTAT I ZABRANJUJE EVENT NA OPCIJE PITANJA
function displayResult() {
    let option = document.querySelectorAll('.option');

    option.forEach(opt => {
        opt.onclick = null;
    });

    questionHolder.style.display = 'none';
    displayResultHTML.style.display = 'block';
    displayResultHTML.innerHTML = `<h3>Correct answers: ${quiz.correctAnswer}</h3><h3>Incorrect answers: ${quiz.wrongAnswer}</h3><h3>Total score: ${quiz.score}</h3>`;

    footerQuestionCounter.innerHTML = `Question ${quiz.questionIndex} of ${quiz.questions.length} with total score of ${quiz.score} points`;

    // * POZIVAMO F-JU KOJA CE DA NAM PRIKAZE DUGMICE UZ POMOC KOJIH CEMO MOCI DA VIDIMO ISTORIJU PITANJA
    displayHistory();

    // * POZIVAMO F-JU KOJA CE DA NAM PRIKAZE DUGME NA KOJE MOZEMO PONOVO DA POCNEMO KVIZ IZ POCETKA
    displayPlayAgain();
}

// ? F-JA KOJA CE DA NAM NAPRAVI DUGMICE ZA PRIKAZIVANJE ISTORIJE PITANJA
function displayHistory() {

    // * PRAVIMO DUGMICE U ODNOSNU NA TO KOLIKO PITANJA IMA
    let text = '';
    for (let i = 0; i < quiz.questions.length; i++) {
        text += `<div class="single">${i + 1}</div>`;
    }
    footer.style.display = 'block';
    footerQuestionCounter.style.display = 'none';
    answerHistory.innerHTML = text;
    answerHistory.style.display = 'flex';

    // * SELEKTUJEMO TE DUGMICE --->
    let single = document.querySelectorAll('.single');

    // * <--- I POSTAVLJAMO IZGLED U ODNOSNU NA TO DA LI SMO TACNO ILI NETACNO ODGOVORILI NA PITANJE, TAKODJE I DAJEMO EVENT NA KLIK
    for (let i = 0; i < quiz.questions.length; i++) {
        single[i].style.backgroundColor = quiz.questions[i].content[2];
        // ? history border, otkomentarisati ako zelimo da nestane beli border
        // single[i].style.border = `5px solid ${quiz.questions[i].content[2]}`;
        single[i].onclick = getHistory;
    }
}

// ? PRIKAZUJEMO ISTORIJU PITANJA NA KOJE SMO KLUKNULI
function getHistory() {

    // * TRENUTNO PITANJE CE NAM BITI ONO NA KOJE SMO DUGME KLIKNULI UZ POMOC 'this' A TO JE 'single' OBJEKAT IZ PRETHODNE F-JE
    let currentQuestion = quiz.questions[parseInt(this.innerHTML - 1)];
    let single = document.querySelectorAll('.single');

    for (let i = 0; i < quiz.questions.length; i++) {
        single[i].style.border = `5px solid ${quiz.questions[i].content[2]}`;
    }

    this.style.border = '5px solid gold';

    // * DODELJUJEMO ODGOVARAJUCI VIEW ZA ODGOVARAJUCE PITANJE UZ POMOC 'currentQuestion.content' AREJA 
    questionHTML.innerHTML = currentQuestion.content[0];
    options.innerHTML = currentQuestion.content[1];

    displayResultHTML.style.display = 'none';
    questionHolder.style.display = 'block';
}

// ? PRIKAZUJEMO DUGME ZA PONOVO POKRETANJE IGRE I DAJEMO MU EVENT ZA PONOVNI POCETAK
function displayPlayAgain() {
    playAgainHolder.style.display = 'block';
    playAgain.addEventListener('click', resetAndStartAgain);
}

// ? RESETUJEMO SVE I ZOVEMO F-JU 'getCategoriesView' KOJA CE NAM OMOGUCITI PONOVO BIRANJE ZELJENE KATEGORIJE I PONOVNI POCETAK KVIZA
function resetAndStartAgain() {
    quiz.questions = questions;
    quiz.score = 0;
    quiz.correctAnswer = 0;
    quiz.wrongAnswer = 0;
    quiz.questionIndex = 0;
    quiz.questions.content = [];
    quizHTML.style.display = 'none';
    playAgainHolder.style.display = 'none';
    categories.style.display = 'none';
    displayResultHTML.style.display = 'none';
    questionHolder.style.display = 'none';
    answerHistory.style.display = 'none';
    footer.style.display = 'flex';
    footerQuestionCounter.style.display = 'block';
    heading.innerHTML = `Welcome to QUIZ`;
    questionHTML.innerHTML = '';
    getCategoriesView();
}