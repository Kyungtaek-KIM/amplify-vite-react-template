import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [token, setToken] = useState<Schema["Token"]["type"][]>([]);

  useEffect(() => {
    const sub = client.models.Token.observeQuery().subscribe({
      next: ({ items }) => {
        setToken([...items]);
      },
    });

    return () => sub.unsubscribe();
  }, []);

  const createToken = async () => {
    await client.models.Token.create({
        requestId: "06a2cae3-8aed-475d-98f2-ea30c2c8d00c",
        ppid: "215445-000027",
        count: 100,
        requestTime: Date()
    });
  };

  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createToken}>+ new</button>
      <ul>
        {token.map((tok) => (
          <li key={tok.id}>{tok.requestId} {tok.ppid}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
    </main>
  );
}

export default App;
