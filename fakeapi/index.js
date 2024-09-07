const express = require('express')
const app = express()
const port = 3000

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.get('/routes', (req, res) => {
    res.json([
        {path: 'xxxx'},
        {path: 'xxxx'},

        {path: 'yyyyy', category: 'fdsfdf'},

    ])
})

app.get('/posts/xxx', (req, res) => {
    res.json({
        content: 'dhjfsgfujyhdgfuyergfuyioebcureyhbcvjhedrsbfjhdsbgfjhegbfbjue\ndhjfsgfujyhdgfuyergfuyioebcureyhbcvjhedrsbfjhdsbgfjhegbfbjue\ndhjfsgfujyhdgfuyergfuyioebcureyhbcvjhedrsbfjhdsbgfjhegbfbjue\ndhjfsgfujyhdgfuyergfuyioebcureyhbcvjhedrsbfjhdsbgfjhegbfbjue\ndhjfsgfujyhdgfuyergfuyioebcureyhbcvjhedrsbfjhdsbgfjhegbfbjue\ndhjfsgfujyhdgfuyergfuyioebcureyhbcvjhedrsbfjhdsbgfjhegbfbjue\ndhjfsgfujyhdgfuyergfuyioebcureyhbcvjhedrsbfjhdsbgfjhegbfbjue\ndhjfsgfujyhdgfuyergfuyioebcureyhbcvjhedrsbfjhdsbgfjhegbfbjue\ndhjfsgfujyhdgfuyergfuyioebcureyhbcvjhedrsbfjhdsbgfjhegbfbjue\ndhjfsgfujyhdgfuyergfuyioebcureyhbcvjhedrsbfjhdsbgfjhegbfbjue\n'
    })
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})