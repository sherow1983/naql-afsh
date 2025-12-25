// وظيفة فتح وإغلاق القائمة في الجوال
function toggleMenu() {
    const nav = document.getElementById('navbar');
    if (nav) {
        nav.classList.toggle('active');
    }
}

// وظيفة إغلاق Lightbox
function closeLightboxBtn() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = "none";
    }
}

function closeLightbox(event) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && event.target === lightbox) {
        lightbox.style.display = "none";
    }
}

// وظيفة إرسال واتساب الهيرو
function sendHeroWhatsapp(event) {
    if (event) event.preventDefault();
    var message = "👋 السلام عليكم، أرغب في الاستفسار عن خدمات نقل العفش.%0a%0a" +
                  "📌 *فضلاً، زودنا بالبيانات التالية لخدمتك بشكل أسرع:*%0a" +
                  "▪️ *الاسم الكريم:* ....................%0a" +
                  "▪️ *المدينة والحي:* ....................%0a" +
                  "▪️ *نوع الخدمة (نقل/فك/تغليف):* ....................%0a" +
                  "▪️ *الموعد المقترح:* ....................%0a%0a" +
                  "شكرًا لكم 🌹";

    var whatsappUrl = "https://wa.me/201110760081?text=" + message;
    window.open(whatsappUrl, '_blank');
}

