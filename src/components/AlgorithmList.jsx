import React from 'react';

const AlgorithmList = () => {
  return (
    <div className="algorithm-list">
      <h3>Algorithms</h3>
      <div>
        <h4>Sorting</h4>
        <ul>
          <li>Bubble Sort</li>
          <li>Merge Sort</li>
        </ul>
        <h4>Graphs</h4>
        <ul>
          <li>Dijkstra</li>
          <li>DFS</li>
        </ul>
      </div>
    </div>
  );
};

export default AlgorithmList;
