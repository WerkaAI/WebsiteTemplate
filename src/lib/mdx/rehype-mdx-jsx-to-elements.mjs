/**
 * Rehype plugin to convert MDX JSX elements to standard HAST elements.
 * This allows them to be processed by rehype-sanitize.
 */
export const rehypeMdxJsxToElements = () => (tree) => {
    const convertNode = (node) => {
        if (!node || typeof node !== "object") return;

        if (
            (node.type === "mdxJsxFlowElement" ||
                node.type === "mdxJsxTextElement") &&
            typeof node.name === "string" &&
            /^[a-z]/i.test(node.name) // Changed to case-insensitive to catch all components
        ) {
            const properties = {};

            if (Array.isArray(node.attributes)) {
                for (const attribute of node.attributes) {
                    if (!attribute || typeof attribute !== "object") continue;

                    if (
                        attribute.type === "mdxJsxAttribute" &&
                        typeof attribute.name === "string"
                    ) {
                        if (attribute.value === null || attribute.value === undefined) {
                            properties[attribute.name] = true;
                        } else if (typeof attribute.value === "string") {
                            properties[attribute.name] = attribute.value;
                        } else if (
                            typeof attribute.value === "object" &&
                            "value" in attribute.value &&
                            typeof attribute.value.value === "string"
                        ) {
                            properties[attribute.name] = attribute.value.value;
                        }
                    }
                }
                // Preserve original attributes for restoration
                properties['data-mdx-attributes'] = JSON.stringify(node.attributes);
            }

            node.type = "element";
            node.tagName = node.name;
            node.properties = properties;
            delete node.name;
            delete node.attributes;
        }

        if (Array.isArray(node.children)) {
            for (const child of node.children) {
                convertNode(child);
            }
        }
    };

    convertNode(tree);
};
