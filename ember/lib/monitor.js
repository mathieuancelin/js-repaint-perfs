var Monitoring=Monitoring||function(){var e=new MemoryStats
e.domElement.style.position="fixed",e.domElement.style.right="0px",e.domElement.style.bottom="0px",document.body.appendChild(e.domElement),requestAnimationFrame(function t(){e.update(),requestAnimationFrame(t)})
var t=new function(){var e=document.createElement("div")
e.id="stats",e.style.cssText="width:150px;opacity:0.9;cursor:pointer;position:fixed;right:80px;bottom:0px;"
var t=document.createElement("div")
t.id="ms",t.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;",e.appendChild(t)
var n=document.createElement("div")
n.id="msText",n.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px",n.innerHTML="Repaint rate: 0/sec",t.appendChild(n)
var o=[],i=Date.now()
return{domElement:e,ping:function(){var e=i,t=Date.now(),r=1e3/(t-e)
o.push(r),o.length>20&&o.shift()
for(var a=0,d=0;d<o.length;d++)a+=o[d]
n.textContent="Repaint rate: "+(a/o.length).toFixed(2)+"/sec",i=t}}}
return document.body.appendChild(t.domElement),{memoryStats:e,renderRate:t}}()
