var stage = null;
var server = null;

var player = null;
var playerName = null;
var playerClass = null;

window.onload = function() {    
    // init canvas stage
    stage = new Kinetic.Stage({
        container: 'container',
        width: 800,
        height: 600
    });
    
    RessourceLoader.load(function(){
        Ressource.sound.intro.play(createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 1, 0);
    
        initServerSocket();        
        
        choosePlayerName(function(){
            choosePlayerClass(function(){
                var data = {
                    playerName: playerName,
                    playerClass: playerClass
                };
                server.emit('login', data);            
            });
        });
    });
};

function initServerSocket() {
    server = io.connect();
    
    server.on('loginAccepted', function(data) {
        player.serverData = data;
        server.emit('startBattle');
    });
    
    server.on('playerStatChanged', function(data) {
        player.serverData = data;
    });
    
    server.on('battleStarted', function(data) {
        /*
         * data structure expected from the server
         * {
         *     computerClass
         * }
         */
        battle(data.computerClass);
    });
}

function choosePlayerName(callback) {
    while (playerName == '' || playerName == null) {
        playerName = prompt('Player name');
        playerName = playerName.trim();
    } 
    callback();
}

/*window.onkeyup = function(e) {
    // e.keyCode        
    // 37 left
    // 38 up
    // 39 right
    // 40 down
    //console.log(e.keyCode);
    if (e.keyCode == 37) {
        CHARACTERS.sailorMoon.sprite.setAnimation('left');
    } else if (e.keyCode == 38) {
        CHARACTERS.sailorMoon.sprite.setAnimation('up');
    } else if (e.keyCode == 39) {
        CHARACTERS.sailorMoon.sprite.setAnimation('right');
    } else if (e.keyCode == 40) {
        CHARACTERS.sailorMoon.sprite.setAnimation('down');
    }
};*/

function battle(computerClass) {
    var battle = new ArenaBattle();
    
    Ressource.sound.intro.stop();
    Ressource.sound.battle.play(createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 1, 0);
    
    battle.team1.push(new Assassin());//battle.team1.push(new Gypsy());
    battle.team2.push(player);
    
    battle.render();
    
    server.on('playerTurn', function() {
        battle.showUserChoice(function(){
            server.emit('playerChoose');
        });
    });
    
    server.on('playerChooseResult', function(data){
        battle.attack(player, function(){        
            battle.showMessage(data.message, function(){
                battle.renderStat();
                if (data.win) {
                    Ressource.sound.battle.stop();
                    Ressource.sound.winBattle.play();
                    battle.showMessage('Vous avez gagné', function(){
                        alert('Merci d\'avoir essayé notre jeux !');
                    });
                } else {
                    server.emit('playerTurnEnd');
                }
            });
        });
    });
    
    server.on('computerChooseResult', function(data){
        battle.attack(battle.team1[0], function(){
            battle.showMessage(data.message, function(){
                battle.renderStat();
                if (data.lose) {
                    Ressource.sound.battle.stop();
                    Ressource.sound.loseBattle.play();
                    battle.showMessage('Vous avez perdu', function(){
                        alert('Merci d\'avoir essayé notre jeux !');
                    });
                } else {
                    server.emit('computerTurnEnd');
                }
            });
        });
    });
    
    server.emit('battlefieldReady');
}

function choosePlayerClass(callback) {

    var layer = new Kinetic.Layer();
    
    var rect = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: 54,
        height: 81,
        fill: 'green'
    });
    layer.add(rect);
    
    var characters = [];
    var characterClassnames = [];
    
    var c1 = new Assassin();
    c1.sprite.setX(characters.length * 54);
    c1.sprite.setY(0);
    characters.push(c1);
    characterClassnames.push('assassin');
    
    /*var c2 = new Druid();
    c2.sprite.setX(characters.length * 54);
    c2.sprite.setY(0);
    characters.push(c2);
    characterClassnames.push('druid');*/
    
    var c3 = new Fighter();
    c3.sprite.setX(characters.length * 54);
    c3.sprite.setY(0);
    characters.push(c3);
    characterClassnames.push('fighter');
    
    /*var c4 = new Gypsy();
    c4.sprite.setX(characters.length * 54);
    c4.sprite.setY(0);
    characters.push(c4);
    characterClassnames.push('gypsy');*/
    
    /*var c5 = new Healer();
    c5.sprite.setX(characters.length * 54);
    c5.sprite.setY(0);
    characters.push(c5);
    characterClassnames.push('healer');*/
    
    var c6 = new Mage();
    c6.sprite.setX(characters.length * 54);
    c6.sprite.setY(0);
    characters.push(c6);
    characterClassnames.push('mage');
    
    /*var c7 = new Panda();
    c7.sprite.setX(characters.length * 54);
    c7.sprite.setY(0);
    characters.push(c7);
    characterClassnames.push('panda');*/
    
    for (var i = 0; i < characters.length; i++) {
        layer.add(characters[i].sprite);
    }
    
    stage.add(layer);
    
    var selectIndex = 0;
    
    window.onkeyup = function(e) {
    
        if (e.keyCode == 37) {
            if (selectIndex > 0) {
                selectIndex--;
                rect.setX(54 * selectIndex);
                layer.draw();
            }            
        } else if (e.keyCode == 39) {
            if (selectIndex < characters.length - 1) {
                selectIndex++;
                rect.setX(54* selectIndex);
                layer.draw();
            }
        } else if (e.keyCode == 13) {
            player = characters[selectIndex];
            playerClass = characterClassnames[selectIndex];
            window.onkeyup = null;
            if (callback != undefined) callback();
        }
        
    };
    
}
