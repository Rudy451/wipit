
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import assert from 'assert';
import { Sequelize } from '@sequelize/core';

import db from './models/index';

exports.registerUser = async (req: express.Request, res: express.Response) => {
  try {
    const { name, email, password, type } = req.body;
    const myUser = await db.Login.findOne({ where: { email: email } });
    assert(myUser === null);
    const saltRounds = 12;
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) err;
      bcrypt.hash(password, salt, async () => {
        const userId = uuidv4();
        const profileId = uuidv4();
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
          sessionId: req.sessionID
        });
        res.send({ profileId: profileId, name: name, email: email, type: type });
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
    const { email, password } = req.body;
    const result = await db.Login.findOne({
      where: { email: email, password: password },
      include: [
        {
          model: db.Profile,
          attributes: []
        }
      ],
      attributes: [
        'profileId',
        'email',
        [Sequelize.col('Profile.name'), 'name'],
        [Sequelize.col('Profile.type'), 'type']
      ]
    });
    assert(result !== null);
    db.Login.update(
      {
        sessionId: req.sessionID
      },
      {
        where: {profileId: result.profileId}
      }
    );
    res.send(result);
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
    db.Login.update(
      {
        sessionId: '00000000-0000-0000-0000-000000000000'
      },
      {
        where: {profileId: req.body.profileId}
      }
    );
    res.send(true);
    res.status(200);
    } catch (e) {
      console.log(e);
      console.error('failed login');
      res.send(false);
      res.status(401);
    }
}

exports.addWipCollection = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const wipCollectionId = uuidv4();
    const post = await db.WipCollections.create({
      wipCollectionId: wipCollectionId,
      wipCollectionTitle: req.body.title,
      profileId: req.body.profileId
    });
    res.send(post);
    res.status(201);
  } catch (e) {
    console.log(e);
    console.error('addWipCollection is failing');
    res.status(500);
    res.end();
  }
}

exports.getWipCollection = async (
  req: express.Request,
  res: express.Response
) => {
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

exports.getWipCollectionByUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const results = await db.WipCollections.findAll({
      where: { profileId: req.body.profileId },
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

exports.addFollower = async (req: express.Request, res: express.Response) => {
  try {
    const follow = await db.Followers.create({
      followId: uuidv4(),
      profileId: req.body.followeeId,
      followerId: req.body.profileId,
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
  try {
    const followers = await db.Followers.findAll({
      where: { profileId: req.body.profileId },
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
      where: { followerId: req.body.profileId },
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
