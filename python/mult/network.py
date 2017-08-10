import random
import math
import numpy

learning_rate = 0.001

class NeuralNetwork:
    def __init__(self, inputSize, hiddenLayer, outputLayer):
        self.input_layer = Layer(inputSize, hiddenLayer)
        self.hidden_layer = Layer(hiddenLayer, outputLayer)
        self.output_layer = Layer(outputLayer, 1)
    
    def test(self, input):
        """for testing trained network"""
        return self.__get_actual(input)

    def train(self, input, expected):
        if (len(input) != len(self.input_layer.neurons)):
            print("wrong input format")
            return

        actual = self.__get_actual(input)
        error = [actual[i] - expected[i] for i in range(len(actual))]
        #error = [actual[i] - expected[i] for i in range(len(actual))]
        #print(actual, " ", error)
        delta = error[0] * sigmoid_dx_value(actual[0])
        #print("delta ", delta)

        self.hidden_layer.back_forward(delta, 0)

        for i in range(len(self.hidden_layer.neurons)):
            error_hidden = self.hidden_layer.neurons[i].weight[0] * delta
            new_delta = error_hidden * sigmoid_dx_value(self.hidden_layer.neurons[i].val)
            self.input_layer.back_forward(new_delta, i)

    def __get_actual(self, input):
        self.input_layer.set_values(input)
        #print("input")
        self.hidden_layer.set_values(self.input_layer.activate_func())
        # print("sigm " , self.hidden_layer.get_values())
        # print("----------------")
        # print("hidden")
        self.output_layer.set_values(self.hidden_layer.activate_func())
       # print("sigm " , self.output_layer.get_values())
        #print("----------------")
        return self.output_layer.get_values()


class Layer:
    def __init__(self, size, connection):
        self.neurons = [Neuron(connection) for i in range(size)]
        self.connection = connection
        
    def activate_func(self):
        sum_arr = self.__sum_func()
        return self.__sigmoid(sum_arr)

    def __sigmoid(self, sum_arr):
        return [sigmoid_value(x) for x in sum_arr]

    def __sum_func(self):
        sum_arr = []
        for i in range(self.connection):
            sum_val = 0
            for j in range(len(self.neurons)):
                #print(self.neurons[j].val, "*", self.neurons[j].weight[i])
                sum_val += self.neurons[j].get_mult(i)
            sum_arr.append(sum_val)
        #print(sum_arr)
        #print("---------------")
        return sum_arr

    def set_values(self, inputs):
        for i in range(len(inputs)):
            self.neurons[i].set_value(inputs[i])
    
    def get_values(self):
        return [self.neurons[x].get_value() for x in range(len(self.neurons))]
            
    def back_forward(self, delta, connection):
        for i in range(len(self.neurons)):
            new_weight = self.neurons[i].weight[connection] - self.neurons[i].val * delta * learning_rate
            self.neurons[i].change_weight(connection, new_weight)


class Neuron:
    def __init__(self, connections):
        self.weight = [random.uniform(-1, 1) for i in range(connections)]
        self.val = 0
    def get_mult(self, i):
        #print ("weight " , self.weight[i])
        return self.val * self.weight[i]
    def set_value(self, input):
        self.val = input
        #print(self.val)
    def get_value(self):
        return self.val
    def change_weight(self, index, new_weight):
        #print("old weight " , self.weight[index])
        self.weight[index] = new_weight
        #print("new weight ", self.weight[index])



def sigmoid_value(value):
    return 1/(1 + numpy.exp(-value))

def sigmoid_dx_value(value):
    return sigmoid_value(value) * (1 - sigmoid_value(value))