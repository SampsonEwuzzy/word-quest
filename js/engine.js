const P={Diego:3,Winner:2},AV={Diego:"🦁",Winner:"🐼"},KEY="kidsquest_v2",TITLES=["Explorer","Ranger","Wizard","Hero","Champion","Legend"],SUBJ={};
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[R(0,a.length-1)];
const shuf=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=R(0,i);[a[i],a[j]]=[a[j],a[i]]}return a};
const parse=t=>t.trim().split("\n").map(l=>l.split("|")),esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),rep=f=>g=>Array.from({length:10},()=>f(g));
const mk=(c,arr)=>{const o=shuf([c,...shuf([...new Set(arr)].filter(x=>x!==c)).slice(0,3)]);return{o,c:o.indexOf(c)}};
function opts(c,step){const near=[c+1,c-1,c+2,c-2,c+10,c-10,c+step,c-step].filter(x=>x>=0&&x!==c);const o=shuf([c,...shuf([...new Set(near)]).slice(0,3)]);return{o,c:o.indexOf(c)}}
const rec0=()=>({score:0,stars:0,rounds:0,correct:0,answered:0,best:0});
let D={mute:0};try{D=Object.assign(D,JSON.parse(localStorage.getItem(KEY)||"{}"))}catch(e){}
for(const n in P)if(!D[n]){D[n]=rec0();for(const k of["wordquest_v1","mathsquest_v1"])try{const o=JSON.parse(localStorage.getItem(k)||"{}")[n];if(o)for(const f in D[n])D[n][f]=f=="best"?Math.max(D[n][f],o[f]||0):D[n][f]+(o[f]||0)}catch(e){}}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(D))}catch(e){}};
let AC;function beep(f,d=.15){if(D.mute)return;try{AC=AC||new AudioContext();const o=AC.createOscillator(),g=AC.createGain();o.frequency.value=f;g.gain.value=.07;o.connect(g);g.connect(AC.destination);o.start();o.stop(AC.currentTime+d)}catch(e){}}
function burst(e){try{for(let i=0;i<18;i++){const s=document.createElement("span");s.className="cf";s.textContent=e;s.style.cssText=`left:${R(3,95)}vw;animation-delay:${R(0,50)/100}s;font-size:${R(20,38)}px`;document.body.appendChild(s);setTimeout(()=>s.remove(),2000)}}catch(e){}}
let me=null,view="pick",sub=null,Q=null,fc=null,pend=(location.hash||"").slice(1);const seen=new Set(),$=document.getElementById("app");
const level=s=>(s/100|0)+1,title=s=>TITLES[Math.min(level(s)-1,5)],go=v=>{view=v;render()};
function addPts(d,a=0,c=0){const r=D[me];r.score=Math.max(0,r.score+d);r.answered+=a;r.correct+=c;save()}
function start(m){Q={m,list:SUBJ[sub].modes[m][1](P[me]),i:0,streak:0,right:0,pts:0,sel:null,lock:false,msg:"",done:false};go("quiz")}
function sel(k){if(Q.lock)return;Q.sel=k;beep(500+k*70,.08);render()}
function lockIn(){if(Q.lock||Q.sel===null)return;Q.lock=true;const q=Q.list[Q.i],ok=Q.sel==q.c;let d;
 if(ok){Q.streak++;Q.right++;d=10;Q.msg=`🎉 ${pick(["Super!","Brilliant!","You got it!","Awesome!","Well done!"])} <b style="color:#00b894">+10</b>`;if(Q.streak%3==0){d+=5;Q.msg+=` 🔥 Streak bonus +5!`}beep(784,.2);burst(pick(["⭐","🎉","✨","🌟"]))}
 else{Q.streak=0;d=-5;Q.msg=`🤗 Not quite, you will get the next one! <b style="color:#d63031">−5</b>`;beep(220,.25)}
 Q.pts+=d;addPts(d,1,ok?1:0);render()}
