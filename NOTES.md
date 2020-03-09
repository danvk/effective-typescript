# Notes

What do I want?

- Minimal configuration required
- Support for writing in Markdown, w/ TypeScript syntax highlighting
- Written in TypeScript (or at least JavaScript)
- Lets me wrap outbound links in a tracker

## Static site generators

### pelican

This is what Brett uses for effectivepython.com.

It looks like he writes in Markdown and maybe uses something to wrap external links.
I'd like both of these things.
I'd probably use pelican if I had his settings & such.

But it would be more on-brand to use something built in TS.

### Jekyll

I've used it before for danvk.org and like its simplicity.
But I don't really understand the Ruby stack and can't figure out how to run it
on my laptop due to some cryptic bundler / Ruby / macOS errors.

### Gatsby

Orta really likes Gatsby and is using it for the TypeScript site.
But it seems extremely general and pretty complicated to set up to do anything
in particular. The length of their page on using Markdown was quite off-putting:
https://www.gatsbyjs.org/docs/adding-markdown-pages/.

### Hexo

Written in JS, supports Markdown out of the box.

Seems pretty simple. Uses ejs for fancy templating.

"Partials are useful for sharing components between your templates. Typical examples include headers, footers or sidebars."

    <%- partial('partial/header') %>

Theme list here: <https://hexo.io/themes/>. There are an absurd number.

If you would like to enable the RSS, the [hexo-generate-feed] plugin is also required.

I think this is going to work just fine. The ejs templates & theme structure seeem simple enough. You have to restart the server to pick up changes to `_config.yml`.

To-do:

- [x] Test "excerpts" (you use <!-- more -->)
- [x] Fix ugly source code formatting
- [x] Fix footer
- [x] Match Brett's article page
- [x] Add RSS feed
- [x] Get generation to work
- [x] Look into automatically wrapping external links
- [x] Delete unused code from hexo theme
- [ ] Add emails via MailChimp or other
- [ ] Update fonts

Notes:

- Syntax Highlighting
  - The highlighting is done by highlight.js which doesn't have great TS support.
  - I tried hexo-prism-plugin but couldn't get it to work.
  - It looks like hexo-utils might support it?
  - This isn't great but probably not worth fussing about.
- Asciidoc
  - There is an asciidoc plugin, hexo-renderer-asciidoc
  - It uses asciidoctor, which I think is what O'Reilly uses, too
  - It didn't work too well, and I will have to do some editing anyway.
- Drafts
  - Put drafts in a `source/_drafts` folder.
  - See them by running with `hexo server --drafts`.
- Markdown
  - You can include markdown as a partial just the same as ejs
  - The one annoyance is that single line breaks become paragraph breaks.
  - (This is easy to fix!)
- Link wrapping
  - The plugins page indicates I should just write a script but gives no examples https://hexo.io/docs/plugins#Script
  - The autominifier plugin seems close-ish to what I want https://github.com/chenzhutian/hexo-all-minifier/
  - The target="_blank" does not work w/ the gtags wrapper. Also broken on Brett's site.
  - cheerio is a popular way to work w/ HTML in node. I had to downgrade to 0.22 because 1.0rc breaks in all sorts of ways.