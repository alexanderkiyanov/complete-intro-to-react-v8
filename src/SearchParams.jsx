import { useState, useEffect } from "react";
import { Pet } from "./Pet";
import { useBreedList } from "./useBreedList";

let count = 0;

const animals = ["bird", "cat", "reptile", "dog", "rabbit"];

const fetchPets = async (options, setPets) => {
  const res = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${options.animal}&location=${options.location}&breed=${options.breed}`
  );
  const json = await res.json();

  setPets(json.pets);
};

export const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [breeds, status] = useBreedList(animal);


  count++;

  useEffect(() => {
    fetchPets(
      {
        animal,
        location,
        breed,
      },
      setPets
    );
  }, []);

  return (
    <div className="search-params">
      <h1>{count}</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchPets(
            {
              animal,
              location,
              breed,
            },
            setPets
          );
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
          />
        </label>

        <label>
          Animal
          <select
            name="animal"
            id="animal"
            onChange={(e) => {
              setBreed("");
              setAnimal(e.target.value);
            }}
            value={animal}
          >
            <option />

            {animals.map((animalName) => (
              <option key={animalName} value={animalName}>
                {animalName}
              </option>
            ))}
          </select>
        </label>

        <label>
          Breed
          <select
            name="breed"
            id="breed"
            onChange={(e) => setBreed(e.target.value)}
            value={breed}
            disabled={breeds.length === 0}
          >
            <option />

            {breeds.map((breedName) => (
              <option key={breedName} value={breedName}>
                {breedName}
              </option>
            ))}
          </select>
        </label>

        <button>Submit</button>
      </form>

      {pets.map((pet) => (
        <Pet
          key={pet.id}
          name={pet.name}
          animal={pet.animal}
          breed={pet.breed}
        />
      ))}
    </div>
  );
};
