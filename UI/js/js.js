// Crear un elemento script
var script = document.createElement('script');

// Establecer el atributo src con la URL de GoJS
script.src = 'https://unpkg.com/gojs/release/go-debug.js';

// Definir una función de callback para ejecutar cuando se cargue la biblioteca GoJS
script.onload = function() {
    // Aquí dentro es donde GoJS está completamente cargado y puedes comenzar a utilizarlo

    // Por ejemplo, podrías inicializar un diagrama
    const myDiagram = new go.Diagram("myDiagramDiv", {
        // Habilita Ctrl-Z para deshacer y Ctrl-Y para rehacer
        "undoManager.isEnabled": true
    });

    myDiagram.nodeTemplate =
    new go.Node("Vertical", // first argument of a Node (or any Panel) can be a Panel type
    /* set Node properties here */
    { // the Node.location point will be at the center of each node
      locationSpot: go.Spot.Center
    })
    /* then add Bindings here */
    // example Node binding sets Node.location to the value of Node.data.loc
    .bind("location", "loc")

    /* add GraphObjects contained within the Node */
    // this Shape will be vertically above the TextBlock
    .add(new go.Shape("RoundedRectangle", // string argument can name a predefined figure
        { /* set Shape properties here */ })
        // example Shape binding sets Shape.figure to the value of Node.data.fig
        .bind("figure", "fig"))
    // add the next GraphObject to the Node:
    .add(new go.TextBlock("default text",  // string argument can be initial text string
        { /* set TextBlock properties here */ })
        // example TextBlock binding sets TextBlock.text to the value of Node.data.text
        .bind("text"));

    // Define el modelo
    myDiagram.model = new go.GraphLinksModel(
        [ // Array de nodos
            { key: "Alpha", category: "default" },
            { key: "Beta", category: "default" },
            { key: "Gamma", category: "default" },
            { key: "Hola", category: "default"}
        ],
        [] // Array de enlaces (vacío en este ejemplo)
    );
};

// Agregar el elemento script al documento
document.head.appendChild(script);
