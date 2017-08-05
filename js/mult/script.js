var network;

function setup() {
    //network = new NeuralNetwork(3, 4, 2);

    var m = new Matrix(3, 3);
    //m.add(1);
    var n = new Matrix(3, 3);
    n.add(m);

    console.table(n.matrix);
    console.log(n.matrix[1][0]);
}

function draw() {

}

setup();