import matplotlib.pyplot as plt
from point import Point
import random as rnd
from perceptron import Perceptron
import threading
import numpy as np
import time

size = [800, 800]

def amain():
    x = np.linspace(0, 10*np.pi, 100)
    y = np.sin(x)
 
    plt.ion()
    fig = plt.figure()
    ax = fig.add_subplot(111)
    line1, = ax.plot(x, y, 'b-') 
 
    for phase in np.linspace(0, 10*np.pi, 100):
        line1.set_ydata(np.sin(0.5 * x + phase))
        fig.canvas.draw()

def main():

    point_num = 30
    points = []
    for i in range(point_num):
        #p = Point(rnd.randrange(0, size[0]), rnd.randrange(0, size[1]))
        points.append(Point(rnd.randrange(0, size[0]), rnd.randrange(0, size[1])))
    
    for p in points:
        plt.plot(p.x, p.y, 'bo')

    plt.ion()

    fig = plt.figure()
    ax = fig.add_subplot(111)

    ax.axis([0, size[0], 0, size[1]])
    ax.plot([0, size[0]], [0, size[1]])

    perceptron = Perceptron(points, ax)

    while not perceptron.check():
        perceptron.feed_forward()
        fig.canvas.draw()
        time.sleep(0.5)

    plt.ioff()
    #time.sleep(0.5)
    plt.show()

if __name__ == "__main__":
    main()