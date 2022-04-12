import { Collapse, Input } from "antd";
import React from "react";
import "./Tasks.css";

const Tasks = ({ tasks, answers, setAnswers }) => {
  const changeInput = (e) => {
    const { id, value } = e.target;

    setAnswers({ ...answers, [id]: value });
  };
  const mapTasks = tasks.map((task, idx) => (
    <Collapse.Panel header={`Задание #${task.id}`} key={idx}>
      <p>
        <strong>Описание: </strong>
        {task.description}
      </p>
      <div className="task-answer">
        <strong className="task-answer__title">Ответ: </strong>
        <Input id={task.id} type="text" placeholder="Введите ответ" onChange={changeInput} />
      </div>
    </Collapse.Panel>
  ));

  return <Collapse className="tasks">{mapTasks}</Collapse>;
};

export default Tasks;
