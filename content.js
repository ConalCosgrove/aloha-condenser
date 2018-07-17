let hidden = [];
let showing = false;
let x = $('li[id^=0H4]');
chrome.storage.sync.get('hiddenTiles', (data)=> {
  hidden = data.hiddenTiles;
  reload();
});

$('header').prepend('<button id="showRemove" style="margin:15px;float:left;">Edit Tiles</button>');
$('button[id=showRemove]').click(showRemoveButtons);

function showRemoveButtons(){
  if(showing){
    let xbuttons = $('button[id="hide_button"');
    for(let i = 0; i < xbuttons.length; i++){
      xbuttons[i].parentElement.removeChild(xbuttons[i]);
    }
    showing = false;
  }else{
    var xButton =  '<button id="hide_button" style="margin-right:-40px; z-index:2;position:absolute;">x</button>';
    x.prepend(xButton);
    let buttons = $('button[id="hide_button"]');
    buttons.click(hide);
    showing = true;
  }
}

function reload(){
  x = $('li[id^=0H4]');
  for(let i = 0; i < x.length; i++){

    if(hidden.indexOf(x[i].id) > -1){
      x[i].parentElement.removeChild(x[i]);
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