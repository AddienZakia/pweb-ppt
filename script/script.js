import { content, chapters } from "./content.js";

function getSectionId(item, index, items) {
    const raw = (item.title || "section").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "section";
    const countSame = items.filter(it => it.title === item.title).length;
    if (countSame > 1) {
        let nth = 1;
        for (let i = 0; i < index; i++) {
            if (items[i].title === item.title) nth++;
        }
        return `section_${raw}_${nth}`;
    }
    return `section_${raw}`;
}

function getActiveBab() {
    const urlParams = new URLSearchParams(window.location.search);
    const rawChapter = urlParams.get("chapter") || urlParams.get("bab") || "";
    const slug = rawChapter.toLowerCase().trim().replace(/\s+/g, "-");

    const slugMap = {
        "feedforward-neural-networks": "bab_1",
        "differential-equations": "bab_2",
        "forward-problem": "bab_3",
        "forward-problems": "bab_3",
        "physics-informed-neural-networks": "bab_3",
        "inverse-problem": "bab_4",
        "inverse-problems": "bab_4",
        "bab_1": "bab_1",
        "bab_2": "bab_2",
        "bab_3": "bab_3",
        "bab_4": "bab_4",
        "bab-1": "bab_1",
        "bab-2": "bab_2",
        "bab-3": "bab_3",
        "bab-4": "bab_4",
        "1": "bab_1",
        "2": "bab_2",
        "3": "bab_3",
        "4": "bab_4",
    };

    if (slug && slugMap[slug]) {
        return slugMap[slug];
    }

    if (rawChapter && content[rawChapter]) {
        return rawChapter;
    }

    return "bab_1";
}

function updatePageMeta(activeBab) {
    const chapter = chapters && chapters[activeBab] ? chapters[activeBab] : null;
    if (!chapter) return;

    // Update Browser Document Title
    document.title = `${chapter.title} | Mathematics Behind PINNs`;

    // Update Article Subtitle
    const subtitleEl = document.getElementById("article-subtitle");
    if (subtitleEl) {
        subtitleEl.textContent = chapter.title;
    }

    // Update Article Cover Image
    const coverImg = document.getElementById("article-cover-img");
    if (coverImg && chapter.image) {
        coverImg.src = chapter.image;
        coverImg.alt = chapter.title;
    }

    // Update Reading Meta
    const metaEl = document.getElementById("article-meta");
    if (metaEl && chapter.readingTime) {
        metaEl.textContent = chapter.readingTime;
    }

    // Update Download Code Button Link
    const downloadBtn = document.getElementById("download-code-btn");
    if (downloadBtn && chapter.codeUrl) {
        downloadBtn.href = chapter.codeUrl;
    }

    // Update Prev / Next Buttons
    const prevBtn = document.getElementById("prev-btn");
    const prevBtnText = document.getElementById("prev-btn-text");
    if (prevBtn) {
        if (chapter.prev) {
            prevBtn.href = `explore.html?chapter=${chapter.prev.id}`;
            if (prevBtnText) prevBtnText.textContent = chapter.prev.title;
            prevBtn.style.visibility = "visible";
        } else {
            prevBtn.style.visibility = "hidden";
        }
    }

    const nextBtn = document.getElementById("next-btn");
    const nextBtnText = document.getElementById("next-btn-text");
    if (nextBtn) {
        if (chapter.next) {
            nextBtn.href = `explore.html?chapter=${chapter.next.id}`;
            if (nextBtnText) nextBtnText.textContent = chapter.next.title;
            nextBtn.style.visibility = "visible";
        } else {
            nextBtn.style.visibility = "hidden";
        }
    }
}

