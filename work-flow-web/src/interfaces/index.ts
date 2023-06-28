export const BASE_URL = 'https://localhost:5001/';

interface EndPoints {
  signUp: string;
  signIn: string;
  getTeamById: string;
  createTeam: string;
  updateTeam: string;
  deleteTeamById: string;
  getTodosByTeamId: string;
  createTodo: string;
  updateTodo: string;
  deleteTodo: string;
}

export const EndPoints: EndPoints = {
  signUp: 'Auth/signUp',
  signIn: 'Auth/signIn',
  getTeamById: 'Team/getTeam',
  createTeam: 'Team/createTeam',
  updateTeam: 'Team/updateTeam',
  deleteTeamById: 'Team/deleteTeam',
  getTodosByTeamId: 'Todo/getTodosByTeamId',
  createTodo: 'Todo/createTodo',
  updateTodo: 'Todo/updateTodo',
  deleteTodo: 'Todo/deleteTodo',
};

export interface ResponseAPI<T> {
  payload: T;
  message: string;
}
