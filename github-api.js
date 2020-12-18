const fetch = require("node-fetch");

// Return a list of login of login's followers that followed login
async function getReFollower(login) {
  const authObj = {
    headers: {
      Authorization: "token 7f6831a6cf06cfcb4fc1f436b59ffae465d04462",
    },
  };

  const followers = await fetch(
    `https://api.github.com/users/${login}/followers`,
    authObj
  )
    .then((res) => (result = res.json()))
    .catch((err) => {
      console.log(err);
    });

  let reFollowers = [];
  await Promise.all(
    followers.map(async (entry) =>
      fetch(entry.followers_url, authObj)
        .then((res) => res.json())
        .then((res) =>
          res.forEach((followed) => {
            if (followed.login === login) {
              reFollowers.push(entry.login);
            }
          })
        )
        .catch((err) => {
          console.log(entry);
          console.log(err);
        })
    )
  );

  console.log(reFollowers);
  return reFollowers;
}

console.log(getReFollower("dabreadman"));
