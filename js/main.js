let linkId ;
let imageUrl;

function displayImages(){
  
    let mainDiv = document.createElement("div");
    mainDiv.id="mainDiv";
    document.body.appendChild(mainDiv);

    let allSavedImages = JSON.parse(localStorage.getItem("allImg"));

    if (allSavedImages === null){allSavedImages=[];}

    for (let imageIdx=0; imageIdx < allSavedImages.length;imageIdx++){

        let imgLink = document.createElement("a");
        imageUrl = allSavedImages[imageIdx];
        linkId = "img" + imageIdx;
        imgLink.href = imageUrl
        imgLink.id = linkId;
        imgLink.target="_blank";

        var myImg = document.createElement("img");
        myImg.src = imageUrl;

        mainDiv.appendChild(imgLink);
        document.querySelector("#"+linkId).appendChild(myImg);
    }
}

function addImage(){
  let allImages = JSON.parse(localStorage.getItem("allImg"));

  if (allImages === null){
    allImages = [];
  }
 let localUrl = document.querySelector("#imageUrl").value ;
 allImages.push(localUrl);
  localStorage.setItem("allImg",JSON.stringify(allImages));
  document.querySelector("#imageUrl").value = "";
  removeMainDiv();
  displayImages();
}

function removeMainDiv(){
    let mainDiv = document.querySelector("#mainDiv");
    mainDiv.remove();
}

function clearLocalStorage(){
  alert("clearing...")
//  localStorage.clear();
  let allImgs = JSON.parse(localStorage.getItem("allImg"));
  
  allImgs = allImgs.slice(0,5);
  //alert(allImgs);
  localStorage.setItem("allImg", JSON.stringify(allImgs));
}