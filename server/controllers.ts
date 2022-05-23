import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt, { genSaltSync } from 'bcrypt';
import assert from 'assert';
import { Sequelize } from '@sequelize/core';

import db from './models/index';

exports.registerUser = async (req: express.Request, res: express.Response) => {
  try {
    const { name, email, password, type } = req.body;
    assert(email.length > 0);
    const myUser = await db.Login.findOne({ where: { email: email } });
    assert(myUser === null);
    assert(name.length() > 0 && name.length < 30);
    assert(password.length() > 0 && password.length < 50);
    assert(type == "artist" || type == "gallerist");
    const saltRounds = 12;
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) err;
      bcrypt.hash(password, salt, async () => {
        const userId:any = uuidv4();
        const profileId:any = uuidv4();
        await db.Login.create({
          loginId: userId,
          email: email,
          password: password,
          profileId:
          await db.Profile.create({
            profileId: profileId,
            name: name,
            type: type
          }).then(result => result.profileId),
        });
        req.session.profileId = profileId;
        req.session.email = email;
        req.session.name = name;
        req.session.type = type;
        res.send({
          'profileId': req.session.profileId,
          'email': req.session.email,
          'name': req.session.name,
          'type': req.session.type
        });
        res.status(200);
      })
    })
  } catch (e) {
    console.log(e);
    console.error('failed registration');
    res.send(undefined);
    res.status(400);
  }
}

exports.loginUser = async (req: express.Request, res: express.Response) => {
  try {
    if(req.session.email == undefined) {
      const { email, password } = req.body;
      const result:any = await db.Login.findOne({
        where: { email: email},
        include: [
          {
            model: db.Profile,
            attributes: []
          }
        ],
        attributes: [
          'profileId',
          'email',
          'password',
          [Sequelize.col('Profile.name'), 'name'],
          [Sequelize.col('Profile.type'), 'type']
        ]
      });
      assert(result !== null);
      assert(bcrypt.compareSync(password, result["password"]));
      req.session.profileId = result.dataValues["profileId"];
      req.session.email = email;
      req.session.name = result.dataValues["name"];
      req.session.type = result.dataValues["type"];
    }
    res.send({
      'profileId': req.session.profileId,
      'email': req.session.email,
      'name': req.session.name,
      'type': req.session.type
    });
    res.status(200);
  } catch (e) {
    console.log(e);
    console.error('failed login');
    res.send(undefined);
    res.status(401);
  }
}

exports.logoutUser = async (req: express.Request, res: express.Response) => {
  try {
    req.session.destroy((err:any) => {
      if(err){
        // Comment out during testing....
        //console.log("Error: ", err);
      }
    });
    res.send(true);
    res.status(200);
    } catch (e) {
      console.log(e);
      console.error('failed login');
      res.send(false);
      res.status(401);
    }
}

exports.addWip = async (req: express.Request, res: express.Response) => {
  try {
    const wipId = uuidv4();
    const post = await db.Wips.create({
      wipId: wipId,
      wipTitle: req.body.wipTitle,
      wipImage: req.body.wipImage,
      uploadDate: Date.now().toString(),
      wipCollectionId: req.body.wipCollectionId
    });
    res.send(post);
    res.status(200);
  } catch (e) {
    console.log(e);
    console.error('addWip is failing');
    res.status(500);
    res.end();
  }
}

exports.addWipCollection = async (req: express.Request, res: express.Response) => {
  try {
    assert(req.session.profileId);
    const wipCollectionId = uuidv4();
    const result = await db.WipCollections.create({
      wipCollectionId: wipCollectionId,
      wipCollectionTitle: req.body.title,
      profileId: req.session.profileId.toString()
    });
    res.send(result);
    res.status(201);
  } catch (e) {
    console.log(e);
    console.error('addWipCollection is failing');
    res.status(500);
    res.end();
  }
}

exports.getWipCollection = async (req: express.Request, res: express.Response) => {
  try {
    const results = await db.WipCollections.findAll({
      attributes: ['wipCollectionTitle'],
      include: [
        {
          model: db.Profile,
          required: false
        },
        {
          model: db.Wips,
          required: false,
          order: [['uploadDate', 'desc']]
        }
      ]
    });
    res.send(results);
    res.status(200);
  } catch (e) {
    console.log(e);
    console.error('getWipCollections is failing');
    res.status(500);
    res.end();
  }
}

exports.getWipCollectionByUser = async (req: express.Request, res: express.Response) => {
  try {
    assert(req.session.profileId);
    const results = await db.WipCollections.findAll({
      where: { profileId: req.session.profileId },
      attributes: ['wipCollectionTitle', 'profileId'],
      include: [
        {
          model: db.Wips,
          required: false,
          order: [['uploadDate', 'desc']]
        }
      ]
    });
    res.send(results);
    res.status(200);
  } catch (e) {
    console.log(e);
    console.error('getWipCollections is failing');
    res.status(500);
    res.end();
  }
}

exports.addFollower = async (req: express.Request, res: express.Response) => {
  console.log(req.session);
  try {
    assert(req.session.profileId);
    const follow = await db.Followers.create({
      followId: uuidv4(),
      profileId: req.body.followeeId,
      followerId: req.session.profileId.toString(),
    });
    res.status(200);
    res.send(follow);
  } catch (e) {
    console.log(e);
    console.error('addFollower is failing');
    res.status(401);
    res.end();
  }
}

exports.getFollowers = async (req: express.Request, res: express.Response) => {
  console.log(req.session);
  try {
    const followers = await db.Followers.findAll({
      where: { profileId: req.session.profileId },
      include: [
        {
          model: db.Profile,
          as: 'follower',
          required: false,
          order: [['createdAt', 'desc']]
        }
      ]
    });
    res.status(200);
    res.send(followers);
  } catch (e) {
    console.log(e);
    console.error('addFollower is failing');
    res.status(401);
    res.end();
  }
}

exports.getFollowees = async (req: express.Request, res: express.Response) => {
  try {
    const followees = await db.Followers.findAll({
      where: { followerId: req.session.profileId },
      include: [
        {
          model: db.Profile,
          as: 'profile',
          required: false,
          order: [['createdAt', 'desc']]
        }
      ]
    });
    res.status(200);
    res.send(followees);
  } catch (e) {
    console.log(e);
    console.error('addFollower is failing');
    res.status(401);
    res.end();
  }
}
