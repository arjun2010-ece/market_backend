"use strict";
module.exports = {
	up: function(queryInterface, Sequelize) {
		return queryInterface.createTable("user", {
			id: {
				type: Sequelize.STRING,
				primaryKey: true,
				allowNull: false,
			},
			uuid: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			email: {
				type: Sequelize.STRING,
				unique: true,
			},
			password: {
				type: Sequelize.STRING,
			},
			public_key: {
				type: Sequelize.TEXT,
			},
			private_key: {
				type: Sequelize.TEXT,
			},
			active: {
				type: Sequelize.BOOLEAN,
				defaultValue: 1
			},
			create_time: {
				allowNull: false,
				defaultValue: new Date(),
				type: Sequelize.DATE,
			},
			update_time: {
				type: Sequelize.DATE,
			},
			delete_time: {
				type: Sequelize.DATE,
			},
		});
	},
	down: function(queryInterface, Sequelize) {
		return queryInterface.dropTable("user");
	}
};
