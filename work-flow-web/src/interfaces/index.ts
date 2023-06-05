export const BASE_URL = "https://localhost:5001/";

interface IEndPoints {
  signUp: string;
  signIn: string;
  getTeamById: string;
  createTeam: string;
  updateTeam: string;
  deleteTeamById: string;
  getTodoById: string;
  createTodo: string;
  updateTodo: string;
  deleteTodo: string;
}

export const EndPoints: IEndPoints = {
  signUp: "Auth/signUp",
  signIn: "Auth/signIn",
  getTeamById: "Team/getTeam",
  createTeam: "Team/createTeam",
  updateTeam: "Team/updateTeam",
  deleteTeamById: "Team/deleteTeam",
  getTodoById: "Todo/getTodo",
  createTodo: "Todo/createTodo",
  updateTodo: "Todo/updateTodo",
  deleteTodo: "Todo/deleteTodo",
};

export interface IResponseAPI<T> {
  payload: T;
  message?: string;
}
