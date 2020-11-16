const _ = require('lodash')
const path = require('path')
const formatTemplate= 'src/templates/recommend/format-recommend.tsx'
const {formatScope} = require('./hjelper')

module.exports = async function generateFormat(data) {
    const {actions, graphql,contextPosts,subTopics,node:format,nodeInfo,breadcrumb}=data
    const { createPage } = actions
    const formatType={
        info:nodeInfo,
        items:[]
    }
    console.log(format.slug)
    createPage({
        path:format.slug,
        component:path.resolve(formatTemplate),
        context: {
          id:format.id,
          title:format.name,
          formatType,
          breadcrumb,
          ...contextPosts
        },
      })
}
