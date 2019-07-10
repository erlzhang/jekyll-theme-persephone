# Comments

*Note: Comments are supported on post layout only currently.*

If you want to use comments in your post layout, you should enable it first.

```yml
comment:
  enabled: true
```

The theme currently supports two types of comments providers. More providers are coming.

## Disqus

You should have a [Disqus](https://disqus.com/) account and [create a new site](https://disqus.com/admin/create/).

Then set the comment provider to `disqus` and set your Disqus **Website Name** as `disqus.name`.

```yml
comment:
  enabled: true
  provider: disqus
  disqus:
    name: your_website_name
```

## Static Comments

The Static Comments were inspired by [Staticman](https://staticman.net/). When someone comments, it produces a yml file and push it to your repository. You can set the fields of a comment freely. All of your comments are stored in your repository along with your blog.

You can learn about more from the [official document](https://staticman.net/docs/).

If you want to use Staticman in this theme, you should set the `provider` to `static` and the `postUrl` to your Staticman API.

```yml
comment:
  enabled: true
  provider: static
  static:
    postUrl: https://api.staticman.net/v2/connect/{your GitHub username}/{your repository name}
```

[How to get a Staticman API?](https://staticman.net/docs/)

I used this API in [my personal Chinese blog](https://erl.im) for several months and finally dropped it, for there are some [issues](https://github.com/eduardoboucas/staticman/issues/294) in the newest API. 

But I like the idea of Staticman. So I write a simple app instead of it and deployed it to Heroku freely. By doing that I can keep the theme and all of my comments data unchanged.

Find more [here](https://github.com/erlzhang/jekyll-comment-server) if you are interested. But it is rough and uncompleted.

If you happened to have your own API, just set it to your `postUrl`. Your comment form and comment list are included in this theme.

## Smileys

This is a feature I used in my blog's static comment. Your blog's visitors can add smileys when post a comment. **It can be used only if your comment's `provider` is `static`.**

It is supported by the `jekyll-smiley` plugins. So first [install the plugin](https://github.com/erlzhang/jekyll-smiley).

Then enable it in your site's `_config.yml`.

```yml
smiley:
  enabled: true
  dir: img/smileys
```

The smileys are not included neither in the theme nor the plugin. You should include theme in your blog matually and set the `dir`. You can find an example [here](https://github.com/erlzhang/erl.im/tree/master/smileys).



