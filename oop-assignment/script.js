class Animal {
    constructor(name, age, species){
        this.#name = name;
        this.#age = age;
        this.#species =species ;
    }
    #name;
    #age;
    #species;
    
    //getters
    getName(){
        return this.#name;
    }
    getAge(){
        return this.#age;
    }
    getspecies(){
        return this.#species;
    }

    //setter method
    setAge(){
        if(age > 0){
            this.#age = age
        }
        else{
            throw new Error("Age must be positive");
        }
    }

    eat(food) {
        return `${this.#name} is eating ${food}`;
    }
    makeSound() {
        return "Some generic animal sound";
    }
}

//inheritence
class Cat extends Animal {
    #color;
    #lives;
    constructor(name, age, color){
        super(name, age, "cat");
        this.#color = color;
        this.lives = this.#lives;
    }
    getColor() {
        return this.#color;
    }

    getLives() {
        return this.#lives;
    }
    loseLife(){
        if(this.#lives > 0){
            this.#lives--;
            return `${this.getName()}  has ${this.#lives} left`
        }
        return `${this.getName()} has no lives left!`;
    }
    makeSound() {
        return "Meow!";
    }
}

const cat = new Cat("Whiskers", 2, "Orange");
console.log(cat.getName());
console.log(cat.eat("fish"))
console.log(cat.loseLife());
console.log(cat.makeSound());