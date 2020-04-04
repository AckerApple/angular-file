export const isFileInput = function(elm:any){
  const ty = elm.getAttribute('type')
  return elm.tagName.toLowerCase() === 'input' && ty && ty.toLowerCase() === 'file';
}

let initialTouchStartY = 0;
let initialTouchStartX = 0;
export const detectSwipe = function(evt:any):boolean {
  var touches = evt.changedTouches || (evt.originalEvent && evt.originalEvent.changedTouches);
  if (touches) {
    if (evt.type === 'touchstart') {
      initialTouchStartX = touches[0].clientX;
      initialTouchStartY = touches[0].clientY;
      return true; // don't block event default
    } else {
      // prevent scroll from triggering event
      if (evt.type === 'touchend') {
        var currentX = touches[0].clientX;
        var currentY = touches[0].clientY;
        if ((Math.abs(currentX - initialTouchStartX) > 20) ||
          (Math.abs(currentY - initialTouchStartY) > 20)) {
          evt.stopPropagation();
          if (evt.cancelable) {
            evt.preventDefault();
          }
        }
      }
      return true;
    }
  }
  return false
}

export const createInvisibleFileInputWrap = function() {
  var fileElem = createFileInput()
  var label = document.createElement('label');
  label.innerHTML = 'upload'
  label.style.visibility = 'hidden'
  label.style.position = 'absolute'
  label.style.overflow = 'hidden'
  label.style.width = '0px'
  label.style.height = '0px'
  label.style.border = 'none'
  label.style.margin = '0px'
  label.style.padding = '0px'
  label.setAttribute('tabindex','-1')
  
  //bindAttrToFileInput(fileElem, label);
  //generatedElems.push({el: elem, ref: label});

  label.appendChild( fileElem )
  //document.body.appendChild( label );

  return label;
}

export const createFileInput = function() {
  var fileElem = document.createElement('input');
  fileElem.type="file"
  return fileElem;
}
