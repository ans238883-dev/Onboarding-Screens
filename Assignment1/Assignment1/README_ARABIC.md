# Assignment 1 – Onboarding Screens

## ما الذي تم تنفيذه؟
- الإبقاء على المشروع الأصلي للمدرّس وتطوير مجلد Assignment1 فقط.
- الشاشة الأولى ترحيبية، وزر Continue الموجود في MainActivity ينقل إلى Fragment2.
- Fragment2 تجمع الاسم (إجباري)، البريد الإلكتروني، الجنس، والعمر والجامعة (اختياريان). يوجد تحقق بسيط من الاسم وصيغة البريد عند إدخاله.
- Fragment2 ترسل البيانات إلى MainActivity عبر interface باسم OnUserInfoSubmitListener.
- MainActivity تنشئ Fragment3 وتمرر الاسم باستخدام Bundle و setArguments.
- Fragment3 تعرض اسم المستخدم.
- Fragment3 تحتوي CheckBox بالنص المطلوب وزر يبدأ معطلاً باسم Continue.
- عند تحديد CheckBox، Fragment3 ترسل الحالة إلى MainActivity عبر interface باسم OnAgreementChangeListener؛ وتقوم Activity باستدعاء updateFinishButton لتفعيل الزر وتغيير النص إلى Finish. عند إزالة التحديد يعود الزر معطلاً ويعود النص Continue.

## تشغيل المشروع
1. فك ضغط Assignment1_Completed.zip.
2. افتح Android Studio واختر Open.
3. اختر مجلد Assignment1 (المجلد الذي يحتوي settings.gradle وملف build.gradle).
4. انتظر Gradle Sync.
5. شغّل التطبيق على Emulator أو هاتف أندرويد مع تفعيل USB debugging.

## ملاحظات
- تم إعداد المشروع باستخدام Java وXML وبنفس إعدادات Gradle الموجودة في المشروع الأصلي.
- لم أتمكن من تشغيل Android Emulator أو تنفيذ Gradle build في بيئة المحادثة؛ لذلك افتح المشروع في Android Studio وتأكد من نجاح Gradle Sync والتشغيل قبل التسليم.
- زر Finish لا ينفذ إجراءً إضافياً، التزاماً بنص الواجب الذي يقول إن تغيير النص هو المطلوب فقط.
