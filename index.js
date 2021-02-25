const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

// ROUTES //

// create a post

app.post("/post", async (req, res) => {
  try {
    const { title, content } = req.body;
    const date = new Date();
    let now = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    const newPost = await pool.query(
      `INSERT INTO "public"."POST" ("Title", "Content", "Date") VALUES ($1, $2, $3) RETURNING *`,
      [title, content, now]
    );
    res.json(newPost.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all posts

app.get("/post", async (req, res) => {
  try {
    const allPosts = await pool.query(
      `SELECT "PostID", "Title", "Date" FROM "public"."POST" ORDER BY "Date" DESC`
    );
    res.json(allPosts.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a post

app.get("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await pool.query(
      `SELECT * FROM "public"."POST" WHERE "PostID"=$1`,
      [id]
    );

    res.json(post.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Update a post

app.put("/post/:id", async (req, res) => {
  const date = new Date();
  let now = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatePost = await pool.query(
      `UPDATE "public"."POST" SET "Title"=$1, "Content"=$2, "Date"=$3 WHERE "PostID"=$4`,
      [title, content, now, id]
    );
    res.json("Post updated!");
  } catch (err) {
    console.error(err.message);
  }
});

// delete post

app.delete("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletePost = await pool.query(
      `DELETE FROM "public"."POST" WHERE "PostID"=$1`,
      [id]
    );
    res.json("Post was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getProfile = await pool.query(
      `SELECT * FROM "public"."USER" WHERE "UserID"=$1`,
      [id]
    );
    res.json("Post was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/profile", async (req, res) => {
  try {
    const { username, desc, type, phoneNumber, email, password } = req.body;
    const newUser = await pool.query(
      `INSERT INTO "public"."USER" ("UserName", "Desc", "Type", "PhoneNumber", "Email", "Password")
      VALUES ($1, $2, $3) RETURNING *`,
      [username, desc, type, phoneNumber, email, password]
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

app.put("/profile/:id", async (req, res) => {
  try {
    const { username, desc, type, phoneNumber } = req.params;
    const { title, content } = req.body;
    const updatePost = await pool.query(
      `UPDATE "public"."POST" SET "Title"=$1, "Content"=$2, "Date"=$3 WHERE "PostID"=$4`,
      [title, content, now, id]
    );
    res.json("Post updated!");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started at 5000 port");
});
