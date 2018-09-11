import { hello } from './newfolder/funfile';

const greeting = () => {
    console.log(`Hello ${hello()}`);
};

greeting();

function check3() {
    if (1 === 3) {
        return 'hello';
    }
}

var hello2 = 'hello';

console.log(hello2);

hello = 'lol';
