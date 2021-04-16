import React from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';

export default function Pages({ allRecipes, page }) {
  const totalPages = Math.ceil(allRecipes.length / 9)
  const pagesAround = 2;
  const totalNumbers = (pagesAround * 2) + 3;
  const totalButtons = totalNumbers + 2;
  
  const range = (from, to, step = 1) => {
    let i = from;
    const range = [];
    
    while (i <= to) {
      range.push(i);
      i += step;
    }
    
    return range;
  }
  
  function fetchPageNumbers() {
    if (totalPages > totalButtons) {
      const startPage = Math.max(2, page - pagesAround)
      const endPage = Math.min(totalPages - 1, page + pagesAround);
      let pages = range(startPage, endPage);
      
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = (totalPages - endPage) > 1;
      const spillOffset = totalNumbers - (pages.length + 1);
      
      switch (true) {
        case (hasLeftSpill && !hasRightSpill): {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = ['LEFT', ...extraPages, ...pages];
          break;
        }
        case (!hasLeftSpill && hasRightSpill): {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, 'RIGHT'];
          break;
        }
        case (hasLeftSpill && hasRightSpill):
          default: {
            pages = ['LEFT', ...pages, 'RIGHT'];
            break;
          }
        }
        return [1, ...pages, totalPages];
      }
      else {
        return range(1, totalPages);
      }
    }
    
    const pagesToRender = fetchPageNumbers();
    
    return (
      <div className='Pagination'>
      {pagesToRender.map((p, index) => {
        if (p === 'LEFT') return (
          <Link key={index} className='PaginationLink Left' to={`/home?page=${(parseInt(page) - 1)}`}><button>Prev</button></Link>
        )
        if (p === 'RIGHT') return (
          <Link key={index} className='PaginationLink Right' to={`/home?page=${(parseInt(page) + 1)}`}><button>Next</button></Link>
        )
        return (
          <Link key={index} className='PaginationLink Center' to={`/home?page=${p}`}><button>{p}</button></Link>
        )
      }
      )}
    </div>
  )

}