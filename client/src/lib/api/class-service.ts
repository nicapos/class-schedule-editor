import { ClassItem, EditableClassItem } from "../types";

const baseURL = "https://localhost:8080/api";

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
  }
};

export default ClassService;