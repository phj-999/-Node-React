module.exports = app => {
    const { router, controller } = app;
    router.resources('post', '/api/post', controller.post);
};