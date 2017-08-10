var weights = [];
var points = [];
var size = 100;
var lr = 0.001;

var currentCorrect = 0;

document.addEventListener("DOMContentLoaded", function(event) {     
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    for (var i = 0; i < 2; i++)
        {
            weights[i] = Math.random() * 2 - 1;
        }
    
    ctx.beginPath();
    ctx.fill();
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.stroke();

    for (var i = 0; i < size; i++)
        {
            ctx.fillStyle = '#000000';
            points.push(new Point());
            points[i].draw(ctx);
            if (!train(points[i]))
                ctx.fillStyle = '#00cc00';
            else
                ctx.fillStyle = '#ff0000';
            ctx.fillRect(points[i].x, points[i].y, 5, 5);
        }

    var loop = setInterval(function(){
        currentCorrect = 0;
        console.log("training...");
        for (var i = 0; i < size; i++)
            {
                ctx.fillStyle = '#000000';
                points[i].draw(ctx);

                if (train(points[i])) {
                    ctx.fillStyle = '#00cc00';
                    currentCorrect++;
                }
                else
                    ctx.fillStyle = '#ff0000';

                ctx.fillRect(points[i].x, points[i].y, 5, 5);

            }
        console.log(currentCorrect + " correct of total " + size);
        if (currentCorrect == size)
            {
                clearInterval(loop);
                console.log("Done");
                console.log(weights);
            }
    }, 10);
});

function Point() {
    this.x = Math.floor(Math.random() * canvas.width);
    this.y = this.x + Math.random() * 0.1 - 0.05;//Math.floor(Math.random() * canvas.height);
    
    this.label = function()
    {
        if (this.x > this.y)
            return 1;
        else return -1;
    }

    this.getInput = function()
    {
        return [this.x, this.y];
    }

    this.draw = function(ctx){
        if (this.label() == 1)
            ctx.strokeRect(this.x, this.y, 5, 5);
        else ctx.fillRect(this.x, this.y, 5, 5);
    }
}

function sign(num)
{
    if (num >= 0)
        return 1;
    else return -1;
}

function guessSum(...inputs)
{
        
}

function train(input)
{
        var sum = 0;
        for (var i = 0; i < input.getInput().length ; i++)
            {
                sum += input.getInput()[i] * weights[i];
            }
            // console.log(input.getInput());
            // console.log(weights);
            // console.log(sum);
        var guess = sign(sum);

    var error = input.label() - guess;
    if (error == 0)
        return true;

    for (var i = 0; i < weights.length; i++) {
            weights[i] += error * input.getInput()[i] * lr;
        }
    return false;
}