const db = require("../data/db-config.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db("users as u")
    .join('department as d', 'u.role', 'd.id')
    .select("u.id", "u.username", 'd.name as department')
    .orderBy("u.id");
}

function findBy(filter) {
  return db("users")
    .where(filter)
    .orderBy("id");
}

async function add(user) {
  try {
    const [id] = await db("users").insert(user, "id");

    return findById(id);
  } catch (error) {
    throw error;
  }
}

function findById(id) {
  return db("users").where({ id }).first();
}
