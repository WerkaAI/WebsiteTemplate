import createMDX from "@next/mdx";
import bundleAnalyzer from "@next/bundle-analyzer";
import createNextIntlPlugin from "next-intl/plugin";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSanitize from "rehype-sanitize";
import rehypePrettyCode from "rehype-pretty-code";

import {
  mdxSanitizeSchema,
  mdxUrlValidator,
} from "./src/lib/security/mdx-policy.mjs";
import {
  rehypeMdxProtect,
  rehypeMdxRestore,
} from "./src/lib/mdx-sanitization.mjs";

const rehypeMdxJsxToElements = () => (tree) => {
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

const withMDX = createMDX({
  options: {
    // providerImportSource: "@/mdx-components",
    remarkPlugins: [
      remarkGfm,
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: "meta" }],
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
      rehypeMdxJsxToElements,
      rehypeMdxProtect,
      [rehypePrettyCode, { theme: "github-dark" }],
      [rehypeSanitize, mdxSanitizeSchema],
      rehypeMdxRestore,
      mdxUrlValidator,
    ],
  },
});

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "mdx"],
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_ENABLE_PWA: process.env.NEXT_PUBLIC_ENABLE_PWA || "false",
  },
  images: {
    unoptimized: true,
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(withNextIntl(withMDX(nextConfig)));
