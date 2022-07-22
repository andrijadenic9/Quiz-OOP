class Utils {

    // * F-JA KOJA RANDOMIZUJE AREJ KOJI JOJ PROSLEDIMO I VRACA GA NAZAD UZ POMOC 'return'
    static randomize(arr) {
        let randomizedArray = [];

        // ! skladistimo broj areja koji smo prosledili a zatim u for lupu cemo iskoristiti taj broj kako bismo dinamicno uvek mogli da saljemo razlicite areje te ce ova cena f-ja moci iznova da se koristi za razlicite areja sa razlicitim brojem elemenata
        let arrayLengthCopy = arr.length;

        // * UZIMAMO RANDOM BROJ IZ AREJA 'arr' KOJI SMO PROSLEDILI, ZATIM PUSUJEMO U NOVI AREJ 'randomizedArray', I IZBACUJEMO IZ PROSLEDJENOG AREJA 'arr' TAJ ELEMENt KOJI SMO PUSOVALI U NOVI AREJ, KAKO SE NE BI PONOVIO
        for (let i = 0; i < arrayLengthCopy; i++) {
            let random = Math.floor(Math.random() * arr.length);
            randomizedArray.push(arr[random]);

            // * ZBOG OVOGA CE NAS PROSLEDJENI AREJ 'arr' SVAKI SLEDECI PUT BITI SVE MANJI PA SMO MORALI DA NAPRAVIMO 'let arrayLengthCopy = arr.length;' KAKO BISMO NAPRAVILI DINAMIKU DA FOR LOOP VRTI DOVOLJNO PUTA
            arr.splice(random, 1);
        }
        return randomizedArray;
    }
}
