let hidden = [];
let showingAll = false;
let showing = false;
let headVisible = true;
let x = $('li[id^=0H4]');
let copy = x.slice();
let head = $('.aloha-carousel.slick-initialized.slick-slider');
let savedHead = head[0];
chrome.storage.sync.get('hiddenTiles', (data)=> {
  hidden = data.hiddenTiles;
  reload();
});

$('header').prepend('<button id="carouselToggle" style="margin:15px;float:left;">Hide Carousel</button>');
$('header').prepend('<button id="showRemove" style="margin:15px;float:left;">Edit Tiles</button>');
$('button[id=carouselToggle]').click(toggle);
$('button[id=showRemove]').click({param1:true},showRemoveButtons);

function toggleCarousel(){
  if(headVisible){
    head.html('');
    headVisible = false;
    $('#sortable').css("padding-top","35px");
  }else{
    head.html(savedHead);
    headVisible = true;
  }
}

function toggle(){
  if(!showing){
    showingAll = showingAll ? false : true;
    console.log("ShowingAll :",showingAll);
    reload();
  }
}

function showAll(){
    $('#sortable').html('');
    for(let i = 0; i < copy.length; i++){
      $('#sortable').append(copy[i]);
    }
}

function showRemoveButtons(toggle){
  if(showing){
    let xbuttons = $('button[id="hide_button"]');
    for(let i = 0; i < xbuttons.length; i++){
      xbuttons[i].parentElement.removeChild(xbuttons[i]);
    }

    showing = toggle ? false : true;
  }else{
    var xButton =  '<button id="hide_button" style="z-index:2;position:absolute; width:25px; height:25px;margin:0px;">x</button>';
    x.prepend(xButton);
    let buttons = $('button[id="hide_button"]');
    buttons.click(hide);
    showing = toggle ? true : false;
  }
}


function reload(){
  if (showingAll){
    showAll();
    showing = true;
    showRemoveButtons(false);
  }else{
    x = $('li[id^=0H4]');
    for (let i = 0; i < x.length; i++){

      if(hidden.indexOf(x[i].id) > -1){
        x[i].parentElement.removeChild(x[i]);
      }
    }
  }
}

function hide(event){
  hidden.push(event.target.parentElement.id);
  chrome.storage.sync.set({'hiddenTiles': hidden},() => {
  reload();
  });
}

reload();