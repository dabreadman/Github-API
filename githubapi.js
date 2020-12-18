const fetch = require("node-fetch");
const { mainModule } = require("process");

async function getFollowerUrl(name) {
  const authObj = {
    headers: {
      Authorization: "token 7f6831a6cf06cfcb4fc1f436b59ffae465d04462",
    },
  };

  const followers = await fetch(
    `https://api.github.com/users/${name}/followers`,
    authObj
  )
    .then((res) => (result = res.json()))
    .catch((err) => {
      console.log(err);
    });

  let dualFollowing = [];
  await Promise.all(
    followers.map(async (entry) =>
      fetch(entry.followers_url, authObj)
        .then((res) => res.json())
        .then((res) =>
          res.forEach((followed) => {
            if (followed.login === name) {
              dualFollowing.push(entry.login);
            }
          })
        )
        .catch((err) => {
          console.log(entry);
          console.log(err);
        })
    )
  );

  console.log(dualFollowing);
}

getFollowerUrl("dabreadman");
