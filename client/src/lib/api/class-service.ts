import { ClassItem, EditableClassItem } from "../types";

const baseURL = "http://localhost:8080/api";

const ClassService = {
  createClass: async (classItem: EditableClassItem): Promise<ClassItem> => {
    const response = await fetch(`${baseURL}/class/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(classItem),
      credentials: "include",
    });

    const data = await response.json();
    return data as ClassItem;
  },
  getClass: async (id: string): Promise<ClassItem> => {
    const response = await fetch(`${baseURL}/class/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    return data as ClassItem;
  },
  updateClass: async (id: string, classItem: EditableClassItem): Promise<ClassItem> => {
    const response = await fetch(`${baseURL}/class/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ id, ...classItem }),
      credentials: "include",
    });

    const data = await response.json();
    return data as ClassItem;
  },
  deleteClass: async (id: string) => {
    const response = await fetch(`${baseURL}/class/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });

    const json = await response.json();
    return json;
  }
};

export default ClassService;