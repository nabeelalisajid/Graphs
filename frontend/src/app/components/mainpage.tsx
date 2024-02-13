'use client'
import React, { useEffect, useMemo, useState } from "react";
import { BarData, CountryData, TData } from "../types/graph.type";
import { LineChart } from "./linechart";
import { BarChart } from "./barchart";
import { convertBarData, convertLineData } from "../service/data.service";


const fetcher = (url: string) => fetch(url).then(res => res.json());

export const Charts = () => {
  const [page, setPage] = useState<number>(1);
  const [currentChart, setCurrentChart] = useState<string>('line');
  const [data, setData] = useState<TData | null>(null); // State to hold fetched data

  const lineData = useMemo(() => data ? convertLineData(data as CountryData[]) : [], [data]);
  const barData = useMemo(() => data ? convertBarData(data as CountryData[]) : [], [data]);

  useEffect(() => {
    // Fetch initial data when component mounts
    fetchRandomData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to fetch random data
  const fetchRandomData = async () => {
    try {
      setPage(1);
      const fetchedData = await fetcher('http://localhost:5000/data/random');
      setData(fetchedData);
    } catch (error) {
      console.error('Error fetching random data:', error);
    }
  };
  const fetchURLData = async () => {
    try {
      const fetchedData = await fetcher(`http://localhost:5000/data?p=${page}`);
      setData(fetchedData);
      setPage(page + 1);
    } catch (error) {
      console.error('Error fetching random data:', error);
    }
  };
  // Function to switch between line and bar charts
  const switchSelection = (selection: string) => {
    setCurrentChart(selection);
  };

  return (
    <>
      <section className="d-flex w-full">
        <section className="container">
          <section className="buttons ">
            <button
              className={`px-6 py-2 mb-3 rounded ${currentChart === 'line' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                }`}
              onClick={() => switchSelection('line')}
            >
              Line Chart
            </button>
            <button
              className={`px-7 py-2 rounded ${currentChart === 'bar' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                }`}
              onClick={() => switchSelection('bar')}
            >
              Bar Chart
            </button>
          </section>
          <section className="z-10 h-96 w-full items-center justify-between font-mono text-sm lg:flex">
            {
              data ? (
                currentChart === 'line' ? <LineChart data={lineData} /> : <BarChart data={barData} />
              ) : (
                <p>Loading data...</p>
              )
            }
          </section>
        </section>
        <section className="flex justify-around mt-6">
          <button
            className={`px-7 py-2 rounded ${page === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            onClick={fetchRandomData} // Add click event to fetch random data
          >
            Random Data
          </button>
          <button className={`px-7 py-2 rounded ${page >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`} onClick={fetchURLData}>Fetch API Batch</button>
        </section>
      </section >
    </>
  );
};

