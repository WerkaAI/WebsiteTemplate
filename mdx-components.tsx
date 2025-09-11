export function useMDXComponents(components: any) {
  return {
    h1: (props: any) => <h1 {...props} />,
    h2: (props: any) => <h2 {...props} />,
    h3: (props: any) => <h3 {...props} />,
    h4: (props: any) => <h4 {...props} />,
    h5: (props: any) => <h5 {...props} />,
    h6: (props: any) => <h6 {...props} />,
    p: (props: any) => <p {...props} />,
    a: (props: any) => <a {...props} />,
    ul: (props: any) => <ul {...props} />,
    ol: (props: any) => <ol {...props} />,
    li: (props: any) => <li {...props} />,
    img: (props: any) => <img {...props} />,
    pre: (props: any) => <pre {...props} />,
    code: (props: any) => <code {...props} />,
    ...components,
  };
}