const cap = s => s.charAt(0).toUpperCase()+s.slice(1);
const pick = arr => arr[Math.floor(Math.random()*arr.length)];

function render(container, items){
  container.innerHTML = '<hr class="divider"><ul class="result-list"></ul>';
  const ul = container.querySelector('.result-list');
  items.forEach((text, i)=>{
    const li = document.createElement('li');
    li.innerHTML = text;
    li.style.animationDelay = (i*70)+'ms';
    ul.appendChild(li);
  });
}

/* ---------------- D&D Character Names ---------------- */
const dnd = {
  noble:  { pre:['Ael','Lyr','Cor','Ith','Fael','Syl','Ren','Vael','Thal','Or'], post:['wyn','ion','dor','iel','ric','wen','thas','mir'],
            epi:['the Ashbound','Lightbearer','the Last Oath','Stormrender','the Unbroken','Dawnward','the Silver Tongue'] },
  grim:   { pre:['Gorim','Hel','Mor','Vor','Grim','Karn','Ulric','Drask','Nyx','Bran'], post:['gar','reth','dan','oth','vek','mund','rok'],
            epi:['the Hollow','Ravenshade','Grimward','the Cinderborn','Nightwhisper','Duskbane','the Unforgiven'] },
  wild:   { pre:['Kael','Wren','Ryn','Bael','Skarr','Torv','Ashka','Rekk'], post:['or','eth','ak','urn','iss','og'],
            epi:['Wolfsbane','the Wanderer','Stormrender','the Untamed','Ironheart','the Bloodied','Emberfall'] }
};
function genDnd(){
  const tone = document.getElementById('dnd-tone').value;
  const n = +document.getElementById('dnd-count').value;
  const list = document.getElementById('dnd-results');
  const out = [];
  for(let i=0;i<n;i++){
    const key = tone==='any' ? pick(['noble','grim','wild']) : tone;
    const b = dnd[key];
    const name = cap(pick(b.pre)) + pick(b.post).toLowerCase();
    out.push(`${name} <em>"${pick(b.epi)}"</em>`);
  }
  render(list, out);
}

/* ---------------- Realm / Map Names ---------------- */
const realmData = {
  kingdom: { title:['Kingdom of','The Realm of','Duchy of','The Crown of'], pre:['Vael','Thorn','Sil','Wynd','Hallow','Bright','Cael','Or'], suf:['moor','vale','mere','wick','haven','crest','marnis','dell'] },
  wild:    { title:['The Wilds of','The Reach of','The Untamed','The Far'], pre:['Ember','Grim','Fen','Dusk','Mourn','Ashen','Wrack'], suf:['reach','hollow','fell','marsh','waste','barrens','span'] },
  ruin:    { title:['The Forgotten','The Sunken','The Ruins of','What Remains of'], pre:['Vael','Grim','Sil','Dusk','Hollow','Ember'], suf:['hold','spire','keep','marnis','vault','reach'] }
};
function genRealm(){
  const kind = document.getElementById('realm-kind').value;
  const n = +document.getElementById('realm-count').value;
  const list = document.getElementById('realm-results');
  const out = [];
  for(let i=0;i<n;i++){
    const key = kind==='any' ? pick(['kingdom','wild','ruin']) : kind;
    const d = realmData[key];
    out.push(`${pick(d.title)} ${cap(pick(d.pre))}${pick(d.suf)}`);
  }
  render(list, out);
}

/* ---------------- Dungeon Names ---------------- */
const dAdj = ['Sunken','Forgotten','Whispering','Blackened','Cursed','Hollow','Silent','Bleeding','Endless','Shattered','Weeping'];
const dStruct = ['Crypt','Catacombs','Vault','Halls','Spire','Warren','Barrow','Sanctum','Labyrinth','Keep'];
const dTheme = ['of the Drowned King','of Screaming Stone','of the Forsaken','of a Thousand Bones','of the Ash Serpent','of the Last Light','of Endless Night','of the Weeping God',''];
function genDungeon(){
  const n = +document.getElementById('dungeon-count').value;
  const list = document.getElementById('dungeon-results');
  const out = [];
  for(let i=0;i<n;i++){
    const theme = pick(dTheme);
    out.push(`The ${pick(dAdj)} ${pick(dStruct)}${theme ? ' '+theme : ''}`);
  }
  render(list, out);
}

