// Get the canvas and context
        const canvas = document.getElementById("game_window_layer");
        const ctx = canvas.getContext("2d");

        // Load the image
        const car = new Image();
        car.src = "Images/cartred.png"; // path to your image
        //road
        const road = new Image();
        road.src = "Images/road.png";
        const imggrass = new Image();
        imggrass.src = "Images/grass1.png";

        const tree = new Image();
        tree.src = "Images/tree.png";
        // const rosegrass = new Image();
       //car oposite 
       const cartblack=new Image();
       cartblack.src="Images/cartblack.png";

       const car3 = new Image();
       car3.src="Images/carty.png";

       const car4 = new Image();
       car4.src="Images/cartred2.png";
        
       const city = new Image();
       city.src="Images/city.png";

       const cartw=new Image();
       cartw.src="Images/cartw.png";

        let car1y=280;//y-position
        let car1x=1;//x-position

        let car3x = 400;
        let car3y=220;

        let car4x = 1200;
        let car4y = 220;

        let cartblackx = 800;
        let cartblacky = 280;

        let cartwx= 1600;
        let cartwy = 280;

        //crow fly
        const crow=document.getElementById("crowfly");
        let crowx = 180;
        let crowDirection = 1;

        function moveCrow() {
            crowx += 2 * crowDirection;
            if (crowx > 900 || crowx < 0) {
                crowx=180;
                // document.getElementById("crowfly").style.display="none";
            }
            document.getElementById("crowfly").style.left = crowx + "px";
            requestAnimationFrame(moveCrow);
        }



        // redraw everything
