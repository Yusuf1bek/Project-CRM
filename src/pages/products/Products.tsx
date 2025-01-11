import {Box,Button,Typography,Table as MuiTable,TableBody,TableCell,TableHead,TableRow,Paper,CircularProgress,TablePagination,} from "@mui/material";
  import { useQuery } from "@tanstack/react-query";
  import { useState } from "react";
  import { request } from "@/api";
  import { Product } from "@/types";

  const Products: React.FC = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
    const { data, isLoading } = useQuery({
      queryKey: [`products`, page, rowsPerPage],
      queryFn: () =>
        request
          .get<{ innerData: Product[]; totalCount: number }>(
            `/get/products?skip=${page}&limit=${rowsPerPage}`
          )
          .then((res) => res?.data),
    });
    console.log(data);
    
    const handlePageChange = (_: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    return (
      <div>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: "20px" }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Products
          </Typography>
          <Button onClick={() => console.log("Add Product")}>Add Product</Button>
        </Box>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <MuiTable>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell align="left">Category</TableCell>
                    <TableCell align="left">Price</TableCell>
                    <TableCell align="left">Stock</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.innerData.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell align="left">{product.title}</TableCell>
                      <TableCell align="left">{product.category}</TableCell>
                      <TableCell align="left">${product.price.toFixed(2)}</TableCell>
                      <TableCell align="left">{product.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </MuiTable>
            </Paper>
            <TablePagination
              component="div"
              count={data?.totalCount || 0}
              page={page}
              onPageChange={handlePageChange}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </>
        )}
      </div>
    );
  };
  
  export default Products;
  