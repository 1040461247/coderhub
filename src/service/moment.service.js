const connection = require('../app/database')

class MomentService {
  async create(userId, content) {
    const statement = `INSERT INTO moment (user_id, content) VALUES (?,?);`
    const [res] = await connection.execute(statement, [userId, content])
    return res
  }

  async getMomentById(momentId) {
    const statement = `
      SELECT
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) user,
        (SELECT COUNT(*) FROM comment WHERE moment_id = m.id ) commentCount,
        (SELECT COUNT(*) FROM moment_label WHERE moment_id = m.id ) labelCount,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/', file.fi lename)) FROM file WHERE m.id = file.moment_id) images
      FROM moment m
      LEFT JOIN users u ON m.user_id = u.id
      WHERE m.id = ?;
    `
    const [res] = await connection.execute(statement, [momentId])
    return res
  }

  async getMomentList(offset, size) {
    const statement = `
    SELECT
      m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
      JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) user,
      (SELECT COUNT(*) FROM comment WHERE moment_id = m.id ) commentCount,
      (SELECT COUNT(*) FROM moment_label WHERE moment_id = m.id ) labelCount,
      (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/', file.filename)) FROM file WHERE m.id = file.moment_id) images
    FROM moment m
    LEFT JOIN users u ON m.user_id = u.id
    LIMIT ?,?;
    `
    const [res] = await connection.execute(statement, [offset, size])
    return res
  }

  async updateMomentById(momentId, content) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`
    
    const [res] = await connection.execute(statement, [content, momentId])
    return res
  }

  async deleteMomentById(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?;`
    const [res] = await connection.execute(statement, [momentId])
    return res
  }

  async addLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?,?);`
    const [res] = await connection.execute(statement, [momentId, labelId])
    return res
  }

  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`
    const [res] = await connection.execute(statement, [momentId, labelId])
    return res[0]
  }

  async getFileByFilename(filename) {
    const statement = `SELECT * FROM file WHERE filename = ?;`
    const [res] = await connection.execute(statement, [filename])
    return res
  }
}

module.exports = new MomentService()
