import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../store/productSlice';

function useProductFilter() {

    const [searchParams] = useSearchParams();

    const dispatch = useDispatch();
    
    useEffect(()=>{

            const params =  new URLSearchParams();
            const currentPage =  searchParams.get("page") ? Number(searchParams.get("page")) :1;
            params.set("pageNumber", currentPage - 1);
            const categoryParams =  searchParams.get("category") || null;
            const keyword =  searchParams.get("keyword") || null;
            const sortOrder =  searchParams.get("sortby") || "asc";
            params.set("sortBy", "price");
            params.set("sortDirection", sortOrder);

            if(categoryParams){
                params.set("category", categoryParams);
            }
            if(keyword){
                params.set("keyword", keyword);
            }
            
            params.set("pageSize", 5);
            dispatch(getProducts(params.toString()));


    }, [searchParams, dispatch]);




}
export default useProductFilter; 
