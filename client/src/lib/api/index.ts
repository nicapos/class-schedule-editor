import ScheduleService from "./schedule-service";
import UserService from "./user-service";
import ClassService from "./class-service";

const Api = {
  ...ClassService,
  ...ScheduleService,
  ...UserService,
};

export default Api;
