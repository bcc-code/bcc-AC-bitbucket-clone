const activeEnv = process.env.ACTIVE_ENV || process.env.NODE_ENV || "staging"
const endpoints = require('./src/endpoints')
/* const generateFeed = require('./generators/Other/generateFeed') */
console.log(activeEnv)
require("dotenv").config({
  path: `.env.${activeEnv}`,
})

const targetAddress = activeEnv === 'production' ? new URL(process.env.SITE_URL) : process.env.SITE_URL;

const postQuery = `{
  ac {
    allPosts {
      objectID: id
      title
      slug
      excerpt
      authors {
          name
          slug
          id
          pivot {
              as
          }
      }
      topics {
          name
          slug
          id
          group {
              name
              slug
          }
      }
      published
    }
  }
}`

const queries = [
  {
    query: postQuery ,
    transformer: ({ data }) => data.ac && data.ac.allPosts.map((node) => {
      return { ...node, type: 'post' }
    }), // (optional)
    //index: ''// (optional) override default
  }
  ];
if(process.env.LOCALE==="en"){
  queries.push(
    {
      query: `{
        ac {
          playlists {  
            id  
            objectID: slug
            title
            slug
            excerpt
            image {
              src
              srcset
              dataUri
  
          }
          }
        }
      }`,
      transformer: ({ data }) => data.ac && data.ac.playlists.map((node) => {
        return { ...node, type: 'playlist' }
      }), // (optional)
      //index: ''// (optional) override default
    }
  )
}

const checkEnvVar = require('./check_env_var')
checkEnvVar()


const plugins = [
  'gatsby-plugin-typescript',
  'gatsby-plugin-react-helmet',
  {
    resolve: "gatsby-source-graphql",

    options: {
      // This type will contain remote schema Query type
      typeName: "AcGraphql",
      // This is the field under which it's accessible
      fieldName: "ac",
      // URL to query from
      url: endpoints.api_url,
      headers: {
        // Learn about environment variables: https://gatsby.dev/env-vars
        "x-lang": process.env.LANG_CODE
      },
    },
  },
  {
    resolve: "gatsby-source-ac",
    options: {
      // This type will contain remote schema Query type
      typeName: "AC_Source_Node",
      // This is the field under which it's accessible
      fieldName: "ac_node",
      // URL to query from
      baseUrl: endpoints.api_url,
      headers: {
        "x-lang": process.env.LANG_CODE
      }
    },
  },
  'gatsby-plugin-sass',
  {
    resolve: 'gatsby-plugin-root-import',
    options: {
      '@': `${__dirname}/src`,
    },
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: process.env.title,
      short_name: 'AC',
      start_url: '/',
      background_color: '#ffffff',
      theme_color: '#ffaf00',
      display: 'minimal-ui',
      icon: './src/images/AC_Logo.png', // This path is relative to the root of the site.
    },
  },
  // this (optional) plugin enables Progressive Web App + Offline functionality
  // To learn more, visit: https://gatsby.app/offline
  // 'gatsby-plugin-offline',
  {
    resolve: `gatsby-plugin-nprogress`,
    showSpinner: true,
  },{ 
    resolve: `gatsby-plugin-purgecss`,
    options: {
      printRejected: true, // Print removed selectors and processed file names
      //develop: true, // Enable while using `gatsby develop`
     tailwind: true, // Enable tailwindcss support
      // whitelist: ['whitelist'], // Don't remove this selector
      // ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
      purgeOnly : ['/src/styles/tailwind-output.css'], // Purge only these files/folders
    }
  },
  "gatsby-plugin-webpack-bundle-analyser-v2",
  'gatsby-plugin-loadable-components-ssr',
  {
    resolve: `gatsby-plugin-algolia-search`,
    options: {
      appId: process.env.ALGOLIA_APP_ID,
      apiKey: process.env.ALGOLIA_ADMIN_KEY,
      indexName: 'posts', // for all queries
      queries,
      enablePartialUpdates: true
    }
  },

];


if (activeEnv === 'production') {
  

  plugins.push(
/*     {
      resolve: `gatsby-plugin-algolia-search`,
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        indexName: 'posts', // for all queries
        queries,
        enablePartialUpdates: true
      }, }*/
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: process.env.GTM_TAG||"GTM-WCW8RR4", 
        includeInDevelopment: false,
        gtmLocale: process.env.LOCALE,
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap'
    }
  )

  if(process.env.LANG_CODE==="en" || process.env.NO_FOLLOW==="true"){
    plugins.push({
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: process.env.SITE_URL,
        sitemap: `${process.env.SITE_URL}/sitemap.xml`,
        output:'/robots.txt',
        env: {
          development: {
            policy: [{ userAgent: '*', disallow: ['/'] }]
          },
          production: {
            policy: [{ userAgent: '*', disallow: ['/'] }]
          }
        }
      }
    })
  }

}

module.exports = {
  siteMetadata: {
    title: process.env.TITLE,
    description: '',
    siteUrl: process.env.SITE_URL,
    author: 'By Brunstad Christian Church',
    language: `${process.env.LOCALE}`.replace('_','-')
  },
  plugins
}

