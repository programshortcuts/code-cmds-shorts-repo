// inject-content.js
// import DOMPurify from 'dompurify';
// import { initDropDowns, toggleSidebarDropdown } from "../ui/drop-downs.js";
// import { initCopyCodes } from "../copy-code.js";
// import { initCollapseCode } from "../ui/collapse-code.js";
import { isSafePath } from "./security-utils.js"
export const mainLandingPage = document.querySelector("#mainLandingPage");

const DEFAULT_PAGE =
    "topics/javascript-codeCmdShrt/javascript-codeCmdShrt.html";

const pageCache = new Map();

export function initInjectContentListeners() {
    const sideBar = document.querySelector(".side-bar-topics");
    // Load default page
    injectPage(DEFAULT_PAGE);
    // Sidebar click listener
    sideBar.addEventListener("click", async (e) => {
        const link = e.target.closest("a");
        if (!link) return;
        const href = link.getAttribute("href");
        if (link.classList.contains("drop-down")) {
            // toggleSidebarDropdown(link);
        }
        if (!href || href === "#") return;
        e.preventDefault();
        await injectPage(href);
    });
}

export async function injectPage(href) {
    if (!href) return;
       if (!isSafePath(href)) {
        console.warn("Blocked unsafe path:", href);
        return;
    }
    try {
        let html;

        if (pageCache.has(href)) {
            html = pageCache.get(href);
        } else {
            const res = await fetch(href);
            if (!res.ok) {
                throw new Error(`Failed to fetch ${href}`);
            }
            html = await res.text();
            pageCache.set(href, html);
        }

        // Parse HTML safely
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Grab the actual page content
        const newContent =
            doc.querySelector("#mainLandingPage") ||
            doc.querySelector(".main-landing-page") ||
            doc.body;

        if (!newContent) {
            throw new Error("No valid page content found");
        }
        const cleanedHTML = DOMPurify.sanitze(newContent)
        // ✅ Sanitize before injecting
        mainLandingPage.innerHTML = DOMPurify.sanitize(cleanedHTML, {
    ALLOWED_TAGS: [
        'div','p','span','ul','ol','li',
        'pre','code',
        'img',
        'h1','h2','h3','h4','h5','h6',
        'a','section','article','header','footer'
    ],
    ALLOWED_ATTR: [
        'href','src','alt','class','id','tabindex'
    ]
});

        // Optional: re-initialize page features
        // initCopyCodes();
        // initDropDowns();
        // initCollapseCode();

        mainLandingPage.scrollTo(0, 0);

    } catch (err) {
        mainLandingPage.innerHTML =
            `<p style="color:red;">Failed to load page: ${href}</p>`;
    }
}