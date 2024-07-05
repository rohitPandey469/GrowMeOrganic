import axios from "axios";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Container, Typography } from "@mui/material";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function DataGridTable() {
  // const { data } = useSelector((state) => state.data.data);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // dispatch(getData());
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => setPosts(res.data))
      .catch((error) => console.error(error));
  }, []);

  const columns: GridColDef<(typeof posts)[number]>[] = [
    { field: "userId", headerName: "User ID", width: 150 },
    { field: "id", headerName: "ID", width: 150 },
    { field: "title", headerName: "Title", width: 300 },
    { field: "body", headerName: "Body", width: 500 },
  ];

  return (
    <Container sx={{ display: "flex", justifyContent: "center", height:500 }}>
      <Box sx={{ height: 400, width: "80%" }}>
        <Typography variant="h4" gutterBottom>
          Posts
        </Typography>
        <DataGrid
          rows={posts}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Container>
  );
}
