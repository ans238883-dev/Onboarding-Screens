(() => {
  const $ = s => document.querySelector(s);
  let data = MadarData.read(), view = 'overview';
  const names = {overview:'نظرة عامة',programs:'البرامج التدريبية',services:'الخدمات',settings:'إعدادات الموقع'};
  const escape = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const badge = item => `<span class="badge ${item.published?'':'draft'}">${item.published?'ظاهر':'مخفي'}</span>`;
  function feedback(text,error=false){$('#feedback').textContent=text;$('#feedback').classList.toggle('error',error);}
  function save(next){try{MadarData.save(next);data=next;feedback('تم حفظ التغييرات في هذا المتصفح.');return true;}catch(e){feedback('تعذر الحفظ: '+e.message,true);return false;}}
  function render(){
    $('#stats').innerHTML=[['البرامج التدريبية',data.programs.length,'◈','برامج تصنع فرص الغد'],['خدمات الموقع',data.services.length,'✳','خدمات تدعم رحلة التعلّم'],['المحتوى الظاهر',[...data.programs,...data.services].filter(x=>x.published).length,'↗','متاح على واجهة الموقع']].map(([label,n,icon,desc])=>`<article class="stat"><small>${label}</small><span class="symbol">${icon}</span><strong>${n.toLocaleString('ar')}</strong><p>${desc}</p></article>`).join('');
    $('#recent').innerHTML=data.programs.slice(0,4).map((item,i)=>`<div class="recent-row"><span class="number">0${i+1}</span><div>${escape(item.title)}<small>${escape(item.category)}</small></div>${badge(item)}</div>`).join('')||'<p class="empty">لا توجد برامج بعد.</p>';
    if(view==='programs'||view==='services'){
      const query=$('#search').value.trim().toLowerCase(), filter=$('#filter').value;
      const items=data[view].filter(item=>(item.title+' '+item.description+' '+item.category).toLowerCase().includes(query)&&(filter==='all'||item.published===(filter==='published')));
      $('#items').innerHTML=items.map(item=>`<tr><td><strong>${escape(item.title)}</strong><small>${escape(item.description)}</small></td><td>${escape(item.category)}</td><td>${badge(item)}</td><td><button class="row-action" data-action="edit" data-id="${escape(item.id)}">تعديل</button><button class="row-action" data-action="toggle" data-id="${escape(item.id)}">${item.published?'إخفاء':'إظهار'}</button><button class="row-action danger" data-action="delete" data-id="${escape(item.id)}">حذف</button></td></tr>`).join('');
      $('#empty').hidden=items.length>0;
    }
  }
  function navigate(next){
    view=next;
    document.querySelectorAll('.view').forEach(el=>el.hidden=true);
    $(next==='programs'||next==='services'?'#contentView':'#'+next).hidden=false;
    document.querySelectorAll('[data-view]').forEach(el=>{if(el.dataset.view===next)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');});
    $('#breadcrumb').textContent=names[next];$('#pageTitle').textContent=next==='overview'?'أهلًا بك في مدار تك ✳':names[next];
    $('#pageDescription').textContent=next==='overview'?'كل ما تحتاجه لإدارة محتوى موقعك، في مكان واحد.':'أدر محتوى مدار تك وحدّث تفاصيله بسهولة.';
    $('#listTitle').textContent=names[next];$('#search').value='';$('#filter').value='all';feedback('');
    for(const [name,value] of Object.entries(data.settings))$('#settingsForm').elements[name].value=value;
    render();
  }
  document.querySelectorAll('[data-view],[data-go]').forEach(el=>el.addEventListener('click',()=>navigate(el.dataset.view||el.dataset.go)));
  $('#today').textContent=new Intl.DateTimeFormat('ar',{dateStyle:'long',timeZone:'Asia/Riyadh'}).format(new Date());
  $('#search').addEventListener('input',render);$('#filter').addEventListener('change',render);
  function edit(item){
    const form=$('#itemForm');form.reset();form.elements.id.value=item?.id||'';
    for(const name of ['title','category','description'])form.elements[name].value=item?.[name]||'';
    form.elements.published.checked=item?.published??true;
    $('#editorTitle').textContent=item?'تعديل العنصر':'إضافة '+(view==='programs'?'برنامج تدريبي':'خدمة');
    $('#editor').showModal();form.elements.title.focus();
  }
  $('#addItem').addEventListener('click',()=>edit());
  for(const selector of ['#closeEditor','#cancelEditor'])$(selector).addEventListener('click',()=>$('#editor').close());
  $('#itemForm').addEventListener('submit',event=>{
    event.preventDefault();const form=event.currentTarget;
    const item={id:form.elements.id.value||crypto.randomUUID(),title:form.elements.title.value.trim(),category:form.elements.category.value.trim(),description:form.elements.description.value.trim(),published:form.elements.published.checked};
    const next=structuredClone(data),index=next[view].findIndex(x=>x.id===item.id);
    if(index<0)next[view].push(item);else next[view][index]=item;
    if(save(next)){$('#editor').close();render();}
    else {$('#editor').close();}
  });
  $('#items').addEventListener('click',event=>{
    const button=event.target.closest('[data-action]');if(!button)return;
    const item=data[view].find(x=>x.id===button.dataset.id);if(!item)return;
    if(button.dataset.action==='edit'){edit(item);return;}
    if(button.dataset.action==='delete'&&!confirm('حذف «'+item.title+'»؟ لا يمكن التراجع عن الحذف.'))return;
    const next=structuredClone(data);
    if(button.dataset.action==='delete')next[view]=next[view].filter(x=>x.id!==item.id);
    else next[view].find(x=>x.id===item.id).published=!item.published;
    if(save(next))render();
  });
  $('#settingsForm').addEventListener('submit',event=>{event.preventDefault();const next=structuredClone(data);next.settings=Object.fromEntries(new FormData(event.currentTarget));for(const k in next.settings)next.settings[k]=next.settings[k].trim();save(next);});
  $('#exportData').addEventListener('click',()=>{
    const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='madar-content.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);feedback('تم تصدير نسخة من المحتوى.');
  });
  $('#importData').addEventListener('change',async event=>{
    const file=event.target.files[0];if(!file)return;
    try{if(file.size>1000000)throw Error('الملف كبير جدًا');const next=MadarData.validate(JSON.parse(await file.text()));if(confirm('استبدال المحتوى المحلي بالملف المختار؟')&&save(next)){navigate('settings');feedback('تم استيراد المحتوى بنجاح.');}}
    catch(e){feedback('تعذر الاستيراد: '+e.message,true);}finally{event.target.value='';}
  });
  window.addEventListener('storage',event=>{if(event.key===MadarData.key){data=MadarData.read();navigate(view);feedback('تم تحديث المحتوى من نافذة أخرى.');}});
  navigate('overview');
})();
