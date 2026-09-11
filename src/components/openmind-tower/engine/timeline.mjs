export const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
export function interpolate(value,from,to){
  if(from.length!==to.length||from.length<2)throw new Error('Timeline requires at least two matching anchors.');
  if(value<=from[0])return to[0];
  for(let i=0;i<from.length-1;i++)if(value<from[i+1])return to[i]+(to[i+1]-to[i])*clamp((value-from[i])/(from[i+1]-from[i]));
  return to.at(-1);
}
export function activeIndex(value,anchors){
  let active=0;for(let i=1;i<anchors.length;i++)if(value>=(anchors[i-1]+anchors[i])/2)active=i;return active;
}
