var MemoryStats=function(){var e=100,t=0,a=document.createElement("div")
a.id="stats",a.style.cssText="width:80px;opacity:0.9;cursor:pointer"
var o=document.createElement("div")
o.id="ms",o.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;",a.appendChild(o)
var r=document.createElement("div")
r.id="msText",r.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px",r.innerHTML="Memory",o.appendChild(r)
var n=document.createElement("div")
for(n.id="msGraph",n.style.cssText="position:relative;width:74px;height:30px;background-color:#0f0",o.appendChild(n);n.children.length<74;){var i=document.createElement("span")
i.style.cssText="width:1px;height:30px;float:left;background-color:#131",n.appendChild(i)}var d=window.performance||{}
d||d.memory||(d.memory={usedJSHeapSize:0}),d&&!d.memory&&(d.memory={usedJSHeapSize:0}),0===d.memory.totalJSHeapSize&&console.warn("totalJSHeapSize === 0... performance.memory is only available in Chrome .")
var l=Date.now(),m=d.memory.usedJSHeapSize
return{domElement:a,update:function(){if(!(Date.now()-l<1e3/30)){l=Date.now()
var a=d.memory.usedJSHeapSize-m
m=d.memory.usedJSHeapSize
var o=a<0?"#830":"#131",i=d.memory.usedJSHeapSize
e=Math.min(e,i),t=Math.max(t,i),r.textContent="Mem: "+function(e,t){if(0==e)return"n/a"
t=void 0!==t?t:0
var a=Math.pow(10,t),o=Math.floor(Math.log(e)/Math.log(1024))
return Math.round(e*a/Math.pow(1024,o))/a+" "+["Bytes","KB","MB","GB","TB"][o]}(i,2)
var s=i/31457280,p=Math.min(30,30-30*s);(function(e,t,a){var o=e.appendChild(e.firstChild)
o.style.height=t+"px",a&&(o.style.backgroundColor=a)})(n,p,o)}}}}
