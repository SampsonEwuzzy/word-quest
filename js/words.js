const W2=parse(`brave|Adjective|not afraid of danger|The brave firefighter saved the kitten.
curious|Adjective|wanting to learn or know more|The curious boy opened the old box.
gentle|Adjective|soft and kind|Be gentle with the baby bird.
enormous|Adjective|very, very big|An enormous elephant walked by.
tiny|Adjective|very small|A tiny ant carried a crumb.
bright|Adjective|full of light or very colourful|The bright sun woke me up.
whisper|Verb|to speak very softly|Please whisper in the library.
gather|Verb|to bring things together|We gather shells at the beach.
explore|Verb|to travel to find new things|Let us explore the forest.
hurry|Verb|to move or act fast|We must hurry or we will be late.
pour|Verb|to make a liquid flow out|Mum will pour the juice.
treasure|Noun|gold, jewels or something precious|The pirates buried the treasure.
garden|Noun|a place where flowers or food grow|Dad planted beans in the garden.
journey|Noun|a long trip from one place to another|Our journey to the village was long.
island|Noun|land with water all around it|We sailed to a small island.
quickly|Adverb|in a fast way|The rabbit ran quickly home.`);
const W3=parse(`delighted|Adjective|very happy and pleased|She was delighted with her new book.
generous|Adjective|happy to give and share|The generous man shared his food.
ancient|Adjective|very, very old|We saw an ancient castle.
fragile|Adjective|easy to break|Be careful, the glass is fragile.
struggle|Verb|to try very hard to do something difficult|I struggle to lift the heavy bag.
observe|Verb|to watch carefully|Scientists observe the stars at night.
announce|Verb|to tell everyone something important|The teacher will announce the winner.
discover|Verb|to find something for the first time|Explorers discover new islands.
protect|Verb|to keep safe from harm|A helmet will protect your head.
invent|Verb|to make something new that never existed|Engineers invent useful machines.
adventure|Noun|an exciting and unusual experience|Our camping trip was a big adventure.
mystery|Noun|something strange that is hard to explain|The missing key is a mystery.
habitat|Noun|the natural home of an animal or plant|The forest is the habitat of many birds.
courage|Noun|being brave when you feel afraid|It took courage to speak on stage.
kingdom|Noun|a land ruled by a king or queen|The kingdom had a tall golden gate.
carefully|Adverb|in a way that avoids mistakes or harm|She carefully carried the eggs.
eagerly|Adverb|in a way that shows you really want something|The children eagerly opened their gifts.`);
const SENT=parse(`The dog barked loudly.|dog|Noun
My mother cooked rice.|mother|Noun
We visited the market.|market|Noun
Children play in the park.|play|Verb
She jumped over the log.|jumped|Verb
Birds fly in the sky.|fly|Verb
The red balloon floated away.|red|Adjective
We saw a tall giraffe.|tall|Adjective
She wore a beautiful dress.|beautiful|Adjective
The turtle walks slowly.|slowly|Adverb
He spoke quietly.|quietly|Adverb
She sings happily.|happily|Adverb
She likes to read.|She|Pronoun
They are my friends.|They|Pronoun
Give the book to him.|him|Pronoun
The cat sat on the mat.|on|Preposition
The ball rolled under the bed.|under|Preposition
The bird flew over the tree.|over|Preposition
I like tea and bread.|and|Conjunction
I was tired but happy.|but|Conjunction
Wear a coat because it is cold.|because|Conjunction`);
const FR=parse(`bonjour|hello|👋|bon-ZHOOR
au revoir|goodbye|🙋|oh ruh-VWAHR
merci|thank you|🙏|mehr-SEE
s'il vous plaît|please|🤲|seel voo PLAY
oui|yes|✅|WEE
non|no|❌|noh
rouge|red|🔴|roozh
bleu|blue|🔵|bluh
vert|green|🟢|vair
jaune|yellow|🟡|zhone
chat|cat|🐱|shah
chien|dog|🐶|shee-AN
oiseau|bird|🐦|wah-ZOH
poisson|fish|🐟|pwah-SON
un|one|1️⃣|uh(n)
deux|two|2️⃣|duh
trois|three|3️⃣|trwah
quatre|four|4️⃣|KAT-ruh
cinq|five|5️⃣|sank`),FR3=parse(`six|six|6️⃣|sees
sept|seven|7️⃣|set
huit|eight|8️⃣|weet
neuf|nine|9️⃣|nuhf
dix|ten|🔟|deess
maman|mum|👩|mah-MAHN
papa|dad|👨|pah-PAH
école|school|🏫|ay-KOL
livre|book|📘|LEE-vruh
pomme|apple|🍎|pom
eau|water|💧|oh
maison|house|🏠|may-ZON
soleil|sun|☀️|so-LAY
lune|moon|🌙|LOON
ami|friend|🤝|ah-MEE`),frPool=g=>g>=3?[...FR,...FR3]:FR;
const G2=["Noun","Verb","Adjective","Adverb"],G3=[...G2,"Pronoun","Preposition","Conjunction"];
const INFO={Noun:["#e74c3c","🐶","A noun is a naming word. It names a person, animal, place or thing.","teacher, lion, Abuja, book","Can you see it, touch it, or name it? It is probably a noun!"],
Verb:["#27ae60","🏃","A verb is an action word. It tells what someone or something does.","run, jump, eat, sleep","If you can DO it, it is a verb!"],
Adjective:["#f39c12","🌈","An adjective is a describing word. It tells us more about a noun.","big, red, soft, happy","Adjectives answer: What kind? How many? Which one?"],
Adverb:["#8e44ad","🐢","An adverb tells HOW, WHEN or WHERE an action happens.","quickly, slowly, today, loudly","Many adverbs end in -ly!"],
Pronoun:["#2980b9","👆","A pronoun takes the place of a noun so we do not repeat it.","he, she, it, we, they","Instead of 'Ada is kind. Ada sings', say 'Ada is kind. She sings.'"],
Preposition:["#16a085","📍","A preposition shows where something is, or when something happens.","in, on, under, over, beside","Think of where a mouse can be: in, on, under the box!"],
Conjunction:["#d35400","🔗","A conjunction is a joining word. It joins words or sentences.","and, but, or, because, so","Conjunctions are like glue for sentences."],
Interjection:["#c0392b","😲","An interjection shows a sudden strong feeling. It often ends with '!'","Wow! Ouch! Hooray! Oh no!","Say it with feeling!"]};

