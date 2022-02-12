let linkId ;
let imageUrl;
let mousePos = {};
let isContextMenuDisplayed = false;
let currentHoverImageIdx = 0;
let currentImageAddress = "";
let userGuid = null;
let password = null;
var pwdModal = null;

function initApp(){
  
  document.addEventListener("mousemove",onMouseMove,false);
  document.addEventListener("click", bodyClickHandler,false);
  let savePwdButton = document.querySelector("#savePwdButton");
  savePwdButton.addEventListener("click", savePassword);
  
  getUserGuid();
  getUserPassword();
  displayImages();
}

function onMouseMove(e)
{
  mousePos = { x: e.clientX, y: e.clientY };
}

function savePassword(){
  let pwd = document.querySelector("#password").value;
  if (pwd === ""){
    alert("Password cannot be blank.  Please provide a password.");
    return;
  }
  if (pwd.length < 15){
    alert("You must provide a password that is at least 15 characters long.");
    return;
  }
  pwdModal.toggle();
  password = pwd;
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
    case 'copy_address':
      {
        // ### --- Because of limitations on copying to clipboard 
        // ###     we have to copy from text input.
        // ####    Since we don't want that 
        let clipboard = document.querySelector("#clipboard");
        clipboard.style.visibility = "visible";
        clipboard.style.display = "block";
        clipboard.value=currentImageAddress;
        clipboard.select();
        clipboard.setSelectionRange(0,1000);
        document.execCommand("copy");
        clipboard.style.visibility = "hidden";
        clipboard.style.display = "none";

        break;
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
              currentImageAddress = e.target.href;
              console.log(currentHoverImageIdx);
              console.log(`currentImageAddress: ${currentImageAddress}`);
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

function getUserPassword(){
  if (password == null){
    pwdModal = new bootstrap.Modal(document.querySelector('#pwdModal'), {
      keyboard: false
    })
    pwdModal.toggle();
  }
}

function addImage(){
  if (password == null){
    var pwdModal = new bootstrap.Modal(document.querySelector('#pwdModal'), {
      keyboard: false
    })
    pwdModal.toggle();
  }
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

function getUserGuid(){
  userGuid = localStorage.getItem('userGuid');
  // it'll be null if it's not stored in localStorage
  if (userGuid == null){
    userGuid = uuidv4();
    localStorage.setItem('userGuid', userGuid);
  }
  return userGuid;
}

function toggleSecret(){
  let secretIdInput = document.querySelector("#password");
  if (secretIdInput.type === "password") {
      secretIdInput.type = "text";
      //secretIsDisplayed = true;
      document.querySelector("#revealPasswordButton").innerHTML = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-eye-slash' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z'/><path d='M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z'/><path d='M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709z'/><path fill-rule='evenodd' d='M13.646 14.354l-12-12 .708-.708 12 12-.708.708z'/></svg>";
  } 
  else {
      secretIdInput.type = "password";
      //secretIsDisplayed = false;
      document.querySelector("#revealPasswordButton").innerHTML = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-eye' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>  <path fill-rule='evenodd' d='M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 0 0 1.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0 0 14.828 8a13.133 13.133 0 0 0-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 0 0 1.172 8z'/>  <path fill-rule='evenodd' d='M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z'/></svg>"
  }
}


function uuidv4() {
  // got this from https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}


function clearLocalStorage(){
  alert("clearing...")
//  localStorage.clear();
  let allImgs = JSON.parse(localStorage.getItem("allImg"));
  
  allImgs = allImgs.slice(0,5);
  //alert(allImgs);
  localStorage.setItem("allImg", JSON.stringify(allImgs));
}