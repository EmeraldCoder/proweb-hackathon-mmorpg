function Battle() {
    this.team1 = [];
    this.team2 = [];
    
    this.characterLayer = null;

    this.render = function(){
        
        // render background
        var bgLayer = new Kinetic.Layer();
        
        var bg = new Kinetic.Image({
            x: 0,
            y: 0,
            width: stage.getWidth(),
            height: stage.getHeight(),
            image: Ressource.background[this.background]
        });
        
        bgLayer.add(bg);
        
        stage.add(bgLayer);
        
        characterLayer = new Kinetic.Layer();
        for (var i = 0; i < this.team1.length; i++) {
            characterLayer.add(this.team1[i].sprite);
            
            this.team1[i].sprite.setAnimation('rightIdle');
            this.team1[i].sprite.setX(150);
            this.team1[i].sprite.setY(300);
            this.team1[i].sprite.start();
        }
        for (var i = 0; i < this.team2.length; i++) {
            characterLayer.add(this.team2[i].sprite);
            
            this.team2[i].sprite.setAnimation('leftIdle');
            this.team2[i].sprite.setX(600);
            this.team2[i].sprite.setY(300);
            this.team2[i].sprite.start();
        }
        stage.add(characterLayer);
    };
    
    this.showUserChoice = function(callback) {
        var textLayer = new Kinetic.Layer();
        
        var rect = new Kinetic.Rect({
            x: 15,
            y: 456,
            width: 762,
            height: 24,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });
        textLayer.add(rect);
        
        var text = new Kinetic.Text({
            x: 20,
            y: 460,
            width: 760,
            text: 'Attack',
            fontSize: 16,
            fontFamily: 'arial',
            fill: 'white'
        });
        textLayer.add(text);
        
        stage.add(textLayer);
        
        window.onkeyup = function(e) {
            if (e.keyCode == 13) {
                textLayer.remove();
                window.onkeyup = null;
                if (callback != undefined) callback();
            }
        };
    };
    
    this.showMessage = function(message, callback) {
        var text = new Kinetic.Text({
            x: 20,
            y: 460,
            width: 760,
            text: message,
            fontSize: 16,
            fontFamily: 'arial',
            fill: 'white'
        });
        
        var textLayer = new Kinetic.Layer();
        textLayer.add(text);
        stage.add(textLayer);
        
        window.onkeyup = function(e) {
            if (e.keyCode == 13) { // 13 = enter key
                textLayer.remove();
                window.onkeyup = null;
                if (callback != undefined) callback();
            }
        };
    };
    
    this.attack = function(character, callback) {   
        var startState = character.sprite.getAnimation();
        var startPos = character.sprite.getX();
    
        if (startState == 'rightIdle') {
            character.sprite.setAnimation('right');
        } else {
            character.sprite.setAnimation('left');
        }
        
        var back = false;
        
        var anim = new Kinetic.Animation(function(frame){
            var currentX = character.sprite.getX();
            
            if (currentX == 400) {
                back = true; 
                if (startState == 'rightIdle') {
                    character.sprite.setAnimation('left');
                } else {
                    character.sprite.setAnimation('right');
                }
            }
            
            if (back) {
                if (startState == 'rightIdle') {
                    currentX = currentX - 1;
                } else {
                    currentX = currentX + 1;
                }
                
                character.sprite.setX(currentX);
                if (currentX == startPos) {
                    character.sprite.setAnimation(startState);                    
                    anim.stop();
                    if (callback != undefined) callback();
                }
            } else {
                if (startState == 'rightIdle') {
                    currentX = currentX + 1;  
                } else {
                    currentX = currentX - 1;  
                }
                character.sprite.setX(currentX);
            }
         }, this.characterLayer);
        anim.start();
    };
}

function ArenaBattle() {
    this.background = 'arena';
    
    Battle.call(this);
}
ArenaBattle.prototype = new Battle();
ArenaBattle.prototype.constructor = ArenaBattle;
