const _ = require('lodash')
const path = require('path')
const ac_strings=require('../src/strings/ac_strings.json')

/* SETUP */

const query = `{
  ac {
    allPages {
      id
      title
      slug
      label
    }

    resource:page(id:${process.env.RESOURCE_PAGE_ID}){
      title
      slug
    }

    topicMain:page(id:${process.env.TOPICS_PAGE_ID}){
      title
      slug
    }
  }
}`

const pagesContext = {

  "podcast":{
    context: {
      id:process.env.PODCAST_FILTER_ID
    }
  }
}

/* BUILDER */

module.exports = function generatePages(actions, graphql) {
  const { createPage } = actions
  const themePages=[]
  return graphql(query).then(result=>{
    if (result.errors){
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    } else {
      const pageInfo = result.data.ac.allPages
      const resourcePage = result.data.ac.resource
      const topicsMain= result.data.ac.topicMain
      const navTopItem={name:resourcePage.title,to:resourcePage.slug}
      const navTopicsItem={name:topicsMain.title,to:topicsMain.slug}
      createPage({
        path: `/`,
        component: path.resolve('./src/templates/page/home.tsx'),
      })

      _.each(pageInfo,(page)=>{
        if (page && page.label==="theme-page"){
          themePages.push(page)
        }else if (page && page.label.indexOf("build-") >-1){
          const templateName=page.label.replace("build-","")
          let context = {
            title:page.title,
              breadcrumb:[navTopItem,{name:page.title,to:page.slug}]
          }

          if (pagesContext[page.label]){
            const pageContext = pagesContext[page.label]
            if (pageContext.context){
              context = {...context,...pageContext.context}
            }
            
          }


          createPage({
            path: `${page.slug}`,
            component: path.resolve(`./src/templates/page/${templateName}.tsx`),
            context,
          })
        } else {
          console.log(page)
        }
      })

      createPage({
        path: `${topicsMain.slug}`,
        component: path.resolve(`./src/templates/page/topics.tsx`),
        context:{
          title:topicsMain.title,
          id:topicsMain.id,
          themes:themePages,
          breadcrumb:[
            navTopItem,
            navTopicsItem
          ]
        },
      })
      
      _.each(themePages,page=>{
        const themePagePath=`${ac_strings.slug_theme}/${page.slug}`

        createPage({
          path: themePagePath,
          component: path.resolve(`./src/templates/page/theme-page.tsx`),
          context:{
            title:page.title,
            id:page.id,
            breadcrumb:[
              navTopItem,
              navTopicsItem,
              {
                name:page.title,
                slug:themePagePath
              }
            ]
          },
        })

      })
    }
  })

}

