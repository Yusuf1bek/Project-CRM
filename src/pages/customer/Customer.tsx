import CreateCS from "@/components/create-cs/CreateCS";
import Table from "@/components/table/Table";
import { Box, Button, Typography, TablePagination, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { request } from "@/api";

const Customer: React.FC = () => {
  const [open, setOpen] = useState<null | string>(null);
  const [page, setPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(10); 

  const { data, isLoading } = useQuery({
    queryKey: [`customers`, page, rowsPerPage],
    queryFn: () =>
      request
        .get(`/get/customers?skip=${page}&limit=${rowsPerPage}`)
        .then(res => res),
  });

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mb: "20px" }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Customer
        </Typography>
        <Button onClick={() => setOpen("customer")}>Create</Button>
      </Box>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Table data={data?.data?.innerData} />
          <TablePagination
            component="div"
            count={data?.data?.totalCount || 0}
            page={page}
            onPageChange={handlePageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </>
      )}
      <CreateCS open={open} close={() => setOpen(null)} />
    </div>
  );
};

export default Customer;
