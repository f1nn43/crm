import React, { useCallback, useEffect, useRef } from 'react';
import isEqual from 'lodash/isEqual';
import { useState } from 'react';
import { Background, MarkerType } from 'reactflow';
import ReactFlow, {
    addEdge,
    updateEdge,
    useNodesState,
    useEdgesState,
} from 'reactflow';
import firebase from 'firebase/compat/app';
import { v4 as uuidv4 } from 'uuid';
import EditOptionsSchem from './EditOptionsSchem/EditOptionsSchem';

const SettSchems = (props) => {
    let allStages = [];
    let stageCount = 1;

    let initialEdges = [];
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    props.data.forEach(funnel => {
        funnel.funnel.forEach(stage => {
            let node;
            if(stage.schemPosition){
                node = {
                    id: stage.id,
                    position: { x: stage.schemPosition.x, y: stage.schemPosition.y},
                    edgeWith: stage.edgeWith,
                    edgeFrom: stage.edgeFrom,
                    data: {
                        label: <EditOptionsSchem stage={stage} edges={edges} data={props.data}/>,
                        funnelID: funnel.funnelID
                    }
                }
            } else {
                node = {
                    id: stage.id,
                    position: { x: 0, y: stageCount * 100},
                    edgeWith: stage.edgeWith,
                    edgeFrom: stage.edgeFrom,
                    data: {
                        label: <EditOptionsSchem stage={stage} edges={edges} data={props.data}/>,
                        funnelID: funnel.funnelID
                    }
                }
            }
            allStages.push(node)
            stageCount++
        })
    });


    const initialNodes = allStages
    initialNodes.forEach(stage => {
        if(stage.edgeWith){
            initialEdges.push({ 
                id: uuidv4(), 
                source: stage.id, 
                target: stage.edgeWith
            })
        }
    })

    const edgeUpdateSuccessful = useRef(true);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

    const prevEdgesRef = useRef(edges);
    useEffect(() => {
        const handleEdgesChange = (changedEdges) => {
            const database = firebase.database();
            const ref = database.ref('/funnels');
            const updatedData = props.data
            initialEdges.forEach(initEdge => {
                updatedData.forEach(funnel => {
                    const findingStageWith = funnel.funnel.find(stage => initEdge.source === stage.id)
                    if(findingStageWith){
                        findingStageWith.edgeWith = null
                    }
                    const findingStageFrom = funnel.funnel.find(stage => initEdge.target === stage.id)
                    if(findingStageFrom){
                        findingStageFrom.edgeFrom = null
                    }
                });
            })
            edges.forEach(edge => {
                updatedData.forEach(funnel => {
                    const findingStageWith = funnel.funnel.find(stage => edge.source === stage.id)
                    if(findingStageWith){
                        findingStageWith.edgeWith = edge.target
                    }
                    const findingStageFrom = funnel.funnel.find(stage => edge.target === stage.id)
                    if(findingStageFrom){
                        findingStageFrom.edgeFrom = edge.source
                    }
                });
            })
            ref.set(updatedData)
            prevEdgesRef.current = changedEdges;
        };

        handleEdgesChange(edges);
        return () => {
            // Очищаем обработчик при размонтировании компонента
            console.log('Component unmounted');
        };
    }, [edges]); // Обратите внимание, что зависимость теперь только от edges


    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    useEffect(() => {
        if(!isEqual(nodes, initialNodes)){
            const database = firebase.database();
            const ref = database.ref('/funnels');
            const updatedData = props.data
            nodes.forEach(node => {
                updatedData.forEach(funnel => {
                    if(funnel.funnelID === node.data.funnelID){
                        funnel.funnel.forEach(stage => {
                            if(stage.id === node.id){
                                stage.schemPosition = node.position
                            }
                        })
                    }
                })
            })
            ref.set(updatedData)
        }
    }, [nodes])

    edges.forEach(edge => {
        edge.markerEnd = {
            type: MarkerType.Arrow
        }
    })

    const onEdgeUpdateStart = useCallback(() => {
        edgeUpdateSuccessful.current = false;
      }, []);
    
      const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
        edgeUpdateSuccessful.current = true;
        setEdges((els) => updateEdge(oldEdge, newConnection, els));
      }, []);
    
      const onEdgeUpdateEnd = useCallback((_, edge) => {
        if (!edgeUpdateSuccessful.current) {
          setEdges((eds) => eds.filter((e) => e.id !== edge.id));
        }
        edgeUpdateSuccessful.current = true;
      }, []);

    return (
        <div style={{width: '100%', height: '100%'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                snapToGrid
                onEdgeUpdate={onEdgeUpdate}
                onEdgeUpdateStart={onEdgeUpdateStart}
                onEdgeUpdateEnd={onEdgeUpdateEnd}
                onConnect={onConnect}
                fitView
                attributionPosition="top-right"
            >
                <Background />
            </ReactFlow>
        </div>
        
    );
};

export default SettSchems;
