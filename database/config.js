const env = process.env.NODE_ENV || "development";

module.exports = {
	[env]: {
		database: "mudey_bk_dev_db",
		username: "mudey_bk_dev_user",
		password: "mudey_bk_dev_password",
		host: "localhost",
		dialect: "mysql",
		logging: !!process.env.DEBUG,
		migrationStorageTableName: "_migrations",
		pool: {
			max: 10,
			min: 1,
			acquire: 30000,
			idle: 10000,
		},
	},
};
