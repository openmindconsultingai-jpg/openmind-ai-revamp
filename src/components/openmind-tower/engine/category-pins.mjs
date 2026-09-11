/** Independently reusable accessible category markers. Coordinates are viewport percentages. */
export function createCategoryPins(root,categories,onSelect){
  const controller=new AbortController();
  const buttons=categories.map((category,index)=>{
    const button=document.createElement('button');button.type='button';button.className='omt-pin';
    const icon=document.createElement('span');icon.className='omt-pin-icon';icon.textContent='+';icon.setAttribute('aria-hidden','true');
    const label=document.createElement('span');label.className='omt-pin-label';label.textContent=category.label;
    button.append(icon,label);button.setAttribute('aria-label','Otwórz: '+category.label);button.dataset.category=category.id;
    const p=category.pin||{},m=category.mobilePin||{};
    button.style.setProperty('--omt-pin-x',(p.x??80)+'%');button.style.setProperty('--omt-pin-y',(p.y??57)+'%');
    button.style.setProperty('--omt-pin-mobile-x',(m.x??72)+'%');button.style.setProperty('--omt-pin-mobile-y',(m.y??69)+'%');
    button.addEventListener('click',()=>onSelect(category,index),{signal:controller.signal});root.append(button);return button;
  });
  let previous=-1;
  return {
    setActive(index){if(index===previous)return;previous=index;buttons.forEach((b,i)=>{b.hidden=i!==index;if(i===index)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current')})},
    destroy(){controller.abort();buttons.forEach(b=>b.remove())}
  };
}