/* ---------------- Tavern Names ---------------- */
const tAdj = ['Rusty','Drunken','Silver','Sleeping','Laughing','Broken','Golden','Weary','Prancing','Crooked','Salty','Merry','Wandering'];
const tNoun = ['Dragon','Boar','Anchor','Owl','Kettle','Stag','Griffin','Tankard','Raven','Hound','Lantern','Wyvern','Fiddle'];
function genTavern(){
  const n = +document.getElementById('tavern-count').value;
  const list = document.getElementById('tavern-results');
  const out = [];
  for(let i=0;i<n;i++){
    out.push(`The ${pick(tAdj)} ${pick(tNoun)}`);
  }
  render(list, out);
}


/* ---------------- Tiefling Names ---------------- */
const tiefling = {
  infernal: { pre:['Zar','Meph','Bel','Aza','Lil','Mor','Vex','Kar','Nyx','Ash','Rav','Xan','Ser','Mal','Tor','Dae','Ibl','Zel'],
              post:['iel','ath','or','is','eth','ara','ain','oth','eph','iel','gar','mir'],
              epi:['the Ashen','Hellborn','the Unrepentant','Emberheart','the Twice-Named','Nightwhisper'] },
  virtue:   { names:['Hope','Charity','Creed','Sorrow','Vengeance','Faith','Mercy','Fury','Grace','Valor','Patience','Wisdom','Freedom','Justice','Serenity','Ambition','Devotion','Courage','Truth','Redemption'] },
  human:    { names:['Adrian','Alaric','Anselm','Aubrey','Benedict','Bram','Caspar','Cedric','Corin','Dorian','Edmund','Elias','Emrys','Felix','Gideon','Hugo','Jasper','Julian','Lucian','Marcus','Nathaniel','Osric','Percival','Quentin','Roland','Silas','Theodore','Tobias','Victor','Wendell','Amara','Beatrix','Celeste','Delia','Elowen','Fiona','Greta','Henrietta','Isolde','Josephine','Lydia','Mabel','Nadia','Odette','Marianne','Rosalind','Sable','Tamsin'] }
};
function genTiefling(){
  const trad = document.getElementById('tiefling-tradition').value;
  const n = +document.getElementById('tiefling-count').value;
  const list = document.getElementById('tiefling-results');
  const out = [];
  for(let i=0;i<n;i++){
    const key = trad==='any' ? pick(['infernal','virtue','human']) : trad;
    if(key==='virtue'){ out.push(pick(tiefling.virtue.names)); continue; }
    if(key==='human'){ out.push(pick(tiefling.human.names)); continue; }
    const b = tiefling[key];
    const name = cap(pick(b.pre)) + pick(b.post).toLowerCase();
    out.push(key==='infernal' ? `${name} <em>"${pick(b.epi)}"</em>` : name);
  }
  render(list, out);
}

/* ---------------- Race / Clan Names ---------------- */
const rPre = ['Ember','Frost','Shadow','Stone','Wind','Blood','Star','Moss','Dusk','Sun','Tide','Root','Ash','Bone'];
const rSuf = ['kin','born','folk','walkers','wardens','children','touched','forged','blooded','tribe'];
const rTrait = ['said to weep no tears','who speak only in riddles','born beneath a dying star','who never sleep past dusk','marked by ash at birth','who trade names for secrets','who walk without shadows','who hear the dead singing','bound to a promise no one remembers'];
function genRace(){
  const n = +document.getElementById('race-count').value;
  const list = document.getElementById('race-results');
  const out = [];
  for(let i=0;i<n;i++){
    const name = cap(pick(rPre)) + pick(rSuf);
    out.push(`${name} <em>— ${pick(rTrait)}</em>`);
  }
  render(list, out);
}


