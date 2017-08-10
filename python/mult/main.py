import random
from network import NeuralNetwork
import numpy as np

def main():
    network = NeuralNetwork(2, 5, 1)
    input = []
    label = []
    size = 100
    for i in range(size):
        x = random.randint(0, 800)
        y = random.randint(0, 800)
        labelVal = 1 if x >= y else 0 
        input.append([x, y])
        label.append([labelVal])
        #print(input)
    
    for i in range(1000):
        for j in range(size):
            network.train(input[j], label[j])
    
    # # for i in range(len(network.input_layer.neurons)):
    # #     print(network.input_layer.neurons[i].weight)
    # # for i in range(len(network.hidden_layer.neurons)):
    # #     print(network.hidden_layer.neurons[i].weight)
    # print("--------------------")
    print(network.test([800, 0]))
    print(network.test([0, 800]))
    print(network.test([800, 0]))
    print(network.test([600, 400]))

    print('-----------------')
    for i in range(len(network.input_layer.neurons)):
        print(network.input_layer.neurons[i].weight)
    print('-----------------')
    for i in range(len(network.hidden_layer.neurons)):
        print(network.hidden_layer.neurons[i].weight)


def sigmoid_value(value):   
    return 1/(1 + np.exp(-value))

if __name__ == "__main__":
    main()