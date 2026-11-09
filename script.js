/* Portfolio interactions */
const root=document.documentElement;
const menuToggle=document.querySelector("#menuToggle");
const navMenu=document.querySelector("#primaryNav");
const backToTop=document.querySelector("#backToTop");
const yearElement=document.querySelector("#currentYear");
if(yearElement)yearElement.textContent=new Date().getFullYear();
if(menuToggle&&navMenu){
 menuToggle.addEventListener("click",()=>{
  const open=navMenu.classList.toggle("active");
  menuToggle.setAttribute("aria-expanded",String(open));
  menuToggle.setAttribute("aria-label",open?"Close navigation menu":"Open navigation menu");
 });
 navMenu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
  navMenu.classList.remove("active");menuToggle.setAttribute("aria-expanded","false");
 }));
 document.addEventListener("keydown",e=>{if(e.key==="Escape"){navMenu.classList.remove("active");menuToggle.setAttribute("aria-expanded","false");}});
}
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{
 const href=a.getAttribute("href");if(!href||href==="#")return;
 const target=document.querySelector(href);if(!target)return;
 e.preventDefault();target.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
}));
const sections=document.querySelectorAll("main section[id]");
const links=document.querySelectorAll(".primary-nav a[href^='#']");
if("IntersectionObserver"in window){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  links.forEach(link=>{const active=link.getAttribute("href")==="#"+entry.target.id;link.classList.toggle("is-current",active);if(active)link.setAttribute("aria-current","location");else link.removeAttribute("aria-current");});
 }),{rootMargin:"-35% 0px -55% 0px"});
 sections.forEach(section=>observer.observe(section));
}
function scrollState(){backToTop?.classList.toggle("show",window.scrollY>400);}
window.addEventListener("scroll",scrollState,{passive:true});scrollState();
backToTop?.addEventListener("click",()=>window.scrollTo({top:0,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"}));
