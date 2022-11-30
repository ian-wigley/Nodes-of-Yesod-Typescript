require(["out\\Nodes.js"], function (Nodes: new () => any) {
    var nodesOfYesod = new Nodes();
    nodesOfYesod.Run();
});

require.config({
    baseUrl: "out",
    paths: {
        "some": "Nodes"
    },
    waitSeconds: 15,
});