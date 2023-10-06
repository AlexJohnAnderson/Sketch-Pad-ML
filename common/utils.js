const utils={};

utils.styles={
    car:'gray',
    fish:'blue',
    house:'pink',
    tree:'green',
    bicycle:'cyan',
    guitar:'brown',
    pancil:'yellow',
    clock:'black',
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


if(typeof module!=='undefined'){
    module.exports=utils;
}