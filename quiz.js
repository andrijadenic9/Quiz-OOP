class Quiz {
    questions;
    score = 0;
    questionIndex = 0;
    answer = false;
    correctAnswer = 0;
    wrongAnswer = 0;
    constructor(questions) {
        this.questions = questions;
    }

    allCategories() {
        let categoriesArray = [];

        // * PROLAZIMO KROZ SVA PITANJA I UKOLIKO U NASEM AREJU 'categoriesArray' NEMA TRENUTNO KATEGORIJE KOJA JE U TRENUTNO PITANJU ONDA TU KATEGORIJU UBACUJEMO U AREJ
        // ! OVIME OBEZBEDJUJEMO DA SE U NASEM AREJU NE NADJU 2 ILI VISE KATEGORIJA SA ISITM IMENOM
        // * I NA KRAJU OVAJ SADA VEC PUN ARE 'categoriesArray' RETURNUJEMO KAKO BI ON POSTAO OVA F-JA KOJU SMO POZVALI IZ 'script.js', 'startQuiz' F-JE
        for (let i = 0; i < this.questions.length; i++) {
            let currentCategory = this.questions[i].category;
            if (categoriesArray.indexOf(currentCategory) === -1) {
                categoriesArray.push(currentCategory);
            }
        }
        return categoriesArray;
    }

    getCurrentQuestion() {

        // * PRAVIMO LOGIKU DA DOBIJEMO TRENUTNO PITANJE I RETURNUJEMO GA KAO BI OVA F-JA POSTALA TO TRENUTNO PITANJE, A NJU ZOVEMO U 'script.js', 'startQuiz' F-JE
        let currentQuestion = this.questions[this.questionIndex];

        // * UZIMAMO MOGUCE ODGOVORE (options) IZ NASEG TRENUTNOG PITANJA I PROSLEDJUJEMO GA KLASI "Utils" KOJA CE DA NAM IZRANDOMIZUJE AREJ NASIH MOGUCIH ODGOVORA I VRATITI GA OVDE, TE CE NASI MOGUCI ODGOVORI (options) VEC UNAPRED BITI RANDOMIZOVANI
        currentQuestion.options = Utils.randomize(currentQuestion.options);
        return currentQuestion;
    }

    verify(answer) {
        let currentQuestion = this.questions[this.questionIndex];

        // * PROVERAVAMO DA LI JE ODGOVOR KOJI JE KORISNIK DAO ISTI KAO I ODGOVOR TRENUTNOG PITANJA, UKOLIKO JESTE POVECAVAMO GENERALAN SKOR I POSTAVLJAMO ANSWER DA JE = TRUE
        if (answer === currentQuestion.answer) {
            this.score += currentQuestion.points;
            this.answer = true;
        }

        // * BILO DA JE KORISNIK ODGOVORIO TACNO ILI NETACNO NA PITANJE, POVECAVAMO 'questionIndex' I SAMIM TIM PRELAZIMO NA DRUGO PITANJE
        this.questionIndex++;
        return currentQuestion;
    }

    isEnd() {

        // * POSTAVLJAMO PITANJE DA LI JE DUZINA NASEG AREJA PITANJA JEDNAKA 'questionIndex' JER NJEGA POVECAVAMO SVAKI PUT DAMO ODGOVOR NA PITANJE
        return this.questions.length === this.questionIndex;
    }
}

// * POSTO SVA PITANJA PREUZIMAMO SA INTERNETA (API) ONDA NEMAMO POTREBE DA PROSLEDJUJEMO BILO STA INSTANCI KLASE 'Quiz'
let quiz = new Quiz();

// ? UKOLIKO SVA PITANJA BUDU KOD NAS U AREJU 'questions' U 'question.js' FAJLU ONDA BISMO INSTANCI (OBJEKTU) 'quiz' KLASE 'Quiz' PROSLEDILI AREJ 'questions' PUN INSTANCI (OBJEKATA) KLASE 'Question'
// let quiz = new Quiz(questions);