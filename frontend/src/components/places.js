import React, { useState, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import "@reach/combobox/styles.css";

const libraries = ["places"];

const Places = ({ setSelectedLocation }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
    loadScriptOptions: { async: true },
  });

  if (loadError) return <div>Error al cargar el mapa</div>;
  if (!isLoaded) return <div>Cargando...</div>;

  return <Map setSelectedLocation={setSelectedLocation} />;
};

const Map = ({ setSelectedLocation }) => {
  const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
  const [selected, setSelected] = useState(null);

  const handleMapClick = (event) => {
    setSelected({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    setSelectedLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  };

  return (
    <>
      <div className="places-container">
        <PlacesAutocomplete setSelectedLocation={setSelectedLocation} />
      </div>

      <GoogleMap
        zoom={10}
        center={center}
        onClick={handleMapClick}
        mapContainerClassName="map-container"
      >
        {selected && <Marker position={{ lat: selected.lat, lng: selected.lng }} />}
      </GoogleMap>
    </>
  );
};

const PlacesAutocomplete = ({ setSelectedLocation }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setSelectedLocation({ address, lat, lng });
    } catch (error) {
      console.error("Error al obtener coordenadas:", error);
    }
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="Buscar dirección"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

export default Places;
