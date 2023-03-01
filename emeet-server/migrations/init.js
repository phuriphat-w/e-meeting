//knex migrate:up
exports.up = function(knex) {
    return knex.schema
      .createTable('announcement', function (table) {
        table.increments('id').primary();
        table.string('topic', 255).notNullable();
        table.string('meet_Date', 64).notNullable();
        table.string('detail', 1000).notNullable();
        table.string('place', 1000);
        table.string('agenda_rule', 1000);
        table.timestamp('pub_date_time', { useTz: false });
      })
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTable("announcement")
  };
  
  exports.config = { transaction: false };