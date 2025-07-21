import { Button, FormControl, InputLabel, MenuItem, Select, Tooltip } from '@mui/material';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { FiArrowDown, FiArrowUp, FiRefreshCw, FiSearch } from 'react-icons/fi';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

 function Filter({categories}) {

    const [category, setCategory] = useState('All');

    const [sortOrder, setSortOrder] = useState('asc');

    const [searchTerm, setSearchTerm] = useState('');



    const [searchParams] = useSearchParams();
    const params =new URLSearchParams(searchParams);
    const pathname = useLocation().pathname;
    const navigate = useNavigate();

    const handleCategoryChange = (e) => {

        const selectedCategory = e.target.value;
        if(selectedCategory=="All"){
            params.delete("category");
        }
        else{
            params.set("category", selectedCategory);
        }
        navigate(`${pathname}?${params}`);
        setCategory(e.target.value);
    }

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        params.set("sortby", sortOrder === 'asc' ? 'desc' : 'asc');
        navigate(`${pathname}?${params}`);
    }
    const handleClearFilters = () => {
        params.delete("category");
        params.delete("sortby");
        params.delete("keyword");
        navigate(`${pathname}?${params}`);
        setCategory('All');
        setSortOrder('asc');
        setSearchTerm('');
    }

    useEffect(() => {
        const currentCategoty = searchParams.get("category") || "All";
        const currentSortOrder = searchParams.get("sortby") || "asc";
        const currentSearchTerm = searchParams.get("keyword") || "";

        setCategory(currentCategoty);
        setSortOrder(currentSortOrder);
        setSearchTerm(currentSearchTerm);

        
    }, [searchParams]);

    useEffect(() => {
        const handler = setTimeout(() => {
            if(searchTerm){
                params.set("keyword", searchTerm);
                navigate(`${pathname}?${params}`);
            }
            else{
                params.delete("keyword");
                navigate(`${pathname}?${params}`);
            }
        }, 3000);
        return () => clearTimeout(handler);
    
    }, [searchParams, pathname, navigate, searchTerm]);

  return (
    <div className='flex lg:flex-row  flex-col-reverse lg:justify-between justify-center items-center gap-4'>
        <div className='relative flex items-center 2xl:w-[450px] sm:w-[420px w-full]'>
            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type='text' placeholder='Search...' className='border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#1976d2]'/>
            <FiSearch className='absolute left-3 text-slate-800'/>
        </div>
        <div className='flex sm:flex-row flex-col items-center gap-4'>
            <FormControl variant='outlined' size='small'>
                <InputLabel id='category-select-label'>Category</InputLabel>   
                <Select labelId='category-select-label'
                   value={category}
                   onChange={handleCategoryChange}
                   label='Category'
                   className='text-slate-800 min-w-[120px] border-slate-700'
                >
                    <MenuItem value='All'>All</MenuItem>
                    {categories.map((item) => <MenuItem key={item.categoryId} value={item.categoryName}>{item.categoryName}</MenuItem>)}

                </Select>
              
            </FormControl>

            <Tooltip title="Sorted by price : asc">
                <Button onClick={toggleSortOrder} variant="contained" color="primary" className='flex items-centergap-2 h-10 '>
                    Sort By
                    {sortOrder === 'asc' ? (<FiArrowUp size={20}/>) : <FiArrowDown size={20}/>}
                   
                </Button>
            </Tooltip>

            <button onClick={handleClearFilters} className='flex items-center gap-2 bg-rose-900 text-white px-3 py-2 rounded-md transition duration-300 ease-in shadow-md focus:outline-none cursor-pointer'>
                <FiRefreshCw/>
                <span className='font-semibold' size={16}>Clear Filter</span>
            </button>

        </div>
    </div>
  )
}

export default Filter;