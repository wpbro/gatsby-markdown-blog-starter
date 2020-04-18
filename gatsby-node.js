const path = require("path");
const _ = require("lodash");
const moment = require("moment");
const siteConfig = require("./data/SiteConfig");

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  let slug;
  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);
    if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
    ) {
      slug = `/${_.kebabCase(node.frontmatter.title)}`;
    } else if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
    } else if (parsedFilePath.dir === "") {
      slug = `/${parsedFilePath.name}/`;
    } else {
      slug = `/${parsedFilePath.dir}/`;
    }

    if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "slug"))
        slug = `/${_.kebabCase(node.frontmatter.slug)}`;
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "date")) {
        const date = moment(node.frontmatter.date, siteConfig.dateFromFormat);
        /* eslint no-console: "off" */
        if (!date.isValid)
          console.warn(`WARNING: Invalid date.`, node.frontmatter);

        createNodeField({
          node,
          name: "date",
          value: date.toISOString()
        });
      }
    }
    createNodeField({ node, name: "slug", value: slug });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const postPage = path.resolve("src/templates/post.js");
  const pagePage = path.resolve("src/templates/page.js");
  const tagPage = path.resolve("src/templates/tag.js");
  const categoryPage = path.resolve("src/templates/category.js");

  const markdownQueryResult = await graphql(
    `
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                path
                title
                tags
                categories
                date
                layout
              }
            }
          }
        }
      }
    `
  );

  if (markdownQueryResult.errors) {
    /* eslint no-console: "off" */
    console.error(markdownQueryResult.errors);
    throw markdownQueryResult.errors;
  }

  const tagSet = new Set();
  const categorySet = new Set();

  const postsEdges = markdownQueryResult.data.allMarkdownRemark.edges;

  postsEdges.sort((postA, postB) => {
    const dateA = moment(
      postA.node.frontmatter.date,
      siteConfig.dateFromFormat
    );

    const dateB = moment(
      postB.node.frontmatter.date,
      siteConfig.dateFromFormat
    );

    if (dateA.isBefore(dateB)) return 1;
    if (dateB.isBefore(dateA)) return -1;

    return 0;
  });

  // Get only posts
  const posts = postsEdges.filter(
    post => post.node.frontmatter.layout !== "page"
  );
  // Get only pages
  const pages = postsEdges.filter(
    page => page.node.frontmatter.layout === "page"
  );
  // Create posts
  posts.forEach((post, newIndex) => {
    const prevPost = posts[newIndex - 1 >= 0 ? newIndex - 1 : posts.length - 1];
    const nextPost = posts[newIndex + 1 < posts.length ? newIndex + 1 : 0];

    if (post.node.frontmatter.tags) {
      post.node.frontmatter.tags.forEach(tag => {
        tagSet.add(tag);
      });
    }

    if (post.node.frontmatter.categories) {
      post.node.frontmatter.categories.forEach(category => {
        categorySet.add(category);
      });
    }

    createPage({
      path: post.node.frontmatter.path || post.node.fields.slug,
      component: postPage,
      context: {
        slug: post.node.fields.slug,
        nexttitle: nextPost.node.frontmatter.title,
        nextslug: nextPost.node.fields.slug,
        prevtitle: prevPost.node.frontmatter.title,
        prevslug: prevPost.node.fields.slug
      }
    });
  });
  // Create pages
  pages.forEach(page => {
    createPage({
      path: page.node.frontmatter.path || page.node.fields.slug,
      component: pagePage,
      context: {
        slug: page.node.fields.slug
      }
    });
  });
  // Generate link foreach tag page
  tagSet.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag)}/`,
      component: tagPage,
      context: {
        tag
      }
    });
  });
  // Generate link foreach category page
  categorySet.forEach(category => {
    createPage({
      path: `/${_.kebabCase(category)}/`,
      component: categoryPage,
      context: {
        category
      }
    });
  });
};
