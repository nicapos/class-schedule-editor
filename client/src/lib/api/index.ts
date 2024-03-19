import AuthService from "./auth-service";
import UserService from "./user-service";
import ScheduleService from "./schedule-service";

export * from "./types";

const Api = {
  ...UserService,
  ...AuthService,
  ...ScheduleService,
};

export default Api;
