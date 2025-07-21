import { Pagination } from '@mui/material';
import React from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

function Paginations({totalPages, totalElements}) {

  const [searchParams] = useSearchParams();
  const pathname = useLocation().pathname;
  const params =new URLSearchParams(searchParams);
  const navigate = useNavigate();

  const paramValue = searchParams.get("page")?Number(searchParams.get("page")):1;

  const handlePageChange = (e, value) => {
      params.set("page", value.toString());
      navigate(`${pathname}?${params}`);
  }


  return (
    <Pagination 
        count={totalPages}  
        page={paramValue}
        defaultPage={1} 
        siblingCount={0} 
        boundaryCount={2} 
        shape="rounded"
        onChange={handlePageChange}
    />
  )
};
export default Paginations;
