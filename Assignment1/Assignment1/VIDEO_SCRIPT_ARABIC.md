# نص مقترح لفيديو شرح الواجب (3–5 دقائق)

السلام عليكم، أنا اليوم بشرح Assignment 1 بعنوان Onboarding Screens لمادة Mobile App Development 2.

في البداية، التطبيق مكوّن من ثلاث شاشات. الشاشة الأولى هي شاشة ترحيب، وعند الضغط على Continue ننتقل إلى Fragment2.

في Fragment2 أضفت حقول لجمع معلومات المستخدم: الاسم، البريد الإلكتروني، الجنس، والعمر والجامعة كحقول اختيارية. الاسم مطلوب، وإذا تركه المستخدم فارغاً تظهر رسالة خطأ. كما يتم التحقق من صيغة البريد الإلكتروني إذا تم إدخاله.

عند الضغط على Continue داخل Fragment2، يتم إرسال بيانات المستخدم إلى MainActivity باستخدام Interface اسمه OnUserInfoSubmitListener. بعد ذلك تقوم MainActivity بإنشاء Fragment3 والانتقال إليها.

مررت اسم المستخدم إلى Fragment3 باستخدام Bundle و setArguments، ولذلك يظهر اسم المستخدم على الشاشة الثالثة.

في Fragment3 أضفت CheckBox بالنص المطلوب: I confirm I have read and agree to use the app. زر Continue يكون معطلاً في البداية. عندما أضع علامة صح، يتم إرسال حالة CheckBox إلى MainActivity باستخدام Interface اسمه OnAgreementChangeListener، ثم يتم تفعيل الزر ويتغير النص إلى Finish. وعندما أزيل علامة الصح، يعود الزر معطلاً ويتغير النص مرة أخرى إلى Continue.

بهذا أكون نفذت متطلبات الواجب المتعلقة بإضافة معلومات المستخدم، التواصل بين Fragment وActivity باستخدام Interfaces، تمرير الاسم باستخدام Bundle، وتغيير حالة الزر حسب CheckBox. شكراً.

## أثناء التصوير اعرض بالترتيب
1. شاشة الترحيب والضغط على Continue.
2. Fragment2: اكتب اسماً وبريداً إلكترونياً، واختر الجنس، ويمكن ترك العمر والجامعة فارغين.
3. اضغط Continue وأظهر الاسم على Fragment3.
4. أظهر أن زر Continue معطل قبل تحديد CheckBox.
5. حدد CheckBox وأظهر تفعيل الزر وتغير النص إلى Finish.
6. أزل التحديد وأظهر رجوع الزر إلى Disabled واسم Continue.
7. اعرض سريعاً ملفات MainActivity وFragment2 وFragment3 لتوضيح الـ Interfaces وBundle.
