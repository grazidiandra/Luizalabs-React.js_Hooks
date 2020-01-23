import React, { useState } from 'react';
import Search from '../component/search';
import apiAxios from '../service/api'
import './style.css';
import Result from '../component/result';
import LuizaLabs from '../component/luizalabsStyle';

const Cep = () => {
  const [cep, setCep] = useState('');
  const [address, setAdress] = useState(null);
  const [error, setError] = useState('');

  const searchCep = e => {
    let { value } = e.target;
     setCep(value);
     setError('');
  }

  const fetchCep = () => {
    if (!cep) {
      setError('Preencha o campo de CEP');
    } else {
      apiAxios.get(`${cep}/json/?callback=address`)
      .then(response => {
        if (response.data.erro) {
          setError('CEP não encontrado');
        } else {
          setAdress(response.data);
        }
      })
      .catch(() => {
        setError('Preencha com um CEP válido');
      }) 
    }
  }

  const reset = () => {
    setAdress(null);
    setCep('');
  }

  return (
    <div className='pageCep-container'>
      <div className='pageCep-container-searchCep'>
        <p className='pageCep-text'>CONSULTAR</p>
        <p className='pageCep-text-err'>{error}</p>
        <Search placeholder='00000-000' value={cep} method={searchCep} onclick={fetchCep}/> 
        {address ? <Result {...address} method={reset}/> : null }
      </div>
      <LuizaLabs />
    </div>
  );
}



export default Cep;
