const utils={};

utils.styles={
    car:{color:'gray', text:'🚗'},
    fish:{color:'blue', text:'🐟'},
    house:{color:'pink', text:'🏠'},
    tree:{color:'green', text:'🌳'},
    bicycle:{color:'cyan', text:'🚲'},
    guitar:{color:'brown', text:'🎸'},
    pencil:{color:'yellow', text:'✏️'},
    clock:{color:'black', text:'⏰'},
}

utils.formatPercent=(n)=>{
    return (n*100).toFixed(2)+"%";
}

utils.printProgress=(count, max)=>{
    process.stdout.clearLine();
    process.stdout.cursorTo();
    const percent=utils.formatPercent(count/max);
    process.stdout.write(count+"/"+max+"("+percent+")");
}

utils.groupBy=(objArray, key)=>{
    const groups={};
    for(let obj of objArray){
        const val=obj[key];
        if(groups[val]==null){
            groups[val]=[];
        }
        groups[val].push(obj);
    }
    return groups;
}

//calculates distance using pythagorean theorem
utils.distance=(p1,p2)=>{
    return Math.sqrt(
       (p1[0]-p2[0])**2+
       (p1[1]-p2[1])**2
    );
 }
 
 //given location and set of points
 //initializes min distance using max possible number
 //loop through all points and calculates distance to point
 //if a closer point is found then replace variable, d
 utils.getNearest=(loc,points)=>{
    let minDist=Number.MAX_SAFE_INTEGER;
    let nearestIndex=0;
 
    for(let i=0;i<points.length;i++){
       const point=points[i];
       const d=utils.distance(loc,point);
 
       if(d<minDist){
          minDist=d;
          nearestIndex=i;
       }
    }
    return nearestIndex;
 }


if(typeof module!=='undefined'){
    module.exports=utils;
}