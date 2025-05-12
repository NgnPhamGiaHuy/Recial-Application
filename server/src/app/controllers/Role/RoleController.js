const getRoleDataService = require("../../services/roleService/getRoleDataService");
const responseHandler = require("../../../utils/responseHandler");

class RoleController {
    getRoleData = async (req, res) => {
        try {
            const roleId = req.query.role;

            const roleProps = await getRoleDataService.getRawRoleData(roleId);

            if (!roleProps) {
                return responseHandler.notFound(res, "Role not found");
            }

            return responseHandler.ok(res, roleProps);
        } catch (error) {
            console.error("Error in getRoleData: ", error);
            return responseHandler.serverError(res);
        }
    }
}

module.exports = new RoleController();