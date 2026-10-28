document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const levelFilter = document.getElementById("level-filter");
  const typeFilter = document.getElementById("type-filter");
  const resourceGrid = document.getElementById("resource-grid");
  const emptyState = document.getElementById("empty-state");
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav");
  const contactLink = document.getElementById("contact-link");
  let currentLang = "fr";

  const text = {
    fr: {
      skip:"Aller au contenu", home:"Accueil", levelsNav:"Niveaux", resourcesNav:"Ressources", aboutNav:"À propos", contactNav:"Contact",
      eyebrow:"PLATEFORME ÉDUCATIVE • MAROC", title:'Les mathématiques deviennent <span>plus simples.</span>',
      heroDesc:"Retrouvez ici vos cours, exercices, devoirs et examens de mathématiques, du primaire au lycée.", explore:"Explorer les niveaux", seeResources:"Voir les ressources", heroNote:"Des ressources pour apprendre, pratiquer et progresser.",
      learning:"APPRENDRE À SON RYTHME", chooseLevel:"Choisissez votre niveau", levelIntro:"Les catégories sont prêtes. Vous pourrez ajouter vos fichiers et liens quand vous le souhaitez.",
      primary:"Primaire", primaryDesc:"Les bases et les premières notions mathématiques.", college:"Collège", collegeDesc:"Leçons, applications, devoirs et préparation aux examens.", high:"Lycée", highDesc:"Algèbre, analyse, géométrie et préparation aux examens.", exploreResources:"Explorer les ressources ↗",
      library:"BIBLIOTHÈQUE", pedagogic:"Ressources pédagogiques", libraryIntro:'La bibliothèque est vide pour le moment : ajoutez vos documents dans <code>data.js</code>.',
      search:"Rechercher une ressource…", searchLabel:"Rechercher une ressource", allLevels:"Tous les niveaux", allTypes:"Toutes les catégories", courses:"Cours", summary:"Résumé", exercises:"Exercices", homework:"Devoirs", exams:"Examens", correction:"Correction", video:"Vidéo",
      emptyTitle:"Vos ressources apparaîtront ici", emptyDesc:'Ajoutez vos premiers cours, exercices ou examens dans le fichier <code>data.js</code>.', noResults:"Aucune ressource trouvée", noResultsDesc:"Essayez de modifier la recherche ou les filtres.",
      aboutEyebrow:"À PROPOS", aboutTitle:"Une bibliothèque de mathématiques pour tous.", aboutDesc:"Cette plateforme a pour objectif de rassembler des ressources de mathématiques adaptées aux élèves marocains, du primaire au lycée.",
      contactEyebrow:"RESTONS EN CONTACT", contactTitle:"Une question ou une suggestion ?", contactDesc:"Ajoutez ici votre page Facebook, votre adresse e-mail ou tout autre moyen de contact.", configure:"Configurer le contact", contactUs:"Nous contacter ↗", contactAlert:"Ajoutez votre lien de contact dans le fichier data.js.",
      rights:"Tous droits réservés.", openResource:"Ouvrir la ressource ↗", watchVideo:"Voir la vidéo ↗", resource:"Ressource", untitled:"Sans titre", menu:"Ouvrir le menu"
    },
    ar: {
      skip:"انتقل إلى المحتوى", home:"الرئيسية", levelsNav:"المستويات", resourcesNav:"الموارد", aboutNav:"من نحن", contactNav:"اتصل بنا",
      eyebrow:"منصة تعليمية • المغرب", title:'الرياضيات تصبح <span>أكثر سهولة.</span>',
      heroDesc:"تجدون هنا دروس الرياضيات وتمارينها وفروضها وامتحاناتها، من التعليم الابتدائي إلى الثانوي.", explore:"اكتشف المستويات", seeResources:"تصفح الموارد", heroNote:"موارد تساعدك على التعلم والتدرب والتقدم.",
      learning:"تعلّم حسب وتيرتك", chooseLevel:"اختر مستواك الدراسي", levelIntro:"الأقسام جاهزة، ويمكنك إضافة ملفاتك وروابطك في أي وقت.",
      primary:"الابتدائي", primaryDesc:"الأساسيات والمفاهيم الأولى في الرياضيات.", college:"الإعدادي", collegeDesc:"الدروس والتطبيقات والفروض والاستعداد للامتحانات.", high:"الثانوي", highDesc:"الجبر والتحليل والهندسة والاستعداد للامتحانات.", exploreResources:"تصفح الموارد ↗",
      library:"المكتبة", pedagogic:"موارد تعليمية", libraryIntro:'المكتبة فارغة حالياً. أضف ملفاتك إلى <code>data.js</code>.',
      search:"ابحث عن مورد…", searchLabel:"البحث عن مورد", allLevels:"جميع المستويات", allTypes:"جميع الفئات", courses:"دروس", summary:"ملخصات", exercises:"تمارين", homework:"فروض", exams:"امتحانات", correction:"تصحيح", video:"فيديو",
      emptyTitle:"ستظهر مواردك هنا", emptyDesc:'أضف دروسك أو تمارينك أو امتحاناتك في ملف <code>data.js</code>.', noResults:"لم يتم العثور على موارد", noResultsDesc:"حاول تغيير كلمات البحث أو عوامل التصفية.",
      aboutEyebrow:"من نحن", aboutTitle:"مكتبة رياضيات للجميع.", aboutDesc:"تهدف هذه المنصة إلى جمع موارد الرياضيات الملائمة للتلاميذ المغاربة، من الابتدائي إلى الثانوي.",
      contactEyebrow:"ابقَ على تواصل", contactTitle:"هل لديك سؤال أو اقتراح؟", contactDesc:"أضف هنا رابط صفحتك على فيسبوك أو بريدك الإلكتروني أو أي وسيلة أخرى للتواصل.", configure:"إعداد رابط التواصل", contactUs:"اتصل بنا ↗", contactAlert:"أضف رابط التواصل في ملف data.js.",
      rights:"جميع الحقوق محفوظة.", openResource:"افتح المورد ↗", watchVideo:"شاهد الفيديو ↗", resource:"مورد", untitled:"بدون عنوان", menu:"فتح القائمة"
    }
  };

  document.getElementById("current-year").textContent = new Date().getFullYear();

  function setText(selector, value, html=false) {
    const el=document.querySelector(selector); if(el) html ? el.innerHTML=value : el.textContent=value;
  }
  function applyLanguage(lang) {
    currentLang = lang === "ar" ? "ar" : "fr";
    const t=text[currentLang];
    document.documentElement.lang=currentLang;
    document.documentElement.dir=currentLang === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("lang-ar", currentLang === "ar");
    document.querySelectorAll("[data-fr][data-ar]").forEach(el => { el.textContent = el.dataset[currentLang]; });
    setText(".skip-link",t.skip);
    const navLinks=nav.querySelectorAll("a");
    [t.home,t.levelsNav,t.resourcesNav,t.aboutNav,t.contactNav].forEach((v,i)=>{if(navLinks[i])navLinks[i].textContent=v;});
    nav.setAttribute("aria-label",currentLang==="ar"?"التنقل الرئيسي":"Navigation principale");
    menuToggle.querySelector(".sr-only").textContent=t.menu;
    setText(".hero-copy .eyebrow",t.eyebrow);
    setText(".hero h1",t.title,true);
    setText(".hero-description",t.heroDesc);
    const heroButtons=document.querySelectorAll(".hero-actions a"); if(heroButtons[0])heroButtons[0].textContent=t.explore; if(heroButtons[1])heroButtons[1].textContent=t.seeResources;
    setText(".hero-note",t.heroNote);
    setText("#niveaux .eyebrow",t.learning);
    setText("#niveaux h2",t.chooseLevel);
    setText("#niveaux .section-heading > p:last-child",t.levelIntro);
    const cards=document.querySelectorAll(".level-card");
    const levels=[[t.primary,t.primaryDesc],[t.college,t.collegeDesc],[t.high,t.highDesc]];
    cards.forEach((card,i)=>{if(levels[i]){card.querySelector("h3").textContent=levels[i][0];card.querySelector("p").textContent=levels[i][1];card.querySelector(".card-arrow").textContent=t.exploreResources;card.dataset.levelLink=["Primaire","Collège","Lycée"][i];}});
    setText("#ressources .eyebrow",t.library);setText("#ressources h2",t.pedagogic);setText("#ressources .section-heading > p:last-child",t.libraryIntro,true);
    searchInput.placeholder=t.search;searchInput.setAttribute("aria-label",t.searchLabel);
    const levelOptions=levelFilter.options; levelOptions[0].textContent=t.allLevels; [t.primary,t.college,t.high].forEach((v,i)=>{if(levelOptions[i+1])levelOptions[i+1].textContent=v;});
    const typeOptions=typeFilter.options; typeOptions[0].textContent=t.allTypes; [t.courses,t.summary,t.exercises,t.homework,t.exams,t.correction,t.video].forEach((v,i)=>{if(typeOptions[i+1])typeOptions[i+1].textContent=v;});
    setText("#empty-state h3",t.emptyTitle);setText("#empty-state p",t.emptyDesc,true);
    setText("#apropos .eyebrow",t.aboutEyebrow);setText("#apropos h2",t.aboutTitle);setText("#apropos .about-inner p:not(.eyebrow)",t.aboutDesc);
    setText("#contact .eyebrow",t.contactEyebrow);setText("#contact h2",t.contactTitle);setText("#contact .contact-inner p:not(.eyebrow)",t.contactDesc);
    setText(".footer-inner > p:last-child",`© ${new Date().getFullYear()} ${t.rights}`);
    if (SITE_CONFIG.contactUrl) contactLink.textContent=t.contactUs; else contactLink.textContent=t.configure;
    document.querySelectorAll(".lang-btn").forEach(btn=>{const active=btn.dataset.lang===currentLang;btn.classList.toggle("is-active",active);btn.setAttribute("aria-pressed",String(active));});
    renderResources();
  }

  if (SITE_CONFIG.contactUrl) {
    contactLink.href = SITE_CONFIG.contactUrl; contactLink.target = "_blank"; contactLink.rel = "noopener noreferrer";
  } else {
    contactLink.addEventListener("click", event => { event.preventDefault(); alert(text[currentLang].contactAlert); });
  }
  menuToggle.addEventListener("click", () => {const isOpen=nav.classList.toggle("is-open");menuToggle.setAttribute("aria-expanded",String(isOpen));});
  nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{nav.classList.remove("is-open");menuToggle.setAttribute("aria-expanded","false");}));
  document.querySelectorAll(".lang-btn").forEach(btn=>btn.addEventListener("click",()=>applyLanguage(btn.dataset.lang)));
  document.querySelectorAll("[data-level-link]").forEach(link=>link.addEventListener("click",()=>{levelFilter.value=link.dataset.levelLink;renderResources();}));

  function renderResources() {
    const t=text[currentLang];
    const query=searchInput.value.trim().toLocaleLowerCase(currentLang==="ar"?"ar":"fr");
    const level=levelFilter.value; const type=typeFilter.value;
    const filtered=RESOURCES.filter(item=>{
      const searchable=`${item.title||""} ${item.description||""} ${item.type||""}`.toLocaleLowerCase(currentLang==="ar"?"ar":"fr");
      return searchable.includes(query)&&(!level||item.level===level)&&(!type||item.type===type);
    });
    resourceGrid.replaceChildren();
    filtered.forEach(item=>{
      const card=document.createElement("article");card.className="resource-card";
      const badge=document.createElement("span");badge.className="resource-type";badge.textContent=item.type||t.resource;
      const title=document.createElement("h3");title.textContent=item.title||t.untitled;
      const meta=document.createElement("p");meta.className="resource-meta";meta.textContent=[item.level,item.description].filter(Boolean).join(" · ");card.append(badge,title,meta);
      if(item.url){const link=document.createElement("a");link.className="resource-open";link.href=item.url;link.target="_blank";link.rel="noopener noreferrer";link.textContent=item.type==="Vidéo"||item.type==="فيديو"?t.watchVideo:t.openResource;card.append(link);}
      resourceGrid.append(card);
    });
    emptyState.hidden=filtered.length>0;
    if(RESOURCES.length>0&&filtered.length===0){emptyState.hidden=false;setText("#empty-state h3",t.noResults);setText("#empty-state p",t.noResultsDesc);}
    else {setText("#empty-state h3",t.emptyTitle);setText("#empty-state p",t.emptyDesc,true);}
  }
  searchInput.addEventListener("input",renderResources);levelFilter.addEventListener("change",renderResources);typeFilter.addEventListener("change",renderResources);
  applyLanguage("fr");
});
