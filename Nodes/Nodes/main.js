require(["Nodes.js"], function (NodesOfYesod) {
    var i = 0;
    var nodesOfYesod = new NodesOfYesod();
    nodesOfYesod.Run();
});
require.config({
    baseUrl: "/",
    paths: {
        "some": "Nodes"
    },
    waitSeconds: 15,
});
//# sourceMappingURL=main.js.map