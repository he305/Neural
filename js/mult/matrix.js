function Matrix(rows, cols) {
    this.rows = rows;
    this.cols = cols;

    this.matrix = new Array(rows);

    for (var i = 0; i < this.rows; i++) {
        this.matrix[i] = new Array(cols);
        for (var j = 0; j < this.cols; j++) {
            this.matrix[i][j] = 0;
        }
    }
}

Matrix.createMatrix = function(... inputs) {
    var size = Math.sqrt(inputs.length);
    if (size === parseInt(size, 10)) {
        var k = 0;
        var mat = new Matrix(size, size);
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                mat.matrix[i][j] = inputs[k++];
            }
        }
        return mat;
    }
}

//NOT LINEAR MULTIPLICATION
Matrix.prototype.mult = function(num) {
    if (num instanceof Matrix) {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                this.matrix[i][j] *= num.matrix[i][j];
            }
        }
    } else {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                this.matrix[i][j] *= num;
            }
        }
    }
}

Matrix.prototype.add = function(num) {
    if (num instanceof Matrix) {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                this.matrix[i][j] += num.matrix[i][j];
            }
        } 
    } else {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                this.matrix[i][j] += num;
            }
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

Matrix.map = function(m, fn) {
    var result = new Matrix(m.rows, m.cols);
    for (var i = 0; i < result.rows; i++) {
        for (var j = 0; j < result.cols; j++) {
            result.matrix[i][j] = fn(m.matrix[i][j]);
        }
    }
    return result;
}

Matrix.dot = function(mat1, mat2) {
    if (mat1.cols != mat2.rows) {
        return;
    }

    var result = new Matrix(mat1.rows, mat2.cols);
    
    for (var i = 0; i < mat1.rows; i++) {
        for (var j = 0; j < mat2.cols; j++) {
            var sum = 0;
            for (var k = 0; k < mat1.cols; k++) {
                sum += mat1.matrix[i][k] * mat2.matrix[k][j];
            }
            result.matrix[i][j] = sum;
        }
    }
    return result;
}

Matrix.identity = function(size) {
    var mat = new Matrix(size, size);
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            if (i == j)
                mat.matrix[i][j] = 1;
            else mat.matrix[i][j] = 0;
        }
    }
    return mat;
}

Matrix.fromArray = function(arr) {
    var mat = new Matrix(arr.length, 1);
    for (var i = 0; i < arr.length; i++) {
        mat.matrix[i][0] = arr[i];
    }
    return mat;
}

Matrix.prototype.transpose = function() {
    newMatrix = new Array(this.cols);
    for (var i = 0; i < this.cols; i++) {
        newMatrix[i] = new Array(this.rows);
        for (var j = 0; j < this.cols; j++) {
            newMatrix[i][j] = this.matrix[j][i];
        }
    }
    this.matrix = newMatrix;
}