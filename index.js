const fileInput = document.querySelector('.file-input');
filterOptions = document.querySelectorAll('.filter button');
chooesImgBtm = document.querySelector('.choose-img');
filterName = document.querySelector('.filter-info .name');
rotateOptions = document.querySelectorAll('.rotate button');
filterSlider = document.querySelector('.slider input');
filterVal = document.querySelector('.filter-info .value');
previewImg =  document.querySelector('.preview-img img');
resetBtn =  document.querySelector('.controls .reset-filter');
saveBtn =  document.querySelector('.controls .Save-img');

let Brightness = "100", Saturation = "100" ,Inversion = "0", GrayScale="0";
let rotate = 0 , flipHorizontal = 1 ,flipVertical=1;

const applyFilters = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal},${flipVertical})`;
    previewImg.style.filter = `brightness(${Brightness}%) saturate(${Saturation}%) invert(${Inversion}%) grayscale(${GrayScale}%)`;
}


const ImageLoading = () => {
    //getting image
    let file = fileInput.files[0];
    if(!file) return;
    // console.log(file);
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load" , () => {
        resetBtn.click();
        document.querySelector(".container").classList.remove("disable");
    })
}

filterOptions.forEach(option =>{
    // Adding event to all button
    option.addEventListener('click', () => {
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;

        if(option.id === "Brightness"){
            filterSlider.max = "200";
            filterSlider.value = Brightness;
            filterVal.innerText = `${Brightness}%`;
        }else if(option.id === "Saturation"){
            filterSlider.max = "200";
            filterSlider.value = Saturation;
            filterVal.innerText = `${Saturation}%`;
        }else if(option.id === "Inversion"){
            filterSlider.max = "100";
            filterSlider.value = Inversion;
            filterVal.innerText = `${Inversion}%`;
        }else {
            filterSlider.max = "100";
            filterSlider.value = GrayScale;
            filterVal.innerText = `${GrayScale}%`;
        }
    });
    // console.log(option);
});

const updateFilter = () => {
    filterVal.innerText =  `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active");

    // console.log(Brightness , Inversion , Saturation ,GrayScale);

    if(selectedFilter.id === "Brightness"){
        Brightness = filterSlider.value;
    }else if(selectedFilter.id === "Inversion"){
        Inversion = filterSlider.value;
    }else if(selectedFilter.id === "Saturation"){
        Saturation = filterSlider.value;
    }else if(selectedFilter.id === "GrayScale"){
        GrayScale = filterSlider.value;
    }
    applyFilters();

    // console.log(filterSlider.value);

    // console.log(Brightness , Inversion , Saturation ,GrayScale);
}

rotateOptions.forEach(option =>{
    option.addEventListener('click' , ()=>{
        console.log(option.id);

        if(option.id === "left"){
            rotate -= 90;
        }else if(option.id === "right"){
            rotate += 90;
        }else if(option.id === "vertical"){
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        }else{
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        console.log(rotate);
        applyFilters();
    });
});

const resetFilters = () => {
    Brightness = "100", Saturation = "100" ,Inversion = "0", GrayScale="0";
    rotate = 0 , flipHorizontal = 1 ,flipVertical=1;
    filterOptions[0].click();
    applyFilters();
}

const saveImage = () => {
     const canvas = document.createElement("canvas");
     const ctx = canvas.getContext("2d");
     canvas.width = previewImg.naturalWidth;
     canvas.height = previewImg.naturalHeight;

     ctx.filter = `brightness(${Brightness}%) saturate(${Saturation}%) invert(${Inversion}%) grayscale(${GrayScale}%)`
     ctx.translate(canvas.width/2 ,canvas.height/2);
     console.log(rotate);
     if(rotate !== 0){
        ctx.rotate(rotate*Math.PI/180);
     }
     ctx.scale(flipHorizontal ,flipVertical);
     
     ctx.drawImage(previewImg , -canvas.width/2 , -canvas.height/2 ,canvas.width ,canvas.height);
    //  document.body.appendChild(canvas);
     const link = document.createElement('a'); 
     link.download = "image.jpg";
     link.href = canvas.toDataURL();
     link.click();

}


fileInput.addEventListener('change',ImageLoading);
filterSlider.addEventListener('input',updateFilter);
resetBtn.addEventListener('click',resetFilters);
chooesImgBtm.addEventListener('click',() => fileInput.click());
saveBtn.addEventListener('click', saveImage);


