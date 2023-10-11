class SketchPad{
    constructor(container, onUpdate=null, size=400){
        //creat the canvas
       this.canvas=document.createElement("canvas");
       //set width to size
       this.canvas.width=size;
       //set height to size
       this.canvas.height=size;
       //style the canvas with css
       this.canvas.style=`
          background-color:white;
          box-shadow: 0px 0px 10px 2px black;
       `;
       //append the canvas to container param
       container.appendChild(this.canvas);
       //create a way to add new lines to document
       const lineBreak=document.createElement("br");
       container.appendChild(lineBreak);
       //UNDO button that will clean canvas
       this.undoBtn=document.createElement("button");
       this.undoBtn.innerHTML="UNDO";
       container.appendChild(this.undoBtn);
       //sets the canvas contect to 2d
       this.ctx=this.canvas.getContext("2d");
       
       this.onUpdate=onUpdate;
       //resets the canvas and initialized some properties
       this.reset();
       //event listener that 
       this.#addEventListeners();
    }
    //reset function that is called when we need to clear the canvas
    reset(){
        //reset the array that stores the path of the mouse
       this.paths=[];
       //set is.drawing to false
       this.isDrawing=false;
       //call to redraw to update the canvas
       this.#redraw();
    }
    //event liseteners for mouse functions
    #addEventListeners(){
        //triggers when mouse button is pressed down on the canvas
       this.canvas.onmousedown=(evt)=>{
          //gets mouse's cooridinates
          const mouse=this.#getMouse(evt);
          //adds a new drawing path to the array, starting with the current coordinates 
          this.paths.push([mouse]);
          //sets isdrawing to true
          this.isDrawing=true;
       }
       //triggered when the mouse is moved over the canvas
       this.canvas.onmousemove=(evt)=>{
            //checks is user is currently drwaing
          if(this.isDrawing){
            //call to get mouse to get the coordinates
             const mouse=this.#getMouse(evt);
             //adds the current coordinates to the paths array
             const lastPath=this.paths[this.paths.length-1];
             lastPath.push(mouse);
             //call to redraw to update the canvas
             this.#redraw();
          }
       }
       //triggered when mouse button is released
       document.onmouseup=()=>{
          this.isDrawing=false;
       }
       //triggered when a touch event is started on the canvas
       this.canvas.ontouchstart=(evt)=>{
          //retrieves the coordinates of the first touch
          const loc=evt.touches[0];
          //simulates a mouse down event
          this.canvas.onmousedown(loc);
       }
       //triggered when the mouse is moved across the canvas
       this.canvas.ontouchmove=(evt)=>{
          //retrieves the coordinates of the first touch
          const loc=evt.touches[0];
          //simulates a mouse move event
          this.canvas.onmousemove(loc);
       }
       //triggered when a touch event ends anywhere on the document
       document.ontouchend=()=>{
          //simulates a mouse up event
          document.onmouseup();
       }
       //function to handle erasing the canvas when the UNDO button is clicked
       this.undoBtn.onclick=()=>{
          this.paths.pop();
          this.#redraw();
       }
    }
    //redraw function to redraw the canvas to reflect changes
    #redraw(){
        //clears the canvas by filing it with a transparent background
       this.ctx.clearRect(0,0,
          this.canvas.width,this.canvas.height);
        //fills the canvas in with the paths array
       draw.paths(this.ctx,this.paths);
       //checks for path length and enables or diasables the undo button accordingly
       if(this.paths.length>0){
          this.undoBtn.disabled=false;
       }else{
          this.undoBtn.disabled=true;
       }
       if(this.onUpdate){
          this.onUpdate(this.paths);
       }
    }
    //function to get mouse/touch coordinates
    #getMouse=(evt)=>{
       //gets the position of the rectangleular canvas relative to the viewport
       const rect=this.canvas.getBoundingClientRect();
       //calculates and returns and array of the x and y coordinates of the mouse/touch event
       return [
          Math.round(evt.clientX-rect.left),
          Math.round(evt.clientY-rect.top)
       ];
    }
 }