const pool=g=>g>=3?[...W2,...W3]:W2,al=g=>g>=3?G3:G2;
const WM={meaning:g=>{const p=pool(g);return shuf(p).slice(0,10).map(([w,pos,m,s])=>({q:`What does <span class="hl">${w}</span> mean?`,...mk(m,p.map(x=>x[2])),ex:`<b>${w}</b> (${pos}) means <i>${m}</i>.<br>“${s}”`}))},
sentence:g=>{const p=pool(g).filter(x=>new RegExp("\\b"+x[0]+"\\b","i").test(x[3]));return shuf(p).slice(0,10).map(([w,pos,m,s])=>({q:`Pick the missing word:<br>“${s.replace(new RegExp("\\b"+w+"\\b","i"),"_____")}”`,...mk(w,p.map(x=>x[0])),ex:`Answer: <b>${w}</b> – ${m}.<br>“${s}”`}))},
pos:g=>{const a=al(g);return shuf(SENT.filter(x=>a.includes(x[2]))).slice(0,10).map(([s,t,p])=>{const i=INFO[p];return{q:`What part of speech is the coloured word?<br>“${s.replace(new RegExp("\\b"+esc(t)+"\\b"),`<span class="hl">${t}</span>`)}”`,...mk(p,a),ex:`<b>${t}</b> is a <b style="color:${i[0]}">${p}</b> ${i[1]}<br>${i[2]}`}})},
french:g=>{const fp=frPool(g);return shuf(fp).slice(0,10).map(([f,e,j,p])=>Math.random()<.5?{q:`How do you say <span class="hl">${e}</span> ${j} in French?`,...mk(f,fp.map(x=>x[0])),ex:`<b>${e}</b> = <b>${f}</b> ${j}<br>Say it: ${p}`}:{q:`What does <span class="hl">${f}</span> mean in English?`,...mk(e,fp.map(x=>x[1])),ex:`<b>${f}</b> means <b>${e}</b> ${j}<br>Say it: ${p}`})}};
SUBJ.words={n:"Words & French",e:"📖",c1:"#e17055",c2:"#c0392b",d:"Vocabulary, grammar, French",
learn:{words:["📖 Learn New Words",g=>pool(g).map(([w,p,m,s])=>({e:"📖",t:w,s:`(${p})`,b:`💡 ${m}<br>“${s}”`,say:w}))],
french:["🥖 Learn French Words",g=>frPool(g).map(([f,e,j,p])=>({e:j,t:f,s:`say: ${p}`,b:`= <b>${e}</b> in English`,say:f,lang:"fr-FR"}))],
pos:["🎨 Parts of Speech",g=>(g>=3?Object.keys(INFO):G2).map(n=>{const i=INFO[n];return{e:i[1],t:n,s:i[2],b:`Examples: ${i[3]}<br>💡 ${i[4]}`,color:i[0]}})]},
modes:{meaning:["🧠 Word Meanings",WM.meaning],sentence:["✏️ Sentence Challenge",WM.sentence],pos:["🔍 Parts of Speech Game",WM.pos],french:["🥖 French Quiz",WM.french]}};
