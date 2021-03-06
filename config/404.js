/**
 * Default 404 (not found) handler
 *
 * If no matches are found, Sails will respond using this handler:
 *
 * For more information on 404/notfound handling in Sails/Express, check out:
 * http://expressjs.com/faq.html#404-handling
 */
module.exports[404] = function pageNotFound(req, res, defaultNotFoundBehavior) {
    // If the user-agent wants a JSON response,
    // the views hook is disabled,
    // or the 404 view doesn't exist,
    // send JSON
    if (req.wantsJSON || !sails.config.hooks.views || !res.view || !sails.hooks.views.middleware[404]) {
        return res.json({
            status: 404
        }, 404);
    }

    res.status(404);

    var view = "404";
    var fs = require("fs");
    var packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
    var data = {
        status: 404,
        packageJson: packageJson
    };

    // Otherwise, serve the `views/404.*` page
    res.render(view, data, function(error) {
        // 404 page render failed, weird...
        if (error) {
            return defaultNotFoundBehavior();
        }

        res.render(view, data);
    });
};
