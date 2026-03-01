# AyurGlow Secrets

## Current State
The blog post content editor in AdminPage.tsx is a plain `<Textarea>` with no formatting options. Content is stored as plain text with optional `[image:id]` tags. PostPage.tsx renders content as plain paragraphs.

## Requested Changes (Diff)

### Add
- A formatting toolbar above the content textarea in the admin editor with:
  - Bold button (wraps selected text in `**text**` markers)
  - Italic button (wraps selected text in `_text_` markers)
  - Text color picker with a set of preset colors (e.g. red, blue, green, orange, purple, dark, default) that wraps selected text in `[color:hex]text[/color]` markers
- PostContent renderer in PostPage.tsx updated to parse and render:
  - `**text**` → `<strong>text</strong>`
  - `_text_` → `<em>text</em>`
  - `[color:#hex]text[/color]` → `<span style="color:#hex">text</span>`

### Modify
- AdminPage.tsx content textarea section: add toolbar with Bold (B), Italic (I), and color-picker buttons above the textarea; buttons apply formatting to the selected text or insert markers at cursor
- PostPage.tsx PostContent component: add inline parsing for bold/italic/color markers within each line of text before rendering

### Remove
- Nothing removed
