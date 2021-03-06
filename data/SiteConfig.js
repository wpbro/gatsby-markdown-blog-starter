const config = {
  siteTitle: "WPBRO", // Site title.
  siteTitleShort:
    "Personal blog of WPBRO - Dima Minka, Modern Web Developer from Israel", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "WPBRO blog by Dima Minka", // Alternative site title for SEO.
  siteLogo: "/logos/wpbro-favicon.png", // Logo used for SEO and manifest.
  siteLogoSvg: "/logos/wpbro-logo.svg", // Logo used for Header.
  siteUrl: "https://wpbro.ru", // Domain of your website without pathPrefix.
  pathPrefix: "", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription:
    "Personal blog of WPBRO by Dima Minka, Modern Web Developer from Israel", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteFBAppID: "", // FB Application ID for using app insights
  googleAnalyticsID: "UA-163311232-1", // GA tracking ID.
  dateFromFormat: "YYYY-MM-DD", // Date format used in the frontmatter.
  dateFormat: "DD/MM/YYYY", // Date format for display.
  userName: "WPBRO - Dima Minka", // Username to display in the author segment.
  userEmail: "dev@wpbro.ru", // Email used for RSS feed's author segment
  userTwitter: "dimaminka", // Optionally renders "Follow Me" in the Bio segment.
  userGitHub: "dimaminka", // Optionally renders "Follow Me" in the Bio segment.
  userLocation: "Israel, Earth", // User location to display in the author segment.
  userAvatar: "https://i.ibb.co/JnLFdgS/dima-minka-avatar-thumbnal.jpg", // User avatar to display in the author segment.
  userDescription:
    "Dima Minka, WPBRO, WordPress community member in Israel, Ukraine and Russia, Elementor Expert and community leader", // User description to display in the author segment.
  copyright: "Copyright © 2020. All rights reserved.", // Copyright string for the footer of the website and RSS feed.
  themeColor: "#D8D8D8", // Used for setting manifest and progress theme colors.
  backgroundColor: "#363636" // Used for setting manifest background color.
};

// Validate

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === "/") {
  config.pathPrefix = "";
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, "")}`;
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === "/")
  config.siteUrl = config.siteUrl.slice(0, -1);

// Make sure siteRss has a starting forward slash
// if (config.siteRss && config.siteRss[0] !== "/")
//   config.siteRss = `/${config.siteRss}`;

module.exports = config;
