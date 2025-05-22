const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json());

const newsPosts = [];

const generateId = (array) => {
    return array.length + 1;
};

// efault routing

app.post("/", (req, res) => {
    res.send({
        message: "Welcome to our News Blog API"
    });
});

// create News Post
app.post("/api/news/create", (req, res) => {
    const { title, content, author, datePublished } = req.body;

    if (!title || !content || !author || !datePublished) {
        return res.status(400).send({
            success: false,
            error: "All fields are required"
        });
    }

    const newPost = {
        id: generateId(newsPosts),
        title,
        content,
        author,
        datePublished
    };

    newsPosts.push(newPost);

    res.status(201).send({
        success: true,
        message: "News post created successfully",
        data: newPost
    });
});

// get All News Posts
app.get("/api/news/all", (req, res) => {
    res.status(200).send({
        success: true,
        message: "All news posts",
        data: newsPosts
    });
    // console.log(data)

});

// get News by ID
app.get("/api/news/:id", (req, res) => {
    const { id } = req.params;
    const post = newsPosts.find(n => n.id === parseInt(id));

    if (!post) {
        return res.status(404).send({
            success: false,
            message: "News post not found"
        });
    }

    res.status(200).send({
        success: true,
        data: post
    });
});

// Update News Post
app.put("/api/news/update/:id", (req, res) => {
    const { id } = req.params;
    const post = newsPosts.find(n => n.id === parseInt(id));

    if (!post) {
        return res.status(404).send({
            success: false,
            message: "News post not found"
        });
    }

    Object.assign(post, req.body);

    res.send({
        success: true,
        message: "News post updated",
        data: post
    });
});

// delete News Post
app.delete("/api/news/delete/:id", (req, res) => {
    const index = newsPosts.findIndex(n => n.id === parseInt(id));

    if (index === -1) {
        return res.status(404).send({
            success: false,
            message: "News post not found"
        });
    }

    const deleted = newsPosts.splice(index, 1);

    res.send({
        success: true,
        message: "News post deleted",
        data: deleted[0]
    });
});

// filter News by Author
app.get("/api/news/author", (req, res) => {
    const { name } = req.query;
    const result = newsPosts.filter(post => post.author?.toLowerCase() === name?.toLowerCase());

    res.status(result.length ? 200 : 404).send({
        success: !!result.length,
        message: result.length ? "Found" : "No news by this author",
        data: result
    });
});


app.listen(3000, () => {
    console.log("News Blog API running on http://127.0.0.1:3000");
});
