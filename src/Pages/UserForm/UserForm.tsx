import { Button } from "@mui/material";
import { Box, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface formDataType {
  name: string;
  phone: string;
  email: string;
}

export const UserForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<formDataType>({
    name: "",
    phone: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Additional Check here
    if (formData.name == "" || formData.phone == "" || formData.email == "") {
      alert("Please! Fill out all fields");
      return;
    }

    // dispatch(submitUserForm(formData))
    // Stored
    localStorage.setItem("formData", JSON.stringify(formData));

    navigate("/second-page", {});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        User Information
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          fullWidth
          label="Name"
          value={formData.name}
          name="name"
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Phone Number"
          value={formData.phone}
          name="phone"
          type="tel"
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          value={formData.email}
          name="email"
          type="email"
          onChange={handleChange}
          margin="normal"
        />
        <Button
          sx={{ mx: "auto", mt: 2, width: 200 }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};
