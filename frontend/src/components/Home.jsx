// // when backend and frontend are running on different ports then we need to connect them so we use CORS to connect them in backend
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Home() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newtodos, setNewtodos] = useState("");

  //useEffect is used with fetchtodos only as the data is continuously changing for every other also called
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/todo/fetch", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json", //we are fecthing json data
          },
        });
        console.log(response.data.existTodo); //response contains the entire things and all details that can be seen by using  inspect in the console page
        setTodos(response.data.existTodo); //because the response.data.todos give the array directly so we can apply the map feature //response.data contains all the fetch todos from our database
        setError(null); //existTodo name is seen by inspecting the console
      } catch (error) {
        setError("failed to load the Todos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const todocreate = async (id) => {
    //  try {
    //      setLoading(true);
    //      const response=await axios.post("http://localhost:3000/todo/create",{
    //           title:req.body.title,
    //           description:req.body.description,
    //           dueDate:req.body.dueDate,
    //           completed:req.body.completed,
    //           userId:req.body.userId,
    //      },{
    //           withCredentials:true,
    //           headers:{
    //              "Content-Type":"application/json",
    //           },
    //      });
    //      console.log(response);
    //      setTodos([...todos,response.data]);
    //      setError(null);
    //  } catch (error) {
    //      setError("Failed to create the Todo",error);
    //  }finally{
    //      setLoading(false);
    //  }

    if (!newtodos) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/todo/create",
        {
          text: newtodos,
          completed: false,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data.newtodo);
      setTodos([...todos, response.data.newtodo]); //....todos is used to keep all the other todos when the new todo is being  created and response.data contains all the todo
      setNewtodos("");
    } catch (error) {
      setError("failed to create the Todos", error);
    }
  };

  const todostatus = async (id) => {
    // try {
    //      setLoading(true);
    //      const response=await axios.put(`http://localhost:3000/todo/update/${req.params.id}`,{
    //          completed:req.body.completed,
    //      },{
    //          withCredentials:true,
    //          headers:{
    //              "Content-Type":"application/json",
    //          },
    //      });
    //      console.log(response);
    //      setTodos(todos.map(todo=>todo._id===req.params.id?response.data:todo));
    //      setError(null);
    //  } catch (error) {
    //      setError("Failed to update the Todo",error);
    //  }finally{
    //      setLoading(false);
    //  }

    const todo = todos.find((t) => t._id === id);
    try {
      const response = await axios.put(
        `http://localhost:3000/todo/update/${id}`,
        {
          ...todo, //here we get the uodated value of the todo
          completed: !todo.completed,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data.existTodo);
      setTodos(todos.map((t) => (t._id === id ? response.data.existTodo : t))); //if value is changed then new value is changed to response.data otherwise the olde valye that is t is already set
    } catch (error) {
      setError("failed to find toods status", error);
    }
  };

  const tododelete = async (id) => {
    // try {
    //      setLoading(true);
    //      const response=await axios.delete(`http://localhost:3000/todo/delete/${req.params.id}`,{
    //          withCredentials:true,
    //          headers:{
    //              "Content-Type":"application/json",
    //          },
    //      });
    //      console.log(response);
    //      setTodos(todos.filter(todo=>todo._id!==req.params.id));
    //      setError(null);
    //  } catch (error) {
    //      setError("Failed to delete the Todo",error);
    //  }finally{
    //      setLoading(false);
    //  }

    try {
      const response = await axios.delete(
        `http://localhost:3000/todo/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      setError("failed to delete the Todo", error);
    }
  };

  const navigateTo = useNavigate();
  const logout = async () => {
    try {
      await axios.get("http://localhost:3000/user/logout", {
        withCredentials: true,
      });
      toast.success("User logged out successfully");
      navigateTo("/login");
      localStorage.removeItem("jwt");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const remainingTodos = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="bg-gray-100 max-w-lg lg:max-w-xl rounded-lg shadow-lg mx-8 sm:mx-auto p-6 my-10  ">
      <h1 className="text-2xl font-semibold text-center">TODO APP</h1>
      <div className="mb-4 flex ">
        <input
          type="text"
          placeholder="Add the new todo"
          value={newtodos}
          onChange={(e) => setNewtodos(e.target.value)}
          // onKeyPress={(e) => e.key === "Enter" && todocreate()} // Simplified handler   //e.target.value can be seen on console and whatever we are typing in the box gets dispalyed in the console
          className="flex-grow p-2 border rounded-l-md focus:outline-none mr-1"
        />

        <button
          onClick={todocreate}
          className="text-white bg-blue-600 border rounded-r-md py-2 px-4 hover:bg-blue-900 duration-300"
        >
          {" "}
          ADD
        </button>
      </div>
      {loading ? (
        <div className="text-center justify-center">
          <span className="text-gray-500">Loading....</span>
        </div>
      ) : error ? (
        <div className="text-center text-red-600 font-semibold">{error}</div>
      ) : (
        <ul className="space-y-2 ">
          {todos.map((todo, index) => (
            <li
              key={todo._id || index}
              className="flex items-center justify-between p-3 bg-gray-100 rounded-md"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 "
                  checked={todo.completed}
                  onChange={() => todostatus(todo._id)}
                />
                <span
                  className={
                    todo.completed
                      ? "text-gray-800 line-through"
                      : "text-gray-500"
                  }
                >
                  {todo.text}
                </span>
              </div>

              <button
                onClick={() => tododelete(todo._id)}
                className="text-red-500 hover:text-red-900 duration-300"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-2 text-center text-sm text-gray-700">
        {" "}
        {remainingTodos} Todo remaining
      </p>
      <button
        onClick={() => logout()}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-900 duration-300 mx-auto block"
      >
        Logout
      </button>
    </div>
  );
}

export default Home;

// when backend and frontend are running on different ports then we need to connect them so we use CORS to connect them in backend
