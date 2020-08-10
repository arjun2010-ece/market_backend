const usersData = require("../fixtures/users-data.json");

module.exports = {
	up: async queryInterface => {
		await queryInterface.bulkInsert("user", usersData);
	},

	down: async queryInterface => {
		await queryInterface.bulkDelete("user", usersData);
	}
};
