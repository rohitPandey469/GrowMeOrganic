import React, { useState } from "react";
import { departmentData, MutatedDepartmentData } from "./departmentData";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Checkbox,
  Collapse,
  Container,
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
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [selected, setSelected] = useState<
    Record<string, Record<string, boolean>>
  >(MutatedDepartmentData);

  const handleToggle = (name: string) => {
    setOpen((prevOpen) => ({ ...prevOpen, [name]: !prevOpen[name] }));
  };

  const handleSelect = (departmentName: string, subDepartmentName?: string) => {
    console.log(departmentName, subDepartmentName);
    setSelected((prevSelected) => {
      const newSelected = { ...prevSelected };

      if (subDepartmentName) {
        // Toggle the specific sub-department
        const department = newSelected[departmentName];
        department[subDepartmentName] = !department[subDepartmentName];

        // If all sub-departments are selected, mark the department as selected
        if (Object.values(department).every((value) => value)) {
          Object.keys(department).forEach((subDept) => {
            department[subDept] = true;
          });
        } else {
          // If any sub-department is unselected, mark the department as partially selected
          Object.keys(department).forEach((subDept) => {
            department[subDept] = false;
          });
        }
      } else {
        // Toggle all sub-departments
        const department = newSelected[departmentName];
        const newState = !Object.values(department).every((value) => value);
        Object.keys(department).forEach((subDept) => {
          department[subDept] = newState;
        });
      }

      return newSelected;
    });
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <List>
        {departmentData.map((dept: Department) => (
          <React.Fragment key={dept.name}>
            <ListItem>
              <Checkbox
                edge="start"
                checked={Object.values(selected[dept.name] || {}).every(
                  Boolean
                )}
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
                      edge="start"
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
    </Container>
  );
}
