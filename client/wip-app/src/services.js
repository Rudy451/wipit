const methods = {

  createUser: async (newUser) => {
    const result = await fetch("http://localhost:3456/register", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        type: newUser.type,
      }),
    });
    return result.json();
  },

  getUser: async (user) => {
    const result = await fetch("http://localhost:3456/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });
    return result.json();
  },

  logOutUser: async (profileId) => {
    const result = await fetch("http://localhost:3456/logout", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        profileId: profileId
      }),
    });
    return result.json();
  },

  createCollection: async (wipCollectionName, profileId) => {
    const result = await fetch("http://localhost:3456/wipcollections", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        title: wipCollectionName,
        profileId: profileId,
      }),
    });
    return result.json();
  },

  createWip: async (wip) => {
    const result = await fetch("http://localhost:3456/wip", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        wipTitle: wip.wipTitle,
        wipImage: wip.wipImage,
        wipCollectionId: wip.wipCollectionId,
      }),
    });
    return result.json();
  },

  getWipCollections: async () => {
    const result = await fetch("http://localhost:3456/wipCollections");
    return result.json();
  },

  getWipCollectionByUser: async (profileId) => {
    const result = await fetch("http://localhost:3456/userwipcollections", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        profileId: profileId,
      }),
    });
    return result.json();
  },

  addWip: async (wip_title, update_request, update_request_date) => {
    const response = await fetch("http://localhost:3456/wips", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        wip_title: wip_title,
        update_request: update_request,
        update_request_date: update_request_date,
      }),
    }).then((response) => response.json());
    return response;
  },

  addCard: async (
    wipId,
    img_url,
    upload_date,
    seen_by_state,
    seen_by_user,
    seen_by_date
  ) => {
    const response = await fetch(`http://localhost:3456/wips/${wipId}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        img_url: img_url,
        upload_date: upload_date,
        seen_by_state: seen_by_state,
        seen_by_user: seen_by_user,
        seen_by_date: seen_by_date,
      }),
    }).then((response) => response.json());
    return response;
  },

  addFollower: async (followeeId, profileId) => {
    const response = await fetch(`http://localhost:3456/follower`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        followeeId: followeeId,
        profileId: profileId,
      }),
    }).then((response) => response.json());
    return response;
  },

  getFollowers: async (profileId) => {
    const response = await fetch(`http://localhost:3456/followers`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        profileId: profileId,
      }),
    }).then((response) => response.json());
    return response;
  },

  getFollowees: async (profileId) => {
    const response = await fetch(`http://localhost:3456/wips/followees`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        profileId: profileId,
      }),
    }).then((response) => response.json());
    return response;
  }

};

module.exports = methods;
