var target_word;
var population_size;
var mutation_chance;
var possible_symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz .";
var best_match_field;
var population = [];

function Creature(str, fitness) {
    this.str = str;
    this.fitness = fitness;
}

Creature.prototype.toString = function() {
    return this.str + " " + this.fitness;
}


function setup(target, population=500, mut=0.005) {
    target_word = target;
    population_size = population;
    mutation_chance = mut;
    best_match_field = document.getElementById("best_match");
}

function run() {
    var best_math = new Creature("", 0);
    var generation_count = 1;
    for (let i = 0; i < population_size; i++) {
        let word = generate_new(target_word.length) 
        population.push(new Creature(word, get_creature_fitness(word)));
        if (population[i].fitness > best_math.fitness) {
            best_math = population[i];
            document.getElementById("best_match").innerHTML = best_math.str;
        }
    }
    
    var evolution = setInterval(function() {
        reproductive_parents();
        document.getElementById("generation_count").innerHTML = generation_count++;
        for (let i = 0; i < population.length; i++) {
            if (population[i].fitness > best_math.fitness) {
                best_math = population[i];
                document.getElementById("best_match").innerHTML = best_math.str;
            }

            if (population[i].str === target_word) {
                clearInterval(evolution);
            }
        }
    }, 0)
}

function reproductive_parents() {
    var mating_pool = [];

    for (let i = 0; i < population.length; i++) {
        var n = Math.floor(population[i].fitness * 100);
        for (let j = 0; j < n; j++) {
            mating_pool.push(population[i].str)
        }
    }
    var parent1 = mating_pool[Math.floor(Math.random() * mating_pool.length)];
    var parent2 = mating_pool[Math.floor(Math.random() * mating_pool.length)];
    if (typeof parent1 === "undefined")
        parent1 = generate_new(target_word.length);
    if (typeof parent2 === "undefined")
        parent2 = generate_new(target_word.length);

    console.log(parent1 + " " + parent2)

    for (let i = 0; i < population.length; i++) {
        population[i] = crossover_mutate(parent1, parent2);
    }
}

function crossover_mutate(parent1, parent2) {
    let mid_point = Math.floor(Math.random() * target_word.length);
    str = "";
    for (let i = 0; i < target_word.length; i++) {
        if (i > mid_point) str += parent1[i];
        else str += parent2[i]; 
    }

    for (let i = 0; i < target_word.length; i++) {
        if (Math.random() <= mutation_chance){
            str = str.replaceAt(i, possible_symbols.charAt(Math.floor(Math.random() * possible_symbols.length)));
        }
    }

    return new Creature(str, get_creature_fitness(str));
}

function generate_new(size) {
    var text = "";
    for (let i = 0; i < size; i++) {
        text += possible_symbols.charAt(Math.floor(Math.random() * possible_symbols.length));
    }
    return text;
}

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

function get_creature_fitness(str) {
    var sum = 0;
    for (var i = 0; i < target_word.length; i++) {
        if (target_word.charAt(i) === str.charAt(i)) 
            sum++;
    }
    return sum/target_word.length;
}

window.onload = function() {
    setup("target", 1000);
    //setup("To be or not to be that is the question", 10000);
    run();
}