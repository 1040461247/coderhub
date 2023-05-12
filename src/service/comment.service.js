const connection  = require('../app/database')

class CommentService {
  async createComment(momentId, userId, content) {
    const statement = `INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?);`
    const [res] = await connection.execute(statement, [content, momentId, userId])
    return res
  }

  async createReply(momentId, userId, content, commentId) {
    const statement = `INSERT INTO comment (content, moment_id, user_id, comment_id) VALUES (?, ?, ?, ?);`
    const [res] = await connection.execute(statement, [content, momentId, userId, commentId])
    return res
  }
  
  async update(commentId, content) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?;`
    const [res] = await connection.execute(statement, [content, commentId])
    return res
  }

  async remove(commentId) {
    const statement = `DELETE FROM comment WHERE id = ?;`
    const [res] = await connection.execute(statement, [commentId])
    return res
  }

  async getCommentByMomentId(momentId) {
    const statement = `
      SELECT 
        c.id id, c.content content, 
        JSON_OBJECT('id', u.id, 'name', u.name) user
        FROM comment c 
      LEFT JOIN users u ON c.user_id = u.id
      WHERE c.moment_id = 1;
    `
    const [res] = await connection.execute(statement, [momentId])
    return res
  }
}

module.exports = new CommentService()
