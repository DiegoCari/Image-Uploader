const title = document.querySelector(".title");
const subTitle = document.querySelector(".sub-title");
const uploadCard = document.querySelector(".upload-card");
const dropZone = document.querySelector(".drop-zone");
const fileInput = document.querySelector("#file-input");
const imageDrop = document.querySelector(".image-drop");
const uploadSuccessImage = document.querySelector(".upload-success-image");
const uploadSuccessCheck = document.querySelector(".upload-success-check");
const titleCheck = document.querySelector(".title-check");
const linkContainer = document.querySelector(".upload-success-link-container");
const uploadSuccessLink = document.querySelector(".upload-success-link");
const uploadSuccessCopy = document.querySelector(".upload-success-copy-link");
const reset = document.querySelector(".upload-success-reset-link");
const fotoSubida = document.querySelector(".foto-subida");

dropZone.addEventListener("dragover", (e)=>{
    e.preventDefault();
    dropZone.classList.add("drop-zone-dragover");
});
["dragleave", "dragend"].forEach((typed) => {
    dropZone.addEventListener(typed, (e) => {
        e.preventDefault();
        dropZone.classList.remove("drop-zone-dragover");
    })
});

dropZone.addEventListener("drop", e => {
    e.preventDefault();
    dropZone.classList.remove("drop-zone-dragover");
    styleChange()
    let link = e.dataTransfer.files[0]
    let url =  URL.createObjectURL(link);
    uploadSuccessImage.style.display = "block"
    uploadSuccessImage.src = `${url}`

    const formdata = new FormData()
        formdata.append("image", e.dataTransfer.files[0])
    
        fetch("https://api.imgur.com/3/image/", {
            method: "post",
            headers: {
                Authorization: "Client-ID 4c0323252922a32"
            },
            body: formdata
        }).then(data => data.json()).then(data => {
            uploadSuccessLink.value = data.data.link;
        });
});

    fileInput.addEventListener("change", e=> {
        styleChange()
        const formdata = new FormData()
        formdata.append("image", e.target.files[0])
    
        fetch("https://api.imgur.com/3/image/", {
            method: "post",
            headers: {
                Authorization: "Client-ID 4c0323252922a32"
            },
            body: formdata
        }).then(data => data.json()).then(data => {
            uploadSuccessLink.value = data.data.link;

        });
    });

    fileInput.addEventListener("change", function() {
        styleChange()
        const file = this.files[0];
    
        if (file) {
            const reader = new FileReader();
            reader.addEventListener("load", function(){
                uploadSuccessImage.style.display = "block"
                uploadSuccessImage.src = this.result;
            });
            reader.readAsDataURL(file)
        } 
    });

var myHeaders = new Headers();
myHeaders.append("Authorization", "Client-ID 4c0323252922a32");

var requestOptions = {
method: 'GET',
headers: myHeaders,
redirect: 'follow'
};

fetch("https://api.imgur.com/3/album/ryQCmre", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));

// cambio de estilos

function styleChange() {
    title.style.display = "none";
    subTitle.style.display = "none";
    dropZone.style.display = "none";
    uploadCard.style.display = "none";

    uploadSuccessCheck.style.display = "block";
    titleCheck.style.display = "block";

    linkContainer.style.display = "flex";
    uploadSuccessLink.style.display = "flex";
    uploadSuccessCopy.style.display = "block";
    reset.style.display = "block";
    imageDrop.style.display = "nonr";
}
// boton de copiar
uploadSuccessCopy.addEventListener("click", () => {
    uploadSuccessLink.select();
    document.execCommand("copy");
    fotoSubida.classList.add("foto-subida-activo");

    setTimeout(() => {
        fotoSubida.classList.remove("foto-subida-activo");
    }, 2000);
});
// boton de reiniciar
reset.addEventListener("click", ()=>{
    location.reload();
})


