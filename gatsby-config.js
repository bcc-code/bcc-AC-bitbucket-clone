const activeEnv = process.env.ACTIVE_ENV || process.env.NODE_ENV || "staging"
const endpoints = require('./src/strings/static/endpoints')
const  {getIndexPostQuery} = require('gatsby-source-ac/helpers')
/* const generateFeed = require('./generators/Other/generateFeed') */
console.log(activeEnv)
require("dotenv").config({
  path: `.env.${activeEnv}`,
})



const targetAddress = activeEnv === 'production' ? new URL(process.env.SITE_URL) : process.env.SITE_URL;

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
 /*  {
    resolve: `gatsby-plugin-nprogress`,
    showSpinner: true,
  } */
  { 
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
  'gatsby-plugin-loadable-components-ssr'
];

if (activeEnv === 'production') {
  

  plugins.push(
    {
      resolve: `gatsby-plugin-s3`,
      options: {
          bucketName: process.env.S3_BUCKET_NAME,
          region: process.env.S3_BUCKET_REGION,
          protocol: targetAddress.protocol.slice(0, -1),
          hostname: targetAddress.hostname,
          acl: null,
          params: {
              // In case you want to add any custom content types: https://github.com/jariz/gatsby-plugin-s3/blob/master/recipes/custom-content-type.md
          },
          generateRoutingRules: false,
          generateRedirectObjectsForPermanentRedirects: true,
          enableS3StaticWebsiteHosting: false,
      },
    },
    {
      resolve: `gatsby-plugin-algolia-search`,
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        indexName: 'posts', // for all queries
        queries: ()=>{return getIndexPostQuery(endpoints.api_url)},
        enablePartialUpdates: true
      }
    }, 
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/other-pages.xml`,
        createLinkInHead: true,
        query: `{
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage {
            nodes {
              path
              context {
                type
                updated_at
              }
            }
          }
        }`,
        serialize: ({ allSitePage }) =>
          allSitePage.nodes
          .filter((node)=>{
            console.log(node.context.type)
            return node.context.type!=="post"
          }).map((node) => {
            return node.context.updated_at? ({
              url: `${process.env.SITE_URL}${node.path}`,
              lastmodISO: `${node.context.updated_at}`,
            }):({
              url: `${process.env.SITE_URL}${node.path}`,
            });
          }),
      },
    }, 
    {
      resolve: `gatsby-plugin-advanced-sitemap`,
      options: {
        // 1 query for each data type
       query: `{
        site {
          siteMetadata {
            siteUrl
          }
        }
        allSitePage {
          edges {
            node {
              id
              slug:path
              context {
                type
                updated_at
              }
            }
          }
        }
        posts:allSitePage {
          edges {
            node {
              id
              slug:path
              context {
                type
                updated_at
                normalized {
                  image {
                      src
                  }
                }
              }
            }
          }
        }
        }`,
        mapping: {
          posts:{
            sitemap: `posts`,
            serializer: (nodes) => {
              return nodes
                .filter(({node}) => {
                  let toReturn = false
                  const { context} = node
                  if(!!context){
                    toReturn=context.type==="post"
                  }
                  return toReturn
                })
                .map(({node}) => {
                    const {slug, context }=node
                    return ({
                      node:{
                        ...node,
                        slug,
                        updated_at:context.updated_at,
                        feature_image:context.normalized.image.src
                      }
                    })
                })
            }
          }
        },
        additionalSitemaps: [ // optional: add additional sitemaps, which are e. g. generated somewhere else, but need to be indexed for this domain
          {
              name: `other-pages`,
              url: `/other-pages.xml`,
          },
      ],
      }
    },
    {
      resolve:'gatsby-plugin-preact'
    } 
  )

  if( process.env.NO_FOLLOW==="true"){
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