function DataToContent(activeBab) {
    const container = document.getElementById("content-container") || document.querySelector("article");
    if (!container) return;

    container.innerHTML = "";
    const items = content[activeBab] || [];

    items.forEach((item, index) => {
        if (!item.title) return;

        const sectionId = getSectionId(item, index, items);
        const wrapper = document.createElement("div");
        wrapper.id = sectionId;
        wrapper.className = "mb-8 " + item.title.split(" ").join("_");
        wrapper.setAttribute("data-aos", "fade-up");
        wrapper.setAttribute("data-aos-duration", "500");

        const subtitle = document.createElement("h3");
        subtitle.className = `text-h5 font-bold text-neutral-active mb-3 ${item.align === "center" ? "text-center" : ""}`;
        subtitle.textContent = item.title;
        wrapper.appendChild(subtitle);

        const alignClass = item.align === "center" ? "text-center" : "";

        if (item.type === "text") {
            const cont = document.createElement("p");
            cont.textContent = item.content;
            cont.className = `text-bl text-neutral-main leading-relaxed content-writing whitespace-pre-line ${alignClass}`;
            wrapper.appendChild(cont);
        } else if (item.type === "img" || item.type === "image") {
            if (item.img) {
                const img = document.createElement("img");
                img.src = item.img;
                img.alt = item.title;
                img.className = "w-full h-auto rounded-2xl mb-4";
                wrapper.appendChild(img);
            } else {
                const placeholder = document.createElement("div");
                placeholder.className = "w-full aspect-video bg-neutral-200 rounded-2xl mb-4 flex items-center justify-center text-neutral-400 text-bm";
                placeholder.textContent = `[Image Placeholder: ${item.title}]`;
                wrapper.appendChild(placeholder);
            }

            if (item.content) {
                const cont = document.createElement("p");
                cont.textContent = item.content;
                cont.className = `text-bl text-neutral-main leading-relaxed content-writing whitespace-pre-line ${alignClass}`;
                wrapper.appendChild(cont);
            }
        }
        
        container.appendChild(wrapper);
    });

    if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise()
            .then(() => {
                if (window.AOS && window.AOS.refresh) window.AOS.refresh();
            })
            .catch(() => {
                if (window.AOS && window.AOS.refresh) window.AOS.refresh();
            });
    } else if (window.AOS && window.AOS.refresh) {
        window.AOS.refresh();
    }
}

function LoadScroll(activeBab) {
    const sidebar = document.getElementById("sidebar-nav") || document.querySelector("aside div");
    if (!sidebar) return;

    sidebar.innerHTML = "";
    const items = content[activeBab] || [];

    const inactiveClass = "text-bm text-neutral-400 hover:text-primary-main transition-all leading-snug block";
    const activeClass = "text-bm text-neutral-active font-semibold hover:text-primary-main transition-all leading-snug pl-2  block";

    items.forEach((item, index) => {
        if (!item.title) return;
            
        const sectionId = getSectionId(item, index, items);
        const link = document.createElement("a");
        link.href = `#${sectionId}`;
        link.textContent = item.title;
        link.dataset.targetId = sectionId;
        link.className = index === 0 ? activeClass : inactiveClass;

        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetEl = document.getElementById(sectionId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });

        sidebar.appendChild(link);
    });

    function onScroll() {
        const scrollPosition = window.scrollY + 180;
        const links = sidebar.querySelectorAll("a");
        let activeId = "";

        items.forEach((item, index) => {
            if (!item.title) return;
            const sectionId = getSectionId(item, index, items);
            const el = document.getElementById(sectionId);
            if (el && el.offsetTop <= scrollPosition) {
                activeId = sectionId;
            }
        });

        if (!activeId && items.length > 0) {
            activeId = getSectionId(items[0], 0, items);
        }

        links.forEach(link => {
            if (link.dataset.targetId === activeId) {
                link.className = activeClass;
                link.scrollIntoView({ block: "nearest", behavior: "smooth" });
            } else {
                link.className = inactiveClass;
            }
        });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
}

function init() {
    const activeBab = getActiveBab();
    updatePageMeta(activeBab);
    DataToContent(activeBab);
    LoadScroll(activeBab);

    if (window.lucide && window.lucide.createIcons) {
        window.lucide.createIcons();
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}