/* ---------------- Dwarf Clan Names ---------------- */
const dwarfFirst = { male:['Alberic','Andvar','Barek','Bramdur','Dorgan','Durik','Eberk','Falgrim','Garek','Halvard','Harbek','Jorik','Keldor','Korvin','Magnar','Norbek','Orsik','Rurik','Skarn','Thorek','Torvald','Ulfgar','Vegard','Yorik'], female:['Astrid','Brynna','Dagmar','Dagna','Elska','Freydis','Gerda','Gudrun','Helga','Hilda','Inger','Jorunn','Kara','Kelda','Liv','Magna','Norra','Ragnhild','Runa','Sigrid','Solveig','Thora','Torhild','Yrsa'] };
const dwarfClan = {
  mountain: { pre:['Iron','Stone','Granite','High','Storm','Frost','Thunder','Crag','Onyx','Basalt','Slate','Ridge','Cliff','Summit','Boulder','Quartz','Flint','Raven','Ember'], suf:['mantle','peak','guard','hold','helm','shield','brow','crest','watch','born','delver','spine','fall','gate','fist'] },
  hill: { pre:['Copper','Bronze','Moss','Fern','Heather','Barley','Amber','Clay','Briar','Hazel','Orchard','Meadow','Burrow','Tumble','Green','Clover','Miller','Wool','Honey'], suf:['hill','burrow','field','brook','hollow','gate','foot','hearth','mound','dell','bottom','top','shaw','combe','gard'] },
  craft: { pre:['Gold','Silver','Copper','Steel','Ember','Forge','Anvil','Coal','Gem','Ruby','Sapphire','Ore','Vein','Bright','Star','Deep','Iron','Tin','Jewel'], suf:['hammer','forge','anvil','fist','smith','song','spark','flame','brand','hand','work','vein','beard','delve','wright','glow'] },
  battle: { pre:['War','Battle','Blood','Doom','Grim','Wolf','Bear','Raven','Oath','Wrath','Thunder','Storm','Red','Black','Grudge','Iron','Stone'], suf:['axe','shield','guard','breaker','bane','sworn','heart','fist','maul','rend','watch','born','helm','song','fall','grip'] },
  deep: { pre:['Dark','Deep','Night','Shadow','Gloom','Silent','Pale','Ashen','Hollow','Dusk','Mourn','Obsidian','Black','Umbral','Fathom','Grave','Sable','Dread','Far'], suf:['delver','deep','shadow','gaze','whisper','mantle','born','walker','forge','hold','eye','sworn','mark','vein','gate','fall'] }
};
function genDwarf(){
  const kindSel = document.getElementById('dwarf-kind').value;
  const style = document.getElementById('dwarf-style').value;
  const n = +document.getElementById('dwarf-count').value;
  const list = document.getElementById('dwarf-results');
  const out = [];
  for(let i=0;i<n;i++){
    const key = kindSel==='any' ? pick(['mountain','hill','craft','battle','deep']) : kindSel;
    const b = dwarfClan[key];
    const clan = pick(b.pre) + pick(b.suf);
    if(style==='full'){
      const first = pick(Math.random()<0.5 ? dwarfFirst.male : dwarfFirst.female);
      out.push(`${first} ${clan}`);
    } else out.push(clan);
  }
  render(list, out);
}

/* =================================================================
   DUNGEON MAP GENERATOR
   ================================================================= */
const DIFF = {
  easy:     { grid:10, rooms:[4,6],   size:[2,3], loops:0, enc:[1,2], tre:[1,1], secret:false, label:'Easy — Solo Adventurer' },
  standard: { grid:15, rooms:[7,9],   size:[2,4], loops:1, enc:[3,4], tre:[1,2], secret:false, label:'Standard — Small Party (2–3)' },
  hard:     { grid:20, rooms:[10,13], size:[2,4], loops:3, enc:[5,6], tre:[2,2], secret:false, label:'Hard — Full Party (4–5)' },
  deadly:   { grid:25, rooms:[13,17], size:[2,4], loops:5, enc:[7,9], tre:[2,3], secret:true,  label:'Deadly — Large Party / Veteran Team (6+)' }
};

function randInt(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }
function overlapsRoom(a,b,pad){
  return !(b.x > a.x+a.w+pad || b.x+b.w+pad < a.x || b.y > a.y+a.h+pad || b.y+b.h+pad < a.y);
}
function distPt(a,b){ return Math.hypot(a.x-b.x, a.y-b.y); }
function shuffleSample(pool, n){
  const arr = pool.slice();
  for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; }
  return arr.slice(0, Math.min(n, arr.length));
}

function placeRooms(gridSize, roomRange, sizeRange){
  const target = randInt(roomRange[0], roomRange[1]);
  const cols = Math.max(1, Math.ceil(Math.sqrt(target)));
  const rows = Math.max(1, Math.ceil(target/cols));
  const sectorW = Math.max(3, Math.floor(gridSize/cols));
  const sectorH = Math.max(3, Math.floor(gridSize/rows));
  const sectorList = [];
  for(let r=0;r<rows;r++){ for(let c=0;c<cols;c++){ sectorList.push({c,r}); } }
  const chosen = shuffleSample(sectorList.map((_,i)=>i), Math.min(target, sectorList.length)).map(i=>sectorList[i]);

  return chosen.map(sec=>{
    const w = Math.max(2, Math.min(sizeRange[1], sectorW-1, randInt(sizeRange[0], sizeRange[1])));
    const h = Math.max(2, Math.min(sizeRange[1], sectorH-1, randInt(sizeRange[0], sizeRange[1])));
    const baseX = sec.c*sectorW, baseY = sec.r*sectorH;
    const offX = randInt(0, Math.max(0, sectorW-1-w));
    const offY = randInt(0, Math.max(0, sectorH-1-h));
    let x = baseX+offX, y = baseY+offY;
    x = Math.max(0, Math.min(x, gridSize-w-1));
    y = Math.max(0, Math.min(y, gridSize-h-1));
    return {x,y,w,h};
  });
}

