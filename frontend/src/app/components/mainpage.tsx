'use client'
import React, { useEffect, useMemo, useState } from "react";
import { CountryData, TData } from "../types/graph.type";
import { LineChart } from "./LineChart"
import { BarChart } from "./BarChart";
import { convertBarData, convertLineData } from "../service/data.service";
import { Loader } from "./Loader";


const fetcher = (url: string) => fetch(url).then(res => res.json());

export const Charts = () => {

  const URL = process.env.NEXT_PUBLIC_SERVER_URL;

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(2); // State to hold total number of pages
  const [currentChart, setCurrentChart] = useState<string>('line');
  const [data, setData] = useState<TData | null>(null); // State to hold fetched data
  console.log(page, totalPages)
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
      const fetchedData = await fetcher(`${URL}/random`);
      setData(fetchedData);
    } catch (error) {
      console.error('Error fetching random data:', error);
    }
  };
  const fetchURLData = async () => {
    try {
      const fetchedData = await fetcher(`${URL}?p=${page}`);
      setData(fetchedData.data);
      setTotalPages(Math.floor(fetchedData.count / fetchedData.limit));
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
          <section className="z-10 h-96 w-full items-center  font-mono text-sm lg:flex justify-center">
            {
              data ? (
                currentChart === 'line' ? <LineChart data={lineData} /> : <BarChart data={barData} />
              ) : (
                <Loader />
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
          <button disabled={page >= totalPages} className={`px-7 py-2 rounded ${page >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`} onClick={fetchURLData}>Fetch API Batch</button>
        </section>
      </section >
    </>
  );
};

