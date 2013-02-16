var stage = null;

var player = null;

window.onload = function() {    
    // init canvas stage
    stage = new Kinetic.Stage({
        container: 'container',
        width: 800,
        height: 600
    });
    
    RessourceLoader.load(battle);
};

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

function battle() {
    player = new SailorMoon();

    var battle = new ArenaBattle();
    
    battle.team1.push(new Gypsy());
    battle.team2.push(player);
    
    battle.render();
    
    setTimeout(function(){
        battle.attack(battle.team1[0], function(){
            battle.showUserChoice(function(){
                battle.attack(player);
            });
        });
    }, 1000);
    
    //battle.showMessage('test');
    
    //battle.showUserChoice();
}
