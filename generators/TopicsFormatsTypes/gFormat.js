const _ = require('lodash')
const path = require('path')
const formatTemplate= 'src/templates/recommend/format-recommend.tsx'


module.exports = async function generateFormat(data) {
    const {actions, contextPosts,node:format,nodeInfo,breadcrumb}=data
    const { createPage } = actions
    const formatType={
        info:nodeInfo,
        items:[]
    }
    console.log(format.slug)
    const today=new Date()
    createPage({
        path:format.slug,
        component:path.resolve(formatTemplate),
        context: {
          pageType:"topic",
          updated_at:today.toDateString(),
          id:format.id,
          title:format.name,
          image:format.image,
          formatType,
          breadcrumb,
          ...contextPosts
        },
      })
}
