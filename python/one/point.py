class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.compute_label()

    def compute_label(self):
        if (self.x > self.y):
            self.label = 1
        else:
            self.label = -1

    def get_coord(self):
        return [self.x, self.y]