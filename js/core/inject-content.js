// inject-content.js
// import DOMPurify from 'dompurify';
// import { initDropDowns, toggleSidebarDropdown } from "../ui/drop-downs.js";
import { initCopyCodes } from "../ui/copy-code.js";
import { initSnipNav } from "../nav/snips-nav.js";
// import { initCollapseCode } from "../ui/collapse-code.js";
import { isSafePath } from "./security-utils.js"
export const mainLandingPage = document.querySelector("#mainLandingPage");

// const DEFAULT_PAGE = "topics/javascript-codeCmdShrt/javascript-codeCmdShrt.html";
const DEFAULT_PAGE = "topics/vsCode-codeCmdShrt/vsCode-codeCmdShrt.html";
// const DEFAULT_PAGE = "topics/github-codeCmdShrt/github-codeCmdShrt.html";

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

export async function injectPage(href=DEFAULT_PAGE) {
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
            // console.log("Contains <script>:", html.includes("<script"));

            pageCache.set(href, html);
        }

        // Parse HTML safely
        // 1. Sanitize RAW string first
        const cleanHTML = DOMPurify.sanitize(html, {
            ALLOWED_TAGS: [
                'video',
                'div', 'p', 'span', 'ul', 'ol', 'li',
                'pre', 'code',
                'img',
                'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                'a', 'section', 'article', 'header', 'footer'
            ],
            ALLOWED_ATTR: [
                'controls',
                'href', 'src', 'alt', 'class', 'id', 'tabindex'
            ]
        });

        // 2. THEN parse the clean version
        const parser = new DOMParser();
        const doc = parser.parseFromString(cleanHTML, "text/html");

        // 3. Extract content safely
        const newContent =
            doc.querySelector("#mainLandingPage") ||
            doc.querySelector(".main-landing-page") ||
            doc.body;

        // 4. Inject
        mainLandingPage.innerHTML = newContent.innerHTML;
        // Optional: re-initialize page features
        requestAnimationFrame(() =>{
            initCopyCodes();
            initSnipNav()
        })
        // initCollapseCode();

        mainLandingPage.scrollTo(0, 0);

    } catch (err) {
        mainLandingPage.innerHTML =
            `<p class="r">Failed to load page: ${href}</p>`;
    }
}