import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigations/types';
import { Movie } from '../../types/movie';
import { screens } from '../../utils';

type NavigationProps = NavigationProp<RootStackParamList>;

export function MoviesListScreen(): JSX.Element {
  const navigation = useNavigation<NavigationProps>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async (): Promise<void> => {
    try {
      // Simulación de datos de películas
      const mockMovies: Movie[] = [
        {
          id: 1,
          title: "Avatar: El Camino del Agua",
          overview: "Set more than a decade after the events of the first film, Avatar: The Way of Water begins to tell the story of the Sully family...",
          poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
          backdrop_path: "/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
          release_date: "2022-12-16",
          vote_average: 7.6,
          genre_ids: [878, 12, 28],
        },
        {
          id: 2,
          title: "Top Gun: Maverick",
          overview: "After more than thirty years of service as one of the Navy's top aviators, and dodging the advancement in rank that would ground him...",
          poster_path: "/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
          backdrop_path: "/odJ4hx6g6vBt4lBWKFD1tI8WS4x.jpg",
          release_date: "2022-05-27",
          vote_average: 8.3,
          genre_ids: [28, 18],
        },
        {
          id: 3,
          title: "Black Panther: Wakanda Forever",
          overview: "Queen Ramonda, Shuri, M'Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers...",
          poster_path: "/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
          backdrop_path: "/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg",
          release_date: "2022-11-11",
          vote_average: 7.3,
          genre_ids: [28, 12, 18],
        },
      ];

      setTimeout(() => {
        setMovies(mockMovies);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading movies:', error);
      setLoading(false);
    }
  };

  const handleMoviePress = (movie: Movie): void => {
    navigation.navigate(screens.movies.movieDetail, { movie });
  };

  const renderMovie = ({ item }: { item: Movie }): JSX.Element => (
    <TouchableOpacity 
      style={styles.movieCard} 
      onPress={() => handleMoviePress(item)}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.poster}
        resizeMode="cover"
      />
      <View style={styles.movieInfo}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.overview} numberOfLines={3}>
          {item.overview}
        </Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {item.vote_average.toFixed(1)}</Text>
          <Text style={styles.releaseDate}>
            {new Date(item.release_date).getFullYear()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0891b2" />
        <Text style={styles.loadingText}>Cargando películas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={renderMovie}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
  },
  movieCard: {
    flexDirection: 'row',
    backgroundColor: '#171717',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  poster: {
    width: 120,
    height: 180,
  },
  movieInfo: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  overview: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  rating: {
    fontSize: 14,
    color: '#0891b2',
    fontWeight: '600',
  },
  releaseDate: {
    fontSize: 14,
    color: '#666',
  },
});