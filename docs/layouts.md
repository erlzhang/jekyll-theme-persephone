# Home Layout

The `home` layout is designed to be an index page for your blog. Pagination plugins (  both `jekyll-paginate` and `jekyll-paginate-v2` ) are supported.

# Blog Layout

The `blog` layout is designed to be an archive page for a blog. All of your blog posts will be grouped by categories and published years and displayed in a single page.

# Archive Layout

It is another alternative for your blog as an index page or archive page. But it is designed to be a books' archive page (about books).

By default, the page will show all of your posts. You can make it as your books archive page by adding the followings in the page's front matters.

```yml
pages: books
```

# Post Layout and Page Layout

As the names show, they are default layouts for your posts and pages.

# Slides Layout

I used it on the front page of [my blog](https://erl.im) to show my recent books. By default, it will show the newest 4 published books. You can change the size of the slides in the `theme_setting` in `_config.yml`.

It can't be used without the `jekyll-books` plugin.

```yml
theme_setting:
  slides_size: 5
```

# Book Layout and Chapter Layout

The default layout for your book index page and it's chapters. They can't be used without the `jekyll-books` plugin.
