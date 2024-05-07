const express = require("express");
const router = express.Router();
const User = require("../models/users");

// Insert user into database
router.post("/add", async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
        });

        await user.save();

        req.session.message = {
            type: 'success',
            message: 'User added successfully'
        };
        res.redirect("/");
    } catch (err) {
        res.status(500).json({ message: err.message, type: 'danger' });
    }
});

// Fetch all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find().exec();
        res.render('index', { tittle: "Home", users: users });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/users", (req, res) => {
    res.render("index", { tittle: "Add" });
});

router.get("/add", (req, res) => {
    res.render("addusers", { tittle: "Add Users" });
});

router.get("/contact", (req, res) => {
    res.render("contact", { tittle: "Contact" });
});

router.get("/about", (req, res) => {
    res.render("about", { tittle: "About" });
});

router.get("/edit/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).exec();
        
        if (!user) {
            return res.redirect("/");
        }

        res.render("edit_user", {
            tittle: "Edit User",
            user: user
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await User.findByIdAndUpdate(id, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
        }).exec();

        req.session.message = {
            type: 'success',
            message: 'User updated successfully'
        };
        res.redirect("/");
    } catch (err) {
        res.status(500).json({ message: err.message, type: 'danger' });
    }
});

router.get("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await User.findByIdAndDelete(id).exec();
        req.session.message = {
            type: 'success',
            message: 'User deleted successfully'
        };
        res.redirect("/");
    } catch (err) {
        res.status(500).json({ message: err.message, type: 'danger' });
    }
});

module.exports = router;