function nextQ(){if(Q.i>=Q.list.length-1){const a=Q.right/Q.list.length,s=a>=.9?3:a>=.7?2:a>=.5?1:0,r=D[me];r.stars+=s;r.rounds++;r.best=Math.max(r.best,Q.pts);save();Q.stars=s;Q.done=true;if(s>1)burst("🏆")}else{Q.i++;Q.sel=null;Q.lock=false}render()}
function learn(k){fc={cards:shuf(SUBJ[sub].learn[k][1](P[me])),i:0,k};go("learn")}
function fcMove(s){fc.i=(fc.i+s+fc.cards.length)%fc.cards.length;render()}
function fcGot(){seen.add(fc.k+fc.cards[fc.i].t);addPts(2);beep(660);render()}
function say(){try{const c=fc.cards[fc.i],u=new SpeechSynthesisUtterance(c.say);u.lang=c.lang||"en-GB";u.rate=.8;speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){}}
function mute(){D.mute=D.mute?0:1;save();render()}
function pickPlayer(n){me=n;seen.clear();if(SUBJ[pend]){sub=pend;pend="";go("sub")}else go("hub")}
function quizV(){const S=SUBJ[sub];if(Q.done){const r=D[me],e=["💪","⭐","⭐⭐","🌟🌟🌟"][Q.stars],v=["Keep practising, you are improving!","Good try!","Great job!","AMAZING!"][Q.stars];
 return`<div class="card pop"><div class="big">${e}</div><p>${v}</p><p>You got <b>${Q.right}/${Q.list.length}</b> right<br>Round points: <b>${Q.pts>=0?"+":""}${Q.pts}</b><br>Total score: <b>${r.score}</b></p></div><div class="grid"><button class="k3" onclick="start('${Q.m}')">🔁 Play again</button><button class="k2" onclick="go('sub')">📚 More ${S.n}</button></div>`}
 const q=Q.list[Q.i],L="ABCD";
 return`<h2>${S.modes[Q.m][0]}</h2><div class="prog"><i style="width:${Math.max(4,Q.i/Q.list.length*100)}%"></i></div><div class="mascot">${S.e}</div><div class="card">${q.q}</div>
<div class="grid">${q.o.map((o,k)=>`<button class="opt k${k+1} ${Q.lock?(k==q.c?"ok":k==Q.sel?"no":""):Q.sel==k?"sel":""}" ${Q.lock?"disabled":""} onclick="sel(${k})"><b>${L[k]}</b><span>${o}</span></button>`).join("")}</div>
<div class="fb">${Q.lock?`${Q.msg}<br><small>${q.ex}</small>`:Q.sel===null?`👆 Tap an answer, then press <b>Lock it in</b>.<br><small>Question ${Q.i+1} of ${Q.list.length} | 🔥 Streak: ${Q.streak}</small>`:`Happy with <b>${L[Q.sel]}</b>? Tap another answer to change it.`}</div>
<div class="center">${Q.lock?`<button class="k2" onclick="nextQ()">${Q.i>=Q.list.length-1?"🏁 See my result":"Next ➡"}</button>`:`<button class="lock" ${Q.sel===null?"disabled":""} onclick="lockIn()">✔ Lock it in!</button>`}</div>`}
function learnV(){const c=fc.cards[fc.i],got=seen.has(fc.k+c.t),col=c.color||"#74b9ff";
 return`<h2>${SUBJ[sub].learn[fc.k][0]}</h2><div class="center">Card ${fc.i+1} of ${fc.cards.length}</div>
<div class="card pop" style="--bc:${col}"><div style="font-size:3.2rem">${c.e}</div><div class="big" ${c.color?`style="color:${col}"`:""}>${c.t}</div><p style="color:#0984e3"><b>${c.s||""}</b></p><p>${c.b}</p>${c.say?`<button class="k2" onclick="say()">🔊 Hear it</button>`:""}</div>
<div class="grid"><button class="k1" onclick="fcMove(-1)">⬅ Back</button><button class="k4" ${got?"disabled":""} onclick="fcGot()">${got?"✅ Learned!":"⭐ Got it! (+2)"}</button><button class="k2" onclick="fcMove(1)">Next ➡</button></div>`}
function subV(){const S=SUBJ[sub],m=Object.keys(S.modes),l=Object.keys(S.learn||{});
 return`<h1>${S.e} ${S.n}</h1>${l.length?`<h2>📚 Learn first</h2><div class="grid">${l.map((k,i)=>`<button class="k${i%4+1}" onclick="learn('${k}')">${S.learn[k][0]}</button>`).join("")}</div>`:""}<h2>🎮 Play &amp; practise</h2><div class="grid">${m.map((k,i)=>`<button class="k${i%4+1}" onclick="start('${k}')">${S.modes[k][0]}</button>`).join("")}</div>`}
