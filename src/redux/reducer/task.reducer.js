import { TaskType } from "../type";

const initialState = {
  taskList: [],
  error: undefined,
  message: undefined,
  isLoading: false,
  task: undefined,
};

export const TaskReducer = (state = initialState, action) => {
  const { type, payload = {} } = action;

  switch (type) {
    case TaskType.CREATE_TASK:
      return {
        ...state,
        isLoading: false,
        taskList: [payload, ...state.taskList],
      };
    case TaskType.GET_TASKS:
      return {
        ...state,
        isLoading: false,
        taskList: payload,
      };
    
    case TaskType.LOADING_TASK:
      return { ...state, isLoading: payload };
    default: {
      return state;
    }
  }
};
