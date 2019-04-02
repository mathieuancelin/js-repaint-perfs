var ENV=ENV||function(){var e,a,t=0
function r(e){e||(e={})
var a,t,r=15*Math.random()
return e.elapsed=r,e.formatElapsed=(a=r,t=parseFloat(a).toFixed(2),a>60&&(minutes=Math.floor(a/60),comps=(a%60).toFixed(2).split("."),seconds=comps[0].lpad("0",2),ms=comps[1],t=minutes+":"+seconds+"."+ms),t),e.elapsedClassName=function(e){var a="Query elapsed"
return a+=e>=10?" warn_long":e>=1?" warn":" short"}(r),e.query="SELECT blah FROM something",e.waiting=Math.random()<.5,Math.random()<.2&&(e.query="<IDLE> in transaction"),Math.random()<.1&&(e.query="vacuum"),e}function s(e){if(!e)return{query:"***",formatElapsed:"",elapsedClassName:""}
e.formatElapsed="",e.elapsedClassName="",e.query="",e.elapsed=null,e.waiting=null}function l(e,a,t){var l=Math.floor(10*Math.random()+1)
if(e||(e={}),e.lastMutationId=t,e.nbQueries=l,e.lastSample||(e.lastSample={}),e.lastSample.topFiveQueries||(e.lastSample.topFiveQueries=[]),a){if(!e.lastSample.queries){e.lastSample.queries=[]
for(var n=0;n<12;n++)e.lastSample.queries[n]=s()}for(var o in e.lastSample.queries){var i=e.lastSample.queries[o]
o<=l?r(i):s(i)}}else{e.lastSample.queries=[]
for(o=0;o<12;o++)if(o<l){i=r(s())
e.lastSample.queries.push(i)}else e.lastSample.queries.push(s())}for(var u=0;u<5;u++){var m=e.lastSample.queries[u]
e.lastSample.topFiveQueries[u]=m}return e.lastSample.nbQueries=l,e.lastSample.countClassName=function(e){var a="label"
return a+=e>=20?" label-important":e>=10?" label-warning":" label-success"}(l),e}(a=String.prototype).lpad||(a.lpad=function(e,a){return e.repeat((a-this.length)/e.length).concat(this)})
var n=.5
var o=document.querySelector("body"),i=o.firstChild,u=document.createElement("div")
u.style.cssText="display: flex"
var m=document.createElement("input"),p=document.createElement("label")
return p.innerHTML="mutations : "+(100*n).toFixed(0)+"%",p.id="ratioval",m.setAttribute("type","range"),m.style.cssText="margin-bottom: 10px; margin-top: 5px",m.addEventListener("change",function(e){ENV.mutations(e.target.value/100),document.querySelector("#ratioval").innerHTML="mutations : "+(100*ENV.mutations()).toFixed(0)+"%"}),u.appendChild(p),u.appendChild(m),o.insertBefore(u,i),{generateData:function(a){var r=e
if(!a){e=[]
for(var s=1;s<=ENV.rows;s++)e.push({dbname:"cluster"+s,query:"",formatElapsed:"",elapsedClassName:""}),e.push({dbname:"cluster"+s+" slave",query:"",formatElapsed:"",elapsedClassName:""})}if(!e){for(e=[],s=1;s<=ENV.rows;s++)e.push({dbname:"cluster"+s}),e.push({dbname:"cluster"+s+" slave"})
r=e}for(var s in e.map(function(e,a){}),e)if(e.hasOwnProperty(s)){var n=e[s]
!a&&r&&r[s]&&(n.lastSample=r[s].lastSample),!n.lastSample||Math.random()<ENV.mutations()?(t+=1,a||(n.lastSample=null),l(n,a,t)):e[s]=r[s]}return!1,{toArray:function(){return e}}},rows:50,timeout:0,mutations:function(e){return e?n=e:n}}}()
