class Question {
    category;
    questionText;
    answer;
    options;
    points;
    content = [];
    constructor(category, questionText, answer, options, points) {
        this.category = category;
        this.questionText = questionText;
        this.answer = answer;
        this.options = options;
        this.points = points;
    }
}

// * QUESTIONS CE BITI SVA NASA PITANJA KOJA DOBIJEMO IZ API
let questions = [];

// ? OVO BISMO OTKOMENTARISALI UKOLIKO NE UZIMAMO PITANJA PREKO NETA (API) I ONDA BI "questions" BILO NAS AREJ PUN INSTANCI (OBJEKATA)
// ? KLASE "Question".
// let questions = [
//     new Question('Film', 'Kako se zove glumac koji glumi novi 007 u nadolazećem Bondovom filmu No Time To Die?', 'Lashana linč', ['Lashana linč', '1. netacan', '1. netacan', '1. netacan'], 10),
//     new Question('Sport', '1. Koliki je kapacitet najveceg stadiona na svetu i u kojoj zemlji se nalazi?', 'Stadion indijske mladezi u gradu Kolkata u Indiji', ['Stadion indijske mladezi u gradu Kolkata u Indiji', 'Netacan odgovor', 'Netacan odgovor', 'Netacan odgovor'], 10),
//     new Question('Film', 'Za koji je film Sandra Bullock osvojila svog Oscara?', 'Slijepa strana', ['Slijepa strana', '2. netacan', '2. netacan', '2. netacan'], 10),
//     new Question('Geografija', 'Jezero sa najvećom površinom?', 'Kaspijsko jezero', ['Kaspijsko jezero', 'Netacan odgovor', 'Netacan odgovor', 'Netacan odgovor'], 10),
//     new Question('Istorija', 'Kada su vođeni krstaški ratovi i zbog čega?', 'od 1095. pa sve do 1270. godine.', ['od 1095. pa sve do 1270. godine.', 'Netacan odgovor', 'Netacan odgovor', 'Netacan odgovor'], 10),
//     new Question('Film', 'U koliko su filmova zajedno glumili Al Pacino i Robert De Niro?', 'Četiri (Kum: 2. dio, Vrućina, Pravedno ubijanje, Irac)', ['Četiri (Kum: 2. dio, Vrućina, Pravedno ubijanje, Irac)', '3. netacan', '3. netacan', '3. netacan'], 10),
//     new Question('Film', 'S čime Tom Hanks uspoređuje život u Forest Gumpu?', 'Kutija čokolade', ['Kutija čokolade', '4. netacan', '4. netacan', '4. netacan'], 10),
//     new Question('Sport', '2. Koje su dimenzije terena za mali fudbal (futsal), koliko je širok a koliko dugačak ?', '42-25 metara', ['42-25 metara', 'Netacan odgovor', 'Netacan odgovor', 'Netacan odgovor'], 10),
//     new Question('Istorija', 'Šta je to arabeska?', 'Ukras', ['Ukras', 'Netacan odgovor', 'Netacan odgovor', 'Netacan odgovor'], 10),
//     new Question('Geografija', 'Koji je najveci vodopad u Srbiji ?', 'Kopren', ['Kopren', 'Netacan odgovor', 'Netacan odgovor', 'Netacan odgovor'], 10),
//     new Question('Istorija', 'Koje godine se odigrao kosovski boj?', '28 juna 1389.', ['28 juna 1389.', 'Netacan odgovor', 'Netacan odgovor', 'Netacan odgovor'], 10),
// ];