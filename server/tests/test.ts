import {redisClient, app, nodejsPort} from '../index';
import supertest from 'supertest';
import {newDb} from 'pg-mem';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

let server:any;
let superTestRequest:any;
let cookie:any;
const db = newDb();

beforeAll(async () => {
  await redisClient.connect();
  server = app.listen(nodejsPort, () => {});
  superTestRequest = supertest(server);
});

afterAll(async () => {
  await server.close();
  await redisClient.quit();
  redisClient.disconnect();
})

describe("POST API Calls", () => {

  let backup:any;

  beforeAll(() => {
    db.public.none(fs.readFileSync('./tests/Wips.sql', 'utf-8'));
    backup = db.backup();
  });

  afterEach(() => {
    backup.restore();
  })

  test("Register New User", () => {
    let login_id = uuidv4();
    let profile_id = uuidv4();
    db.public.none(`
      insert into "Profile" ("profileId", name, type, "createdAt", "updatedAt") values('${profile_id}', 'Tom', 'artist', '${new Date().toISOString()}', '${new Date().toISOString()}');
      insert into "Login" ("loginId", email, password, "profileId", "createdAt", "updatedAt") values('${login_id}', 'tripley@greenleaf.org', 'password4', '${profile_id}', '${new Date().toISOString()}', '${new Date().toISOString()}');
    `);
  });

  test("Add Wip Collection", async () => {
    let wipCollection_id = uuidv4();
    db.public.none(`
      insert into "WipCollections" ("wipCollectionId", "wipCollectionTitle", "profileId", "createdAt", "updatedAt") values('${wipCollection_id}', 'Test Wip Collection Title', '62d8e030-34af-46ea-89b1-f6b6d3fa13b5', '${new Date().toISOString()}', '${new Date().toISOString()}');
    `);
  });

  test("Add Individual Wips", async () => {
    let wip_id = uuidv4();
    db.public.none(`
      insert into "Wips" ("wipId", "wipTitle", "wipImage", "uploadDate", "wipCollectionId", "createdAt", "updatedAt") values('${wip_id}', 'Test Wip Title', 'fake_image.jpeg', '${new Date().toISOString()}', 'c16709d5-b554-422a-a178-2c2ddea48854', '${new Date().toISOString()}', '${new Date().toISOString()}');
    `);
  });

  test("Add Follower", async () => {
    let follow_id = uuidv4();
    db.public.none(`
      insert into "Followers" ("followId", "profileId", "followerId", "createdAt", "updatedAt") values('${follow_id}', '62d8e030-34af-46ea-89b1-f6b6d3fa13b5', 'c6f37d52-5c4c-4baf-8fae-ba24ebf20f46', '${new Date().toISOString()}', '${new Date().toISOString()}');
    `);
  });

});

