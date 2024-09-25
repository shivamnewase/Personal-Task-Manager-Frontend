import { ProjectType, TaskType } from "../type/index";
import { createTask, deleteTask, getTask, updateTask } from "../API/index";

export const createTaskAction = (reqBody) => async (dispatch) => {
  try {
    const createResponse = await createTask(reqBody);
    console.log("🚀 ~ createTaskAction ~ createResponse:", createResponse.data.task);
    dispatch({
      type: ProjectType.CREATE_TASK,
      payload: createResponse.data.task,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const getTaskAction = () => async (dispatch) => {
  try {
    const getTaskResponse = await getTask();

    dispatch({
      type: TaskType.GET_TASKS,
      payload: getTaskResponse.data.data,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const findTaskAction = () => async (dispatch) => {
  try {
    const getTaskResponse = await getTask();
    dispatch({
      type: TaskType.FIND_TASKS,
      payload: getTaskResponse.data.data,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const updateTaskAction = (reqBody) => async (dispatch) => {
  try {
    const updateResponse = await updateTask(reqBody);

    dispatch({
      type: ProjectType.UPDATE_TASK,
      payload: updateResponse.data.data,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const deleteTaskAction = (reqBody) => async (dispatch) => {
  console.log("🚀 ~ deleteTaskAction ~ reqBody:", reqBody)
  try {
    const deleteTaskResponse = await deleteTask(reqBody);
    console.log("deleteTaskResponse👉👉👉👉👉👉", deleteTaskResponse.data.data);
    dispatch({
      type: ProjectType.DELETE_TASKS,
      payload: deleteTaskResponse.data.data,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const taskLoading =
  (loading = true) =>
  (dispatch) => {
    dispatch({
      type: TaskType.LOADING_TASK,
      payload: loading,
    });
  };
