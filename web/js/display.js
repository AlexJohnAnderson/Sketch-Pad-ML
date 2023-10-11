function createRow(container, studentName, samples){
    const row=document.createElement("div");
    row.classList.add("row");
    container.appendChild(row);

    const rowLabel=document.createElement("div");
    rowLabel.innerHTML=studentName;
    rowLabel.classList.add("rowLabel");
    row.appendChild(rowLabel);

    for(let sample of samples){
        const {id, label}=sample;

        const sampleContainer=document.createElement("div");
        sampleContainer.id="sample_"+id;
        sampleContainer.classList.add("sampleContainer");

        const sampleLabel=document.createElement("img");
        sampleLabel.innerHTML=label;
        sampleContainer.appendChild(sampleLabel);

        
        const img=document.createElement('img');
        img.src=constants.IMG_DIR+'/'+id+'.png';
        img.classList.add("thumb");
        sampleContainer.appendChild(img);

        row.appendChild(sampleContainer);
    }
}

function handleClick(sample){
    const el=document.getElementById("sample_"+sample.id);
    el.classList.add("emphasize");
    el.scrollIntoView({behavior:'auto', block:'center'})
}

function toggleInput(){
    if(chartContainer.style.display=="none"){
        chartContainer.style.display="block";
    }
    else{
        chartContainer.style.display="none";
    }
}