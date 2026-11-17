(() => {
  function apply(){
    const data=MadarData.read();
    const node=(tag,className,text)=>{const el=document.createElement(tag);if(className)el.className=className;if(text!==undefined)el.textContent=text;return el;};
    const programs=document.querySelector('.program-list');programs.replaceChildren();
    data.programs.filter(item=>item.published).forEach((item,i)=>{
      const row=node('article','program-row'),info=node('div','program-info');
      info.append(node('span','',item.category),node('h3','',item.title),node('p','',item.description));
      const link=node('a','program-link','اعرف المزيد ←');link.href='#contact';row.append(node('div','program-symbol',String(i+1).padStart(2,'0')),info,link);programs.append(row);
    });
    const services=document.querySelector('.services-section .row');services.replaceChildren();
    data.services.filter(item=>item.published).forEach((item,i)=>{
      const col=node('div','col-md-6 col-lg-3'),card=node('article','service-card'),link=node('a','','اعرف المزيد ←');link.href='#contact';
      card.append(node('span','service-icon',item.category),node('span','card-index',String(i+1).padStart(2,'0')),node('h3','',item.title),node('p','',item.description),link);col.append(card);services.append(col);
    });
    const settings=data.settings;
    document.querySelectorAll('a[href^="mailto:"]').forEach(a=>{a.href='mailto:'+settings.email;const strong=a.querySelector('strong');if(strong)strong.textContent=settings.email;else a.textContent=settings.email;});
    document.querySelectorAll('a[href^="https://www.instagram.com/"]').forEach(a=>{a.href='https://www.instagram.com/'+encodeURIComponent(settings.instagram);const strong=a.querySelector('strong');if(strong)strong.textContent='@'+settings.instagram;});
    document.querySelector('.location-icon + .detail-text strong').textContent=settings.address;
    document.querySelector('.footer-links:last-child > span').textContent=settings.address;
  }
  document.addEventListener('DOMContentLoaded',apply);
  window.addEventListener('storage',event=>{if(event.key===MadarData.key)apply();});
})();
