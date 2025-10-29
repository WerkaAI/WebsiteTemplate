import { defaultSchema } from "rehype-sanitize";

const allowedIframeHosts = new Set(["www.youtube.com", "www.youtube-nocookie.com"]);
const allowedImageHosts = new Set([
  "images.unsplash.com",
  "autozaba-app-storage.fra1.cdn.digitaloceanspaces.com",
]);

const clonedSchema = typeof structuredClone === "function"
  ? structuredClone(defaultSchema)
  : JSON.parse(JSON.stringify(defaultSchema));

const baseAttributes = clonedSchema.attributes ?? {};

const GLOBAL_ATTRIBUTES = [
  "className",
  "id",
  [/^aria-[a-z-]+$/i, true],
  [/^data-[\w-]+$/i, true],
];

function mergeAttributeList(existing, additions) {
  const list = Array.isArray(existing) ? existing : [];
  return Array.from(new Set([...list, ...additions]));
}

function mergeTagNames(existing, additions) {
  const list = Array.isArray(existing) ? existing : [];
  return Array.from(new Set([...list, ...additions]));
}

const mdxSanitizeSchema = {
  ...clonedSchema,
  tagNames: mergeTagNames(clonedSchema.tagNames, [
    "section",
    "div",
    "span",
    "article",
    "iframe",
    "table",
    "thead",
    "tbody",
    "tr",
    "td",
    "th",
  ]),
  attributes: {
    ...baseAttributes,
    "*": mergeAttributeList(baseAttributes["*"] ?? [], GLOBAL_ATTRIBUTES),
    a: mergeAttributeList(baseAttributes.a ?? [], ["href", "title", "target", "rel", "className"]),
    img: mergeAttributeList(baseAttributes.img ?? [], [
      "src",
      "alt",
      "title",
      "loading",
      "decoding",
      "width",
      "height",
      "className",
    ]),
    iframe: mergeAttributeList(baseAttributes.iframe ?? [], [
      "src",
      "title",
      "allow",
      "allowFullScreen",
      "loading",
      "referrerPolicy",
      "width",
      "height",
      "className",
    ]),
    input: mergeAttributeList(baseAttributes.input ?? [], [["type", /^(checkbox)$/], "checked", "disabled", "value", "className"]),
    code: mergeAttributeList(baseAttributes.code ?? [], ["className"]),
    pre: mergeAttributeList(baseAttributes.pre ?? [], ["className"]),
    table: mergeAttributeList(baseAttributes.table ?? [], ["className"]),
    tbody: mergeAttributeList(baseAttributes.tbody ?? [], ["className"]),
    thead: mergeAttributeList(baseAttributes.thead ?? [], ["className"]),
    tr: mergeAttributeList(baseAttributes.tr ?? [], ["className"]),
    td: mergeAttributeList(baseAttributes.td ?? [], ["className"]),
    th: mergeAttributeList(baseAttributes.th ?? [], ["className", "scope"]),
  },
};

function isRelativeUrl(value) {
  return value.startsWith("/") || value.startsWith("./") || value.startsWith("../") || value.startsWith("#");
}

function parseUrl(value) {
  try {
    if (value.startsWith("//")) {
      return new URL(`https:${value}`);
    }
    if (value.startsWith("http://") || value.startsWith("https://")) {
      return new URL(value);
    }
  } catch {
    return null;
  }
  return null;
}

function assertAllowedUrl(raw, context, { allowedHosts, allowData } = {}) {
  if (typeof raw !== "string") {
    throw new Error(`Expected string URL for ${context}`);
  }

  const value = raw.trim();
  if (!value) {
    throw new Error(`Empty URL encountered for ${context}`);
  }

  const lower = value.toLowerCase();
  if (lower.startsWith("javascript:")) {
    throw new Error(`Blocked javascript: URL in ${context}`);
  }

  if (lower.startsWith("data:") && allowData) {
    return;
  }

  if (lower.startsWith("mailto:") || lower.startsWith("tel:")) {
    return;
  }

  if (isRelativeUrl(value)) {
    return;
  }

  const parsed = parseUrl(value);
  if (!parsed) {
    throw new Error(`Invalid URL "${value}" in ${context}`);
  }

  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    throw new Error(`Unsupported protocol ${parsed.protocol} in ${context}`);
  }

  if (allowedHosts && !allowedHosts.has(parsed.hostname)) {
    throw new Error(`Host ${parsed.hostname} is not allowed in ${context}`);
  }
}

function ensureRelIfTargetBlank(properties, context) {
  const target = properties.target;
  if (target !== "_blank") {
    return;
  }

  const rel = properties.rel;
  const tokens = Array.isArray(rel)
    ? rel.map(String)
    : typeof rel === "string"
    ? rel.split(/\s+/)
    : [];

  if (!tokens.includes("noopener") || !tokens.includes("noreferrer")) {
    throw new Error(`Links with target="_blank" must include rel="noopener noreferrer" (${context})`);
  }
}

function walk(node, visitor) {
  if (!node) return;
  visitor(node);
  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      walk(child, visitor);
    }
  }
}

function mdxUrlValidator() {
  return function validate(tree) {
    walk(tree, (node) => {
      if (!node || node.type !== "element" || !node.tagName || !node.properties) {
        return;
      }

      const props = node.properties;

      if (node.tagName === "a" && props.href) {
        assertAllowedUrl(props.href, "anchor href");
        ensureRelIfTargetBlank(props, "anchor");
      }

      if (node.tagName === "img" && props.src) {
        assertAllowedUrl(props.src, "image src", { allowedHosts: allowedImageHosts, allowData: true });
      }

      if (node.tagName === "iframe" && props.src) {
        assertAllowedUrl(props.src, "iframe src", { allowedHosts: allowedIframeHosts });
      }

      if (node.tagName === "input") {
        const value = Array.isArray(props.type) ? String(props.type[0]) : props.type;
        if (value && value !== "checkbox") {
          throw new Error(`Unsupported input type "${value}" in MDX content`);
        }
      }
    });
  };
}

export { mdxSanitizeSchema, mdxUrlValidator };
