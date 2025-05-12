const getPageDataService = require("../../services/pageService/getPageDataService");
const responseHandler = require("../../../utils/responseHandler");

class PageController {
    getPageData = async (req, res) => {
        try {
            const pageId = req.query.page;

            const pageProps = await getPageDataService.getFormattedPageDataById(pageId);

            if (!pageProps) {
                return responseHandler.notFound(res, "Page not found");
            }

            return responseHandler.ok(res, pageProps);
        } catch (error) {
            console.error("Error in getPageData: ", error);
            return responseHandler.serverError(res);
        }
    }

    getPagePostData = async (req, res) => {
        try {
            const pageId = req.query.page;
            const postsPerPage = 5;
            const page = parseInt(req.query.scrollPage) || 1;

            const pagePostProps = await getPageDataService.getFormattedPagePostDataById(pageId, page, postsPerPage);

            if (!pagePostProps) {
                return responseHandler.notFound(res, "Page post not found");
            }

            return responseHandler.ok(res, pagePostProps);
        } catch (error) {
            console.error("Error in getPagePostData: ", error);
            return responseHandler.serverError(res);
        }
    }

    getPageLikeData = async (req, res) => {
        try {
            const pageId = req.query.page;

            const pageLikeProps = await getPageDataService.getFormattedPageLikeDataById(pageId);

            if (!pageLikeProps) {
                return responseHandler.notFound(res, "Page not found");
            }

            return responseHandler.ok(res, pageLikeProps);
        } catch (error) {
            console.error("Error in getPageLikeData: ", error);
            return responseHandler.serverError(res);
        }
    }

    getPageFollowData = async (req, res) => {
        try {
            const pageId = req.query.page;

            const pageFollowProps = await getPageDataService.getFormattedPageFollowDataById(pageId);

            if (!pageFollowProps) {
                return responseHandler.notFound(res, "Page not found");
            }

            return responseHandler.ok(res, pageFollowProps);
        } catch (error) {
            console.error("Error in getPageFollowData: ", error);
            return responseHandler.serverError(res);
        }
    }
}

module.exports = new PageController();