const express = require('express');
const conn = require('../dao/conn');
const crypto = require('crypto');

const router = express.Router(); // 获得路由对象

// express支持restful api规范
// 定义了很多http动词
// get post put delete

// router.route('/')
//     .get((req, res, next) => {
//         console.log(req.query);
//         res.json({ 'method': 'get' });
//     })
//     .post((req, res, next) => {
//         console.log(req.body);
//         res.json({ 'method': 'post' });
//     });

router.route('/reg')
    .post((req, res, next) => {
        // 判断用户名是否存在
        let searchUser = `select * from users where username='${req.body.username}'`;
        conn.query(searchUser, (err, results) => {
            if (err) console.log(err);
            if (results.length) {
                res.json({ msg: '用户名已存在', username: req.body.username, error: 1 });
            } else {
                let md5 = crypto.createHash('md5'); // 创建一个哈希加密
                let passResult = md5.update(req.body.password).digest('hex'); // 加密内容获得16进制结果

                let sql = `insert into users(username, password,phone) values('${req.body.username}','${passResult}','${req.body.phone}')`;


                conn.query(sql, (err, result) => {
                    if (err) console.log(err);
                    if (result.insertId) {
                        res.cookie('username', req.body.username);
                        res.cookie('isLogined', true);
                        res.json({
                            msg: "注册成功",
                            username: req.body.username,
                            error: 0
                        });
                    }
                });
            }
        });




    });

router.route('/login')
    .post((req, res, next) => {
        console.log(req.cookies);
        // 判断用户名是否存在
        let passResult = md5.update(req.body.password).digest('hex'); // 加密内容获得16进制结果
        let searchUser = `select * from users where username='${req.body.username}' and password='${passResult}'`;
        conn.query(searchUser, (err, results) => {
            if (err) console.log(err);
            if (results.length) {

                //req.body.password是加密过一次的密码
                // let searchPas = `select * from users where password='${passResult}'`;

                //？？？？？？？？？？？条件应该怎么写（还有如何跳转到首页（和注册页注册成功后如何跳转到登录页

                // if (results.length) {
                conn.query(searchPas, (err, result) => {
                    if (err) console.log(err);
                    if (result.insertId) {
                        res.cookie('username', req.body.username);
                        res.cookie('password', req.body.password);
                        res.cookie('isLogined', true);
                        res.json({
                            msg: "登录成功",
                            username: req.body.username,
                            error: 0
                        });
                    }
                });
                // } else {
                //     res.json({ msg: '密码错误', password: req.body.password, error: 2 });
                // }


            } else {
                res.json({ msg: '未找到该用户', username: req.body.username, error: 1 });
            }
        });
    });

module.exports = router; // 路由导出