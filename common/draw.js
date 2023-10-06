const draw={};

//function to draw the image on the cnavas
draw.path=(ctx,path,color="black")=>{
   //defines stroke style
   ctx.strokeStyle=color;
   //defines width
   ctx.lineWidth=3;
   //begins path
   ctx.beginPath();
   //moves to first coordinate of mouse/touch event
   ctx.moveTo(...path[0]);
   //for entire path length draw line
   for(let i=1;i<path.length;i++){
      ctx.lineTo(...path[i]);
   }
   //set end cap shape
   ctx.lineCap="round";
   //set joint shape
   ctx.lineJoin="round";
   //outlines path with stroke style
   ctx.stroke();
}

draw.paths=(ctx,paths,color="black")=>{
   for(const path of paths){
      //draws path for length of path
      draw.path(ctx,path,color);
   }
}

if(typeof module !== 'undefined'){
   module.exports=draw;
}
