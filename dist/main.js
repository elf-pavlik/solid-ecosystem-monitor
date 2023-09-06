(()=>{const t=["template.md","README.md"],e=document.querySelector("main > article"),a=(t,e)=>{const a=(e+1).toString();return`${t}-${1==a.length?`0${a}`:a}`};function n(t,a,n,r){for(var s=document.createElement("table"),i=document.createElement("thead"),o=document.createElement("tr"),c=0;c<a.length;c++){var d=document.createElement("th");d.textContent=a[c],o.appendChild(d)}i.appendChild(o);var l=document.createElement("tbody");const p=[...t];"date"===n&&p.reverse(),p.forEach((t=>{r(t,l)})),s.appendChild(i),s.appendChild(l),e.appendChild(s)}function r(t,a,n,r,s,i){const o=Math.max(20*t.length,e.getBoundingClientRect().width)-50-30,c=360,d=document.createElement("div");d.id=a,d.classList.add("chart"),e.appendChild(d);const l=d3.select(`#${a}`).append("svg").attr("width",o+50+30).attr("height",500).append("g").attr("transform","translate(50,20)"),p=d3.scalePoint().domain(t.map((t=>t[n]))).range([0,o]),m=d3.scaleLinear().domain([0,d3.max(t,(t=>t[r]))]).nice().range([c,0]),u=d3.line().x((t=>p(t[n]))).y((t=>m(t[r]))),h=d3.select(`#${a}`).append("div").attr("class","tooltip").style("position","absolute").style("opacity",0);l.append("path").datum(t).attr("class","line").attr("fill","none").attr("stroke","blue").attr("stroke-width",2).attr("d",u),l.append("g").attr("class","x-axis").attr("transform","translate(0, 360)").call((function(t){t.call(d3.axisBottom(p)).selectAll("text").style("text-anchor","end").attr("dx","-0.8em").attr("dy","0.15em").attr("transform","rotate(-45)")})),l.append("g").attr("class","y-axis").call(d3.axisLeft(m)),l.append("text").attr("x",o/2).attr("y",440).attr("text-anchor","middle").text(s),l.append("text").attr("transform","rotate(-90)").attr("x",-180).attr("y",-50).attr("dy","1em").style("text-anchor","middle").text(i),l.selectAll(".dot").data(t).enter().append("circle").attr("class","dot").attr("cx",(t=>p(t[n]))).attr("cy",(t=>m(t[r]))).attr("r",5).style("fill","blue").on("mouseover",((t,e)=>{h.transition().duration(200).style("opacity",.9);const a=h.node().offsetWidth,o=h.node().offsetHeight,c=t.pageX-a/2,d=t.pageY-o-10;h.html(`<strong>${s}:</strong> ${e[n]}<br><strong>${i}:</strong> ${e[r]}`).style("left",c+"px").style("top",d+"px")})).on("mouseout",(()=>{h.transition().duration(500).style("opacity",0)}))}function s(t,a,n,r,s,i){const o=100,c=Math.max(20*t.length,e.getBoundingClientRect().width)-o-60,d=320,l=document.createElement("div");l.id=a,l.classList.add("chart"),e.appendChild(l);var p=d3.select(`#${a}`).append("svg").attr("width",c+o+60).attr("height",500).append("g").attr("transform","translate(100,60)"),m=d3.scaleBand().range([0,c]).padding(.1),u=d3.scaleLinear().range([d,0]);m.domain(t.map((function(t){return t[n]}))),u.domain([0,d3.max(t,(function(t){return t[r]}))]);const h=d3.select(`#${a}`).append("div").attr("class","tooltip").style("position","absolute").style("opacity",0);p.selectAll(".bar").data(t).enter().append("rect").attr("class","bar").attr("x",(function(t){return m(t[n])})).attr("width",m.bandwidth()).attr("y",(function(t){return u(t[r])})).attr("height",(function(t){return d-u(t[r])})).style("fill","blue").on("mouseover",(function(t,e){h.style("opacity",1),h.html(e[n]+": "+e[r]+" "+i.toLowerCase()).style("left",t.pageX-20+"px").style("top",t.pageY-d3.select("#bar-chart").node().getBoundingClientRect().top-25+"px")})).on("mouseout",(function(){h.style("opacity",0)})),p.append("g").attr("class","x-axis").attr("transform","translate(0,320)").call(d3.axisBottom(m)).selectAll("text").style("text-anchor","end").attr("dx","-.8em").attr("dy",".15em").attr("transform","rotate(-45)"),p.append("g").attr("class","y-axis").call(d3.axisLeft(u)),p.append("text").attr("x",c/2).attr("y",440).style("text-anchor","middle").text(s),p.append("text").attr("x",-160).attr("y",-50).attr("transform","rotate(-90)").style("text-anchor","middle").text(i)}async function i(t){try{const e=await fetch(t);if(e.ok){const t=(await e.text()).split("\n");let a=!1,n=0,r=[];const s=/\[([^\]]+)\]\([^)]+\)|\[([^\]]+)\]\([^\)]+\)|([^(]+)\s*\(([^)]+)\)|([^-]+)\s*-\s+([^-\s]+)|([^-]+) - \(([^)]+)\)|([^-]+) - ([^-]+)/;for(const e of t)if(e.startsWith("## Present"))a=!0;else if(a&&(e.startsWith("-")||e.startsWith("*"))){if(n++,"---"===e)break;const t=e.match(s);if(!t){let t=0;e.startsWith("*")?t=e.indexOf("*")+1:e.startsWith("-")&&(t=e.indexOf("-")+1),e.includes(",")?r.push(e.substring(t,e.indexOf(",")).trim()):r.push(e.substring(t).trim())}if(t)for(let e=1;e<=8;e++)if(t[e]){let a=t[e].trim();if(a.startsWith("[")&&a.endsWith("]")){const t=a.match(/\[([^\]]+)\]/);t&&(a=t[1].trim())}a.match(/\s-\s/)&&!a.match(/\S+\s-\s\S+/)&&(a=a.split(" - ")[0]),a.includes(",")&&(a=a.split(",")[0]),a=a.replace(/[\*\[\]]/g,"").replace(/-\s*$/,""),r.push(a.trim());break}}else if(a&&n>0&&""===e.trim())break;return{participantsCount:n,present:r}}return console.error(`Failed to fetch Markdown file. Status code: ${e.status}`),0}catch(t){return console.error("Error:",t.message),0}}async function o(t){try{const e=await fetch(t);if(e.ok){const t=(await e.text()).split("\n");let a=!1,n=[];for(const e of t)if(e.startsWith("### Scribes"))a=!0;else if(a&&(e.startsWith("-")||e.startsWith("*")))n.push(e.substring(e.indexOf(" ")+1));else if(a&&""===e.trim())break;return n}return console.error(`Failed to fetch Markdown file. Status code: ${e.status}`),0}catch(t){return console.error("Error:",t.message),0}}!async function(){let c=!0;const d=document.createElement("div");d.id="progress-indicator-container";const l=document.createElement("progress"),p=document.createElement("label");p.setAttribute("for","progress-indicator"),p.textContent="Fetching data...",l.id="progress-indicator",l.value=0,l.max=100,d.appendChild(p),d.appendChild(l);try{const p=await fetch("https://api.github.com/repositories/186702057/contents/meetings",{method:"GET"});if(c&&e.appendChild(d),p.ok){c=!1;const f=await p.json(),g=[],x=[],y=100/f.length;for(const e of f)if(l.value+=y,"file"===e.type&&e.name.endsWith(".md")&&!t.includes(e.name)){const t=e.download_url,{participantsCount:a,present:n}=await i(t),r=await o(t);x.push(...r),g.push({file:e,participantsCount:a,presentList:n})}const C={},b={};x.forEach((t=>{C[t]||(C[t]=0),C[t]=C[t]+1}));var m={};g.forEach((function(t){t.presentList.forEach((function(t){m[t]||(m[t]=0),m[t]++}))})),Object.keys(m).forEach((function(t){var e=m[t];b[t]=e}));const v=g.reduce(((t,e)=>{const a=new Date(e.file.name.substr(0,e.file.name.indexOf(".md"))),n=a.getFullYear(),r=a.getMonth(),s=`${n}-${r}`;return t[s]?(t[s].totalParticipantsCount+=e.participantsCount,t[s].fileCount+=1):t[s]={year:n,month:r,totalParticipantsCount:e.participantsCount,fileCount:1},t}),{}),E=Object.values(v).map((t=>({year:t.year,month:t.month,averageParticipantsCount:Math.floor(t.totalParticipantsCount/t.fileCount)})));if(!c){e.removeChild(d),n(g,["Meeting","Participants"],"date",((t,e)=>{var a=document.createElement("tr");a.setAttribute("about","#"+t.file.sha),a.setAttribute("typeof","qb:Observation");var n=document.createElement("td");n.setAttribute("property","sdmx-dimension:refPeriod"),n.setAttribute("datatype","xsd:date");var r=document.createElement("a");r.href=t.file.html_url,r.textContent=t.file.name.slice(0,-3),n.appendChild(r),a.appendChild(n);var s=document.createElement("td");s.setAttribute("property","sdmx-measure:obsValue"),s.setAttribute("datatype","xsd:int"),s.textContent=t.participantsCount,a.appendChild(s),e.appendChild(a)})),n(E,["Month","Average Participants"],"date",((t,e)=>{var n=document.createElement("tr"),r=document.createElement("td");r.textContent=a(t.year,t.month),n.appendChild(r);var s=document.createElement("td");s.textContent=`${Math.floor(t.averageParticipantsCount)}`,n.appendChild(s),e.appendChild(n)}));var u=Object.keys(C).map((t=>({Name:t,"Meetings scribed":C[t]}))).filter((t=>t.Name.length&&"name"!==t.Name));u.sort(((t,e)=>e["Meetings scribed"]-t["Meetings scribed"]));var h=Object.keys(b).map((t=>({Name:t,"Meetings present":b[t]}))).filter((t=>t.Name.length&&"name"!==t.Name));h.sort(((t,e)=>e["Meetings present"]-t["Meetings present"])),n(u,["Name","Meetings scribed"],"count",((t,e)=>{var a=document.createElement("tr"),n=document.createElement("td");n.textContent=t.Name,a.appendChild(n);var r=document.createElement("td");r.textContent=t["Meetings scribed"],a.appendChild(r),e.appendChild(a)})),n(h,["Name","Meetings present"],"count",((t,e)=>{var a=document.createElement("tr"),n=document.createElement("td");n.textContent=t.Name,a.appendChild(n);var r=document.createElement("td");r.textContent=t["Meetings present"],a.appendChild(r),e.appendChild(a)})),r(g.map((t=>({date:t.file.name.substr(0,t.file.name.indexOf(".md")),participantsCount:t.participantsCount}))),"line-chart-meetings","date","participantsCount","Meeting","Participants"),r(E.map((t=>({month:a(t.year,t.month),averageParticipantsCount:t.averageParticipantsCount}))),"line-chart-monthly","month","averageParticipantsCount","Month","Average Participants"),s(u,"bar-chart","Name","Meetings scribed","Name","Meetings Scribed"),s(h,"bar-chart","Name","Meetings present","Name","Meetings present")}}else console.error(`Failed to fetch directory contents. Status code: ${p.status}`)}catch(t){console.error("Error:",t.message)}}()})();