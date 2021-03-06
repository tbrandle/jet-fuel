
exports.seed = function (knex, Promise) {
  return knex('links').del()
    .then(() => knex('folders').del())
    .then(() => Promise.all([
      knex('folders').insert({
        title: 'AOL',
        id: 1,
      }, 'id')
        .then(folder => knex('links').insert([
            { short_url: 'TESTaol', long_url: 'www.aol.com', folder_id: 1, visits: 0, id: 2 },
        ])),
    ]));
};
