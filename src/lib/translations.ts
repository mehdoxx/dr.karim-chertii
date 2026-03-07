export type Language = 'fr' | 'ar';

export interface Translations {
    nav: {
        srMain: string;
        logo: string;
        home: string;
        about: string;
        services: string;
        testimonials: string;
        skinAdvisor: string;
        contact: string;
        servicesHint: string;
        bookCta: string;
        bookCtaAria: string;
        langSwitch: string;
        langSwitchAria: string;
        themeSwitchAria: string;
    };
    services: {
        skin: string;
        nails: string;
        mst: string;
        surgery: string;
        aesthetic: string;
        botox: string;
        prp_face: string;
        prp_hair: string;
        laser: string;
    };
    details: {
        derma: string;
        mst: string;
        skin: string;
        surgery: string;
        aesthetic: string;
        botox: string;
        prp_face: string;
        prp_hair: string;
        laser: string;
    };
    contact: {
        clinic: string;
        address: string;
        phone: string;
        hours: string;
        urgences: string;
        whatsapp_response: string;
        map: string;
    };
    credentials: {
        paris: string;
        saintLouis: string;
        marrakech: string;
    };
    hero: {
        title: string;
        subtitle: string;
        scrollText: string;
    };
    misc: {
        servicesShort: string;
    };
    about: {
        sectionLabel: string;
        title: string;
        subtitle: string;
        bio1: string;
        bio2: string;
        bio3: string;
        tagline: string;
    };
}

