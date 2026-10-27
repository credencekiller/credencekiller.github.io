const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
// fade-in on load (the cover div is added here so the page still works if JS is off)
const ld=document.createElement('div');ld.id='ld';document.body.append(ld);setTimeout(()=>ld.classList.add('out'),150);
// theme dots (choice is remembered)
const T=['','ice','violet','lime'];let ti=0;try{ti=+localStorage.getItem('th')||0}catch(e){}
const setT=i=>{ti=i;document.documentElement.dataset.t=T[i];try{localStorage.setItem('th',i)}catch(e){}};setT(ti);
$$('.dots button').forEach(b=>b.onclick=()=>setT(+b.dataset.i));
// scroll progress bar + highlight the current section in the nav
const secs=$$('main section'),lk=$$('.links a');
addEventListener('scroll',()=>{$('#sb').style.width=scrollY/(document.body.scrollHeight-innerHeight)*100+'%';
let cur='';secs.forEach(s=>{if(scrollY>=s.offsetTop-160)cur=s.id});lk.forEach(a=>a.classList.toggle('on',a.hash==='#'+cur))});
// soft glow in the hero follows the mouse
$('header').addEventListener('mousemove',e=>{const b=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty('--mx',e.clientX-b.left+'px');e.currentTarget.style.setProperty('--my',e.clientY-b.top+'px')});
// spotlight on cards
$$('.card').forEach(c=>c.addEventListener('mousemove',e=>{const b=c.getBoundingClientRect();c.style.setProperty('--x',e.clientX-b.left+'px');c.style.setProperty('--y',e.clientY-b.top+'px')}));
// rotating role words
const W=['agentic AI tools','Flask web apps','embedded systems'];let wi=0;
setInterval(()=>{const r=$('#rot');r.classList.add('out');setTimeout(()=>{wi=(wi+1)%W.length;r.textContent=W[wi];r.classList.remove('out')},350)},2800);
// copy email button
$('#cp').onclick=()=>{try{navigator.clipboard.writeText('iprakh123@gmail.com')}catch(e){}const t=$('#toast');t.classList.add('on');setTimeout(()=>t.classList.remove('on'),1800)};
// reveal on scroll + count-up numbers
$$('section .card,.big,.stats,.lab').forEach(e=>e.classList.add('r'));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('in');io.unobserve(e.target);
e.target.querySelectorAll('[data-n]').forEach(n=>{const to=+n.dataset.n;let v=0;const st=Math.max(1,Math.ceil(to/40));const t=setInterval(()=>{v=Math.min(to,v+st);n.textContent=v;if(v>=to)clearInterval(t)},30)})}),{threshold:.2});
$$('.r').forEach(e=>io.observe(e));
// ---- premium layer ----
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
// name decodes from random letters on load
if(!rm)$$('.dec').forEach((el,k)=>{const f=el.textContent,L='ABCDEFGHIJKLMNOPQRSTUVWXYZ';let i=0;
setTimeout(()=>{const t=setInterval(()=>{el.textContent=f.slice(0,i)+[...f.slice(i)].map(()=>L[Math.random()*26|0]).join('');if(i++>=f.length){el.textContent=f;clearInterval(t)}},60)},300+k*350)});
// live clock (IST)
const tick=()=>$('#clk').textContent=new Date().toLocaleTimeString('en-GB',{timeZone:'Asia/Kolkata'});tick();setInterval(tick,1000);
// tech strip
$('#mq').textContent=('PYTHON  ·  FLASK  ·  CLAUDE API  ·  AWS BEDROCK  ·  C  ·  JAVA  ·  JAVASCRIPT  ·  SQLITE  ·  GIT  ·  ').repeat(6);
// 3D tilt + glare on photo
const ph=$('.ph');if(ph&&!rm){ph.onmousemove=e=>{const b=ph.getBoundingClientRect(),x=(e.clientX-b.left)/b.width,y=(e.clientY-b.top)/b.height;
ph.style.transform=`perspective(900px) rotateY(${(x-.5)*12}deg) rotateX(${(.5-y)*12}deg)`;ph.style.setProperty('--gx',x*100+'%');ph.style.setProperty('--gy',y*100+'%')};ph.onmouseleave=()=>ph.style.transform=''}
// magnetic buttons
if(!rm)$$('.btn').forEach(b=>{b.onmousemove=e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.2}px,${(e.clientY-r.top-r.height/2)*.3}px)`};b.onmouseleave=()=>b.style.transform=''});
// timeline line fills as you scroll
const tl=$('.tl'),fill=$('.fill');
addEventListener('scroll',()=>{const r=tl.getBoundingClientRect();fill.style.height=Math.max(0,Math.min(r.height-16,innerHeight*.6-r.top))+'px'});
// command palette (Ctrl/Cmd + K)
const go=h=>()=>{location.hash=h},op=u=>()=>window.open(u,'_blank'),th=i=>()=>setT(i);
const C=[['Go to About','',go('#about')],['Go to Experience','',go('#experience')],['Go to Skills','',go('#skills')],['Go to Contact','',go('#contact')],
['Copy email','',()=>$('#cp').click()],['Open GitHub','↗',op('https://github.com/credencekiller')],['Open LinkedIn','↗',op('https://www.linkedin.com/in/immaneni-prakhyath-697b96367/')],
['Theme: Ember','',th(0)],['Theme: Ice','',th(1)],['Theme: Violet','',th(2)],['Theme: Lime','',th(3)]];
let sel=0,list=C;const pal=$('#pal'),pi=$('#pi'),pl=$('#pl');
const draw=()=>{pl.innerHTML=list.map((c,i)=>`<li class="${i==sel?'sel':''}" data-i="${i}">${c[0]}<span>${c[1]}</span></li>`).join('')};
const open=()=>{pal.classList.add('on');pi.value='';list=C;sel=0;draw();pi.focus()},close=()=>pal.classList.remove('on');
const run=i=>{close();list[i]&&list[i][2]()};
pi.oninput=()=>{list=C.filter(c=>c[0].toLowerCase().includes(pi.value.toLowerCase()));sel=0;draw()};
pl.onclick=e=>{const li=e.target.closest('li');if(li)run(+li.dataset.i)};
pal.onclick=e=>{if(e.target===pal)close()};$('#kbtn').onclick=open;
addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();pal.classList.contains('on')?close():open()}
if(!pal.classList.contains('on'))return;if(e.key==='Escape')close();
if(e.key==='ArrowDown'){sel=(sel+1)%list.length;draw()}if(e.key==='ArrowUp'){sel=(sel-1+list.length)%list.length;draw()}if(e.key==='Enter')run(sel)});
