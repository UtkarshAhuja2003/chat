'use client';
import {useEffect} from 'react';

export default function Home() {
  useEffect(()=>{
    const username = sessionStorage.getItem('username');
    if (username) {
      window.location.href = '/chat';
    } else {
      window.location.href = '/login';
    }
  }, []);

  return (
    <div>
      Redirecting to login page...
    </div>
  );
}
