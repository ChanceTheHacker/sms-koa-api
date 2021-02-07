const { migrate } = require('postgres-migrations')

exports.run = async function (client) {
  const nodePath = process.env.NODE_PATH
  const dir = `${nodePath}/../migrations`
  return await migrate({client}, dir)
}