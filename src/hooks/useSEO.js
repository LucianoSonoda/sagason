import { useEffect } from 'react';

/**
 * Custom hook to dynamically manage document head metadata for SEO and social sharing.
 * 
 * @param {Object} metadata
 * @param {string} metadata.title - The page title.
 * @param {string} metadata.description - The page meta description.
 * @param {string} [metadata.keywords] - The page keywords (optional).
 * @param {string} [metadata.canonicalPath] - The path of the URL (e.g., '/warranty') (optional).
 */
export function useSEO({ title, description, keywords, canonicalPath }) {
    useEffect(() => {
        // 1. Update Document Title
        if (title) {
            document.title = title;
        }

        // Helper function to find and update, or create a meta tag
        const updateOrCreateMeta = (attrName, attrValue, contentValue) => {
            if (!contentValue) return;
            let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attrName, attrValue);
                document.head.appendChild(element);
            }
            element.setAttribute('content', contentValue);
        };

        // 2. Update Primary Meta Tags
        updateOrCreateMeta('name', 'description', description);
        if (keywords) {
            updateOrCreateMeta('name', 'keywords', keywords);
        }

        // 3. Update Canonical URL & Social URLs
        if (canonicalPath) {
            const canonicalUrl = `https://sagason.cl${canonicalPath}`;
            
            let canonicalLink = document.querySelector('link[rel="canonical"]');
            if (!canonicalLink) {
                canonicalLink = document.createElement('link');
                canonicalLink.setAttribute('rel', 'canonical');
                document.head.appendChild(canonicalLink);
            }
            canonicalLink.setAttribute('href', canonicalUrl);

            // Update Social URL Meta Tags
            updateOrCreateMeta('property', 'og:url', canonicalUrl);
            updateOrCreateMeta('name', 'twitter:url', canonicalUrl);
        }

        // 4. Update Social Sharing Titles and Descriptions (Open Graph & Twitter Cards)
        updateOrCreateMeta('property', 'og:title', title);
        updateOrCreateMeta('property', 'og:description', description);
        updateOrCreateMeta('name', 'twitter:title', title);
        updateOrCreateMeta('name', 'twitter:description', description);

    }, [title, description, keywords, canonicalPath]);
}
