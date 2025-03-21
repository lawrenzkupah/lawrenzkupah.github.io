
document.addEventListener('DOMContentLoaded', (event) => {
    // Check if the page is '/open_diary.html'
    if (window.location.pathname === '/open_diary.html') {
    // if true block out the screen
    let overlay = document.getElementById('overlay');
    while(true){
        let user_prompt = prompt("Password:");
        if(user_prompt === 'friend'){
            overlay.style.display = 'none';
            break;
            }
        }
    }   

    // Randomizer Button Event Listener
    let val = document.getElementById('randomgen');
    val.addEventListener("click", () => {
        randomizer();
    });

    // Spooky Button Event Listener
    let spook = document.getElementById('spookybutton');
    spook.addEventListener("click", () => {
        spookify();
    });

    // If random game button text is 'Pick a random game for me', add event listener
    if (document.getElementById('randomgen').innerText == 'Pick a random game for me') {
        document.getElementById('subscript').addEventListener('click', () => {
            simon();
        });
    }

    // Konami Code button Event Listener
    let konami = document.getElementById('current');
    if (konami && konami.innerText == 'Movies') {
        konami.addEventListener('click', () => {
            var audio = new Audio('sounds/yt5s.com - The Wilhelm scream sound effect (128 kbps).mp3');
            audio.play();
        });
    }

    // Add Event Listener for the 'change' button
    let add = document.getElementById('change');
    add.addEventListener("click", () => {
        additem();
    });

    // Konami Code event listener for 'current' element
    if (document.getElementById('current')) {
        konami.addEventListener('click', () => {
            kcode();
            revert();

            async function revert() {
                document.getElementById('thispg').querySelector('a').style.backgroundColor = 'red';
                await colorchange();
            }

            function colorchange() {
                return new Promise(resolve => {
                    setTimeout(() => {
                        document.getElementById('thispg').querySelector('a').style.backgroundColor = 'white';
                        resolve();
                    }, 25);
                });
            }
        });
    }
});

function randomizer() {
    console.log("randomizer called");
    let table = document.getElementById("table");
    let x = table.rows.length;
    let random = Math.floor(Math.random() * x);
    let movie = table.rows[random];
    let ranLink = movie.querySelector('#two').querySelector('a').href;
    window.open(ranLink, '_blank');
}

let buttonon = false;
function spookify() {
    const element = document.querySelector('body');
    element.style.background = '#121212';
    element.style.color = '#DEE4E7';
    document.getElementById('subscript').style.color = '#DEE4E7';

    const inner = document.querySelectorAll('a');
    for (let i in inner) {
        try {
            inner[i].style.color = '#DEE4E7';
        } catch (error) {
            // Handle error if necessary
        }
    }

    const buttonparent = document.getElementById('lightson');
    if (!buttonon) {
        const button = document.createElement('button');
        button.innerText = "Turn the Lights Back on";
        button.style.backgroundColor = 'white';
        button.style.border = 'none';
        button.style.color = 'black';
        button.style.textDecoration = 'none';
        button.style.border = '2px solid white';
        button.style.padding = '4.1px 22px';
        button.style.position = 'relative';
        button.style.bottom = '-1.3px';
        buttonparent.appendChild(button);
        buttonon = true;

        button.addEventListener('click', () => {
            element.style.background = 'white';
            element.style.color = '#1D263B';
            document.getElementById('subscript').style.color = '#1D263B';

            for (let i in inner) {
                try {
                    inner[i].style.color = '#1D263B';
                } catch (error) {
                    // Handle error if necessary
                }
            }

            button.remove();
            buttonon = false;
        });
    }
}

let iterator = 0;
function kcode() {
    const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    document.addEventListener('keydown', (e) => {
        if ((e.key == konami[iterator]) && (iterator === konami.length - 1)) { // Success case
            console.log('dubz');
            let body = document.querySelector('body');
            body.style.backgroundColor = 'red';
            setTimeout(function () {
                window.open('https://www.youtube.com/watch?v=2mWZlNOzdv8', '_blank');
            }, 3000);
        } else if (e.key == konami[iterator]) {
            iterator++;
        } else {
            console.log('zeroed');
            iterator = 0;
            // Failure case: Do something interesting
        }
    });
}

function simon() {
    const lettervals = new Map(); // Mapping of colors
    lettervals.set(0, 'red');
    lettervals.set(1, 'orange');
    lettervals.set(2, 'yellow');
    lettervals.set(3, 'blue');
    lettervals.set(4, 'green');
    console.log(lettervals);

    let previous = [];
    let i = 0;

    let char = Math.floor(Math.random() * 5);
    previous.push(char);
    colorgenerator(char);
    i++;

    async function colorgenerator(number) {
        flashcolor(number);

        function flashcolor(x) {
            revert2(number);

            return new Promise(resolve => {
                setTimeout(() => {
                    document.getElementById('m' + number.toString()).style.color = '#1D263B'; // Turn back to default
                    document.getElementById('m' + number.toString()).addEventListener('click', () => {
                        addtoprevious(number);
                    });
                    resolve(x);
                }, 400);
            });

            async function revert2(number) {
                console.log(document.getElementById('m4'));
                console.log(document.getElementById('m' + number.toString()));
                document.getElementById('m' + number.toString()).style.color = lettervals.get(number);
            }
        }
    }

    function addtoprevious(number) {
        console.log('removing event listener');
        document.getElementById('m' + number.toString()).removeEventListener('click', () => { });
        console.log("hey!");
        previous.push(number);
    }
}

function additem() {
    let info = prompt("In order add values separated by ,: movie code on tmdb, review, front(y/n), subsection(if none null)");
    console.log(info);
    let addValues = info.split(','); // Fixed: added missing comma to `split()`
    // Logic for adding item goes here
}
