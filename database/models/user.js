const bcrypt = require("bcrypt");

/**
 * User Model
 */
module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define(
		"User",
		{
			id: {
				allowNull: false,
				defaultValue: DataTypes.UUIDV4,
				type: DataTypes.UUID,
				primaryKey: true,
				unique: true,
			},
			uuid: {
				allowNull: false,
				defaultValue: DataTypes.UUIDV4,
				type: DataTypes.UUID,
				unique: true,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				field: "email",
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				field: "password",
			},
			publicKey: {
				type: DataTypes.TEXT,
				allowNull: true,
				field: "public_key",
			},
			privateKey: {
				type: DataTypes.TEXT,
				allowNull: true,
				field: "private_key",
			},
			active: {
				type: DataTypes.BOOLEAN,
				defaultValue: true,
			},
		},
		{
			freezeTableName: true,
			tableName: "user",
			paranoid: true,
			createdAt: "create_time",
			updatedAt: "update_time",
			deletedAt: "delete_time",
			hooks: {
				beforeCreate: (user, options) => {
					{
						user.password =
							user.password && user.password != ""
								? bcrypt.hashSync(user.password, 10)
								: "";
					}
				},
			},
		}
	);

	User.associate = function (models) {
		models.User.hasMany(models.Message, {
			as: "message",
			foreignKey: "id",
			foreignKeyConstraint: true,
			targetKey: "email"
		});
	}

	return User;
};
