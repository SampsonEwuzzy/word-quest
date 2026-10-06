const NAMES=["Ada","Chidi","Bola","Musa","Ngozi","Tunde","Amina","Emeka"],ITEMS=["mangoes","oranges","pencils","books","eggs","sweets"];
function gen(mode,g){if(mode=="mix")mode=pick(["add","sub","mul","div","word"]);let q,a,ex,step=10;
 const tabs=g>=3?[2,3,4,5,6,7,8,9,10]:[2,3,4,5,10];
 if(mode=="add"){const x=g>=3?R(100,600):R(10,60),y=g>=3?R(100,390):R(10,40);a=x+y;q=`${x} + ${y} = ?`;ex=`${x} + ${y} = <b>${a}</b>. Add the ones first, then the tens${g>=3?", then the hundreds":""}.`}
 else if(mode=="sub"){const x=g>=3?R(300,999):R(30,99),y=g>=3?R(100,x-50):R(10,x-5);a=x-y;q=`${x} − ${y} = ?`;ex=`${x} − ${y} = <b>${a}</b>. Check: ${a} + ${y} = ${x}.`}
 else if(mode=="mul"){const m=pick(tabs),n=R(1,g>=3?12:10);a=m*n;step=m;q=`${m} × ${n} = ?`;ex=`${m} × ${n} = <b>${a}</b>. That is ${n} groups of ${m}.`}
 else if(mode=="div"){const m=pick(tabs),n=R(1,10);a=n;step=1;q=`${m*n} ÷ ${m} = ?`;ex=`${m*n} ÷ ${m} = <b>${n}</b> because ${m} × ${n} = ${m*n}.`}
 else{const t=pick(["add","sub","mul","div"]),nm=pick(NAMES),it=pick(ITEMS);
  if(t=="add"){const x=g>=3?R(120,500):R(12,50),y=g>=3?R(100,400):R(10,40);a=x+y;q=`${nm} has ${x} ${it}. A friend gives ${y} more. How many ${it} now?`;ex=`${x} + ${y} = <b>${a}</b>.`}
  else if(t=="sub"){const x=g>=3?R(300,900):R(30,90),y=R(10,x-5);a=x-y;q=`${nm} had ₦${x}. ${nm} spent ₦${y}. How much is left?`;ex=`${x} − ${y} = <b>₦${a}</b>.`}
  else if(t=="mul"){const m=pick(tabs),n=R(2,g>=3?10:5);a=m*n;step=m;q=`There are ${m} bags. Each bag has ${n} ${it}. How many ${it} in all?`;ex=`${m} × ${n} = <b>${a}</b>.`}
  else{const k=pick(tabs.filter(x=>x<=6)),n=R(2,8);a=n;step=1;q=`${nm} shares ${k*n} ${it} equally among ${k} children. How many does each child get?`;ex=`${k*n} ÷ ${k} = <b>${n}</b>.`}}
 return{q,...opts(a,step),ex}}
