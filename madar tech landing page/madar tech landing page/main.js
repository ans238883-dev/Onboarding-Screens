// Madar Tech Landing Page interactions
document.addEventListener('DOMContentLoaded', () => {
  // تحديث سنة حقوق النشر تلقائياً
  const yearElement = document.getElementById('year');
  if (yearElement) yearElement.textContent = new Date().getFullYear();

  // إغلاق قائمة Bootstrap بعد اختيار رابط على الشاشات الصغيرة
  const nav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('#mainNav .nav-link, #mainNav .nav-cta');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992 && nav.classList.contains('show') && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(nav).hide();
      }
    });
  });

  // إرسال بيانات النموذج إلى واتساب
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const name = String(formData.get('name')).trim();
    const email = String(formData.get('email')).trim();
    const phone = String(formData.get('phone')).trim();
    const message = String(formData.get('message')).trim();

    // رقم واتساب مدار تك غير موجود في ملف التكليف؛ ضع الرقم الرسمي هنا مع رمز الدولة
    const whatsappNumber = window.MadarData?.read().settings.whatsapp || '';
    const text = [
      'مرحباً مدار تك، لدي استفسار جديد:',
      `الاسم: ${name}`,
      `البريد الإلكتروني: ${email}`,
      `رقم الهاتف: ${phone}`,
      `الرسالة: ${message}`
    ].join('\n');

    if (!whatsappNumber) {
      feedback.textContent = 'الإرسال غير مفعّل حاليًا. يرجى التواصل عبر البريد الإلكتروني أو إنستغرام.';
      return;
    }

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    feedback.textContent = 'تم تجهيز رسالتك في واتساب. اضغط إرسال داخل واتساب لإتمام الإرسال.';
  });

  // Slider: التنقل بين الشرائح
  const track = document.getElementById('spotlightTrack');
  const progress = document.getElementById('sliderProgress');
  const slides = track ? Array.from(track.children) : [];
  let activeSlide = 0;
  const renderSlide = () => {
    if (!track || !slides.length) return;
    track.style.transform = `translateX(-${activeSlide * (100 / slides.length)}%)`;
    if (progress) progress.style.width = `${((activeSlide + 1) / slides.length) * 100}%`;
  };
  document.getElementById('slideNext')?.addEventListener('click', () => {
    activeSlide = (activeSlide + 1) % slides.length;
    renderSlide();
  });
  document.getElementById('slidePrev')?.addEventListener('click', () => {
    activeSlide = (activeSlide - 1 + slides.length) % slides.length;
    renderSlide();
  });

  // ظهور الأقسام تدريجياً عند التمرير
  const revealTargets = document.querySelectorAll('.section-kicker, .service-card, .value-item, .program-row, .why-panel, .contact-form');
  revealTargets.forEach((element) => element.classList.add('js-reveal'));
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach((element) => revealObserver.observe(element));
  } else {
    revealTargets.forEach((element) => element.classList.add('is-visible'));
  }
});
