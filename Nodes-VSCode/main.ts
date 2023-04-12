require(["out\\Nodes.js"], function (Nodes: new () => any) {
    let nodesOfYesod = new Nodes();
    nodesOfYesod.Initialize();
    nodesOfYesod.Run();
});

require.config({
    baseUrl: "out",
    paths: {
        "some": "Nodes"
    },
    waitSeconds: 15,
});