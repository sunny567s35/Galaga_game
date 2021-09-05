
        const music = new Audio('galaga/audio/galaga.mp3');
        music.play();
        music.loop =true;
        
        var score =0 ;
        var hero ={
            top : 550,
            left : 634
        };
        var missiles = [];
        var enemyMissiles = [{top: 0,left: 110
},{top: 0,left: 210
},{top: 0,left: 310
},{top: 0,left: 410
},{top: 0,left: 510
},{top: 0,left: 610
},{top: 0,left: 710
},{top: 0,left: 810
},{top: 0,left: 910
},{top: 0,left: 1010
},{top: 55,left: 110
},{top: 55,left: 210
},{top: 55,left: 310
},{top: 55,left: 410
},{top: 55,left: 510
},{top: 55,left: 610
},{top: 55,left: 710
},{top: 55,left: 810
},{top: 55,left: 910
},{top: 55,left: 1010
},{top: 110,left: 110
},{top: 110,left: 210
},{top: 110,left: 310
},{top: 110,left: 410
},{top: 110,left: 510
},{top: 110,left: 610
},{top: 110,left: 710
},{top: 110,left: 810
},{top: 110,left: 910
},{top: 110,left: 1010
}];
//pattern of the enemies     
        

        var enemies = [
        {top: 0,left: 110
},{top: 0,left: 210
},{top: 0,left: 310
},{top: 0,left: 410
},{top: 0,left: 510
},{top: 0,left: 610
},{top: 0,left: 710
},{top: 0,left: 810
},{top: 0,left: 910
},{top: 0,left: 1010
},{top: 55,left: 110
},{top: 55,left: 210
},{top: 55,left: 310
},{top: 55,left: 410
},{top: 55,left: 510
},{top: 55,left: 610
},{top: 55,left: 710
},{top: 55,left: 810
},{top: 55,left: 910
},{top: 55,left: 1010
},{top: 110,left: 110
},{top: 110,left: 210
},{top: 110,left: 310
},{top: 110,left: 410
},{top: 110,left: 510
},{top: 110,left: 610
},{top: 110,left: 710
},{top: 110,left: 810
},{top: 110,left: 910
},{top: 110,left: 1010
}

        ]
            
        // function for key detection 
        document.onkeydown = function(e){
            console.log(e);
            if( (e.keyCode === 37)&&(hero.left>10)){
                 hero.left = hero.left - 10;
                console.log("left");
                moveHero();
             
            }

            else if((e.keyCode === 39)&&(hero.left+60 < 1276)){
                 hero.left += 10;
                console.log("right");
                moveHero();
            }

            else if((e.keyCode === 38)&&(hero.top>10)){
            
            hero.top -= 10 ;   
            console.log("up"); 
            moveHero();
            }

            else if((e.keyCode === 40)&&(hero.top+50<642)){
            
            hero.top += 10 ;  
              console.log("down"); 
                moveHero();
            }

            else if(e.keyCode === 32){
                console.log("Fire")
                missiles.push({top:  hero.top ,
                    left : hero.left +14.5
                    
                } )
                const music_5 = new Audio('galaga/audio/audio_laser.ogg');
                        music_5.play();
                        
                        music_5.loop =false;
            drawMissiles()
            
            }  
        }
        // function for moving hero
        function moveHero() {
            document.getElementById('hero').style.left = hero.left+'px';
            document.getElementById('hero').style.top = hero.top+'px';
        }
        
        //function for drawing missiles into the background
        function drawMissiles(){
            
            document.getElementById('missiles').innerHTML='';
            for(var missile = 0;missile < missiles.length;missile+= 1){
                
                document.getElementById('missiles').innerHTML+= `<div class = "missile" style = 'left:${missiles[missile].left}px;top:${missiles[missile].top}px;'></div>`;
                
            }
        }
        
        //function for moving the drawed missiles
        function moveMissiles() {
           
            for(var missile = 0;missile < missiles.length;missile+= 1){
                missiles[missile].top = missiles[missile].top - 5;}
                }
        
        //function for calling the functions movemissiles and drawmissiles 
        
        function gameLoop(){
           gl =  setTimeout(gameLoop, 10  )
            
            moveMissiles();
            drawMissiles();
        }   
        gameLoop()
           

        
   
        //function to call the move and draw enemies repeatedly  
        
        function enemyLoop(){
           el= setTimeout(enemyLoop,100)
            drawEnemies();
            moveEnemies();
            
        }
        enemyLoop()
        //function to loop and detect collisions faster
        function collisionLoop(){
           cl= setTimeout(collisionLoop,100)
            collisionDetection();
            drawEnemies();  
            moveHero();
            collisionDetectionforenemyMissiles();
            collisionDetectionBetweenHeroAndEnemy();
        }
        collisionLoop()
        //function to draw enemies to the background
        function drawEnemies(){
            document.getElementById('enemies').innerHTML='';
            for(var enemy = 0;enemy < enemies.length;enemy+= 1){
                
                document.getElementById('enemies').innerHTML+= `<div class = "enemy" style = 'left:${enemies[enemy].left}px;top:${enemies[enemy].top}px;'></div>`;
                
            }
            
        }
        drawEnemies()
        
        //funtion to move the drawed enemies
        
        function moveEnemies(){
            //needs to be fixed 
           
           
            for(var enemy = 0;enemy < enemies.length;enemy+= 1){
             
               
                enemies[enemy].top = enemies[enemy].top + 1
                
              
                
            
        }
    }  
                
        
        // function to detect the collision
        function collisionDetection(){
            for(var enemy = 0;enemy < enemies.length;enemy+= 1){
                for(var missile = 0;missile < missiles.length;missile+= 1){
                    if((missiles[missile].top <= enemies[enemy].top+50)&&
                    (missiles[missile].top > enemies[enemy].top)&&
                    (missiles[missile].left >= enemies[enemy].left)&&
                    (missiles[missile].left <= enemies[enemy].left + 50)){
                        const music_2 = new Audio('galaga/audio/killenemy.mp3');
                        music_2.play();
                        
                        music_2.loop =false;
                        enemies.splice(enemy,1);
                        score += 100;
                        document.getElementById("score").innerHTML = `<h2 style = "color:#7fff00 "; >score: ${score}</h2>`
                        missiles.splice(missile,1);
                        if(score === 3000){
                            document.getElementById("gameover").innerHTML=`<h1 style="color:#7fff01">NICE GAME , YOU WON!</h1>`
                        }
                    }
                }
            }
        }
        collisionDetection()
    function drawEnemyMissiles(){
        
            
            document.getElementById('enemyMissiles').innerHTML='';
            for(var enemyMissile = 0;enemyMissile < enemyMissiles.length;enemyMissile+= 3){
    
                document.getElementById('enemyMissiles').innerHTML+= `<div class = "enemyMissile" style = 'left:${enemyMissiles[enemyMissile].left}px;top:${enemyMissiles[enemyMissile].top}px;'></div>`;
                
            

            }
    }
    drawEnemyMissiles()
      //function for moving enemyMissiles 
    function moveEnemyMissiles(){
        for(var enemyMissile = 0;enemyMissile < enemyMissiles.length;enemyMissile+= 1){
            if(enemyMissiles[enemyMissile].top <= 630){
                enemyMissiles[enemyMissile].top = enemyMissiles[enemyMissile].top + 5;}
                
            else {enemyMissiles.splice(enemyMissile)
            }
        }
        }
    function enemyMissilesloop(){
        em = setTimeout(enemyMissilesloop,10)
        moveEnemyMissiles();
        drawEnemyMissiles();
        
        isBottom();
    }
    enemyMissilesloop()
  
   
            
    
    //removing the enemymissile div after they leave the background
    function removeEnemyMissiles(x) {
        console.log("function invoked")
        enemyMissiles.splice(x,3)

            console.log("object removed !!!") ;
            
            
        }   
    //to detect if the enemy missile reached to the bottom
    function isBottom(){
        
        for(var enemyMissile = 0;enemyMissile < enemyMissiles.length;enemyMissile+= 1){
            if(enemyMissiles[enemyMissile].top === 1270){
                console.log("is bottom is working")
                removeEnemyMissiles(enemyMissile)
            }
        }
    }
    function collisionDetectionforenemyMissiles(){
            for(var enemy = 0;enemy < enemies.length;enemy+= 1){
                for(var enemyMissile = 0;enemyMissile < enemyMissiles.length;enemyMissile+= 1){
                    if((enemyMissiles[enemyMissile].top >= hero.top)&&
                    (enemyMissiles[enemyMissile].top < hero.top+48)&&
                    (enemyMissiles[enemyMissile].left <= hero.left+48)&&
                    (enemyMissiles[enemyMissile].left >= hero.left+10)){
                        
                        //show gameover pop up
                        clearInterval(gl)
                        clearInterval(el)
                        document.getElementById("score").innerHTML = `<h2 style = "color:#7fff00 "; >score: ${score}</h2>`
                        document.getElementById("gameover").innerHTML=`<h1 id = 'h1' style="color:#7fff01">GAME OVER!</h1>`
                    break;
                    }
                }
            }
        }
        function collisionDetectionBetweenHeroAndEnemy(){
            for(var enemy = 0;enemy < enemies.length;enemy+= 1){
                
                    if((hero.top <= enemies[enemy].top+50)&&
                    (hero.top > enemies[enemy].top)&&
                    (hero.left >= enemies[enemy].left)&&
                    (hero.left <= enemies[enemy].left + 50)){
                       
                        clearInterval(gl)
                        console.log("collision detected")
                        clearInterval(el)
                        document.getElementById("score").innerHTML = `<h2 style = "color:#7fff00 "; >score: ${score}</h2>`
        
                        document.getElementById("gameover").innerHTML=`<h1 id = 'h1' style="color:#7fff01">GAME OVER!</h1>`
                        break;
                    }}}