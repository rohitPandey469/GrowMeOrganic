import React, { useState } from "react";
import { departmentData } from "./departmentData";
import {  ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Checkbox,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

interface Department {
  name: string;
  subDepartments: { name: string }[];
}
export default function Departments() {
  const [open, setOpen] = useState<Record<string, boolean>>({}); // key{departmentName} - value{isOpen}
  const [selected, setSelected] = useState<
    Record<string, Record<string, boolean>>
  >({});
  // {
  //   departmentName1 : {
  //       subDepartmentName1 : Boolean,
  //       subDepartmentName2 : Boolean,
  //   },
  //   departmentName2 : {
  //     subDepartmentName1 : Boolean,
  //     subDepartmentName2 : Boolean
  //   }
  // }

  // For opening and closing the sub-departments for departments
  const handleToggle = (name: string) => {
    setOpen((prevOpen) => ({ ...prevOpen, [name]: !prevOpen[name] }));
  };

  const handleSelect = (departmentName: string, subDepartmentName?: string) => {
    if (subDepartmentName) {
      // a subDepartment Need to toggle
      setSelected((prevSelected) => {
        const newSelected = { ...prevSelected };
        const department = newSelected[departmentName];
        if (department) {
          department[subDepartmentName] = !department[subDepartmentName];
          Object.values(department).every(Boolean);
          newSelected[departmentName] = {
            ...department,
            [subDepartmentName]: department[subDepartmentName],
          };
        }
        return newSelected;
      });
    } else {
      // Toggling the value of all sub departments
      setSelected((prevSelected) => {
        const newSelected = { ...prevSelected };
        const department = newSelected[departmentName];
        if (department) {
          const newState = !Object.values(department).every(Boolean); // ek bhi false hoga to false ayega
          Object.keys(department).forEach(
            (subDept) => (department[subDept] = newState)
          );
          newSelected[departmentName] = { ...department };
        }
        // else {
        //   const subDepartments = departmentData.find()
        // }
        return newSelected;
      });
    }
  };

  return (
    <List>
      {departmentData.map((dept: Department) => (
        <React.Fragment key={dept.name}>
          <ListItem>
            <Checkbox
              checked={Object.values(selected[dept.name] || {}).every(Boolean)} //sab sub true then only true
              tabIndex={-1}
              disableRipple
              onChange={() => handleSelect(dept.name)}
            />
            <ListItemText primary={dept.name} />
            <IconButton onClick={() => handleToggle(dept.name)}>
              {open[dept.name] ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItem>
          <Collapse in={open[dept.name]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {dept.subDepartments.map((subDept) => (
                <ListItem key={subDept.name} style={{ paddingLeft: "2rem" }}>
                  <Checkbox
                    checked={selected[dept.name]?.[subDept.name] || false}
                    tabIndex={-1}
                    disableRipple
                    onChange={() => handleSelect(dept.name, subDept.name)}
                  />
                  <ListItemText primary={subDept.name} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
}
