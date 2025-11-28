/**
 * MDX Sanitization Plugins
 * 
 * These plugins implement a "Protect/Restore" strategy to allow custom MDX components
 * to pass through `rehype-sanitize` without being stripped, while still sanitizing
 * their content (children).
 */

function visit(node, visitor) {
    if (!node) return;
    visitor(node);
    if (Array.isArray(node.children)) {
        for (const child of node.children) {
            visit(child, visitor);
        }
    }
}

/**
 * Protects custom MDX components (PascalCase tags) by converting them to
 * standard <div> elements with a data attribute containing the original metadata.
 * This allows them to pass through rehype-sanitize (which allows data attributes).
 */
export function rehypeMdxProtect() {
    return (tree) => {
        visit(tree, (node) => {
            if (node.type !== "element" || !node.tagName) return;

            // Check for PascalCase (starts with uppercase) indicating a custom component
            if (/^[A-Z]/.test(node.tagName)) {
                const originalData = {
                    tagName: node.tagName,
                    properties: node.properties || {},
                };

                // Convert to a safe placeholder
                node.tagName = "div";
                node.properties = {
                    "data-mdx-placeholder": JSON.stringify(originalData),
                };
                // Children are left as-is, so they will be visited and sanitized
            }
        });
    };
}

/**
 * Restores custom MDX components from their protected state after sanitization.
 */
export function rehypeMdxRestore() {
    return (tree) => {
        visit(tree, (node) => {
            if (node.type !== "element" || !node.tagName) return;

            if (node.properties && node.properties["data-mdx-placeholder"]) {
                try {
                    const originalData = JSON.parse(node.properties["data-mdx-placeholder"]);

                    // Restore original tag and properties
                    node.tagName = originalData.tagName;
                    node.properties = originalData.properties;

                    // Note: Children have been sanitized by this point
                } catch (e) {
                    console.error("Failed to restore MDX component:", e);
                    // Keep as div if restoration fails, but remove the data attribute
                    delete node.properties["data-mdx-placeholder"];
                }
            }
        });
    };
}
