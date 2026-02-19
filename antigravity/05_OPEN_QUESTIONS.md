# Open Questions & Improvements

## Questions for User
1.  **Content Strategy**: Who is responsible for maintaining the MDX content? Is there a need for a CMS in the future?
2.  **Authentication**: Is there a plan to add user login for "AutoŻaba" customers (e.g., to access the calculator results or premium tutorials)?
3.  **Integrations**: Are there any other 3rd party tools to integrate (e.g., CRM, Analytics beyond Vercel/Google)?
4.  **Tone of Voice**: Should the copy be strictly formal (B2B) or more conversational?

## Potential Improvements
1.  **SEO Optimization**: Ensure all pages have dynamic metadata and OpenGraph images.
2.  **Performance**: Check bundle size, especially with `framer-motion` and `lucide-react` (ensure tree-shaking).
3.  **Accessibility**: Audit colors for contrast ratios (especially green on white) and ensure all interactive elements have aria-labels.
4.  **Refactoring**:
    -   Review `ui` folder for unused components to keep the bundle small.
    -   Standardize section spacing and padding using a layout wrapper if not already done.
    -   Move hardcoded strings to a constants file or i18n dictionary if multi-language support is planned.
