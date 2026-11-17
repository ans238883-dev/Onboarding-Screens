/* Shared local content store. No remote publication or authentication is implied. */
(() => {
  const key = 'madar-content-v1';
  const defaults = {
    programs: [
      {id:'web',title:'Front-End Development',category:'مسار تقني',description:'تعلم أساسيات تطوير واجهات المواقع الإلكترونية.',published:true},
      {id:'ai',title:'Artificial Intelligence',category:'تقنيات المستقبل',description:'التعرف على أدوات الذكاء الاصطناعي وتطبيقاتها العملية.',published:true},
      {id:'digital',title:'Digital Skills',category:'مهارات رقمية',description:'تطوير المهارات الرقمية واستخدام الأدوات التقنية.',published:true}
    ],
    services: [
      {id:'training',title:'التدريب والتطوير',category:'↗',description:'برامج تدريبية متخصصة تهدف إلى تطوير المهارات التقنية والمهنية من خلال التعلم والتطبيق.',published:true},
      {id:'workspace',title:'مساحات العمل المشتركة',category:'⌘',description:'بيئة مناسبة للطلاب والمستقلين وأصحاب المشاريع لإنجاز أعمالهم وتبادل الأفكار.',published:true},
      {id:'rooms',title:'القاعات التدريبية',category:'▦',description:'قاعات مجهزة لاستضافة الدورات التدريبية والاجتماعات والفعاليات والأنشطة.',published:true},
      {id:'activities',title:'الأنشطة التعليمية',category:'✳',description:'لقاءات ومبادرات تعليمية تساهم في نشر المعرفة وتبادل الخبرات.',published:true}
    ],
    settings:{email:'madartech1@gmail.com',instagram:'madar_tech0',address:'خانيونس – بجانب المحكمة الشرعية.',whatsapp:''}
  };
  function validate(data) {
    if (!data || !data.settings || !['email','instagram','address','whatsapp'].every(k => typeof data.settings[k] === 'string' && data.settings[k].length <= 500)) throw Error('ملف البيانات غير صالح');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.settings.email) || !/^[a-zA-Z0-9._]{1,30}$/.test(data.settings.instagram) || !/^(?:[1-9]\d{6,14})?$/.test(data.settings.whatsapp)) throw Error('تحقق من البريد واسم إنستغرام ورقم واتساب');
    for (const type of ['programs','services']) {
      if (!Array.isArray(data[type]) || data[type].length > 200) throw Error('قائمة المحتوى غير صالحة');
      const ids = new Set();
      for (const item of data[type]) {
        if (!item || !['id','title','category','description'].every(k => typeof item[k] === 'string' && item[k].length <= 2000) || !item.id || !item.title.trim() || !item.description.trim() || typeof item.published !== 'boolean' || ids.has(item.id)) throw Error('بيانات العنصر غير صالحة');
        ids.add(item.id);
      }
    }
    return data;
  }
  function read() {
    try { const raw = localStorage.getItem(key); return raw ? validate(JSON.parse(raw)) : structuredClone(defaults); }
    catch { return structuredClone(defaults); }
  }
  window.MadarData = {key, read, validate, defaults:()=>structuredClone(defaults), save(data) {validate(data); localStorage.setItem(key,JSON.stringify(data));}};
})();
