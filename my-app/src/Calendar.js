import * as React from 'react';
import './Calendar.css';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [{ id: 'day', label: 'Technician', minWidth: 170 }];
for (let i = 0; i < 24; i++) {
  const hour = i < 10 ? `0${i}` : i;
  columns.push({ id: `${hour}:00`, label: `${hour}:00`, minWidth: 20 });
  columns.push({ id: `${hour}:30`, label: `${hour}:30`, minWidth: 20 });
}

const rows = [
  { id: 'user_id_1', label: 'Billy Gibbons', job: { start: '09:00', end: '12:00' } },
  { id: 'user_id_2', label: 'James Dean', job: { start: '14:00', end: '18:00' } },
].map((day) => {
  const row = { day: day.label, job: day.job };
  columns.slice(1).forEach((time) => {
    row[time.id] = '';
  });
  return row;
});


export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer className="table-container" sx={{ maxHeight: 880 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
  {rows
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row) => {
      return (
        <TableRow hover role="checkbox" tabIndex={-1} key={row.day}>
          {columns.map((column) => {
            const value = row[column.id];
            let isJobTime = false;
            if (row.job) {
              const startHour = parseInt(row.job.start.split(':')[0]);
              const endHour = parseInt(row.job.end.split(':')[0]);
              const currentHour = parseInt(column.id.split(':')[0]);

              if (currentHour >= startHour && currentHour < endHour) {
                isJobTime = true;
              }
            }
            return (
              <TableCell key={column.id} align={column.align}>
                {isJobTime ? 
                  <div className='jobTime'>Job Time</div>
                : column.format && typeof value === 'number'
                ? column.format(value)
                  : value}
            </TableCell>

            );
          })}
        </TableRow>
      );
    })}
</TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Paper>
  );
}