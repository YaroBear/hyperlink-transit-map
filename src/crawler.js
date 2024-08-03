/**
 * Applies a callback for the currentHref, and all the a tags parsed from the document.
 * Follows all links recursively to a specified maxDepth (default 10).
 * @param {VoidFunction} callback
 * @param {string} currentHref
 * @param {Document} doc
 * @param {number} maxDepth
 */
const crawlLinks = async (callback, currentHref, doc, maxDepth = 10) => {
    if (maxDepth == 0) {
        return;
    }

    const anchors = doc.getElementsByTagName("a");
    for (const anchor of anchors) {
        callback(currentHref, anchor.href);

        const response = await fetch(anchor.href);
        const html = await response.text();

        const parser = new DOMParser();
        const loadedDoc = parser.parseFromString(html, "text/html");

        await crawlLinks(callback, anchor.href, loadedDoc, --maxDepth);
    }
};
