var network;

function setup() {
    //network = new NeuralNetwork(3, 4, 2);

    var neuron = new Neuron(1)
    console.log(neuron.val);
    console.log(neuron.activatedVal);
    console.log(neuron.derivedVal);
    var mat = Matrix.createMatrix(1, 1, 2, 2);
    mat.transpose();
    QUnit.test("test", function(assert) {
        assert.deepEqual(mat.matrix, [[1, 2], [1, 2]]);
    });
}

function draw() {

}

setup();