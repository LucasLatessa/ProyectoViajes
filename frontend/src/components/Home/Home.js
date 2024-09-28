import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../HeaderFooter/header';
import { Footer } from '../HeaderFooter/footer';
import { getAllViajes } from '../../services/viajes.service';
import ViajeCard from './Viaje/viajeCard'; // Importar el componente ViajeCard
import './styles/home.css';

export const Home = () => {
  const [viajes, setViajes] = useState([]);
  const [searchOrigen, setSearchOrigen] = useState("");
  const [searchDestino, setSearchDestino] = useState("");
  const [dateDesde, setDateDesde] = useState("");
  const [dateHasta, setDateHasta] = useState("");
  const [filteredViajes, setFilteredViajes] = useState([]);
  const [showFilters, setShowFilters] = useState(false); // Estado para mostrar/ocultar filtros

  useEffect(() => {
    const fetchViajes = async () => {
      try {
        const response = await getAllViajes();
        setViajes(response.data);
        setFilteredViajes(response.data);
      } catch (error) {
        console.error('Error al cargar los viajes:', error);
      }
    };

    fetchViajes();
  }, []);

  const applyFilters = () => {
    let filtered = viajes;

    if (searchOrigen) {
      filtered = filtered.filter((viaje) =>
        viaje.origen_direccion.toLowerCase().includes(searchOrigen.toLowerCase())
      );
    }
    if (searchDestino) {
      filtered = filtered.filter((viaje) =>
        viaje.destino_direccion.toLowerCase().includes(searchDestino.toLowerCase())
      );
    }
    if (dateDesde) {
      filtered = filtered.filter((viaje) => viaje.fecha_hora >= dateDesde);
    }
    if (dateHasta) {
      filtered = filtered.filter((viaje) => viaje.fecha_hora <= dateHasta);
    }
    setFilteredViajes(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [searchOrigen, searchDestino, dateDesde, dateHasta, viajes]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    if (name === "searchOrigen") {
      setSearchOrigen(value);
    } else if (name === "searchDestino") {
      setSearchDestino(value);
    } else if (name === "dateDesde") {
      setDateDesde(value);
    } else if (name === "dateHasta") {
      setDateHasta(value);
    }
  };

  return (
    <>
      <Header />
      <main className="App">
        <section className={`sectionFiltros ${!showFilters ? 'collapsed' : ''}`}>
          <h2 className="tituloFiltros" onClick={() => setShowFilters(!showFilters)}>Filtros</h2>
          {showFilters && (
            <form className="formFiltros">
              <label>
                Origen:
                <input
                  type="text"
                  name="searchOrigen"
                  value={searchOrigen}
                  onChange={handleFilterChange}
                />
              </label>
              <label>
                Destino:
                <input
                  type="text"
                  name="searchDestino"
                  value={searchDestino}
                  onChange={handleFilterChange}
                />
              </label>
              <label>
                Fecha desde:
                <input
                  type="date"
                  name="dateDesde"
                  value={dateDesde}
                  onChange={handleFilterChange}
                />
              </label>
              <label>
                Fecha hasta:
                <input
                  type="date"
                  name="dateHasta"
                  value={dateHasta}
                  onChange={handleFilterChange}
                />
              </label>
            </form>
          )}
        </section>

        <section>
          <h2 className="viajes">Viajes Programados</h2>
          <div className="viajes-list">
            {filteredViajes.map((viaje) => (
              <ViajeCard key={viaje.viaje_id} viaje={viaje} />
            ))}
          </div>
        </section>
        <div className="crear-viaje-button">
          <Link to="/create">
            <button>Crear Nuevo Viaje</button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};
