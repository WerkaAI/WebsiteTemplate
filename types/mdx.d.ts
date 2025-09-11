declare module '*.mdx' {
  export const meta: {
    title: string
    description?: string
    date: string
    tags?: string[]
    cover?: string
    draft?: boolean
  };
  const MDXContent: (props: any) => JSX.Element;
  export default MDXContent;
}