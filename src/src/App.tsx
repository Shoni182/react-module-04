import "./App.css";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

//: Хук UseQuery
// const fetchPerson = async () => {
//   const response = await axios.get(`https://swapi.info/api/people/1`);
//   return response.data;
// };

// export default function App() {
//   const { data, error, isLoading, isError } = useQuery({
//     // Унікальний ключ запиту
//     queryKey: ["person"],
//     // Функція  запиту для отримання даних, виконується автоматично при монтуванні компонента
//     queryFn: fetchPerson,
//   });
//   return (
//     <>
//       {/* Стани дозволяють відслідковувати  */}
//       {isLoading && <p>Завантаження...</p>}
//       {isError && <p> Виникла помилка: {error.message}</p>}

//       {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
//     </>
//   );
// }

//: Ключі Запиту

const fetchPerson = async (id: number) => {
  const response = await axios.get(`https://swapi.info/api/people/${id}`);
  return response.data;
};

export default function App() {
  const [count, setCount] = useState(1);

  const { data, error, isLoading, isError } = useQuery({
    // змінюємо ключ запиту залежно від count
    queryKey: ["person", count],
    queryFn: () => fetchPerson(count),
  });
  return (
    <>
      <button onClick={() => setCount(count + 1)}> Get next character </button>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error?.message}</p>}
    </>
  );
}
