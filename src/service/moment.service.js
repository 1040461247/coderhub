const connection = require('../app/database')

class MomentService {
  async create(content, userId) {
    const statement = 'INSERT INTO moment (content, user_id) VALUES (?, ?);'
    const [res] = await connection.execute(statement, [content, userId])
    return res
  }

  async queryList(offset, limit) {
    const statement = `
      SELECT 
        m.id id, m.content content, m.createAt createAt, m.updateAt updateAt,
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) author,
        (SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) commentCount,
        (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount
      FROM moment m
      LEFT JOIN user u ON u.id = m.user_id
      LIMIT ?, ?;
    `
    const [res] = await connection.execute(statement, [offset, limit])
    return res
  }

  async queryById(momentId) {
    const statement = `
      SELECT 
        m.id id, m.content content, m.createAt createAt, m.updateAt updateAt,
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) author,
        (
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', l.id,
              'name', l.name
            )
          )
        ) labels,
        (
          SELECT 
            JSON_ARRAYAGG(JSON_OBJECT(
              'id', c.id,
              'content', c.content,
              'commentId', c.comment_id,
              'user', JSON_OBJECT(
                'id', cu.id,
                'name', cu.name
              )
            ))
          FROM comment c
          LEFT JOIN user cu ON c.user_id = cu.id
          WHERE c.moment_id = m.id
        ) comments
      FROM moment m
      LEFT JOIN user u ON u.id = m.user_id
      LEFT JOIN moment_label ml ON ml.moment_id = m.id
      LEFT JOIN label l ON l.id = ml.label_id
      WHERE m.id = 9
      GROUP BY m.id;
    `
    const [res] = await connection.execute(statement, [momentId])
    return res[0]
  }

  async update(content, momentId) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`
    const [res] = await connection.execute(statement, [content, momentId])
    return res
  }

  async removeById(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?;`
    const [res] = await connection.execute(statement, [momentId])
    return res
  }

  async hasLabel(momentId, labelId) {
    const statement = `SELECT * from moment_label WHERE moment_id = ? AND label_id = ?;`
    const [res] = await connection.execute(statement, [momentId, labelId])
    return !!res.length
  }

  async addLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);`
    const [res] = await connection.execute(statement, [momentId, labelId])
    return res
  }
}

module.exports = new MomentService()
