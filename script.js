const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
// loader: counts 0 to 100 then slides away
let n=0;const iv=setInterval(()=>{n+=Math.ceil(Math.random()*6);if(n>=100){n=100;clearInterval(iv);setTimeout(()=>$('#load').classList.add('out'),250)}
$('#lp').textContent=n+'%';$('#lbar').style.width=n+'%'},40);
// theme switcher (remembers your choice)
const T=['','ice','violet','lime'];let ti=0;
try{ti=+localStorage.getItem('th')||0}catch(e){}
const setT=()=>{document.documentElement.dataset.t=T[ti];try{localStorage.setItem('th',ti)}catch(e){}};setT();
$('#th').onclick=()=>{ti=(ti+1)%T.length;setT()};
// cursor dot + ring
let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;$('#cd').style.transform=`translate(${mx}px,${my}px)`});
(function f(){rx+=(mx-rx)*.15;ry+=(my-ry)*.15;$('#cr').style.transform=`translate(${rx}px,${ry}px)`;requestAnimationFrame(f)})();
$$('a,button').forEach(e=>{e.onmouseenter=()=>$('#cr').classList.add('h');e.onmouseleave=()=>$('#cr').classList.remove('h')});
// scroll progress bar
addEventListener('scroll',()=>$('#sb').style.width=scrollY/(document.body.scrollHeight-innerHeight)*100+'%');
// ticker + marquees: repeat text so it loops
$('#tk').textContent=('AGENTIC AI  //  FULL-STACK  //  EMBEDDED SYSTEMS  //  MIT MANIPAL  //  ').repeat(12);
$$('.mqs').forEach(m=>m.firstChild.textContent=(m.dataset.t.split('|').join('  ·  ')+'  ·  ').repeat(8));
// reveal on scroll
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('in')),{threshold:.15});
$$('.r').forEach(e=>io.observe(e));
// 3D tilt on project cards
$$('.proj').forEach(c=>{c.onmousemove=e=>{const b=c.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;c.style.transform=`perspective(800px) rotateY(${x*6}deg) rotateX(${-y*6}deg)`};c.onmouseleave=()=>c.style.transform=''});
// hero canvas: dots that connect to your mouse
const cv=$('#cv'),g=cv.getContext('2d');let P=[];
const rs=()=>{cv.width=innerWidth;cv.height=innerHeight;P=Array.from({length:70},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4}))};rs();addEventListener('resize',rs);
(function d(){g.clearRect(0,0,cv.width,cv.height);const a=getComputedStyle(document.documentElement).getPropertyValue('--a');g.fillStyle=g.strokeStyle=a;
P.forEach(p=>{p.x=(p.x+p.vx+cv.width)%cv.width;p.y=(p.y+p.vy+cv.height)%cv.height;g.fillRect(p.x,p.y,2,2);
const dx=p.x-mx,dy=p.y-my;if(dx*dx+dy*dy<22000){g.globalAlpha=.4;g.beginPath();g.moveTo(p.x,p.y);g.lineTo(mx,my);g.stroke();g.globalAlpha=1}});requestAnimationFrame(d)})();
// card spotlight: glow follows the mouse
$$('.card').forEach(c=>c.addEventListener('mousemove',e=>{const b=c.getBoundingClientRect();c.style.setProperty('--x',e.clientX-b.left+'px');c.style.setProperty('--y',e.clientY-b.top+'px')}));
