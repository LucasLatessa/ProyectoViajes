import React from "react";
import { Header } from "../HeaderFooter/header";
import { Footer } from "../HeaderFooter/footer";
import "./styles/about.css";

export const About = () => {
  return (
    <>
      <Header />
      <main className="about-page">
        <section className="about-section">
          <h1>Acerca de CarShare</h1>
          <p>
            CarShare es una plataforma diseñada para facilitar el viaje compartido entre usuarios. Nuestra misión es
            conectar a personas que desean compartir los gastos de viaje, haciendo el transporte más asequible y
            sostenible.
          </p>
          <h2>Nuestra Historia</h2>
          <p>
            Fundada en 2024, CarShare nació de la necesidad de reducir los costos de viaje para estudiantes y
            trabajadores que se desplazan regularmente. Creemos que compartir el viaje no solo reduce gastos, sino que
            también ayuda a disminuir el impacto ambiental.
          </p>
          <h2>El Equipo</h2>
          <p>
            Somos un equipo apasionado de desarrolladores y entusiastas del transporte sostenible. Nuestro objetivo es
            proporcionar una experiencia segura y conveniente para todos nuestros usuarios.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
};
