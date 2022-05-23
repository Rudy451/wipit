const methods = {

  createUser: async (newUser) => {
    const result = await fetch("http://localhost:3456/register", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
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
      credentials: "include",
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });
    return result.json();
  },

  logOutUser: async () => {
    const result = await fetch("http://localhost:3456/logout", {
      method: "GET",
      credentials: "include",
      headers: { "Content-type": "application/json" },
    });
    return result.json();
  },

  createCollection: async (wipCollectionName, profileId) => {
    const result = await fetch("http://localhost:3456/wipcollections", {
      method: "POST",
      credentials: "include",
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
      credentials: "include",
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

  getWipCollectionByUser: async () => {
    const result = await fetch("http://localhost:3456/userwipcollections", {
      method: "GET",
      credentials: "include",
      headers: { "Content-type": "application/json" },
    });
    return result.json();
  },

  addWip: async (wip_title, update_request, update_request_date) => {
    const response = await fetch("http://localhost:3456/wips", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        wip_title: wip_title,
        update_request: update_request,
        update_request_date: update_request_date,
      }),
    }).then((response) => response.json());
    return response;
  },

  // Fix file
  addFollower: async (followeeId) => {
    const response = await fetch(`http://localhost:3456/follower`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        followeeId: followeeId,
      }),
    }).then((response) => response.json());
    return response;
  },

  getFollowers: async () => {
    const response = await fetch(`http://localhost:3456/followers`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-type": "application/json" },
    }).then((response) => response.json());
    return response;
  },

  getFollowees: async () => {
    const response = await fetch(`http://localhost:3456/followees`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-type": "application/json" },
    }).then((response) => response.json());
    return response;
  }

};

module.exports = methods;
