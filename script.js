// روابط السكريبت
const mainURL = "https://script.google.com/macros/s/AKfycbxiYLdsDMNLEC43F4b34oVmRPOjxyAHM5Bx0XxLEcEA8owslGvCpmVFZ1U5-98xWevy/exec?func=main";
const projectsURL = "https://script.google.com/macros/s/AKfycbxiYLdsDMNLEC43F4b34oVmRPOjxyAHM5Bx0XxLEcEA8owslGvCpmVFZ1U5-98xWevy/exec?func=projects";

// دالة لإظهار حالة التحميل
function showLoading(element) {
    element.innerHTML = '<div class="loading">جاري التحميل...</div>';
}

// دالة لإخفاء حالة التحميل
function hideLoading(element) {
    const loading = element.querySelector('.loading');
    if (loading) {
        loading.remove();
    }
}

// دالة لعرض الأقسام
function displaySection(section, index) {
    const sectionDiv = document.createElement("div");
    sectionDiv.className = "section";
    sectionDiv.style.opacity = "0";
    sectionDiv.style.transform = "translateY(20px)";
    sectionDiv.innerHTML = `
        <h2>${section["القسم"]}</h2>
        <h3>${section["العنوان الرئيسي"]}</h3>
        <p>${section["الوصف"]}</p>
        <img src="${section["الصورة (رابط)"]}" alt="${section["القسم"]}" loading="lazy">
    `;
    return sectionDiv;
}

// دالة لعرض المشاريع
function displayProject(project, index) {
    const card = document.createElement("div");
    card.className = "project-card";
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.innerHTML = `
        <img src="${project["صورة المشروع"]}" alt="${project["اسم المشروع"]}" loading="lazy">
        <h3>${project["اسم المشروع"]}</h3>
        <p>${project["وصف المشروع"]}</p>
        <a href="${project["رابط المشروع"]}" target="_blank">رؤية المشروع</a>
    `;
    return card;
}

// دالة لإضافة تأثير الظهور
function addFadeInEffect(element, index) {
    setTimeout(() => {
        element.style.transition = "all 0.5s ease";
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
    }, index * 200);
}

// تحميل بيانات Main
const content = document.getElementById("content");
showLoading(content);

fetch(mainURL)
    .then(response => response.json())
    .then(data => {
        hideLoading(content);
        data.forEach((section, index) => {
            const sectionDiv = displaySection(section, index);
            content.appendChild(sectionDiv);
            addFadeInEffect(sectionDiv, index);
        });
    })
    .catch(err => {
        hideLoading(content);
        content.innerHTML = '<div class="error">عذراً، حدث خطأ في تحميل البيانات</div>';
        console.error("❌ خطأ في تحميل Main:", err);
    });

// تحميل المشاريع
const projectsContainer = document.getElementById("projectsContainer");
showLoading(projectsContainer);

fetch(projectsURL)
    .then(response => response.json())
    .then(projects => {
        hideLoading(projectsContainer);
        projects.forEach((project, index) => {
            const card = displayProject(project, index);
            projectsContainer.appendChild(card);
            addFadeInEffect(card, index);
        });
    })
    .catch(err => {
        hideLoading(projectsContainer);
        projectsContainer.innerHTML = '<div class="error">عذراً، حدث خطأ في تحميل المشاريع</div>';
        console.error("❌ خطأ في تحميل المشاريع:", err);
    });