function board(){const cl=["#74b9ff","#fd79a8"];return`<h2>🏆 Scoreboard</h2><div class="grid">${Object.keys(P).map((n,k)=>{const r=D[n],a=r.answered?Math.round(100*r.correct/r.answered):0;
 return`<div class="card" style="--bc:${cl[k]}"><div style="font-size:3rem">${AV[n]}</div><b style="color:${cl[k]}">${n} (Grade ${P[n]})</b><p>${title(r.score)}<br>Level ${level(r.score)}</p><p>💰 Score: ${r.score}<br>⭐ Stars: ${r.stars}<br>🎮 Rounds: ${r.rounds}<br>🎯 Accuracy: ${a}%<br>🥇 Best round: ${r.best>=0?"+":""}${r.best}</p><p style="font-size:2rem">${r.score>=100?"🥉":""}${r.score>=300?"🥈":""}${r.score>=600?"🥇":""}${r.stars>=10?"🌟":""}${r.rounds>=10?"🎖️":""}</p></div>`}).join("")}</div>
<div class="center"><button class="gray" onclick="if(confirm('Reset ALL scores for both children?')){for(const n in P)D[n]=rec0();save();render()}">Reset scores (parent)</button></div>`}
function render(){let h="";
 if(view=="pick")h=`<h1>🌈 Kids Quest 🌈</h1><h2>Who is playing today?</h2><div class="grid">${Object.keys(P).map((n,k)=>`<button class="tile" style="--c1:${k?"#fd79a8":"#74b9ff"}" onclick="pickPlayer('${n}')"><span class="em">${AV[n]}</span>${n}<small>Grade ${P[n]}</small></button>`).join("")}</div><p class="rules">💖 Developed for Diego &amp; Winner 💖</p>`;
 else{const r=D[me];h=`<div class="bar"><span>${AV[me]} ${me}</span><span>💰 ${r.score}</span><span>⭐ ${r.stars}</span><span>🎖 Lv ${level(r.score)} ${title(r.score)}</span><button class="gray" onclick="mute()">${D.mute?"🔇":"🔊"}</button></div>`;
  if(view=="hub")h+=`<h1>Hello, ${me}! 👋</h1><h2>What shall we explore?</h2><div class="grid">${Object.keys(SUBJ).map(k=>`<button class="tile" style="--c1:${SUBJ[k].c1};--c2:${SUBJ[k].c2}" onclick="sub='${k}';go('sub')"><span class="em">${SUBJ[k].e}</span>${SUBJ[k].n}<small>${SUBJ[k].d}</small></button>`).join("")}<button class="tile" style="--c1:#fd79a8;--c2:#e84393" onclick="go('score')"><span class="em">🏆</span>Scoreboard<small>Stars &amp; badges</small></button></div>
<p class="rules">✅ Correct +10 &nbsp; 🤗 Wrong −5 &nbsp; 🔥 3 in a row +5 &nbsp; ⭐ Stars each round</p><div class="center"><button class="gray" onclick="go('pick')">🔄 Switch Player</button></div><p class="rules">💖 Developed for Diego &amp; Winner 💖</p>`;
  else{h+={sub:subV,quiz:quizV,learn:learnV,score:board}[view]();h+=`<div class="center">${view=="sub"||view=="score"?"":`<button class="gray" onclick="go('sub')">⬅ Back</button> `}<button class="gray" onclick="go('hub')">🏠 Home</button></div>`}}
 $.innerHTML=h;window.scrollTo(0,0)}
