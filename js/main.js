let linkId ;
let imageUrl;
let mousePos = {};
let isContextMenuDisplayed = false;
let currentHoverImageIdx = 0;

function initApp(){
  document.addEventListener("mousemove",onMouseMove,false);
  document.addEventListener("click", bodyClickHandler,false);
  displayImages();
}

function onMouseMove(e)
{
  mousePos = { x: e.clientX, y: e.clientY };
}

function drawContextMenu()
{
  isContextMenuDisplayed = true;
  console.log('drawContextMenu : ' + new Date())
  //console.log($('.EScontextMenu').text());
  document.querySelector('.RADcontextMenu').style.visibility = "visible";
  document.querySelector('.RADcontextMenu').style.display = "block";
  document.querySelector('.RADcontextMenu').style.top = mousePos.y + "px";
  document.querySelector('.RADcontextMenu').style.left = mousePos.x + "px";
}

function onContextMenuClick(e)
{
  console.log("onContextMenuClick()");
  hideContextMenu();
  
  console.log(e.id);
  switch (e.id)
  {
    case 'delete_item':
      {
        // load all localStorage images into array.
        let allImg = JSON.parse(localStorage.getItem("allImg"));
        // remove targeted item
        allImg.splice(currentHoverImageIdx,1);
        // store updated array to localStorage
        localStorage.setItem("allImg",JSON.stringify(allImg));
        removeMainDiv();
        displayImages();
        break;
      }
    case 'last5files':
      {
        // $("#div2").load(hostRoot + "FtpActivity/GetRecentFiles?ftpConnectionId=" + userId + "&command=stor" + "&limit=5");
        // initNewDraggable("div1", "div2");
        // break;
      }
    case 'last5filesRETR':
      {
        // $("#div2").load(hostRoot + "FtpActivity/GetRecentFiles?ftpConnectionId=" + userId + "&command=retr" + "&limit=5" + "&isDownload=true");
        // initNewDraggable("div1", "div2");
        // initResult("div2");
        // break;
      }
    case 'lastActivity':
      {
        // $("#div2").load(hostRoot + "FtpActivity?ftpConnectionId=" + userId + "&limit=15");
        // initNewDraggable("div1", "div2");
        // break;
      }
  }
}

function bodyClickHandler()
{
  console.log("bodyClickHandler");
  hideContextMenu();
}

function hideContextMenu()
{
  if (isContextMenuDisplayed) {
      document.querySelector(".RADcontextMenu").style.visibility = "hidden";
      document.querySelector(".RADcontextMenu").style.display = "none";
      //$('.ESResultcontextMenu').css({ 'visibility': 'hidden', 'display': 'none' });
      isContextMenuDisplayed = false;
    }
}

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
        imgLink.addEventListener("mouseenter", (e) => {
            if (e.target.parentNode === null){return;}
            if (e.target.id !== null && e.target.id !== ""){
              // the image link id has format imgX where X is Index value
              currentHoverImageIdx = e.target.id.split("img")[1];
              console.log(currentHoverImageIdx);
            }
        },false);
        imgLink.addEventListener('contextmenu', e => {
          if (e.target.parentNode === null){return;}
          if (e.shiftKey == false) {
            e.preventDefault();
            drawContextMenu();
          }
        });
        
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