function buildConnections(rooms, layout, loops){
  const centers = rooms.map(r => ({x:r.x+r.w/2, y:r.y+r.h/2}));
  const edges = [];
  if(layout === 'linear'){
    for(let i=0;i<rooms.length-1;i++) edges.push([i,i+1]);
  } else {
    const connected = [0];
    const remaining = rooms.map((_,i)=>i).filter(i=>i!==0);
    while(remaining.length){
      let best=null, bestDist=Infinity, bestFrom=null;
      remaining.forEach(ri=>{
        connected.forEach(ci=>{
          const d = distPt(centers[ri],centers[ci]);
          if(d<bestDist){ bestDist=d; best=ri; bestFrom=ci; }
        });
      });
      edges.push([bestFrom,best]);
      connected.push(best);
      remaining.splice(remaining.indexOf(best),1);
    }
  }
  let added=0, tries=0;
  while(added<loops && tries<300 && rooms.length>2){
    tries++;
    const a = randInt(0, rooms.length-1);
    const b = randInt(0, rooms.length-1);
    if(a!==b && !edges.some(e=>(e[0]===a&&e[1]===b)||(e[0]===b&&e[1]===a))){
      edges.push([a,b]); added++;
    }
  }
  return edges;
}

function startIcon(cx,cy){
  return `<circle cx="${cx}" cy="${cy}" r="9" fill="#F4ECDA" stroke="#171310" stroke-width="2"/><text x="${cx}" y="${cy+4}" font-family="'Space Mono',monospace" font-size="11" font-weight="700" text-anchor="middle" fill="#171310">S</text>`;
}
function exitIcon(cx,cy){
  return `<path d="M ${cx-9} ${cy-7} L ${cx+9} ${cy-7} L ${cx} ${cy+9} Z" fill="#4B7863" stroke="#171310" stroke-width="1.5"/>`;
}
function dangerIcon(cx,cy){
  return `<path d="M ${cx} ${cy-9} L ${cx+9} ${cy} L ${cx} ${cy+9} L ${cx-9} ${cy} Z" fill="#ECDFC0" stroke="#8A2E2A" stroke-width="2"/><text x="${cx}" y="${cy+4}" font-family="'Space Mono',monospace" font-size="12" font-weight="700" text-anchor="middle" fill="#8A2E2A">!</text>`;
}
function treasureIcon(cx,cy){
  const w=16,h=12;
  return `<rect x="${cx-w/2}" y="${cy-h/2}" width="${w}" height="${h}" rx="1.5" fill="#ECDFC0" stroke="#C9A227" stroke-width="2"/><line x1="${cx-w/2}" y1="${cy-h/2+4}" x2="${cx+w/2}" y2="${cy-h/2+4}" stroke="#C9A227" stroke-width="1.5"/><circle cx="${cx}" cy="${cy+1}" r="1.6" fill="#C9A227"/>`;
}

function buildMap(difficulty, layout){
  const d = DIFF[difficulty];
  let rooms = placeRooms(d.grid, d.rooms, d.size);
  let tries = 0;
  while(rooms.length < Math.max(3, d.rooms[0]-1) && tries < 5){
    rooms = placeRooms(d.grid, d.rooms, d.size);
    tries++;
  }
  const edges = buildConnections(rooms, layout, d.loops);
  const centers = rooms.map(r => ({x:r.x+r.w/2, y:r.y+r.h/2}));
  const startIdx = 0;
  let exitIdx = 0, best = -1;
  centers.forEach((c,i)=>{ const dd = distPt(c, centers[startIdx]); if(dd>best){ best=dd; exitIdx=i; } });

  const remainingPool = rooms.map((_,i)=>i).filter(i=>i!==startIdx && i!==exitIdx);
  const encCount = Math.min(randInt(d.enc[0], d.enc[1]), remainingPool.length);
  const encRooms = shuffleSample(remainingPool, encCount);
  const trePool = remainingPool.filter(i=>!encRooms.includes(i));
  const treCount = randInt(d.tre[0], d.tre[1]);
  const treRooms = shuffleSample(trePool.length >= 1 ? trePool : remainingPool, Math.min(treCount, Math.max(trePool.length,1)));
  let secretIdx = null;
  if(d.secret && remainingPool.length){
    secretIdx = pick(remainingPool);
  }

  return { gridSize:d.grid, rooms, edges, startIdx, exitIdx, encRooms, treRooms, secretIdx,
           difficultyLabel:d.label, layoutLabel: layout==='linear' ? 'Linear Crawl' : 'Sprawling Complex' };
}

