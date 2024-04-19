//Para iniciar el servidor web
/*const http = require('http');
import { ReactDiagram } from 'gojs-react';




const server = http.createServer(function(req,res){
    res.write("<h1>Hola mundo</h1>");
    res.end();
});

server.listen(3000);
//Para compilar el codigo poner en consola "node <nombre del archivo>"*/
import React from 'react';
import { ReactDiagram } from 'gojs-react';
import 'UI/css/style.css';

function initDiagram() {
  const $ = go.GraphObject.make;
  
  const diagram = $(go.Diagram, {
    'undoManager.isEnabled': true,
    'undoManager.maxHistoryLength': 0,
    'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
    model: new go.GraphLinksModel({ linkKeyProperty: 'key' })
  });

  diagram.nodeTemplate =
    $(go.Node, 'Auto',
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Shape, 'RoundedRectangle',
        { name: 'SHAPE', fill: 'white', strokeWidth: 0 },
        new go.Binding('fill', 'color')),
      $(go.TextBlock,
        { margin: 8, editable: true },
        new go.Binding('text').makeTwoWay()
      )
    );

  return diagram;
}

const DataArray = [
  { key: 0, text: 'Alpha', color: 'lightblue', loc: '0 0' },
  { key: 1, text: 'Beta', color: 'orange', loc: '150 0' },
  { key: 2, text: 'Gamma', color: 'lightgreen', loc: '0 150' },
  { key: 3, text: 'Delta', color: 'pink', loc: '150 150' }
];

const LinkDataArray = [
  { key: -1, from: 0, to: 1 },
  { key: -2, from: 0, to: 2 },
  { key: -3, from: 1, to: 1 },
  { key: -4, from: 2, to: 3 },
  { key: -5, from: 3, to: 0 }
];

function handleModelChange(changes) {
  console.log('GoJS model changed!', changes);
}

function App() {
  return (
    <div className="App">
      <ReactDiagram
        initDiagram={initDiagram}
        divClassName='diagram-component'
        nodeDataArray={DataArray}
        linkDataArray={LinkDataArray}
        onModelChange={handleModelChange}
      />
    </div>
  );
}

export default App;
