const canvas = document.querySelector("#lsystem");
canvas.width = innerWidth;
canvas.height = innerHeight;
const g = canvas.getContext('2d');

// https://en.wikipedia.org/wiki/L-system

const rules = {
    "X":"F+[[X]-X]-F[-FX]+X",
    "F":"FF"
}

function expandString(string,n){
    if (n<1)return string;
    const newstring = string.split('').map(char=> rules[char] || char).join('');
    return expandString(newstring,n-1);
}


function draw(string){
    const arr = string.split('');
    const deltaAngle = (Date.now()%6000) / 6000;
    const angle = 25 + Math.sin(deltaAngle*Math.PI*2)*2;
    for(let char of arr){
        switch(char){
            case 'F':
                g.translate(10,0);
                g.lineTo(0,0);
                break;
            case '[':
                g.save();
                break;
            case ']':
                g.restore();
                g.moveTo(0,0);
                break;
            case '+':
                g.rotate(Math.PI/180*angle);
                break;
            case '-':
                g.rotate(-Math.PI/180*angle);
        }
    }
}

const treeString = expandString("X",5);

function redraw(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    g.strokeStyle = '#07b02666';
    g.lineWidth = 2;
    g.translate(canvas.width * 0.7,canvas.height * 0.9);
    g.rotate(-Math.PI/2)
    g.beginPath();
    g.moveTo(0,0);
    draw(treeString);
    g.stroke();
    requestAnimationFrame(redraw);
}

window.addEventListener("load",redraw);