function draw() {

    if (
        !car.complete ||
        !cartblack.complete ||
        !car3.complete ||
        !car4.complete ||
        !cartw.complete ||
        !imggrass.complete ||
        !tree.complete ||
        !road.complete ||
        !city.complete
    ){
        return;
    }

    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(city,30,50,650,150);
    ctx.drawImage(tree,1,80,120,150);
    ctx.drawImage(tree,700,80,120,150);
    ctx.drawImage(imggrass,1,170,900,45);
    ctx.drawImage(road,1,210,900,130);
    ctx.drawImage(cartw,cartwx,cartwy,100,50);
    ctx.drawImage(car4,car4x,car4y,100,50);
    ctx.drawImage(cartblack,cartblackx,cartblacky,100,50);
    ctx.drawImage(car3,car3x,car3y,100,50);
    ctx.drawImage(car, car1x, car1y, 100, 50);
    ctx.drawImage(imggrass,2,310,900,50);
}

     
        //move mycar
        function btn_up(){ 
            if (car1y > 230) {  // prevent going above road
                car1y -= 60; 
                draw();
            }
        }
        function btn_down(){ 
            if (car1y < 280) {  // 100 is car height + remaing height
                car1y += 60; 
                draw();
            }
        }
        function btn_left(){ 
            if (car1x > 1) {   // canvas width 850 car width 100
                car1x -= 10; 
                draw();
            }
        }
        function btn_right(){ 
            if (car1x < 740 ) { // prevent off right side
                car1x += 10; 
                draw();
            }
        }
            
        // --- Keyboard Controls ---
        document.addEventListener("keydown", function(event) {
            switch(event.key) {
                case "ArrowUp": btn_up(); break;
                case "ArrowDown": btn_down(); break;
                case "ArrowLeft": btn_left(); break;
                case "ArrowRight": btn_right(); break;
            }
        });

        //-----------auto move car2-------------
        let score=0;
        let gameover=false;

        //start
        let gamestart=false;
        function startgame(){
            gameover=false;
            // reset positions so player does not collide instantly
            car1x = 0;
            car1y = 280;

            car3x = 400;
            car3y = 220;

            cartblackx = 800;
            cartblacky = 280;

            car4x = 1200;
            car4y = 220;

            cartwx= 1600;
            cartwy = 280;
            moveCrow(); // start animation

            document.getElementById("crowfly").style.display="block";

            score = 0;
            document.getElementById("scorein").value = score;
    
            document.getElementById("home").style.display="none";
            document.getElementById("startgame").style.display="none";

            document.getElementById("btn_up").style.display="block";
            document.getElementById("btn_down").style.display="block";
            document.getElementById("btn_left").style.display="block";
            document.getElementById("btn_right").style.display="block";
            gamestart=true;
            document.getElementById("game_over_popup").style.display="none";//hide restart button
            rungame();   
        }

        
        function rungame(){
            if (gameover) return; // stop update if crash happened

            //auto increases speed
                let cbx = 2
                let c3x = 2
                let c4x = 2
                let cwx = 2
            if(score>30){
                cbx = 3
                c3x = 3
                c4x = 3
                cwx = 3
            }
            if(score>100){
                cbx = 4
                c3x = 4
                c4x = 4
                cwx = 4
            }if(score>200){
                cbx = 5
                c3x = 5
                c4x = 5
                cwx = 5
            }if(score>350){
                cbx = 6
                c3x = 6
                c4x = 6
                cwx = 6
            }if(score>950){
                cbx = 7
                c3x = 7
                c4x = 7
                cwx = 7
            }

            cartblackx -=cbx;//move left starting position 800
            car3x -=c3x;// starting posittion 400
            car4x -=c4x;// starting position 1200
            cartwx -=cwx;// starting position 1600
            
            
            //if it go out reset to right
            if(cartblackx<-100){cartblackx=cartwx+(7*100); score+=5;}
            if(cartwx<-100){ cartwx=cartblackx+(7*100); score+=5;}
            if(car3x<-100){ car3x=car4x+(7*100); score+=5;}
            if(car4x<-100){ car4x=car3x+(7*100); score+=5;}
            
            //score check
            document.getElementById("scorein").value=score;
            
            // check collision
            if (
                car1x < cartblackx + 90 &&
                car1x + 90 > cartblackx &&
                car1y < cartblacky + 45 &&
                car1y + 45 > cartblacky
            ) { 
                carcrash(); return;
            }
            else if(
                car1x < car3x + 90 && car1x + 90 > car3x &&
                car1y < car3y + 45 && car1y + 45 > car3y
            ){ carcrash(); return;}
            else if(
                car1x < car4x + 90 && car1x + 90 > car4x &&
                car1y < car4y + 45 && car1y + 45 > car4y
            ){ carcrash(); return;}
            else if(
                car1x < cartwx + 90 && car1x + 90 > cartwx &&
                car1y < cartwy + 45 && car1y + 45 > cartwy
            ){ carcrash(); return;}

            draw();
            requestAnimationFrame(rungame);
        }

        //-----------------game over popup functions---------------------//
        //restart 
        function restartn(){
            car1x = 0;
            car1y = 280;

            car3x = 400;
            cartblackx = 800;
            car4x = 1200;
            cartwx= 1600;
            score=0;
         
            gameover=false;

            document.getElementById("crowfly").style.display="block";
        
            document.getElementById("scorein").value=score;
            document.getElementById("gameover").innerText=" ";
            document.getElementById("game_over_popup").style.display="none";//hide restart button
            rungame(); moveCrow(); // start animation
        }

        //home
        function btn_home(){
            document.getElementById("home").style.display="block";
            document.getElementById("startgame").style.display="block";
            document.getElementById("game_over_popup").style.display="none";
            document.getElementById("btn_up").style.display="none";
            document.getElementById("btn_down").style.display="none";
            document.getElementById("btn_left").style.display="none";
            document.getElementById("btn_right").style.display="none";
            
        }
        
        //-----------------------game over popup functions end-----------------------//
        //car crash
            function carcrash(){
                gameover=true;
                document.getElementById("game_over_popup").style.display="block";
                document.getElementById("crowfly").style.display="none";
                document.getElementById("gameover").innerText="💥 Crash! Game Over "+'score:'+score;

            }