function buildSVG(data){
  const cell = 26, margin = 24;
  const size = data.gridSize*cell + margin*2;
  let dots = '';
  for(let gx=0; gx<=data.gridSize; gx++){
    for(let gy=0; gy<=data.gridSize; gy++){
      dots += `<circle cx="${margin+gx*cell}" cy="${margin+gy*cell}" r="1" fill="#00000022"/>`;
    }
  }
  let walls = '', floors = '';
  data.edges.forEach(([a,b])=>{
    const ra = data.rooms[a], rb = data.rooms[b];
    const cxA = margin+(ra.x+ra.w/2)*cell, cyA = margin+(ra.y+ra.h/2)*cell;
    const cxB = margin+(rb.x+rb.w/2)*cell, cyB = margin+(rb.y+rb.h/2)*cell;
    const path = `M ${cxA} ${cyA} L ${cxB} ${cyA} L ${cxB} ${cyB}`;
    walls  += `<path d="${path}" fill="none" stroke="#171310" stroke-width="${cell*0.55+6}" stroke-linecap="round" stroke-linejoin="round"/>`;
    floors += `<path d="${path}" fill="none" stroke="#ECDFC0" stroke-width="${cell*0.55}" stroke-linecap="round" stroke-linejoin="round"/>`;
  });
  let roomsMarkup = '';
  data.rooms.forEach((r,i)=>{
    const rx = margin+r.x*cell, ry = margin+r.y*cell, rw = r.w*cell, rh = r.h*cell;
    const dashed = i===data.secretIdx ? ' stroke-dasharray="5 4"' : '';
    roomsMarkup += `<rect x="${rx}" y="${ry}" width="${rw}" height="${rh}" rx="3" fill="#ECDFC0" stroke="#171310" stroke-width="2.5"${dashed}/>`;
    roomsMarkup += `<text x="${rx+6}" y="${ry+14}" font-family="'Space Mono',monospace" font-size="9" fill="#5b4a34">${i+1}</text>`;
    const cx = rx+rw/2, cy = ry+rh/2 + 3;
    const hasEnc = data.encRooms.includes(i), hasTre = data.treRooms.includes(i);
    if(i===data.startIdx){ roomsMarkup += startIcon(cx,cy); }
    else if(i===data.exitIdx){ roomsMarkup += exitIcon(cx,cy); }
    else if(hasEnc && hasTre){ roomsMarkup += dangerIcon(cx-13,cy) + treasureIcon(cx+13,cy); }
    else if(hasEnc){ roomsMarkup += dangerIcon(cx,cy); }
    else if(hasTre){ roomsMarkup += treasureIcon(cx,cy); }
  });
  const compass = `<g transform="translate(${size-38},32)"><circle r="14" fill="none" stroke="#171310" stroke-width="1.5"/><path d="M0 -10 L4 2 L0 -2 L-4 2 Z" fill="#171310"/><text x="0" y="-16" font-family="'Space Mono',monospace" font-size="9" text-anchor="middle" fill="#171310">N</text></g>`;

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="${size}" height="${size}" rx="8" fill="#ECDFC0"/>
    ${dots}${walls}${floors}${roomsMarkup}${compass}
  </svg>`;
}

let currentMapData = null;

function genDungeonMap(){
  const difficulty = document.getElementById('map-difficulty').value;
  const layout = document.getElementById('map-layout').value;
  currentMapData = buildMap(difficulty, layout);
  const svg = buildSVG(currentMapData);
  document.getElementById('map-stage').innerHTML = svg;
  document.getElementById('print-map-stage').innerHTML = svg;

  const meta = `${currentMapData.difficultyLabel} · ${currentMapData.layoutLabel} · ${currentMapData.rooms.length} rooms`;
  document.getElementById('map-meta').textContent = meta;
  document.getElementById('print-meta').textContent = meta;

  const secretItem = document.getElementById('legend-secret');
  const secretItemPrint = document.getElementById('legend-secret-print');
  const showSecret = currentMapData.secretIdx !== null;
  if(secretItem) secretItem.classList.toggle('hidden', !showSecret);
  if(secretItemPrint) secretItemPrint.classList.toggle('hidden', !showSecret);
}

function printMap(){
  if(!currentMapData){ genDungeonMap(); }
  window.print();
}

