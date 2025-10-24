---
id: hello-world
title: Hello, World — Welcome to the Opsimate Blog
excerpt: A quick demo post showing markdown, code blocks, and tags.
date: 2024-10-01
tags:
  - announcement
  - demo
author:
  name: Opsimate Team
draft: false
---

# Hello, World 👋

Welcome to the Opsimate blog! This is a short example post to show how content is structured and rendered.

## What you’ll see

- Front matter for metadata (title, date, tags, author)
- Regular Markdown headings, lists, and links
- Code blocks that render with safe HTML

## Example code

```ts
type Greeting = {
  who: string;
  when: Date;
};

export function greet({ who, when }: Greeting) {
  return `Hello, ${who}! Posted on ${when.toDateString()}`;
}
```
