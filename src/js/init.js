    //Number os elements in each axe
const nbX = 50// nombre d'élément sur l'axe X
const nbY = 50// nombre d'élément sur l'axe Y

    //Function to start the screen--------------
window.onload = () => {
    const canvas = document.getElementById('zone')
    canvas.width = window.innerWidth - (window.innerWidth % 100)
    canvas.height = window.innerHeight - (window.innerHeight % 100)
	alert('Bienvenue au joue de la vie!')

}

    //Function responsable for draw the images---------------
function drawGrid(ctx, states){
        //Fix lenght
    ctx.width = window.innerWidth - (window.innerWidth % 100)
    ctx.height = window.innerHeight - (window.innerHeight % 100)
    const sizeX = ctx.width / nbX   // taille des éléments sur l'axe X
    const sizeY = ctx.height  / nbY  // taille des éléments sur l'axe Y

    //Define the colors
    ctx.fillStyle = 'rgb(0, 0, 0)'
    ctx.strokeStyle = 'rgb(0,0,0)'

    ctx.clearRect(0, 0, ctx.width, ctx.height)//each time clear the screen

        //Part responsable for fill each square
    for (let i = 0; i < nbX; i++) {
        for (let j = 0; j < nbY; j++) {
            if(states[i][j]){
                ctx.fillRect(i*sizeX, j*sizeY, sizeX, sizeY)
            }
            ctx.strokeRect(i*sizeX, j*sizeY, sizeX, sizeY)
        }
    }
}


    //Function responsable for generate random numbers for our map--------------
function RandomPopulation(){
    const states = new Array(nbX)

        for (let i = 0; i < nbX; i++) {
            states[i] = new Array(nbX)
            for (let j = 0; j < nbY; j++) {
                states[i][j] = Math.random() < 0.1 ? 1 : 0
            }
        }
    
    return states
}

    //Function responsable for make the rules and prepare the next generation---------------
function nextGen(){
    //Variables
    const future = new Array(map.length)
    const canvas = document.getElementById('zone')
    const ctx = canvas.getContext('2d')

    //Rules of the game
    for (let i = 0; i < map.length; i++) {
        future[i] = new Array(map.length)
        for (let j = 0; j < map.length; j++) {
            const value = map[i][j]
            const neighbours = countNeighbours(i, j)

            if(!value && neighbours == 3){
                future[i][j] = 1
            }
            else if ((value) && (neighbours < 2 || neighbours > 3)){
                future[i][j] = 0

            }
            else{
                future[i][j] = value
            }
        }
    }


    //console.log(future)
    
    //ReDraw Every time the screen and atualize the new generation
    drawGrid(ctx, future)
    map = future
}

    //Responsable for count number of neighbours of each cell----------------
function countNeighbours(x, y){
    //Variables
    let sum = 0
    const nRows = map.length
    const nColums = map[0].length

    //Conta o anterior ao proximo somando cada igualdade
    for (let i = -1; i < 2; i++){
        for (let j = -1; j < 2; j++){

            const row = (x + i + nRows) % nRows
            const col = (y + j +nColums) % nColums
            sum += map[row][col]
        }
    }

    //Retira o valor da celular do momento
    sum -= map[x][y]
    //console.log(sum)
    return sum
}




    //---------------------Functions of each button----------------
function restart() {
    const canvas = document.getElementById('zone')                           
    const ctx = canvas.getContext('2d')
    map = RandomPopulation();
    drawGrid(ctx, map)
    //console.log(ctx.height)
     

}

function reseta(){
      //Get the canvas and his width and height   
    const canvas = document.getElementById('zone')                      
    const ctx = canvas.getContext('2d')
    ctx.width = window.innerWidth - (window.innerWidth % 100)
    ctx.height = window.innerHeight - (window.innerHeight % 100)

    //clear the Canvas and stop the time
    ctx.fillStyle = 'rgb(255, 255, 255)'    
    ctx.fillRect(0, 0, ctx.width, ctx.height)
    map = 0
    clearInterval(tempo)

}

function start(){
    tempo = setInterval(nextGen, 100) // interval est donné en milliseconde.
    
}

function stop(){
    clearInterval(tempo)    //Stop the time

}


    //-------------------Call all functions in buttons--------------------
document.getElementById('stopButton').addEventListener('click', stop)
document.getElementById('startButton').addEventListener('click', start)
document.getElementById('randButton').addEventListener('click', restart)
document.getElementById('resetButton').addEventListener('click', reseta)

