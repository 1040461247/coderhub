const labelService = require('../service/label.service')

async function verifyLabelExists(ctx, next) {
  const { labels } = ctx.request.body
  const labelList = []

  for (const name of labels) {
    const [labelRes] = await labelService.queryByName(name)
    const labelItem = { name }

    if (labelRes) {
      labelItem.id = labelRes.id
    } else {
      const insertRes = await labelService.create(name)
      labelItem.id = insertRes.insertId
    }

    labelList.push(labelItem)
  }

  ctx.labels = labelList

  next()
}

module.exports = {
  verifyLabelExists
}
