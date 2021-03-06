
exports.seed = function (knex, Promise) {
  return knex('links').del()
    .then(() => knex('folders').del())
    .then(() => Promise.all([
      knex('folders').insert({
        title: 'Google',
      }, 'id')
        .then(folder => knex('links').insert([
            { short_url: 'google', long_url: 'www.google.com', folder_id: folder[0], visits: 0 },
            { short_url: 'ESPN', long_url: 'www.espn.com', folder_id: folder[0], visits: 0 },
        ])),
      knex('folders').insert({
        title: 'AOL',
      }, 'id')
        .then(folder => knex('links').insert([
            { short_url: 'aol', long_url: 'www.aol.com', folder_id: folder[0], visits: 0 },
            { short_url: 'something', long_url: 'www.something.com', folder_id: folder[0], visits: 0 },
        ])),
    ]));
};
