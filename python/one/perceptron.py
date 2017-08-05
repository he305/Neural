import random as rnd

class Perceptron:
    def __init__(self, points, plt):
        self.points = points
        self.weights = [rnd.uniform(-1, 1), rnd.uniform(-1, 1)]
        self.lr = 0.0001
        self.plt = plt
        self.currentCorrect = 0
    
    def sign(self, num):
        if num >= 0:
            return 1
        else:
            return -1

    def sum(self, point):
        
        sum = 0
        for i in range(len(self.weights)):
            sum += point.get_coord()[i] * self.weights[i]

        guess = self.sign(sum)
        error = point.label - guess

        if error == 0:
            return True

        for i in range(len(self.weights)):
            self.weights[i] += error * point.get_coord()[i] * self.lr
        return False

    def feed_forward(self):
        self.currentCorrect = 0
        for p in self.points:
            if self.sum(p):
                self.plt.plot(p.x, p.y, 'go')
                self.currentCorrect += 1
            else:
                self.plt.plot(p.x, p.y, 'ro')

    def check(self):
        if self.currentCorrect == len(self.points):
            print(self.weights)
            return True
        
        return False 
