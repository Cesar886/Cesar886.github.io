import { useEffect, useState } from 'react';
import { Container, Title, Button, Group, Text, List, ThemeIcon, rem, Image, RingProgress } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import classes from './pelicula.module.css';

const apiKey = 'abf7d734dcd7cce557ecf0abc3a863bf';

export const Pelicula = ( ) => {
  const [movieData, setMovieData] = useState({}); // Cambio aquí: usar objeto vacío en lugar de array vacío
  
  const pathname = window.location.pathname;
  const iD = pathname.match(/\d+/g)?.[0];
  
  const fetchMovies = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${iD}?api_key=${apiKey}`);
      const data = await response.json();
      setMovieData(data);
      console.log("🚀 ~ fetchMovies ~ data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {

    if (iD) {
      fetchMovies();
    }
  }, [iD]);
  
  const numero = Math.round(movieData.vote_average * 100);
  const porcentaje = numero.toString().slice(0, 2);

  return (
    <Container size="md">
      {movieData && ( // Renderizado condicional solo si movieData tiene datos
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              <span>{movieData.title}</span>
            </Title>
            <Text c="dimmed" mt="md">
              {movieData.overview}
            </Text>
            <Text>
              <b>
              Fecha de lanzaiento: 
              </b>
               { movieData.release_date }
            </Text>
               <span>
               {movieData.vote_average && ( 
                 <RingProgress
                 size={70}
                 thickness={8}
                 sections={[{ value: movieData.vote_average * 10, color: 'blue' }]} 
                 label={ 
                   <Text c="blue" fw={500} ta="center" size={10}>
                       {porcentaje}%
                     </Text>
                   }
                   />
                 )}
               </span>
                        
            <b>Generos:</b>
             { movieData.genres && movieData.genres.map(genre => <p>{genre.name}</p>) }
             
            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b> based</b> – build type safe applications, all components and hooks export types
              </List.Item>
              <List.Item>
                <b>Free and open source</b> – all packages have MIT license, you can use Mantine in any project
              </List.Item>
              <List.Item>
                <b>No annoying focus ring</b> – focus ring will appear only when user navigates with keyboard
              </List.Item>
            </List>
            

            <Group mt={30}>
              <Button radius="xl" size="md" className={classes.control}>
                Get started
              </Button>
              <Button variant="default" radius="xl" size="md" className={classes.control}>
                Source code
              </Button>
            </Group>
          </div>
          <Image src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} className={classes.image} />
        </div>
      )}
    </Container>
  );
};
