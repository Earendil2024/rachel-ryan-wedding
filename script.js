const contentUrl = './content/site.json';
const app = document.querySelector('#app');
let content;

const knot = `<svg class="knot-divider" viewBox="0 0 100 48" aria-hidden="true"><path d="M8 24c0-17 25-17 25 0s25 17 25 0-25-17-25 0 25 17 25 0 25-17 25 0-25 17-25 0 25-17 25 0"/><path d="M8 24c0 17 25 17 25 0s25-17 25 0-25 17-25 0 25-17 25 0 25 17 25 0-25-17-25 0 25-17 25 0"/></svg>`;
const floral = `<svg class="floral-spark" viewBox="0 0 32 32" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 2c5 6 5 8 0 12-5-4-5-6 0-12Zm14 14c-6 5-8 5-12 0 4-5 6-5 12 0ZM16 30c-5-6-5-8 0-12 5 4 5 6 0 12ZM2 16c6-5 8-5 12 0-4 5-6 5-12 0Z"/><circle cx="16" cy="16" r="3" fill="var(--peach)"/></g></svg>`;
const safe = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const weddingDate = date => new Date(`${date}T12:00:00`);
const niceDate = date => weddingDate(date).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});
const daysToGo = date => Math.ceil((new Date(`${date}T00:00:00`).getTime()-new Date(new Date().toDateString()).getTime())/86400000);
const banner = (page, cls) => `<header class="masthead ${cls}" style="background-image:${page.bannerImage?`url('${safe(page.bannerImage)}')`:'none'}"><div class="banner-photo-placeholder">${page.bannerImage?'':'Add a banner photo in Pages CMS'}</div><div class="masthead-inner"><div class="eyebrow">${safe(page.subtitle)}</div><h1 class="anglican-title">${safe(page.title)}</h1></div></header>`;
const placeCard = item => `<article class="place-card"><div class="place-image ${item.image?'':'photo-empty'}" role="img" aria-label="${safe(item.name)}" style="background-image:${item.image?`url('${safe(item.image)}')`:'none'}">${item.image?'':'<span class="photo-placeholder">Add a photo in Pages CMS</span>'}</div><div class="place-info"><h3>${safe(item.name)}</h3><div class="address">${safe(item.address)}${item.phone?` · ${safe(item.phone)}`:''}</div><p>${safe(item.description)}</p>${item.website?`<a href="${safe(item.website)}" target="_blank" rel="noopener noreferrer">Visit website ↗</a>`:''}</div></article>`;

