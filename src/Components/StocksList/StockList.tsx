import React, { useState, useEffect, useCallback } from "react";
import { API_KEY } from "../../constants/api.constans.ts";
import Card from "../Card/Card.tsx";
import Button from "../Button/Button.tsx";
import "../../App.css";

type StocksType = {
  symbol: string;
  name: string;
  price: number;
  difference?: number;
};

export default function StockList() {
  const [stocks, setStocks] = useState<StocksType[]>([]);
  const [sorted, setSorted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/stock/list?apikey=${API_KEY}`
      );
      const data = await response.json();
      setStocks(data.slice(0, 12));
      setLoading(false);
    } catch (error) {
      setError(`Something went wrong! Error: ${error}`);
      console.log(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
    const interval = setInterval(() => {
      getData();
    }, 30000);
    return () => clearInterval(interval);
  }, [getData]);

  const sortedByPrice = () => {
    const sortedArray = stocks.sort(
      (firstStock, secondStock) => firstStock.price - secondStock.price
    );
    return sortedArray;
  };

  return (
    <>
      <Button onClick={() => (sorted ? setSorted(false) : setSorted(true))}>
        Сортировать по возрастанию цены
      </Button>
      <Button onClick={() => getData()}>Обновить данные</Button>
      {loading && <div>Loading...</div>}
      {error.length === 0 ? (
        <div className="list">
          {sorted
            ? sortedByPrice().map((el) => (
                <Card key={el.symbol} name={el.name} price={el.price} />
              ))
            : stocks.map((el) => (
                <Card key={el.symbol} name={el.name} price={el.price} />
              ))}
        </div>
      ) : (
        <div>{error}</div>
      )}
    </>
  );
}
