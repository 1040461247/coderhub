const service = require('../service/label.service')

const verifyLabelExists = async (ctx, next) => {
  const { labels } = ctx.request.body
  const newLabels = []
  
  for (let name of labels) {
    const labelInfo = await service.getLabelByName(name)
    const label = { name }
    
    if (!labelInfo) {
      // 新建标签并获取标签id
      const { insertId } = await service.create(name)
      label.id = insertId
    } else {
      // 获取标签id
      label.id = labelInfo.id
    }
  
    newLabels.push(label)
  }

  ctx.labels = newLabels
  await next()
}

module.exports = {
  verifyLabelExists
}
