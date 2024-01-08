import { Form, Formik } from "formik";
import { useTasks } from "../context/TaskProvider.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function TaskForm() {
  const { createTask, getTask, updateTask } = useTasks();

  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const params = useParams();
  const navigate = useNavigate();
  console.log(params);

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task);
        setTask({
          title: task.title,
          description: task.description,
        });
        console.log(task);
      }
    };
    loadTask();
  }, []);

  return (
    <div>
      <Formik
        initialValues={task}
        // initialValues={task}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          console.log(values);
          if (params.id) {
            await updateTask(params.id, values);
            navigate("/");
            console.log("update");
          } else {
            await createTask(values);
          }
          // actions.resetForm();
          navigate("/");
          setTask({ title: "", description: "" });
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form
            onSubmit={handleSubmit}
            className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-10"
          >
            <h1 className="text-xl font-bold uppercase text-center">
              {params.id ? "Edit task" : "New Task"}
            </h1>
            <label className="block">title</label>
            <input
              type="text"
              name="title"
              placeholder="Write a title"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleChange}
              value={values.title}
            />
            <label className="block">descripcion</label>
            <textarea
              name="description"
              rows="3"
              placeholder="Write a description"
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleChange}
              value={values.description}
            ></textarea>

            <button
              type="submit"
              disabled={isSubmitting}
              className="block bg-indigo-500 px-2 py-1 text-white w-full rounded-md"
            >
              {isSubmitting ? "Saving... " : "Save"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TaskForm;
