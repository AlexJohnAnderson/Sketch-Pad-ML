class SketchPad{
    constructor(container,size=400){
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
       
       //resets the canvas and initialized some properties
       this.reset();
       //event listener that 
       this.#addEventListeners();
    }
    //reset function that is called when we need to clear the canvas
    reset(){
       this.paths=[];
       this.isDrawing=false;
       this.#redraw();
    }
 
    #addEventListeners(){
       this.canvas.onmousedown=(evt)=>{
          const mouse=this.#getMouse(evt);
          this.paths.push([mouse]);
          this.isDrawing=true;
       }
       this.canvas.onmousemove=(evt)=>{
          if(this.isDrawing){
             const mouse=this.#getMouse(evt);
             const lastPath=this.paths[this.paths.length-1];
             lastPath.push(mouse);
             this.#redraw();
          }
       }
       document.onmouseup=()=>{
          this.isDrawing=false;
       }
       this.canvas.ontouchstart=(evt)=>{
          const loc=evt.touches[0];
          this.canvas.onmousedown(loc);
       }
       this.canvas.ontouchmove=(evt)=>{
          const loc=evt.touches[0];
          this.canvas.onmousemove(loc);
       }
       document.ontouchend=()=>{
          document.onmouseup();
       }
       this.undoBtn.onclick=()=>{
          this.paths.pop();
          this.#redraw();
       }
    }
 
    #redraw(){
       this.ctx.clearRect(0,0,
          this.canvas.width,this.canvas.height);
       draw.paths(this.ctx,this.paths);
       if(this.paths.length>0){
          this.undoBtn.disabled=false;
       }else{
          this.undoBtn.disabled=true;
       }
    }
 
    #getMouse=(evt)=>{
       const rect=this.canvas.getBoundingClientRect();
       return [
          Math.round(evt.clientX-rect.left),
          Math.round(evt.clientY-rect.top)
       ];
    }
 }