function logoMarkup(){
  document.querySelectorAll('.logo-slot').forEach(slot=>{
    const img=slot.querySelector('.site-logo'),placeholder=slot.querySelector('.logo-placeholder');
    if(content.site.logoImage){img.src=content.site.logoImage;img.alt=content.site.logoAlt||content.site.names;img.hidden=false;placeholder.hidden=true}
    else{img.hidden=true;placeholder.hidden=false}
  });
}
function renderHome(){
  const h=content.home,s=content.site,photos=h.heroPhotos||[],days=daysToGo(s.date);
  return `<section class="hero" style="background-image:${h.backgroundImage?`url('${safe(h.backgroundImage)}')`:'none'}"><div class="background-photo-placeholder">${h.backgroundImage?'':'Add a home background photo in Pages CMS'}</div><div class="hero-copy"><div class="hero-kicker">${safe(s.city)}</div><h1>${safe(s.names)}</h1><div class="hero-date">${safe(niceDate(s.date))}</div><div class="hero-intro-divider" aria-hidden="true">${floral}${knot}${floral}</div><p>${safe(h.intro)}</p><a class="button" href="${safe(s.rsvpUrl)}" target="_blank" rel="noopener noreferrer">Kindly RSVP ↗</a></div><div class="hero-frame" aria-label="Rotating wedding photos">${photos.map((photo,i)=>`<div class="hero-slide ${i===0?'active':''} ${photo?'':'photo-empty'}" style="background-image:${photo?`url('${safe(photo)}')`:'none'}" aria-hidden="${i!==0}">${photo?'':'<span class="photo-placeholder">Add a portrait photo in Pages CMS</span>'}</div>`).join('')}<button class="hero-arrow prev" aria-label="Previous photo">‹</button><button class="hero-arrow next" aria-label="Next photo">›</button><div class="dots">${photos.map((_,i)=>`<button class="dot ${i===0?'active':''}" aria-label="Show photo ${i+1}" data-slide="${i}"></button>`).join('')}</div></div></section><section class="quote-band"><blockquote>“${safe(h.quote)}”<cite>${safe(h.quoteAttribution)}</cite></blockquote></section><section class="wedding-day"><div class="section-label">${days>0?`${days} days to go`:days===0?'Today is the day!':'Celebrating since'}</div><h2>Wedding Day</h2><div class="wedding-date">${safe(niceDate(s.date))}</div><div class="event-grid">${(h.events||[]).map(event=>`<article class="event">${event.image?`<img class="event-photo" src="${safe(event.image)}" alt="${safe(event.venue)}">`:`<div class="event-photo-placeholder">Add a landscape venue photo</div>`}<div class="event-copy"><h3>${safe(event.title)}</h3><p>${safe(event.venue)}</p><small>${safe(event.location)} · ${safe(event.time)}</small></div></article>`).join('')}</div></section>`;
}
function renderQa(){
  const p=content.pages.qa;
  return `${banner(p,'qa-title')}<div class="page-content"><div class="qa-list">${(p.items||[]).map(item=>`<article class="qa-item"><h3>${safe(item.question)}</h3><p>${safe(item.answer)}${item.linkUrl?` <a href="${safe(item.linkUrl)}" target="_blank" rel="noopener noreferrer">${safe(item.linkLabel||'More information')} ↗</a>`:''}</p>${/park/i.test(item.question)?`<div class="parking-note"><span>01</span><div><strong>Ceremony</strong><br>Treasuring Christ Church · off Lake Wheeler Road</div><span>02</span><div><strong>Reception</strong><br>Washington Street, Raleigh</div></div>`:''}</article>`).join('')}</div></div>`;
}
function renderTravel(){
  const p=content.pages.travel,photos=p.imageBannerPhotos||[],ribbon=[...photos,...photos];
  return `${banner(p,'travel-title')}<div class="page-content"><p class="page-intro">${safe(p.intro)}</p><section class="travel-gallery" aria-label="Hotel photo banner"><div class="travel-track">${ribbon.map((photo,i)=>photo?`<img src="${safe(photo)}" alt="${i<photos.length?'Hotel photo':''}" ${i>=photos.length?'aria-hidden="true"':''}>`:`<div class="travel-empty-slot" ${i>=photos.length?'aria-hidden="true"':''}><span>Add a hotel photo in Pages CMS</span></div>`).join('')}</div></section><div class="places">${(p.hotels||[]).map(placeCard).join('')}</div></div>`;
}
function renderGuide(){
  const p=content.pages.guide;
  return `${banner(p,'guide-title')}<div class="page-content"><p class="page-intro">${safe(p.intro)}</p><div class="place-section"><div class="kicker">Explore</div><h2>Things to do</h2></div><div class="places guide-places">${(p.things||[]).map(placeCard).join('')}</div><div class="place-section"><div class="kicker">Come hungry</div><h2>Where to eat</h2></div><div class="places guide-places">${(p.restaurants||[]).map(placeCard).join('')}</div></div>`;
}
const renderers={home:renderHome,'q-a':renderQa,travel:renderTravel,'things-to-do':renderGuide};
function setupHero(){
  const slides=[...document.querySelectorAll('.hero-slide')];if(!slides.length)return;
  const dots=[...document.querySelectorAll('.dot')];let index=0;
  const show=n=>{index=(n+slides.length)%slides.length;slides.forEach((slide,i)=>{slide.classList.toggle('active',i===index);slide.setAttribute('aria-hidden',i!==index)});dots.forEach((dot,i)=>dot.classList.toggle('active',i===index))};
  document.querySelector('.hero-arrow.prev').onclick=()=>show(index-1);document.querySelector('.hero-arrow.next').onclick=()=>show(index+1);dots.forEach(dot=>dot.onclick=()=>show(Number(dot.dataset.slide)));
  clearInterval(window.heroTimer);window.heroTimer=setInterval(()=>show(index+1),5500);
}
function render(){
  const page=location.hash.replace(/^#\/?/,'')||'home',target=page==='photos'?'home':page;
  app.innerHTML=renderers[target]?renderers[target]():`<div class="not-found"><h2>We can’t find that page</h2><a class="button" href="#/home">Back home</a></div>`;
  document.querySelectorAll('.main-nav a[data-page]').forEach(link=>link.classList.toggle('active',link.dataset.page===target));
  const titles={home:'Home','q-a':content.pages.qa.title,travel:content.pages.travel.title,'things-to-do':content.pages.guide.title};
  document.title=`${titles[target]||'Page'} | ${content.site.names}`;
  document.querySelector('.registry-link').href=content.site.registryUrl;document.querySelector('.nav-rsvp').href=content.site.rsvpUrl;
  for(const [key,value] of Object.entries(content.site.colors||{}))if(/^#[0-9a-f]{6}$/i.test(value)){document.documentElement.style.setProperty(`--${key}`,value);const rgb=value.match(/[0-9a-f]{2}/gi).map(channel=>parseInt(channel,16)).join(',');document.documentElement.style.setProperty(`--${key}-rgb`,rgb)}
  logoMarkup();setupHero();document.querySelector('.main-nav').classList.remove('open');document.querySelector('.menu-toggle').setAttribute('aria-expanded','false');window.scrollTo({top:0,behavior:'smooth'});
}
document.querySelector('.menu-toggle').addEventListener('click',event=>{const nav=document.querySelector('.main-nav');nav.classList.toggle('open');event.currentTarget.setAttribute('aria-expanded',nav.classList.contains('open'))});
window.addEventListener('hashchange',()=>content&&render());
fetch(contentUrl).then(response=>{if(!response.ok)throw new Error('Could not load the site content file.');return response.json()}).then(data=>{content=data;render()}).catch(error=>{app.innerHTML=`<div class="not-found"><h2>Site content could not load</h2><p>${safe(error.message)} Please open this site through a web server or GitHub Pages.</p></div>`});

