

document.addEventListener('DOMContentLoaded', (event) => {
    let diary_link = document.getElementById('password_protect')  // this is for password protection into diary
    diary_link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default action (navigation)
        let user_prompt = prompt("Password:")
        if(user_prompt == 'friend'){
            window.location.href = "open_diary.html"
        }
        else {
            alert("invalid password")
        }

    })
    let val = document.getElementById('randomgen');
    val.addEventListener("click", ()=>{
        randomizer();
    });
    let spook = document.getElementById('spookybutton')
    spook.addEventListener("click", ()=>{
        spookify();
    })
    if(document.getElementById('randomgen').innerText == 'Pick a random game for me'){
        document.getElementById('subscript').addEventListener('click', ()=>{
            simon();
        })
    let konami = document.getElementById('current')
        konami.addEventListener('click', ()=>{
            kcode();
            revert();
            function colorchange (x){
                return new Promise(resolve => {
                    setTimeout(()=>{
                        document.getElementById('thispg').querySelector('a').style.backgroundColor = 'white';
                        resolve(x)
                    },25)
                })
            }
            async function revert(){
                document.getElementById('thispg').querySelector('a').style.backgroundColor = 'red'
                x = await colorchange(null)
            }
        })
    }
    if(document.getElementById('current').innerText == 'Movies'){
        document.getElementById('current').addEventListener('click', ()=>{
            var audio = new Audio('sounds/yt5s.com - The Wilhelm scream sound effect (128 kbps).mp3')
            audio.play();
        })
    }
    let add = document.getElementById('change')
    add.addEventListener("click", ()=>{
        additem();
    })
});

function randomizer(){     // set all of list values to the random movie  
    console.log("randomizer called")
    let table = document.getElementById("table")
    let x = table.rows.length;
    random = Math.floor(Math.random()*x)
    movie = table.rows[random]
    ranLink = (movie.querySelector('#two').querySelector('a').href)
    window.open(ranLink, '_blank');

}

buttonon = false;
function spookify(){            // changes to spooky colors
    const element = document.querySelector('body')
    element.style.background = '#121212 ';
    element.style.color = '#DEE4E7';
    document.getElementById('subscript').style.color = '#DEE4E7';
    const inner = document.querySelectorAll('a')
    for( i in inner){
        try{
        console.log(i)
        inner[i].style.color = '#DEE4E7';
        }
        catch (error){
        }
    }
    const buttonparent = document.getElementById('lightson')
    if(!buttonon){                  // change back to default colors
        const button = document.createElement('button')
            button.innerText = "Turn the Lights Back on"
            button.style.backgroundColor = 'white';
            button.style.border = 'none';
            button.style.color = 'black';
            button.style.textDecoration = 'none';
            button.style.border = '2px solid white';
            button.style.padding = '4.1px 22px';
            button.style.position = 'relative';
            button.style.bottom = '-1.3px';
        buttonparent.appendChild(button)
        buttonon = true;  
        button.addEventListener('click', ()=>{
            element.style.background = 'white';
            element.style.color = '#1D263B'  
            document.getElementById('subscript').style.color = '#1D263B'
            for(i in inner){
                try{
                console.log(i)
                inner[i].style.color = '#1D263B';
                }
                catch (error){
                    // this is prob bad style
                }
            }
        button.remove()
        buttonon = false;
        })
    }
}
let iterator = 0;
function kcode(){
    const konami =  ['ArrowUp','ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
                'b','a'];
    document.addEventListener('keydown', (e)=>{
        if((e.key == konami[iterator]) && (iterator === konami.length-1)){             //Sucess case
            console.log('dubz')
            body = document.querySelector('body')
            body.style.backgroundColor = 'red';
            setTimeout(function(){
                window.open('https://www.youtube.com/watch?v=2mWZlNOzdv8', '_blank');  // will want to make something a touch more interesting
            },3000)
        }
        else if(e.key == konami[iterator]){
            iterator ++;
        }
        else{
            console.log('zeroed')
            iterator = 0;
            //failure case do somthing interesting 
        }
    })  
}
function simon(){
const lettervals = new Map();  // this is just atrocious make this better at some point 
    lettervals.set(0,'red')
    lettervals.set(1,'orange')
    lettervals.set(2,'yellow')
    lettervals.set(3,'blue')
    lettervals.set(4,'green')
    console.log(lettervals)
let previous = [];
let i = 0;
//while(i<5){
    // hmmm might have to await here witch i dont want to do.........
    let char = Math.floor(Math.random()*5)
    previous.push(char)
    colorgenerator(char)
    i++;
//}

    async function colorgenerator(number){   //make sure something is returned so this triggers 
        flashcolor(number)
        function flashcolor (x){
            revert2(number)
            return new Promise(resolve => {
                setTimeout(()=>{
                    document.getElementById('m'+number.toString()).style.color = '#1D263B'  // turn back to default
                    console.log('setting new event listener')
                    document.getElementById('m'+number.toString()).addEventListener('click', ()=>{
                            addtoprevious(number)
                    })
                    resolve(x)
                },400)
            })
            async function revert2(number){
                console.log(document.getElementById('m4'))
                console.log(document.getElementById('m'+number.toString()))
                document.getElementById('m'+number.toString()).style.color = lettervals.get(number)

            }

        }   
    }
    function addtoprevious(number){
        console.log('removing event listener')
        document.getElementById('m'+number.toString()).removeEventListener('click', ()=>{
        })
        console.log("hey!")
        previous.push(number)

    }       
}
function additem(){
    let info = prompt("In order add values seperated by ,: movie code on tmdb, review, front(y/n), subsection(if none null)");
    console.log(info)
    addValues = info.split
    // remembering why id didnt do this before, permanently changing the html is a mess?
}
//async btnClick(btn) {
//    return new Promise(resolve =>  btn.onclick = () => resolve());
//}