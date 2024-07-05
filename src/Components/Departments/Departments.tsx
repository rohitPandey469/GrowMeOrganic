import React, { useState } from "react";
import { MutatedDepartmentData } from "./departmentData";
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

// interface Department {
//   name: string;
//   subDepartments: { name: string }[];
// }

export default function Departments() {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [selected, setSelected] = useState<
    Record<string, Record<string, boolean>>
  >(MutatedDepartmentData);

  const handleToggle = (name: string) => {
    setOpen((prevOpen) => ({ ...prevOpen, [name]: !prevOpen[name] }));
  };

  const handleSelect = (departmentName: string, subDepartmentName?: string) => {
    setSelected((prevState) => {
      const newSelected = { ...prevState };
  
      if (subDepartmentName) {
        newSelected[departmentName] = {
          ...newSelected[departmentName],
          [subDepartmentName]: !newSelected[departmentName][subDepartmentName],
        };
      } else {
        const newState = !Object.values(prevState[departmentName]).every(Boolean);
        newSelected[departmentName] = Object.fromEntries(
          Object.keys(prevState[departmentName]).map((subDept) => [
            subDept,
            newState,
          ])
        );
      }
  
      return newSelected;
    });
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <List>
        {Object.keys(selected).map((departmentName) => (
          <React.Fragment key={departmentName}>
            <ListItem>
              <Checkbox
                edge="start"
                checked={Object.values(selected[departmentName]).every(Boolean)}
                tabIndex={-1}
                disableRipple
                onChange={() => handleSelect(departmentName)}
              />
              <ListItemText primary={departmentName} />
              <IconButton onClick={() => handleToggle(departmentName)}>
                {open[departmentName] ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </ListItem>
            <Collapse in={open[departmentName]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {Object.keys(selected[departmentName]).map((subDeptName) => (
                  <ListItem key={subDeptName} style={{ paddingLeft: "2rem" }}>
                    <Checkbox
                      edge="start"
                      checked={selected[departmentName][subDeptName]}
                      tabIndex={-1}
                      disableRipple
                      onChange={() => handleSelect(departmentName, subDeptName)}
                    />
                    <ListItemText primary={subDeptName} />
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
