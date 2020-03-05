window.onload = function(argument) {

    // var lyric = "i couldn't take it couldn't stand another minute couldn't bear another day without you in it";
    //var lyric = "ou're broken down by anger and by sadness you feel I left you in a world that's full of madness wish i could talk to you if only for a minute make you understand the reasons why i did it i wanna tell you that you're all that ever mattered want you to know that for eternity i'm shattered i tried so hard just to protect you but i failed to and in a prison of abandonment i've jailed you i never planned that i would leave you there alone i was sure that i would see you when i made it back home and all the times I swore that it would be okay now i'm nothing but a liar and you're thrown into the fray this bedtime story ends with misery ever after the pages are torn and there's no final chapter i didn't have a choice I did what I had to do i made a sacrifice but forced a bigger sacrifice on you i know you've lived a nightmare i caused you so much pain but baby please don't do what i did i don't want you to waste your life in vain red like roses fills my head with dreams and finds me always closer to the emptiness and sadness that has come to take the place of you you're not the only one who needed me i thought you understood you were the one i needed and you left me as I always feared you would would I change it if i could? it doesn't matter how the petals scatter now every nightmare just discloses it's your blood that's red like roses and no matter what I do nothing ever takes the place of you red like roses fills my head with dreams and finds me always closer to the emptiness and sadness that has come to take the place of you";
    var lyric = "Sport/History/Animals/Food/Music/Europe/Christmas/Football/Moovies/Sciences/Harry Potter/Antartic/Health/Economy/General culture/Mathematics/Monuments/\n" +
        "Celebrities";
    var words = {};
    var words_attr = [];
    string_handle(lyric);

    var canvas = document.getElementById('c');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if (canvas.getContext) {
        var c = canvas.getContext('2d'),
            w = canvas.width,
            h = canvas.height;

        console.log("Width : " + w);
        console.log("Height : " + h);
        c.strokeStyle = 'red';
        c.fillStyle = 'white';
        c.lineWidth = 5;

        // constructor
        Word = function(key) {
            this.text = key;
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.font = words[key] * 10 + 'px lobster';
            this.speedX = getRandomInt(-3,3);
            this.speedY = getRandomInt(-3,3);
        };
        for (key in words) {
            //console.log(words[key]);
            words_attr.push(new Word(key));
        }
        //console.log(words_attr.length);

        function animation() {
            for (var i = 0; i < words_attr.length; i++) {
                c.font = words_attr[i].font;
                c.fillText(words_attr[i].text, words_attr[i].x, words_attr[i].y);
                words_attr[i].width = c.measureText(words_attr[i].text).width;
                c.stroke();

            }
            move();
        }

        function move() {

            for (var i = 0; i < words_attr.length; i++) {


                //si le mot sort à droite de l'écran
                if (words_attr[i].x > w) {
                    /*words_attr[i].x = -words_attr[i].width;
                    words_attr[i].y = Math.random()*h;
                    words_attr[i].speedX = getRandomInt(-3,3);
                    words_attr[i].speedY = getRandomInt(-3,3);*/
                    appear(words_attr[i],-words_attr[i].width, Math.random()*h);
                }
                //si le mot sort à gauche de l'écran
                else if (words_attr[i].x+words_attr[i].width < 0){
                    /*words_attr[i].x = words_attr[i].width;
                    words_attr[i].y = Math.random()*h;
                    words_attr[i].speedX = getRandomInt(-3,3);
                    words_attr[i].speedY = getRandomInt(-3,3);*/
                    appear(words_attr[i],w, Math.random()*h);
                }
                //si le mot sort en haut de l'écran
                else if (words_attr[i].y < -words_attr[i].height){
                    /*words_attr[i].x = Math.random()*w;
                    words_attr[i].y = words_attr[i].height;
                    words_attr[i].speedX = getRandomInt(-3,3);
                    words_attr[i].speedY = getRandomInt(-3,3);*/
                    appear(words_attr[i],Math.random()*w, h);
                }
                //si le mot sort en bas de l'écran
                else if (words_attr[i].y+words_attr[i].height > h){
                    /*words_attr[i].x = Math.random()*w;
                    words_attr[i].y = -words_attr[i].height;
                    words_attr[i].speedX = getRandomInt(-3,3);
                    words_attr[i].speedY = getRandomInt(-3,3);*/
                    appear(words_attr[i],Math.random()*w, -words_attr[i].height);
                }
                else{
                    words_attr[i].x += words_attr[i].speedX;
                    words_attr[i].y += words_attr[i].speedY;
                }
            }
        }

        setInterval(function() {
            c.clearRect(0,0,w,h);
            animation();
        },24);

    }

    function appear(elem, _x, _y){
        elem.x = _x;
        elem.y = _y;
        elem.speedX = getRandomInt(-3,3);
        elem.speedY = getRandomInt(-3,3);
    }

    function string_handle(str) {
        var split_str = str.split("/");
        var word_array = [];
        var word_quotien = [];
        for (var i = 0; i < split_str.length; i++) {

            word_array.push(split_str[i]);
            word_quotien.push(getRandomInt(2,7));
        }
        for (var i = 0; i < word_array.length; i++) {
            words[word_array[i]] = word_quotien[i];
        }
        return words;
    }

    function getRandomInt(min,max) {
        var res = Math.random() * (max - min) + min;

        while (res === 0){
            res = Math.random() * (max - min) + min;
        }
        return res;
    }

};