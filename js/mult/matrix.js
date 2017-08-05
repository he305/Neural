function Matrix(rows, cols) {
    this.rows = rows;
    this.cols = cols;

    this.matrix = [];

    for (var i = 0; i < this.rows; i++) {
        this.matrix[i] = [];
        for (var j = 0; j < this.cols; j++) {
            this.matrix[i][j] = 0;
        }
    }
}

Matrix.prototype.mult = function(num) {
    for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
            this.matrix[i][j] *= num;
        }
    }
}

Matrix.prototype.add = function(num) {

    console.table(num);
    if (num instanceof Matrix) {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                this.matrix[i][j] += num.matrix[i][j];
            }
        } 
    }

    for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
            this.matrix[i][j] += num;
        }
    }
}

//Create random matrix with values (-1, 1)
Matrix.prototype.randomize = function() {
    for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
            this.matrix[i][j] = Math.random() * 2 - 1;
        }
    }
}