describe("GET API Calls", () => {

  beforeEach(async () => {
    await superTestRequest.post('/login').send({'email': 'dgreenleaf@greenleaf.org', 'password': 'password'}).then((result:any) => cookie = result.header['set-cookie'].pop().split(';')[0]);
  });

  test("Log in User", async () => {
    await superTestRequest.post('/login')
                          .send({'email': 'dgreenleaf@greenleaf.org', 'password': 'password'})
                          .set("Cookie", [cookie])
                          .then((result:any) => {
                            expect(result.status).toEqual(200);
                            expect(result.body).toHaveProperty('profileId');
                            expect(result.body).toHaveProperty('email');
                            expect(result.body).toHaveProperty('name');
                            expect(result.body).toHaveProperty('type');
                            expect(result.body.profileId).toEqual('92f5aaa1-254e-4688-84b0-049424718b4e');
                            expect(result.body.email).toEqual('dgreenleaf@greenleaf.org');
                            expect(result.body.name).toEqual('Dickie');
                            expect(result.body.type).toEqual('artist');
                          });

  });

  test("Log out User", async () => {
    await superTestRequest.get('/logout')
                          .set("Cookie", [cookie])
                          .then((result:any) => {
                            expect(result.status).toEqual(200);
                            expect(result.body).toEqual(true);
                          });
  });

  test("Get Wips By User", async () => {
    await superTestRequest.get('/userwipcollections')
                          .set("Cookie", [cookie])
                          .then((result:any) => {
                            expect(result.status).toEqual(200);
                            expect(result.body.length).toEqual(3);
                            expect(result.body[0]).toHaveProperty('wipCollectionTitle');
                            expect(result.body[0]['wipCollectionTitle']).toEqual('My Wip');
                            expect(result.body[0]).toHaveProperty('profileId');
                            expect(result.body[0]['profileId']).toEqual('92f5aaa1-254e-4688-84b0-049424718b4e');
                            expect(result.body[0]).toHaveProperty('Wips');
                            expect(result.body[0]['Wips'].length).toEqual(1);
                            expect(result.body[1]).toHaveProperty('wipCollectionTitle');
                            expect(result.body[1]['wipCollectionTitle']).toEqual('Mongibello');
                            expect(result.body[1]).toHaveProperty('profileId');
                            expect(result.body[1]['profileId']).toEqual('92f5aaa1-254e-4688-84b0-049424718b4e');
                            expect(result.body[1]).toHaveProperty('Wips');
                            expect(result.body[1]['Wips'].length).toEqual(0);
                            expect(result.body[2]).toHaveProperty('wipCollectionTitle');
                            expect(result.body[2]['wipCollectionTitle']).toEqual('Florence');
                            expect(result.body[2]).toHaveProperty('profileId');
                            expect(result.body[2]['profileId']).toEqual('92f5aaa1-254e-4688-84b0-049424718b4e');
                            expect(result.body[2]).toHaveProperty('Wips');
                            expect(result.body[2]['Wips'].length).toEqual(0);
                          });
  });

  test("Get All Wips", async() => {
    await superTestRequest.get('/wipcollections')
                          .set("Cookie", [cookie])
                          .then((result:any) => {
                            expect(result.status).toEqual(200);
                            expect(result.body.length).toEqual(9);
                            expect(result.body[0]).toHaveProperty('wipCollectionTitle');
                            expect(result.body[0]['wipCollectionTitle']).toEqual('Florence');
                            expect(result.body[0]).toHaveProperty('Profile');
                            expect(result.body[0]['Profile']).toHaveProperty('profileId');
                            expect(result.body[0]['Profile']['profileId']).toEqual('92f5aaa1-254e-4688-84b0-049424718b4e');
                            expect(result.body[0]['Profile']).toHaveProperty('name');
                            expect(result.body[0]['Profile']).toHaveProperty('type');
                            expect(result.body[0]).toHaveProperty('Wips');
                            expect(result.body[0]['Wips'].length).toEqual(0);
                            expect(result.body[1]).toHaveProperty('wipCollectionTitle');
                            expect(result.body[1]['wipCollectionTitle']).toEqual('Mongibello');
                            expect(result.body[1]).toHaveProperty('Profile');
                            expect(result.body[1]['Profile']).toHaveProperty('profileId');
                            expect(result.body[1]['Profile']['profileId']).toEqual('92f5aaa1-254e-4688-84b0-049424718b4e');
                            expect(result.body[1]['Profile']).toHaveProperty('name');
                            expect(result.body[1]['Profile']).toHaveProperty('type');
                            expect(result.body[1]).toHaveProperty('Wips');
                            expect(result.body[1]['Wips'].length).toEqual(0);
                            expect(result.body[3]).toHaveProperty('wipCollectionTitle');
                            expect(result.body[3]['wipCollectionTitle']).toEqual('Rome');
                            expect(result.body[3]).toHaveProperty('Profile');
                            expect(result.body[3]['Profile']).toHaveProperty('profileId');
                            expect(result.body[3]['Profile']['profileId']).toEqual('62d8e030-34af-46ea-89b1-f6b6d3fa13b5');
                            expect(result.body[3]['Profile']).toHaveProperty('name');
                            expect(result.body[3]['Profile']).toHaveProperty('type');
                            expect(result.body[3]).toHaveProperty('Wips');
                            expect(result.body[3]['Wips'].length).toEqual(0);
                          });
  });

  test("Get Followers", async () => {
    await superTestRequest.get('/followers')
                          .set("Cookie", [cookie])
                          .then((result:any) => {
                            expect(result.status).toEqual(200);
                            expect(result.body.length).toEqual(1);
                            expect(result.body[0]).toHaveProperty("followId");
                            expect(result.body[0]["followId"]).toEqual("678721db-eaaf-47f8-a933-4b7f495ba787");
                            expect(result.body[0]).toHaveProperty("profileId");
                            expect(result.body[0]["profileId"]).toEqual("92f5aaa1-254e-4688-84b0-049424718b4e");
                            expect(result.body[0]).toHaveProperty("followerId");
                            expect(result.body[0]["followerId"]).toEqual("62d8e030-34af-46ea-89b1-f6b6d3fa13b5");
                            expect(result.body[0]).toHaveProperty("follower");
                            expect(result.body[0]["follower"]).toHaveProperty("profileId");
                            expect(result.body[0]["follower"]["profileId"]).toEqual("62d8e030-34af-46ea-89b1-f6b6d3fa13b5");
                            expect(result.body[0]["follower"]).toHaveProperty("name");
                            expect(result.body[0]["follower"]["name"]).toEqual("Freddie");
                            expect(result.body[0]["follower"]).toHaveProperty("type");
                            expect(result.body[0]["follower"]["type"]).toEqual("artist");
                          });
  });
});

describe("Separate API Testing for Followees", () => {
  beforeEach(async () => {
    await superTestRequest.post('/login').send({'email': 'freddie@greenleaf.org', 'password': 'password3'}).then((result:any) => cookie = result.header['set-cookie'].pop().split(';')[0]);
  });

  afterEach(async () => {
    await superTestRequest.get('/logout').set("Cookie", [cookie]);
  });

  test("Get Followees", async () => {
    await superTestRequest.get('/followees')
                          .set("Cookie", [cookie])
                          .then((result:any) => {
                            expect(result.status).toEqual(200);
                            expect(result.body.length).toEqual(1);
                            expect(result.body[0]).toHaveProperty("followId");
                            expect(result.body[0]["followId"]).toEqual("678721db-eaaf-47f8-a933-4b7f495ba787");
                            expect(result.body[0]).toHaveProperty("profileId");
                            expect(result.body[0]["profileId"]).toEqual("92f5aaa1-254e-4688-84b0-049424718b4e");
                            expect(result.body[0]).toHaveProperty("followerId");
                            expect(result.body[0]["followerId"]).toEqual("62d8e030-34af-46ea-89b1-f6b6d3fa13b5");
                            expect(result.body[0]).toHaveProperty("profile");
                            expect(result.body[0]["profile"]).toHaveProperty("profileId");
                            expect(result.body[0]["profile"]["profileId"]).toEqual("92f5aaa1-254e-4688-84b0-049424718b4e");
                            expect(result.body[0]["profile"]).toHaveProperty("name");
                            expect(result.body[0]["profile"]["name"]).toEqual("Dickie");
                            expect(result.body[0]["profile"]).toHaveProperty("type");
                            expect(result.body[0]["profile"]["type"]).toEqual("artist");
                          });
  });
});

export {db};