export const translations: Record<Language, Translations> = {
    fr: {
        nav: {
            srMain: "Navigation principale",
            home: "Accueil",
            logo: "Dr. K. Cherti",
            about: "À propos",
            services: "Services",
            testimonials: "Témoignages",
            skinAdvisor: "Skin Advisor",
            contact: "Contact",
            servicesHint: "Peau · Ongles · Laser · Botox · PRP · Peeling · MST · Chirurgie",
            bookCta: "Prendre Rendez-vous",
            bookCtaAria: "Prendre rendez-vous avec Dr. Cherti",
            langSwitch: "🌐 العربية",
            langSwitchAria: "Changer la langue en arabe",
            themeSwitchAria: "Activer le mode sombre/clair"
        },
        services: {
            skin: "Maladies de la Peau",
            nails: "Maladies des Ongles",
            mst: "Maladies Transmissibles",
            surgery: "Chirurgie Cutanée",
            aesthetic: "Cosmétologie et Peeling",
            botox: "Injections et Botox",
            prp_face: "PRP Visage",
            prp_hair: "PRP Cheveux",
            laser: "Laser Médical",
        },
        details: {
            derma: "En tant que dermatologue, je diagnostique et traite l'ensemble des affections cutanées, de l'acné aux maladies inflammatoires chroniques, avec une approche médicale rigoureuse issue de ma formation parisienne.",
            mst: "La vénérologie me permet de prendre en charge les maladies sexuellement transmissibles avec toute la discrétion, la précision diagnostique et le suivi thérapeutique que ces pathologies exigent.",
            skin: "Je traite les dermatoses complexes affectant la peau, le cuir chevelu et les ongles (psoriasis, eczéma, alopécie, mycoses) en identifiant la cause profonde pour un traitement durable et non superficiel.",
            surgery: "J'interviens chirurgicalement pour l'exérèse de kystes, grains de beauté suspects, lipomes et lésions cutanées bénignes ou malignes, avec une précision millimétrique et un résultat esthétique optimal.",
            aesthetic: "Le peeling chimique permet de renouveler en profondeur les cellules cutanées, d'unifier le teint, d'atténuer les taches et de restaurer l'éclat naturel de votre peau en quelques séances ciblées.",
            botox: "Les injections de Botox, collagène et acide hyaluronique lissent les rides d'expression, restaurent les volumes perdus et redéfinissent les contours du visage, avec des résultats naturels qui respectent votre identité.",
            prp_face: "Le PRP Visage utilise le plasma enrichi de vos propres plaquettes pour stimuler la régénération cellulaire, améliorer la texture cutanée et redonner à votre peau une luminosité et une fermeté durables.",
            prp_hair: "Le traitement PRP capillaire réactive les follicules pileux affaiblis en injectant directement dans le cuir chevelu une concentration de facteurs de croissance naturels, freinant la chute et stimulant une repousse visible.",
            laser: "Le laser médical permet une épilation définitive et précise sur tous types de peaux, ainsi que le traitement des lésions vasculaires (varicosités, rougeurs persistantes et couperose) avec une efficacité cliniquement prouvée."
        },
        contact: {
            clinic: "Cabinet du Dr. Karim CHERTI",
            address: "45 Av Allal Ben Abdellah, Larache",
            phone: "Tél : 05 39 91 58 72",
            hours: "Lun–Sam : 09h00 – 18h00 · Dim : Fermé",
            urgences: "Urgences acceptées",
            whatsapp_response: "Réponse rapide par WhatsApp",
            map: "Voir sur Google Maps"
        },
        credentials: {
            paris: "Diplôme de la Faculté de Médecine de Paris (France)",
            saintLouis: "Ancien Attaché à l'Hôpital Saint-Louis, Paris",
            marrakech: "Ancien Dermatologue de l'Hôpital Militaire Avicenne, Marrakech"
        },
        hero: {
            title: "Dr. Karim CHERTI\nDermatologue et Médecin Esthétique",
            subtitle: "Expertise médicale de pointe pour la santé de votre peau, vos cheveux et votre beauté naturelle. Consultations, Laser Médical, Botox, PRP et Chirurgie Dermatologique.",
            scrollText: "Défiler pour découvrir ↓"
        },
        misc: {
            servicesShort: "Peau · Ongles · MST · Laser · Botox · PRP · Peeling · Chirurgie"
        },
        about: {
            sectionLabel: "À propos",
            title: "Dr. Karim Cherti",
            subtitle: "Dermatologue et Médecin Esthétique",
            bio1: "Installé à Larache, le Dr. Karim Cherti est dermatologue et médecin esthétique, formé à la prestigieuse Faculté de Médecine de Paris. Son parcours l'a conduit de l'Hôpital Saint-Louis, référence mondiale en dermatologie, à l'Hôpital Militaire Avicenne de Marrakech, où il a affiné une expertise clinique rare au Maroc.",
            bio2: "Au quotidien, il prend en charge l'ensemble du spectre dermatologique : des pathologies de la peau, des ongles et du cuir chevelu aux traitements esthétiques avancés, injections de Botox, PRP visage et capillaire, peeling médical et épilation au laser de dernière génération.",
            bio3: "Sa philosophie ? Allier rigueur scientifique et écoute attentive pour proposer à chaque patient un diagnostic précis et un plan de soins réellement personnalisé. Pas de solutions toutes faites, juste une médecine exigeante, humaine et tournée vers des résultats durables.",
            tagline: "L'excellence dermatologique, forgée entre Paris et le Maroc."
        }
    },
    ar: {
        nav: {
            srMain: "القائمة الرئيسية",
            home: "الرئيسية",
            logo: "د. ك. الشرتي",
            about: "من نحن",
            services: "خدماتنا",
            testimonials: "آراء المرضى",
            skinAdvisor: "مستشار الجلد",
            contact: "تواصل",
            servicesHint: "جلد · أظافر · ليزر · بوتوكس · PRP · تقشير · أمراض تناسلية · جراحة",
            bookCta: "أحجز موعداً",
            bookCtaAria: "أحجز موعدك مع الدكتور الشرتي",
            langSwitch: "🌐 Français",
            langSwitchAria: "تغيير اللغة إلى الفرنسية",
            themeSwitchAria: "تفعيل الوضع الداكن/الفاتح"
        },
        services: {
            skin: "أمراض الجلد",
            nails: "أمراض الأظافر",
            mst: "الأمراض التناسلية",
            surgery: "جراحة الجلد",
            aesthetic: "طب التجميل والتقشير",
            botox: "حقن البوتوكس",
            prp_face: "تقنية PRP للوجه",
            prp_hair: "تقنية PRP للشعر",
            laser: "الليزر الطبي"
        },
        details: {
            derma: "بصفتي طبيب أمراض جلدية، أقوم بتشخيص وعلاج جميع الأمراض الجلدية - من حب الشباب إلى الأمراض الالتهابية المزمنة - بنهج طبي صارم مستمد من تدريبي في باريس.",
            mst: "يتيح لي تخصص الأمراض التناسلية معالجة الأمراض المنقولة جنسياً بكل السرية، ودقة التشخيص، والمتابعة العلاجية التي تتطلبها هذه الأمراض.",
            skin: "أعالج الأمراض الجلدية المعقدة التي تصيب الجلد وفروة الرأس والأظافر مثل الصدفية، الإكزيما، الثعلبة، والفطريات، من خلال تحديد السبب الجذري لعلاج مستدام وليس سطحي.",
            surgery: "أتدخل جراحياً لاستئصال الأكياس الدهنية، والشامات المشبوهة، والأورام الشحمية، والآفات الجلدية الحميدة أو الخبيثة، بدقة متناهية ونتائج تجميلية مثالية.",
            aesthetic: "التقشير الكيميائي يجدد خلايا الجلد بعمق، ويوحد لون البشرة، ويخفف البقع، ويستعيد الإشراق الطبيعي لبشرتك في بضع جلسات مركزة.",
            botox: "حقن البوتوكس، الكولاجين، وحمض الهيالورونيك تنعم تجاعيد التعبير، وتستعيد الأحجام المفقودة، وتعيد تحديد ملامح الوجه - بنتائج طبيعية تحترم هويتك.",
            prp_face: "تقنية PRP للوجه تستخدم البلازما الغنية بالصفائح الدموية الخاصة بك لتحفيز تجديد الخلايا، وتحسين ملمس الجلد، وإعادة اللمعان والشد الدائم لبشرتك.",
            prp_hair: "علاج PRP للشعر يعيد تنشيط بصيلات الشعر الضعيفة عن طريق حقن تركيز من عوامل النمو الطبيعية مباشرة في فروة الرأس، مما يوقف التساقط ويحفز نمواً ملحوظاً.",
            laser: "الليزر الطبي يتيح إزالة شعر نهائية ودقيقة لجميع أنواع البشرة، بالإضافة إلى علاج الآفات الوعائية مثل الدوالي والاحمرار المستمر بكفاءة مثبتة سريرياً."
        },
        contact: {
            clinic: "عيادة الدكتور كريم الشرتي",
            address: "45 شارع علال بن عبد الله، الطابق السفلي (مقابل قهوة كاريون)، العرائش",
            phone: "05 39 91 58 72 :الهاتف",
            hours: "الإثنين – السبت: 09:00 – 18:00\nالأحد: مغلق",
            urgences: "تقبل حالات الطوارئ",
            whatsapp_response: "رد سريع عبر واتساب",
            map: "عرض على خرائط جوجل"
        },
        credentials: {
            paris: "خريج كلية الطب بباريس، فرنسا",
            saintLouis: "طبيب سابق بمستشفى سان لو بباريس",
            marrakech: "طبيب سابق بالمستشفى العسكري ابن سينا بمراكش"
        },
        hero: {
            title: "د. كريم الشرتي\nطبيب أخصائي في الأمراض الجلدية وطب التجميل",
            subtitle: "خبرة طبية متقدمة لصحة بشرتك، شعرك، وجمالك الطبيعي. استشارات، ليزر طبي، بوتوكس، بلازما (PRP) وجراحة الجلد.",
            scrollText: "مرر للاستكشاف ↓"
        },
        misc: {
            servicesShort: "جلد · أظافر · أمراض تناسلية · ليزر · بوتوكس · PRP · تقشير · جراحة"
        },
        about: {
            sectionLabel: "من نحن",
            title: "د. كريم الشرتي",
            subtitle: "طبيب أمراض جلدية و طب تجميلي",
            bio1: "يمارس الدكتور كريم الشرتي مهنته بمدينة العرائش كطبيب متخصص في الأمراض الجلدية والطب التجميلي. حاصل على دبلوم من كلية الطب بباريس، اكتسب خبرته العملية بمستشفى سان لوي الشهير عالمياً في مجال الأمراض الجلدية، ثم بالمستشفى العسكري ابن سينا بمراكش.",
            bio2: "يعالج الدكتور الشرتي كافة الأمراض الجلدية، من أمراض البشرة والأظافر وفروة الرأس إلى العلاجات التجميلية المتقدمة: حقن البوتوكس، تقنية PRP للوجه والشعر، التقشير الطبي، وإزالة الشعر بالليزر من الجيل الأخير.",
            bio3: "فلسفته في العلاج؟ الجمع بين الدقة العلمية والإصغاء للمريض، لتقديم تشخيص دقيق وخطة علاجية مخصصة لكل حالة. لا حلول جاهزة، بل طب صارم، إنساني، وموجه نحو نتائج مستدامة.",
            tagline: "التميز في طب الجلد، من باريس إلى المغرب."
        }
    }
};
