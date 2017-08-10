function NeuralNetwork(topology) {

    this.topologySize = topology.length;
    this.topology = topology;
    this.layers = [];
    this.weights = [];
    this.input = [];

    this.create = function() {
        for (var i = 0; i < topologySize; i++) {
            layers.push(new Layer(topology[i]));
        }

        for (var i = 0; i < topologySize - 1; i++) {
            var matrix = new Matrix(topology[i], topology[i+1])
            matrix.randomize();
            weights.push(matrix);
        }
    }

    this.feedForwad = function() {

    }
}

NeuralNetwork.prototype.createInput = function (input){
    this.input = input;

    for (var i = 0; i < input.length; i++) {
        layers[0].setValue(i, input[i]);
    }
}

function Layer(size) {
    this.size = size;

    this.neurons = new Array();
}

Layer.prototype.setValue = function (i, value) { 
    this.neurons[i].setValue(value);
}


//NEURON
function Neuron(val) {
    this.val = val;

    //Fast sigmoid function
    //f(x) = x / (1 + |x|)
    this.activate = function() {
        this.activatedVal = this.val / (1 + Math.abs(this.val));
    }
    //Derivative for fast sigmoid function
    //f'(x) = f(x) * (1 - f(x))
    this.derive = function() {
        this.derivedVal = this.activatedVal * (1 - this.activatedVal);
    }

    this.activate();
    this.derive();
}

Neuron.prototype.setValue = function(value) {
    this.val = value;
}

// Neuron.createNeuron = function(val) {
//     var neuron = new Neuron(val);
//     eval(neuron.activate);
//     eval(neuron.derive);
//     return neuron;
// }