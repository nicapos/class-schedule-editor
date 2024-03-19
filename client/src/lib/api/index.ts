import ScheduleService from "./schedule-service";
import UserService from "./user-service";

const Api = {
  ...ScheduleService,
  ...UserService,
};

export default Api;
