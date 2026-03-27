export const ITEMS_PER_PAGE = 10;

type RouteAccessMap = {
  [key: string]: string[]; // route -> array of allowed roles
};

export const routeAccessMap: RouteAccessMap = {
  "/admin(.*)?": ["admin"], // Admin routes
  "/student(.*)?": ["student"], // Student routes
  "/teacher(.*)?": ["teacher"], // Teacher routes
  "/parent(.*)?": ["parent"], // Parent routes
  "/list/teachers": ["admin"], // Example of a route accessible to multiple roles
  "/list/students": ["admin", "teacher"], // Example of a route accessible to multiple roles
  "/list/parents": ["admin"], // Example of a route accessible to multiple roles
  "/list/classes": ["admin", "teacher"], // Example of a route accessible to multiple roles
  "/list/subjects": ["admin", "teacher"], // Example of a route accessible to multiple roles
  "/list/exams": ["admin", "teacher", "student", "parent"], // Example of a route accessible to multiple roles
  "/list/assignments": ["admin", "teacher", "student", "parent"], // Example of a route accessible to multiple roles
  "/list/results": ["admin", "teacher", "student", "parent"], // Example of a route accessible to multiple roles
  "/list/attendance": ["admin", "teacher", "student", "parent"], // Example of a route accessible to multiple roles
  "/list/events": ["admin", "teacher", "student", "parent"], // Example of a route accessible to multiple roles
  "/list/announcements": ["admin", "teacher", "student", "parent"], // Example of a route accessible to multiple roles
};