document.addEventListener('DOMContentLoaded', function() {
    // --- 1. كود النافذة المنبثقة الذكي ---
    const popup = document.getElementById('note-popup');
    const closeBtn = document.getElementById('closePopupBtn');

    if (popup && closeBtn) {
        // التحقق مما إذا كان المستخدم قد أغلق النافذة سابقاً
        if (!localStorage.getItem('popupClosed')) {
            popup.style.display = 'flex'; // إظهار النافذة
        }

        closeBtn.onclick = function() {
            popup.style.display = 'none';
            localStorage.setItem('popupClosed', 'true'); // حفظ الحالة في المتصفح
        }
    }

    // كود القائمة المنسدلة للأسئلة الشائعة
    var acc = document.getElementsByClassName("accordion");
    for (var i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active-acc");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            } 
        });
    }

    // كود تأثير الظهور عند التمرير (Fade In)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });
    const hiddenElements = document.querySelectorAll('.fade-in');
    hiddenElements.forEach((el) => observer.observe(el));

    // كود إرسال النموذج إلى واتساب
    const whatsappForm = document.getElementById('whatsappForm');
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function(e) {
            e.preventDefault(); // منع إعادة تحميل الصفحة
            
            var name = document.getElementById('name').value;
            var phone = document.getElementById('phone').value;
            var city = document.getElementById('city').value;
            var service = document.getElementById('service').value;
            
            // التحقق من صحة رقم الجوال (يجب أن يكون أرقاماً فقط)
            if (phone.length < 9 || isNaN(phone)) {
                alert("الرجاء إدخال رقم جوال صحيح");
                return;
            }

            // تجهيز الرسالة
            var message = "السلام عليكم، أرغب بحجز موعد:%0a" +
                          "👤 الاسم: " + name + "%0a" +
                          "📱 الجوال: " + phone + "%0a" +
                          "🏙️ المدينة: " + city + "%0a" +
                          "🧹 الخدمة: " + service;
            
            // فتح واتساب
            var whatsappUrl = "https://wa.me/201110760081?text=" + message;
            window.open(whatsappUrl, '_blank');
        });
    }

    // --- 2. كود العداد التنازلي الذكي (يحفظ الوقت) ---
    const countdownContainer = document.getElementById("countdown");
    if (countdownContainer) {
        let targetDate = localStorage.getItem('targetDate');

        if (!targetDate) {
            // إذا لم يكن هناك وقت محفوظ، نحدد وقتاً جديداً (بعد يومين)
            const date = new Date();
            date.setDate(date.getDate() + 2);
            targetDate = date.getTime();
            localStorage.setItem('targetDate', targetDate);
        } else {
            // إذا انتهى الوقت المحفوظ، نقوم بتجديده (لإبقاء العرض سارياً)
            if (new Date().getTime() > targetDate) {
                const date = new Date();
                date.setDate(date.getDate() + 2);
                targetDate = date.getTime();
                localStorage.setItem('targetDate', targetDate);
            }
        }

        var x = setInterval(function() {
            var now = new Date().getTime();
            var distance = targetDate - now;

            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const daysEl = document.getElementById("days");
            if (daysEl) {
                daysEl.innerHTML = days;
                document.getElementById("hours").innerHTML = hours;
                document.getElementById("minutes").innerHTML = minutes;
                document.getElementById("seconds").innerHTML = seconds;
            }

            // عند انتهاء الوقت
            if (distance < 0) {
                clearInterval(x);
                countdownContainer.innerHTML = "<h3>انتهى العرض!</h3>";
            }
        }, 1000);
    }

    // --- 3. كود زر الصعود للأعلى ---
    // --- 4. كود زر طلب الاتصال العائم ---
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    const floatCallBtn = document.getElementById("floatCallBtn");

    if (scrollTopBtn && floatCallBtn) {
        window.onscroll = function() {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                scrollTopBtn.classList.add("show");
                floatCallBtn.classList.add("show");
            } else {
                scrollTopBtn.classList.remove("show");
                floatCallBtn.classList.remove("show");
            }
        };

        scrollTopBtn.addEventListener("click", function() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // --- 5. عداد زوار بسيط (محاكاة) ---
    const visitorCount = document.getElementById('visitorCount');
    if (visitorCount) {
        const date = new Date();
        // رقم عشوائي يعتمد على التاريخ ليكون ثابتاً طوال اليوم
        const seed = date.getDate() * (date.getMonth() + 1) * date.getFullYear();
        const base = (seed % 100) + 150; // قاعدة الزوار بين 150 و 250
        const count = base + (date.getHours() * 7) + Math.floor(Math.random() * 5);
        visitorCount.innerText = count;
    }

    // --- 6. كود زر مشاركة الموقع ---
    const shareBtn = document.getElementById('shareSiteBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: document.title,
                    text: 'أنصحك بالتعامل مع شركة الأمانة لنقل العفش، خدمة ممتازة!',
                    url: window.location.href
                }).catch(console.error);
            } else {
                var tempInput = document.createElement("input");
                tempInput.value = window.location.href;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand("copy");
                document.body.removeChild(tempInput);
                alert("تم نسخ رابط الموقع! يمكنك إرساله لأصدقائك الآن.");
            }
        });
    }

    // --- 7. كود معرض الصور التلقائي و Lightbox ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryGrid = document.getElementById('galleryGrid');
    
    if (galleryGrid) {
        const maxImages = 20; // الحد الأقصى للصور التي سيتم البحث عنها في مجلد galleria

        for (let i = 1; i <= maxImages; i++) {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item shine-effect';

            const img = document.createElement('img');
            img.src = `galleria/${i}.webp`;
            img.alt = `صورة من أعمالنا رقم ${i}`;
            img.loading = 'lazy';
            img.width = 800; // أبعاد تقديرية لمنع اهتزاز الصفحة
            img.height = 600;

            // إخفاء العنصر إذا لم يتم تحميل الصورة (لأنها غير موجودة)
            img.onerror = function() {
                galleryItem.style.display = 'none';
            };
            
            // فتح الصورة في Lightbox عند الضغط
            img.addEventListener('click', function() {
                if (lightbox && lightboxImg) {
                    lightbox.style.display = "flex";
                    lightboxImg.src = this.src;
                }
            });

            galleryItem.appendChild(img);
            galleryGrid.appendChild(galleryItem);
        }

        // --- 8. تمرير تلقائي للمعرض ---
        function scrollGallery(direction) {
            const scrollAmount = galleryGrid.clientWidth;
            if (direction === 'next') {
                galleryGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                galleryGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
        
        // إتاحة الدالة للنطاق العام لاستخدامها في أزرار HTML
        window.scrollGallery = scrollGallery;

        function autoScrollGallery() {
            // في المواقع العربية RTL، التمرير لليسار (التالي) يتطلب قيمة سالبة
            if (galleryGrid.scrollLeft <= -(galleryGrid.scrollWidth - galleryGrid.clientWidth) + 10) {
                galleryGrid.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                scrollGallery('next');
            }
        }

        // تفعيل التمرير التلقائي كل 2 ثانية
        let galleryInterval = setInterval(autoScrollGallery, 1000);

        // إيقاف التمرير عند وضع الماوس، واستئنافه عند إزالته
        galleryGrid.addEventListener('mouseenter', () => clearInterval(galleryInterval));
        galleryGrid.addEventListener('mouseleave', () => galleryInterval = setInterval(autoScrollGallery, 1000));
    }
});