"use client";

import React, { useState, useEffect } from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { kMeans, runKMeansWithOptimalInertia } from "k-means-clustering-js";
import { Cluster } from "k-means-clustering-js/dist/types";

// Register necessary Chart.js components
ChartJS.register(LinearScale, CategoryScale, PointElement, Tooltip, Legend);

const KMeansVisualizer = () => {
  const [clusters, setClusters] = useState<Cluster[]>([]);

  // Sample data points for clustering
  const dataPoints = [
    [2.37, 5.56],
    [6.12, 1.92],
    [4.72, 3.25],
    [7.82, 8.16],
    [3.64, 6.01],
    [8.29, 2.46],
    [5.63, 9.71],
    [4.88, 6.44],
    [7.33, 7.85],
    [9.56, 1.82],
    [3.93, 9.51],
    [5.79, 7.28],
    [8.06, 2.92],
    [6.63, 8.03],
    [4.25, 4.76],
    [2.89, 7.54],
    [9.24, 6.48],
    [3.47, 5.85],
    [6.98, 4.14],
    [7.44, 9.24],
    [8.31, 1.69],
    [5.05, 2.12],
    [2.55, 3.91],
    [9.18, 4.43],
    [3.22, 8.56],
    [1.43, 5.29],
    [4.99, 7.73],
    [9.75, 2.05],
    [6.87, 6.29],
    [1.88, 9.82],
    [4.58, 2.98],
    [5.26, 8.47],
    [2.73, 4.92],
    [9.84, 3.17],
    [8.63, 7.33],
    [6.74, 5.16],
    [3.51, 1.89],
    [2.81, 8.68],
    [5.49, 1.62],
    [7.56, 4.11],
    [9.27, 6.65],
    [6.57, 2.64],
    [4.22, 8.43],
    [7.89, 3.99],
    [5.37, 6.91],
    [3.84, 9.34],
    [8.48, 5.92],
    [2.12, 4.77],
    [7.16, 1.56],
    [5.72, 9.31],
  ];

  useEffect(() => {
    runKMeans();
  }, []);

  const runKMeans = () => {
    const results = runKMeansWithOptimalInertia({
      data: dataPoints,
      k: 3,
    });
    setClusters(results);
  };

  // Format chart data based on clusters
  const chartData = {
    datasets: clusters.map((cluster, index) => ({
      label: `Cluster ${index + 1}`,
      data: cluster.points.map(([x, y]) => ({ x, y })),
      backgroundColor: `rgba(${Math.random() * 256}, ${Math.random() * 256}, ${
        Math.random() * 256
      }, 1)`,
      pointRadius: 10,
    })),
  };

  return (
    <div className="w-full h-full">
      <button
        onClick={runKMeans}
        className="border border-solid border-grey p-2 rounded absolute bottom-5 right-5 z-[1000] bg-white"
      >
        Run K-Means
      </button>
      <div className="z-0">
        {clusters.length > 0 && (
          <Scatter
            data={chartData}
            options={{
              scales: {
                x: { title: { display: true, text: "X-Axis" } },
                y: { title: { display: true, text: "Y-Axis" } },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default KMeansVisualizer;
