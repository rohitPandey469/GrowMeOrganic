// Import the data into JSON format then convert it
// into this format
export const departmentData = [
  {
    name: "Department 1",
    subDepartments: [
      { name: "Sub Department 1-1" },
      { name: "Sub Department 1-2" },
      { name: "Sub Department 1-3" },
      { name: "Sub Department 1-4" },
    ],
  },
  {
    name: "Department 2",
    subDepartments: [
      { name: "Sub Department 2-1" },
      { name: "Sub Department 2-2" },
      { name: "Sub Department 2-3" },
      { name: "Sub Department 2-4" },
    ],
  },
];

export const MutatedDepartmentData = departmentData.reduce(
  (acc: Record<string, any>, department) => {
    acc[department.name] = department.subDepartments.reduce(
      (subAcc: Record<string, any>, subDept) => {
        subAcc[subDept.name] = false;
        return subAcc;
      },
      {}
    );
    return acc;
  },
  {}
);
