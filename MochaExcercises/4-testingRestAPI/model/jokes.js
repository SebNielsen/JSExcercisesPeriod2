var jokes = [
    "A day without sunshine is like, night.",
    "At what age is it appropriate to tell my dog that he's adopted?",
    "I intend to live forever, or die trying"
];

module.exports = {
    allJokes : jokes,
    getRandomJoke : function(){
        var joke = jokes[Math.floor((Math.random() * jokes.length))];
        return joke;
    },
    addJoke : function(joke){
        jokes.push(joke);
    },
    removeJoke : function(id){
        jokes.splice(id,1);
    }
};