const OLDGEN=gen,fr=(n,d)=>n+"/"+d,gcd=(x,y)=>y?gcd(y,x%y):x;
const X={
place(g){const n=g>=3?R(100,999):R(10,99),s=String(n),ix=[...s].map((d,i)=>i).filter(i=>s[i]!="0"),i=pick(ix),dg=+s[i],p=s.length-1-i,v=dg*10**p;
 return{q:`In <b>${n}</b>, what is the value of the digit <b>${dg}</b>?`,...mk(String(v),[...s].map((d,j)=>String(d*10**(s.length-1-j))).concat([String(dg),String(dg*10),String(dg*100)])),ex:`The digit ${dg} is in the ${["ones","tens","hundreds"][p]} place, so it is worth <b>${v}</b>.`}},
line(g){if(Math.random()<.35){const u=g>=3?100:10,x=u*R(1,5),h=u*R(1,4),y=x+2*h;return{q:`What number is exactly halfway between <b>${x}</b> and <b>${y}</b> on a number line?`,...opts(x+h,u),ex:`Halfway = (${x} + ${y}) ÷ 2 = <b>${x+h}</b>.`}}
 const st=pick(g>=3?[25,50,100]:[2,5,10]),s0=st*R(0,5),m=R(1,3),a=s0+m*st;
 return{q:`Find the missing number:<div class="nl">${[0,1,2,3,4].map(i=>`<span class="${i==m?"gap":""}">${i==m?"?":s0+i*st}</span>`).join("")}</div>`,...opts(a,st),ex:`The line counts in <b>${st}s</b>, so the missing number is <b>${a}</b>.`}},
frac(g){const t=R(0,3);
 if(g<3){if(t<2){const d=pick([2,4]),n=R(1,d-1);return{q:`What fraction is green?<div class="nl">${"🟩".repeat(n)+"⬜".repeat(d-n)}</div>`,...mk(fr(n,d),[fr(d-n,d),fr(n,d+1),fr(n+1,d+1),fr(1,d),fr(d,n+d)]),ex:`${n} of the ${d} equal parts are green, so it is <b>${n}/${d}</b>.`}}
  const d=pick([2,4]),a=R(1,5)*d;return{q:`What is ${d==2?"half":"a quarter"} of <b>${a}</b>?`,...opts(a/d,1),ex:`Share ${a} into ${d} equal groups: <b>${a/d}</b> in each group.`}}
 if(t==0){const d=pick([4,5,6,8,10]),a=R(1,d-2),b=R(1,d-1-a);return{q:`<b>${fr(a,d)} + ${fr(b,d)}</b> = ?`,...mk(fr(a+b,d),[fr(a+b,d*2),fr(a*b,d),fr(a+b+1,d),fr(a,d+b)]),ex:`Same bottom number, so add the tops: ${a} + ${b} = ${a+b}. Answer: <b>${a+b}/${d}</b>.`}}
 if(t==1){const d=pick([4,6,8,10]),a=R(1,d-1);let b=R(1,d-1);if(b==a)b=a%(d-1)+1;const M=Math.max(a,b);return{q:`Which fraction is <b>bigger</b>: ${fr(a,d)} or ${fr(b,d)}?`,...mk(fr(M,d),[fr(Math.min(a,b),d)]),ex:`Same bottom number, so the bigger top is bigger: <b>${fr(M,d)}</b>.`}}
 if(t==2){const n=R(1,3),d=pick([2,3,4]),k=R(2,4);return{q:`<b>${fr(n,d)} = ?/${d*k}</b>`,...opts(n*k,k),ex:`Multiply top and bottom by ${k}: ${n} × ${k} = <b>${n*k}</b>.`}}
 const d=pick([2,3,4,5]),m=R(2,8);return{q:`What is <b>1/${d}</b> of <b>${d*m}</b>?`,...opts(m,1),ex:`${d*m} ÷ ${d} = <b>${m}</b>.`}},
lcm(g){if(g<3){const st=pick([2,3,4,5,10]),s0=st*R(1,3),q=[0,1,2,3].map(i=>s0+i*st);return{q:`Count on: <b>${q.join(", ")}, ?</b>`,...opts(s0+4*st,st),ex:`Add ${st} each time: <b>${s0+4*st}</b>.`}}
 if(Math.random()<.6){const [a,b]=pick([[2,3],[4,6],[3,5],[4,10],[6,8],[5,10],[3,4],[2,7],[6,9],[4,5]]),l=a*b/gcd(a,b);return{q:`What is the <b>LCM</b> (lowest common multiple) of <b>${a}</b> and <b>${b}</b>?`,...mk(String(l),[a*b,a+b,Math.max(a,b)*2,l+a,l*2].map(String)),ex:`The smallest number found in both times tables of ${a} and ${b} is <b>${l}</b>.`}}
 const n=pick([12,18,20,24,30,36]),f=pick([2,3,4,6].filter(x=>n%x==0)),bad=[5,7,8,9,11,13].filter(x=>n%x);return{q:`Which number is a <b>factor</b> of <b>${n}</b>?`,...mk(String(f),bad.map(String)),ex:`${n} ÷ ${f} = ${n/f} with nothing left over, so <b>${f}</b> is a factor.`}},
geo(g){if(g<3||Math.random()<.3){const[s,n]=pick([["triangle",3],["square",4],["rectangle",4],["pentagon",5],["hexagon",6],["octagon",8]]);return{q:`How many sides does a <b>${s}</b> have?`,...opts(n,1),ex:`A ${s} has <b>${n}</b> sides.`}}
 const l=R(3,12),w=R(2,l);return Math.random()<.5?{q:`A rectangle is ${l} cm long and ${w} cm wide. What is its <b>perimeter</b>?`,...opts(2*(l+w),2),ex:`Add all the sides: ${l} + ${w} + ${l} + ${w} = <b>${2*(l+w)} cm</b>.`}:{q:`A rectangle is ${l} cm long and ${w} cm wide. What is its <b>area</b>?`,...opts(l*w,l),ex:`Area = length × width = ${l} × ${w} = <b>${l*w} square cm</b>.`}},
money(g){const u=g>=3?50:10;if(Math.random()<.5){const a=u*R(4,20),b=u*R(1,a/u-1);return{q:`Ada has ₦${a}. She buys a toy for ₦${b}. How much change does she get?`,...opts(a-b,u),ex:`${a} − ${b} = <b>₦${a-b}</b>.`}}
 const n=R(2,6),p=u*R(1,6);return{q:`One pencil costs ₦${p}. How much do ${n} pencils cost?`,...opts(n*p,p),ex:`${n} × ${p} = <b>₦${n*p}</b>.`}}};
const one=(m,g)=>X[m]?X[m](g):OLDGEN(m,g);
const MM=[["add","➕ Addition"],["sub","➖ Subtraction"],["mul","✖️ Times Tables"],["div","➗ Division"],["word","📖 Word Problems"],["place","🏠 Place Value"],["line","📏 Number Line"],["frac","🍕 Fractions"],["lcm","🔗 Multiples, Factors & LCM"],["geo","📐 Shapes & Measures"],["money","💰 Money"]];
const MT=[["🧮","Even or odd?","Numbers ending in 0, 2, 4, 6 or 8 are even. The rest are odd."],["🍕","Fractions","The bottom number says how many equal parts. The top number says how many you have."],["✖️","The 9 times table trick","The digits of every answer add up to 9: 9×4 = 36 and 3+6 = 9."],["📏","Number line","Numbers get bigger as you go right and smaller as you go left."],["🔗","LCM","Write the multiples of both numbers. The first one that is in both lists is the LCM."],["📐","Perimeter and area","Perimeter is the distance around a shape. Area is the space inside it."],["➗","Division","Division shares things equally. Check it with multiplication."]];
SUBJ.maths={n:"Maths",e:"🔢",c1:"#0984e3",c2:"#0652a8",d:"Fractions, LCM & more",learn:{tips:["💡 Maths Tricks",()=>MT.map(([e,t,b])=>({e,t,b}))]},
 modes:Object.fromEntries([...MM.map(([k,l])=>[k,[l,rep(x=>one(k,x))]]),["mix",["🎲 Mixed Challenge",rep(x=>one(pick(MM)[0],x))]]])};
