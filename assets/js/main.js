
const $=(s,c=document)=>c.querySelector(s);const $$=(s,c=document)=>[...c.querySelectorAll(s)];
document.addEventListener('DOMContentLoaded',()=>{
 const menuBtn=$('.menu-toggle'),nav=$('.nav-links');
 if(menuBtn&&nav){menuBtn.addEventListener('click',()=>{const open=menuBtn.classList.toggle('active');nav.classList.toggle('active',open);document.body.classList.toggle('menu-open',open);menuBtn.setAttribute('aria-expanded',String(open))});$$('.nav-links a').forEach(a=>a.addEventListener('click',()=>{menuBtn.classList.remove('active');nav.classList.remove('active');document.body.classList.remove('menu-open')}));}
 const topBtn=$('.back-top');if(topBtn){window.addEventListener('scroll',()=>topBtn.classList.toggle('show',scrollY>500),{passive:true});topBtn.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));}
 const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}}),{threshold:.12});$$('.reveal').forEach(el=>obs.observe(el));
 const countObs=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,target=Number(el.dataset.count||0),suffix=el.dataset.suffix||'+';let start=0;const duration=1100,begin=performance.now();const tick=t=>{const p=Math.min((t-begin)/duration,1);el.textContent=Math.floor(target*(1-Math.pow(1-p,3)))+suffix;if(p<1)requestAnimationFrame(tick)};requestAnimationFrame(tick);countObs.unobserve(el)}),{threshold:.5});$$('[data-count]').forEach(el=>countObs.observe(el));
 $$('.faq-question').forEach(btn=>btn.addEventListener('click',()=>{const item=btn.closest('.faq-item'),ans=$('.faq-answer',item),open=item.classList.toggle('active');btn.setAttribute('aria-expanded',String(open));ans.style.maxHeight=open?ans.scrollHeight+'px':'0px'}));
 const filters=$$('.filter-btn'),cards=$$('.product-card'),search=$('#productSearch'),empty=$('.empty-state');
 const applyFilter=()=>{if(!cards.length)return;const active=$('.filter-btn.active')?.dataset.filter||'all',q=(search?.value||'').trim().toLowerCase();let shown=0;cards.forEach(card=>{const okCat=active==='all'||card.dataset.category===active,okQ=!q||card.textContent.toLowerCase().includes(q);card.hidden=!(okCat&&okQ);if(!card.hidden)shown++});empty?.classList.toggle('show',shown===0)};
 filters.forEach(btn=>btn.addEventListener('click',()=>{filters.forEach(x=>x.classList.remove('active'));btn.classList.add('active');applyFilter()}));search?.addEventListener('input',applyFilter);const hashFilter=location.hash.replace('#','');if(hashFilter&&filters.length){const match=filters.find(b=>b.dataset.filter===hashFilter);if(match){filters.forEach(x=>x.classList.remove('active'));match.classList.add('active');applyFilter();setTimeout(()=>document.querySelector('.products-toolbar')?.scrollIntoView({behavior:'smooth',block:'start'}),50)}}
 const params=new URLSearchParams(location.search),product=params.get('product');if(product){const interest=$('#interest'),msg=$('#message');if(interest)interest.value='طلب عرض سعر';if(msg&&!msg.value)msg.value=`أرغب بالحصول على عرض سعر ومعلومات إضافية عن: ${product}`;}
 const form=$('#contactForm'),status=$('.form-status');form?.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const text=[`مرحباً، أنا ${data.get('name')}`,`رقم الهاتف: ${data.get('phone')}`,data.get('company')?`الشركة: ${data.get('company')}`:'',`نوع الطلب: ${data.get('interest')}`,`التفاصيل: ${data.get('message')}`].filter(Boolean).join('\n');window.open(`https://wa.me/962790941095?text=${encodeURIComponent(text)}`,'_blank','noopener');if(status){status.style.display='block';status.textContent='تم تجهيز رسالتك وفتح واتساب لإرسالها إلى فريق عابدين.'}});
 const year=$('[data-year]');if(year)year.textContent=new Date().getFullYear();
});

document.addEventListener('DOMContentLoaded',()=>{
  const track=document.querySelector('[data-carousel]');
  if(track){
    const wrap=track.closest('.product-carousel-wrap');
    const prev=wrap?.querySelector('.carousel-btn.prev');
    const next=wrap?.querySelector('.carousel-btn.next');
    const step=()=>Math.max(240,track.clientWidth*.72);
    prev?.addEventListener('click',()=>track.scrollBy({left:step(),behavior:'smooth'}));
    next?.addEventListener('click',()=>track.scrollBy({left:-step(),behavior:'smooth'}));
  }
});
