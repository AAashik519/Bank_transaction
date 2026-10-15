
const accountModel = require("../models/account.model");


const createAccountController = async (req, res) => {
    try {
        const user = req.user;
        const account = await accountModel.create({ userId: user._id });
        await account.populate("userId", "name email");

        const accountData = account.toObject();
        accountData.user = accountData.userId;
        delete accountData.userId;

        return res.status(201).json({
            message: "Account created successfully",
            success: true,
            account: accountData,
        });
    } catch (error) {
        console.error("Create account error:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }

}


module.exports = {
    createAccountController,
};