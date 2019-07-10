# Books

﻿I like writing novels.  The theme is designed to show my multiple novels.  `Gitbook` is a wonderful tool to make a single book, but not many. So I made a Jekyll plugin to simulate `Gitbook` to generate multiple books, which can be combined well with my blog.

The function is not useful for everyone, so I didn't make it a dependency of the theme. If you are interested, you can add the plugin in your `Gemfile`.

```ruby
gem 'jekyll-books'
```

## How to use the plugin?

There are two ways to add a book(or a document):

### Local Books

Create a directory named `_books` in your root path. The generator will read all of the directories in it and each directory is a book. For example, if you want to create a book named `Persephone`, you should:

- Create a directory named `persephone` in the `_books` dir;
- Create a `SUMMARY.md` in `_books/persephone`;
- Create a `index.md` in `_books/persephone`;
- Create other files the `_books/persephone`.

`index.md` is the front page of your book. You should set the title, start and end date of your book, a thumbnail in its front matter. The `markdown` should look like this:

```markdown
---
title: Persephone #The title of your book
start: 2018 #The year you start to write this book, default is the end year.
end: 2019 #The year you finished this book, default is the current year.
img: /img/persehone.png #The cover of this book, which will be shown in the home slides and the book index page.
---
Your book introduction here!
```

`SUMMARY.md` is the catalog of your book. All of the chapters and their relationships should be defined here. It is similar to the SUMMARY of Gitbook.

```markdown
* [Volume 1](v1.md)
    * [Chapter 1](1-1.md)
    * [Chapter 2](1-2.md)
* [Volume 2](v2.md)
    * [Chapter 1](2-1.md)
    * [Chapter 2](2-2.md)
```

### External Books

You can also add external links to your books. Just create a `books.yml` file in the dir of  `_data`.

```yml
-
  title: Persephone
  start: 2018
  end: 2019
  img: /img/persephone.png
  url: www.yourexternalsite.com/persephone #It can be an external link.
-
  title: Blog
  start: 2018
  url: /blog/ #Or a relative path.
```
They can be shown with the `home` layout or the `archive` layout.

## Layouts for `jekyll-books`

If you want to use `jekyll-books` plugin without the `jekyll-theme-persephone`, you should at least have two layouts. One `book` layout for the index page of a book and a `chapter` layout for every chapter.

In theme Persephone, you can use layout `slides` or layout `archive` to make an index page of all of your pages.
