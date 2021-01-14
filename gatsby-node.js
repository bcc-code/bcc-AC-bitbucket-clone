/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const _ = require('lodash')
const  {getIndexPostQuery,allPostQueries} = require('gatsby-source-ac/helpers')
const buildTranslations = require('./generators/json/build-translations')
const endpoints = require('./src/strings/endpoints')
exports.onCreateWebpackConfig = ({ actions, plugins }) => {
    actions.setWebpackConfig({
      plugins: [
        plugins.define({
          'process.env.SITE_URL': JSON.stringify(process.env.SITE_URL),
          'process.env.LANG': JSON.stringify(process.env.LANG),
          'process.env.LANG_CODE': JSON.stringify(process.env.LANG_CODE),
          'process.env.LOCALE': JSON.stringify(process.env.LOCALE),
          'process.env.ALGOLIA_APP_ID': JSON.stringify(process.env.ALGOLIA_APP_ID),
          'process.env.ALGOLIA_SEARCH_KEY': JSON.stringify(process.env.ALGOLIA_SEARCH_KEY),
          'process.env.BRANCH': JSON.stringify(String(process.env.BRANCH).substr(0,6)),
          'process.env.LISTEN_SECTION':JSON.stringify(process.env.LISTEN_SECTION),
          'process.env.GLOSSARY_SECTION':JSON.stringify(process.env.GLOSSARY_SECTION),
          'process.env.SCRIPTURE_SECTION':JSON.stringify(process.env.SCRIPTURE_SECTION)
        })
      ]
    })
  }

  exports.onPreInit = async () => {
    await getIndexPostQuery(endpoints.api_url)
    await buildTranslations.translationStrings()
    await buildTranslations.languageSites()
  }

  exports.createPages = ({ page,actions, graphql }) => {
    const generatePosts = require('./generators/generatePosts.js')
    const generatePages = require('./generators/generatePages.js')
    const generateAuthors = require('./generators/generateAuthors.js')
    const generatePlaylists = require('./generators/generatePlaylists.js')
    const generateScriptures=require('./generators/generateScriptures.js')
    const generateGlossary = require('./generators/generateGlossary.js')
    const generateTopics = require('./generators/TopicsFormatsTypes/index.js')
    const generateHome = require('./generators/generateHome.js')
    const generateExplore = require('./generators/generateExplore')
    const generatePodcast = require('./generators/generatePodcast')
    const generateRedirect = require('./generators/generateRedirect')
    const generateSeries = require('./generators/generateSeries')
    
     const generators = [

      generateExplore(actions, graphql),
      generateHome(actions, graphql), 
      generatePosts(actions, graphql),
/*       generateAuthors(actions, graphql),
      generatePages(actions, graphql),
      generateTopics(actions, graphql),
      generateRedirect(actions, graphql),
      generateSeries(actions, graphql) */
    ]
/*     if (process.env.LISTEN_SECTION==="all"|| process.env.LISTEN_SECTION==="podcast_only"){
      generators.push(generatePodcast(actions, graphql))
    }

    if (process.env.LISTEN_SECTION==="all"){
      generators.push(generatePlaylists(actions, graphql))
    }

    if (process.env.GLOSSARY_SECTION==="true"){
      generators.push( generateGlossary(actions, graphql))
    }

    if (process.env.SCRIPTURE_SECTION==="true"){
      generators.push(generateScriptures(actions, graphql)) 
  } */

    return Promise.all(generators)

}

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // Only update the `/user` page.
  if (page.path.match(/^\/user/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = `/user/*`

    // Update the page.
    createPage(page)
  }
}
