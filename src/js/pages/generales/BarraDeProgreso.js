export function indicatorMenu(_index, _items, _selector, _section = false ){

  let offsetLeft;
  let positionItemMenu = _items[_index].offsetLeft;
  let widthSelector = _items[_index].clientWidth;
  if(!_section){
    offsetLeft = ((_items[0].offsetWidth - 32) / 2) + positionItemMenu;
  }else{
    offsetLeft = ((widthSelector - 20) / 2) + positionItemMenu;
  }
  _selector.style.cssText = `left: ${offsetLeft}px; transition: all 500ms ease; opacity: 1`;
}

export function indicatorMenuBarraCorta(_index, _items, _selector, _section = false ){
  //if (window.innerWidth >= 768) {
    let widthElement = Math.round(_items[_index].getBoundingClientRect().width);
    let positionItemMenu = _items[_index].offsetLeft;
    let offsetX = ((widthElement - 32) / 2) + positionItemMenu;
    _selector.style.left = `${offsetX}px`;
  //}
}

export function indicadorMenuServicios(_index,_items,_selector){

      var indexSelected;

        var index = (_index === undefined) ? indexSelected : _index;

        let offsetLeft,
            positionItemMenu = _items[index].offsetLeft,
            widthSelector = _items[index].clientWidth;
            
        offsetLeft = ((widthSelector - 20) / 2) + positionItemMenu;
        _selector.style.cssText = `
            left: ${offsetLeft}px; 
            transition: all 500ms ease; 
            opacity: 1; 
            background-color: #0772c9;
        `;
        //background-color: ${colors[index].color}
    }